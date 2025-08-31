"use client";

import React from "react";

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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Category } from "@/types";
import type { Response } from "@/types/response";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle2,
  FileText,
  HelpCircle,
  Store,
  Upload,
} from "lucide-react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { ShopSchema, type ShopSchemaType } from "../schemas";
import { useCreateShopMutation, useUpdateShopMutation } from "../shop-api";
import { default as LogoInput } from "./logo-input";

interface ShopFormProps {
  initialData?: ShopSchemaType & { id: string };
  onSuccess?: () => void;
}

export default function ShopForm({ initialData, onSuccess }: ShopFormProps) {
  const [create, { isLoading }] = useCreateShopMutation();
  const [update, { isLoading: isUpdating }] = useUpdateShopMutation();
  const [completedFields, setCompletedFields] = useState<string[]>([]);

  const action = initialData ? "Save changes" : "Complete Setup";
  const actionLoading = initialData ? "Saving changes..." : "Setting up...";

  const navigate = useNavigate();

  const form = useForm<ShopSchemaType>({
    resolver: zodResolver(ShopSchema),
    defaultValues: initialData
      ? { ...initialData }
      : { name: "", description: "", logo: "" },
  });

  const formValues = useWatch({ control: form.control });

  const isFormUnchanged =
    initialData &&
    formValues?.name === initialData.name &&
    formValues?.description === initialData.description &&
    formValues?.logo === initialData.logo;

  const updateCompletedFields = () => {
    const completed = [];
    if (formValues?.name?.trim()) completed.push("name");
    if (formValues?.description?.trim()) completed.push("description");
    if (formValues?.logo?.trim()) completed.push("logo");
    setCompletedFields(completed);
  };

  // Update completed fields when form values change
  React.useEffect(() => {
    updateCompletedFields();
  }, [formValues]);

  async function onSubmit(values: ShopSchemaType) {
    if (initialData) {
      const res = (await update({
        data: values,
        shopId: initialData.id,
      })) as Response<Category>;
      if (res.error) {
        toast.error(
          res.error?.data.message || "Shop update failed. Please try again."
        );
      } else {
        if (onSuccess) {
          onSuccess();
        }
        toast.success("Shop successfully updated");
      }
    } else {
      const res = (await create({ ...values })) as Response<Category>;
      if (res.error) {
        toast.error(
          res.error?.data.message || "Shop creation failed. Please try again."
        );
      } else {
        toast.success("Shop successfully created");
        navigate("/dashboard/vendor/shop-info");
      }
    }
  }

  const progressPercentage = (completedFields.length / 3) * 100;

  return (
    <TooltipProvider>
      <div className="space-y-8">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-gray-700">Setup Progress</span>
            <span className="text-primary font-medium">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-primary to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Form Fields */}
            <div className="space-y-6">
              {/* Shop Name Field */}
              <div className="group">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-2">
                          <Store className="w-5 h-5 text-primary" />
                          <FormLabel className="text-base font-semibold text-gray-900">
                            Shop Name
                          </FormLabel>
                          {completedFields.includes("name") && (
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              Choose a memorable name that represents your
                              brand. This will be visible to customers.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <FormControl>
                        <Input
                          disabled={isLoading || isUpdating}
                          type="text"
                          placeholder="e.g., Artisan Crafts Store"
                          className="mt-2 h-12 text-base border-2 border-gray-200  rounded-lg transition-colors"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Description Field */}
              <div className="group">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-5 h-5 text-primary" />
                          <FormLabel className="text-base font-semibold text-gray-900">
                            Description
                          </FormLabel>
                          {completedFields.includes("description") && (
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              Describe what makes your shop unique. This helps
                              customers understand what you offer.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <FormControl>
                        <Textarea
                          disabled={isLoading || isUpdating}
                          placeholder="Tell customers about your shop, what you sell, and what makes you special..."
                          className="mt-2 min-h-[100px] text-base border-2 border-gray-200  rounded-lg transition-colors resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Logo Field */}
              <div className="group">
                <FormField
                  control={form.control}
                  name="logo"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-2">
                          <Upload className="w-5 h-5 text-primary" />
                          <FormLabel className="text-base font-semibold text-gray-900">
                            Shop Logo
                          </FormLabel>
                          {completedFields.includes("logo") && (
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              Upload your shop logo. Recommended size:
                              200x200px. Supports JPG, PNG, and SVG formats.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <FormControl>
                        <div className="mt-2">
                          <LogoInput
                            value={field.value as string}
                            disabled={isLoading}
                            onChange={(url) => field.onChange(url)}
                            onRemove={() => field.onChange("")}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              <LoadingButton
                disabled={isFormUnchanged}
                loading={isLoading || isUpdating}
                type="submit"
                className="w-full "
              >
                {isLoading || isUpdating ? actionLoading : action}
              </LoadingButton>

              {!initialData && (
                <p className="text-center text-sm text-gray-500 mt-4">
                  You can always update these details later from your dashboard
                </p>
              )}
            </div>
          </form>
        </Form>
      </div>
    </TooltipProvider>
  );
}
