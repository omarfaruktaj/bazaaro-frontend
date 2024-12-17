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
import { cn } from "@/lib/utils";
import { Coupon } from "@/types";
import { Response } from "@/types/response";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import {
  useCreateCouponMutation,
  useUpdateCouponMutation,
} from "../coupon-api";
import { CouponSchema, CouponSchemaType } from "../schemas";

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

  const action = initialData ? "Save changes" : "Create";
  const actionLoading = initialData ? "Saving changes..." : "Creating...";

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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading || isUpdating}
                  type="text"
                  placeholder="Enter coupon code"
                  {...field}
                  className="text-lg p-3 rounded-md shadow-sm border border-gray-300 focus:ring-2 focus:ring-primary-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="discountType"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="couponType">Discount Type</FormLabel>
              <Select
                disabled={isLoading || isUpdating}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select discount type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {["PERCENTAGE", "FIXED"].map((couponType) => (
                    <SelectItem key={couponType} value={couponType}>
                      {couponType}
                    </SelectItem>
                  ))}
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
              <FormLabel htmlFor="discountValue">Discount Value</FormLabel>
              <FormControl>
                <Input
                  id="discountValue"
                  disabled={isLoading || isUpdating}
                  type="number"
                  placeholder="Enter discount value"
                  {...field}
                  className="text-lg p-3 rounded-md shadow-sm border border-gray-300 focus:ring-2 focus:ring-primary-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? format(field.value, "yyyy-MM-dd")
                          : "Pick a date"}
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
                <FormLabel>End Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? format(field.value, "yyyy-MM-dd")
                          : "Pick a date"}
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
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <LoadingButton
          loading={isLoading || isUpdating}
          type="submit"
          className="w-full py-3 mt-6"
        >
          {isLoading || isUpdating ? actionLoading : action}
        </LoadingButton>
      </form>
    </Form>
  );
}
