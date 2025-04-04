import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { Coupon } from "@/types";
import type { Response } from "@/types/response";
import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInDays, format } from "date-fns";
import {
  CalendarIcon,
  CheckCircle,
  DollarSign,
  Info,
  Percent,
  Tag,
  Timer,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import {
  useCreateCouponMutation,
  useUpdateCouponMutation,
} from "../coupon-api";
import { CouponSchema, type CouponSchemaType } from "../schemas";

interface CouponFormProps {
  initialData?: CouponSchemaType & { id: string };
  onSuccess?: () => void;
}

export default function CouponForm({
  initialData,
  onSuccess,
}: CouponFormProps) {
  const [create, { isLoading }] = useCreateCouponMutation();
  const [update, { isLoading: isUpdating }] = useUpdateCouponMutation();
  const [previewCode, setPreviewCode] = useState("");
  const [previewDiscount, setPreviewDiscount] = useState<{
    type?: string;
    value: number;
  }>({ value: 0 });

  const action = initialData ? "Save Changes" : "Create Coupon";
  const actionLoading = initialData
    ? "Saving changes..."
    : "Creating coupon...";

  const navigate = useNavigate();

  const form = useForm<CouponSchemaType>({
    resolver: zodResolver(CouponSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          startDate: initialData.startDate
            ? new Date(initialData.startDate)
            : undefined,
          endDate: initialData.endDate
            ? new Date(initialData.endDate)
            : undefined,
        }
      : {
          code: "",
          discountType: undefined,
          discountValue: 0,
          endDate: undefined,
          startDate: undefined,
        },
  });

  // Watch form values for preview
  const watchCode = form.watch("code");
  const watchDiscountType = form.watch("discountType");
  const watchDiscountValue = form.watch("discountValue");
  const watchStartDate = form.watch("startDate");
  const watchEndDate = form.watch("endDate");

  useEffect(() => {
    setPreviewCode(watchCode || "EXAMPLE25");
    setPreviewDiscount({
      type: watchDiscountType,
      value: watchDiscountValue || 0,
    });
  }, [watchCode, watchDiscountType, watchDiscountValue]);

  async function onSubmit(values: CouponSchemaType) {
    if (initialData) {
      const res = (await update({
        data: values,
        couponId: initialData.id,
      })) as Response<Coupon>;

      if (res.error) {
        toast.error(
          res.error?.data.message || "Coupon updating failed. Please try again."
        );
      } else {
        if (onSuccess) {
          onSuccess();
        }
        toast.success("Coupon successfully updated");
      }
    } else {
      const res = (await create({
        ...values,
      })) as Response<Coupon>;

      if (res.error) {
        toast.error(
          res.error?.data.message || "Coupon creating failed. Please try again."
        );
      } else {
        toast.success("Coupon successfully created");
        navigate("/dashboard/vendor/coupons");
      }
    }
  }

  // Calculate duration between start and end dates
  const duration =
    watchStartDate && watchEndDate
      ? differenceInDays(new Date(watchEndDate), new Date(watchStartDate))
      : null;

  return (
    <TooltipProvider>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Coupon Preview */}
          {(watchCode || watchDiscountType || watchDiscountValue > 0) && (
            <div className="mb-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                <Tag className="h-4 w-4 mr-1" />
                Coupon Preview
              </h3>
              <div className="bg-white border border-dashed border-primary/50 rounded-lg p-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-20 h-20 bg-primary/5 rounded-full -translate-x-10 -translate-y-10"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-primary/5 rounded-full translate-x-10 translate-y-10"></div>

                <div className="relative flex flex-col items-center py-2">
                  <span className="text-xs text-gray-500 uppercase tracking-wider">
                    Coupon Code
                  </span>
                  <span className="text-2xl font-bold text-primary tracking-wider my-1 font-mono">
                    {previewCode}
                  </span>
                  <span className="text-lg font-semibold">
                    {previewDiscount.type === "PERCENTAGE" ? (
                      <span className="flex items-center">
                        <span className="text-gray-900">
                          {previewDiscount.value}% OFF
                        </span>
                      </span>
                    ) : previewDiscount.type === "FIXED" ? (
                      <span className="flex items-center">
                        <span className="text-gray-900">
                          ${previewDiscount.value} OFF
                        </span>
                      </span>
                    ) : (
                      <span className="text-gray-400">Discount Preview</span>
                    )}
                  </span>

                  {watchStartDate && watchEndDate && (
                    <div className="text-xs text-gray-500 mt-2 flex items-center">
                      <Timer className="h-3 w-3 mr-1" />
                      Valid: {format(new Date(watchStartDate), "MMM d")} -{" "}
                      {format(new Date(watchEndDate), "MMM d, yyyy")}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Coupon Details Section */}
          <div className="space-y-6">
            <div className="flex items-center mb-2">
              <Tag className="h-5 w-5 text-primary mr-2" />
              <h3 className="text-lg font-medium">Coupon Details</h3>
            </div>

            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Coupon Code
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-gray-400 ml-1 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80">
                          Use uppercase letters and numbers. Avoid special
                          characters. Example: SUMMER25, WELCOME10
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        disabled={isLoading || isUpdating}
                        type="text"
                        placeholder="e.g. SUMMER25"
                        className="pl-10 font-medium uppercase tracking-wider focus-visible:ring-primary"
                        {...field}
                        onChange={(e) => {
                          // Convert to uppercase
                          const value = e.target.value.toUpperCase();
                          field.onChange(value);
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="discountType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      Discount Type
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-gray-400 ml-1 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            PERCENTAGE: % off the total (e.g., 15% off)
                            <br />
                            FIXED: Fixed amount off (e.g., $10 off)
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </FormLabel>
                    <Select
                      disabled={isLoading || isUpdating}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full focus-visible:ring-primary">
                          <SelectValue placeholder="Select discount type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="PERCENTAGE">
                          <div className="flex items-center">
                            <Percent className="h-4 w-4 mr-2 text-primary" />
                            <span>PERCENTAGE (% off)</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="FIXED">
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-2 text-primary" />
                            <span>FIXED ($ amount off)</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="discountValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      Discount Value
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-gray-400 ml-1 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            For percentage: enter a number between 1-100
                            <br />
                            For fixed amount: enter the dollar amount
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        {watchDiscountType === "PERCENTAGE" ? (
                          <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                        ) : (
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                        )}
                        <Input
                          id="discountValue"
                          disabled={isLoading || isUpdating}
                          type="number"
                          placeholder={
                            watchDiscountType === "PERCENTAGE"
                              ? "e.g. 25"
                              : "e.g. 10"
                          }
                          className="pl-10 focus-visible:ring-primary"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Validity Period Section */}
          <div className="space-y-6 pt-4 border-t border-gray-100">
            <div className="flex items-center mb-2">
              <Timer className="h-5 w-5 text-primary mr-2" />
              <h3 className="text-lg font-medium">Validity Period</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      Start Date
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal focus-visible:ring-primary",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? format(field.value, "MMMM d, yyyy")
                              : "Select start date"}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            if (date) {
                              field.onChange(new Date(date));
                            }
                          }}
                          disabled={(date) =>
                            date < new Date(Date.now() - 24 * 60 * 60 * 1000)
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      End Date
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal focus-visible:ring-primary",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? format(field.value, "MMMM d, yyyy")
                              : "Select end date"}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            if (date) {
                              field.onChange(new Date(date));
                            }
                          }}
                          disabled={(date) =>
                            date < new Date() ||
                            (watchStartDate
                              ? date < new Date(watchStartDate)
                              : false)
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {duration !== null && duration >= 0 && (
              <Alert className="bg-blue-50 border-blue-200 text-blue-800">
                <Timer className="h-4 w-4 text-blue-600" />
                <AlertDescription className="flex items-center">
                  This coupon will be valid for{" "}
                  <span className="font-bold mx-1">{duration + 1} days</span>
                  {duration > 30 && (
                    <span className="ml-1 text-sm">
                      (Consider a shorter duration for time-sensitive
                      promotions)
                    </span>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-gray-100">
            <LoadingButton
              loading={isLoading || isUpdating}
              type="submit"
              className="w-full py-6 text-lg"
              aria-label={isLoading || isUpdating ? actionLoading : action}
            >
              {isLoading || isUpdating ? actionLoading : action}
            </LoadingButton>

            {!isLoading && !isUpdating && (
              <p className="text-center text-sm text-gray-500 mt-4">
                <CheckCircle className="inline-block h-3 w-3 mr-1" />
                Customers will be able to apply this coupon at checkout
              </p>
            )}
          </div>
        </form>
      </Form>
    </TooltipProvider>
  );
}
