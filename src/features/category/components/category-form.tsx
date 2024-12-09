"use client";

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

import { Category } from "@/types";
import { Response } from "@/types/response";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "../category-api";
import { CategorySchema, CategorySchemaType } from "../schemas";

interface CategoryFormProps {
  initialData?: CategorySchemaType & { id: string };
}

export default function CategoryForm({ initialData }: CategoryFormProps) {
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
      } else {
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

        navigate("/admin/categories");
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

        <LoadingButton loading={isLoading} type="submit" className="w-full">
          {isLoading || isUpdating ? actionLoading : action}
        </LoadingButton>
      </form>
    </Form>
  );
}
