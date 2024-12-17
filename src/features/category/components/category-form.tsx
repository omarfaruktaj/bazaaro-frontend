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

import { AutoComplete } from "@/components/ui/auto-complete";
import { iconOptions } from "@/data/icons";
import { Category } from "@/types";
import { Response } from "@/types/response";
import { getIconByValue } from "@/utils/get-icon-by-value";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "../category-api";
import { CategorySchema, CategorySchemaType } from "../schemas";

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

  const action = initialData ? "Save changes" : "Create";
  const actionLoading = initialData ? "Saving changes.." : "Creating...";

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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading || isUpdating}
                  type="text"
                  placeholder="Enter category name"
                  {...field}
                />
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isLoading || isUpdating}
                  placeholder="Enter category description"
                  {...field}
                />
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
              <FormLabel>Icon</FormLabel>
              <FormControl>
                <div>
                  {field.value && (
                    <span className="text-2xl">
                      {(() => {
                        const Icon = getIconByValue(field.value);
                        return Icon ? <Icon /> : null;
                      })()}
                    </span>
                  )}
                  <AutoComplete
                    options={iconOptions}
                    placeholder="Select an icon"
                    emptyMessage="No icons found"
                    value={iconOptions.find(
                      (option) => option.value === field.value
                    )}
                    onValueChange={(selectedOption) =>
                      field.onChange(selectedOption.value)
                    }
                    disabled={isLoading || isUpdating}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton loading={isLoading} type="submit" className="w-full">
          {isLoading || isUpdating ? actionLoading : action}
        </LoadingButton>
      </form>
    </Form>
  );
}
