import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { Textarea } from "@/components/ui/textarea";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { AutoComplete } from "@/components/ui/auto-complete";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { iconOptions } from "@/data/icons";
import type { Category } from "@/types";
import type { Response } from "@/types/response";
import { getIconByValue } from "@/utils/get-icon-by-value";
import {
  CheckCircle,
  FileText,
  HelpCircle,
  Info,
  Layers,
  Tag,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "../category-api";
import { CategorySchema, type CategorySchemaType } from "../schemas";

interface CategoryFormProps {
  initialData?: CategorySchemaType & { id: string };
  onSuccess?: () => void;
}

export default function CategoryForm({
  initialData,
  onSuccess,
}: CategoryFormProps) {
  const [create, { isLoading }] = useCreateCategoryMutation();
  const [update, { isLoading: isUpdating }] = useUpdateCategoryMutation();
  const [selectedIcon, setSelectedIcon] = useState<string | null>(
    initialData?.icon || null
  );

  const action = initialData ? "Save Changes" : "Create Category";
  const actionLoading = initialData
    ? "Saving changes..."
    : "Creating category...";

  const navigate = useNavigate();

  const form = useForm<CategorySchemaType>({
    resolver: zodResolver(CategorySchema),
    defaultValues: initialData
      ? {
          ...initialData,
        }
      : {
          name: "",
          description: "",
          icon: "",
        },
  });

  // Watch form values
  const watchIcon = form.watch("icon");

  useEffect(() => {
    setSelectedIcon(watchIcon);
  }, [watchIcon]);

  async function onSubmit(values: CategorySchemaType) {
    if (initialData) {
      const res = (await update({
        data: values,
        categoryId: initialData.id,
      })) as Response<Category>;

      if (res.error) {
        toast.error(
          res.error?.data.message ||
            "Category updating failed. Please try again."
        );
      } else if (res.data) {
        if (onSuccess) {
          onSuccess();
        }
        toast.success("Category successfully updated");
      }
    } else {
      const res = (await create({
        ...values,
      })) as Response<Category>;

      if (res.error) {
        toast.error(
          res.error?.data.message ||
            "Category creating failed. Please try again."
        );
      } else {
        toast.success("Category successfully created");
        navigate("/dashboard/admin/categories");
      }
    }
  }

  // Get the icon component for preview
  const IconComponent = selectedIcon ? getIconByValue(selectedIcon) : null;

  return (
    <TooltipProvider>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Category Preview */}
          {(form.watch("name") || selectedIcon) && (
            <div className="mb-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                <Layers className="h-4 w-4 mr-1" />
                Category Preview
              </h3>
              <div className="flex items-center justify-center bg-white border border-dashed border-primary/50 rounded-lg p-4">
                <div className="flex flex-col items-center py-3 px-6">
                  {IconComponent && (
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                  )}
                  <span className="text-lg font-semibold text-gray-900">
                    {form.watch("name") || "Category Name"}
                  </span>
                  {form.watch("description") && (
                    <span className="text-sm text-gray-500 text-center mt-1 max-w-xs">
                      {(form.watch("description") ?? "").length > 60
                        ? (form.watch("description") ?? "").substring(0, 60) +
                          "..."
                        : form.watch("description")}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Category Details Section */}
          <div className="space-y-6">
            <div className="flex items-center mb-2">
              <Tag className="h-5 w-5 text-primary mr-2" />
              <h3 className="text-lg font-medium">Category Details</h3>
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Category Name
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-gray-400 ml-1 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80">
                          Use a clear, descriptive name that customers will
                          easily understand and search for.
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
                        placeholder="e.g. Electronics, Clothing, Home & Garden"
                        className="pl-10 focus-visible:ring-primary"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Description
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-gray-400 ml-1 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80">
                          Provide a brief description of what types of products
                          belong in this category.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Textarea
                        disabled={isLoading || isUpdating}
                        placeholder="Describe what types of products belong in this category..."
                        className="pl-10 min-h-24 focus-visible:ring-primary"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Category Icon
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-gray-400 ml-1 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80">
                          Choose an icon that visually represents this category.
                          This will help customers quickly identify the
                          category.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <FormControl>
                    <div className="space-y-3">
                      {IconComponent && (
                        <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-md">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <IconComponent className="h-5 w-5 text-primary" />
                          </div>
                          <div className="text-sm text-gray-600">
                            Selected icon:{" "}
                            <span className="font-medium">{selectedIcon}</span>
                          </div>
                        </div>
                      )}

                      <AutoComplete
                        options={iconOptions}
                        placeholder="Search and select an icon"
                        emptyMessage="No icons found"
                        value={iconOptions.find(
                          (option) => option.value === field.value
                        )}
                        onValueChange={(selectedOption) =>
                          field.onChange(selectedOption.value)
                        }
                        disabled={isLoading || isUpdating}
                        // className="focus-visible:ring-primary"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {!selectedIcon && (
            <Alert className="bg-amber-50 border-amber-200 text-amber-800">
              <HelpCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription>
                Selecting an icon is recommended to help customers quickly
                identify this category.
              </AlertDescription>
            </Alert>
          )}

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
                Categories help customers find products more easily
              </p>
            )}
          </div>
        </form>
      </Form>
    </TooltipProvider>
  );
}
