import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";

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
import { ShopSchema, ShopSchemaType } from "../schemas";
import { useCreateShopMutation, useUpdateShopMutation } from "../shop-api";
import { default as LogoInput } from "./logo-input";

interface ShopFormProps {
  initialData?: ShopSchemaType & { id: string };
  onSuccess?: () => void;
}

export default function ShopForm({ initialData, onSuccess }: ShopFormProps) {
  const [create, { isLoading }] = useCreateShopMutation();
  const [update, { isLoading: isUpdating }] = useUpdateShopMutation();

  const action = initialData ? "Save changes" : "Complete Setup";
  const actionLoading = initialData ? "Saving changes.." : "setup in...";

  const navigate = useNavigate();

  const form = useForm<ShopSchemaType>({
    resolver: zodResolver(ShopSchema),
    defaultValues: initialData
      ? {
          ...initialData,
        }
      : {
          name: "",
          description: "",
          logo: "",
        },
  });

  const formValues = useWatch({
    control: form.control,
  });

  const isFormUnchanged =
    initialData &&
    formValues?.name === initialData.name &&
    formValues?.description === initialData.description &&
    formValues?.logo === initialData.logo;

  async function onSubmit(values: ShopSchemaType) {
    if (initialData) {
      const res = (await update({
        data: values,
        shopId: initialData.id,
      })) as Response<Category>;

      if (res.error) {
        toast.error(
          res.error?.data.message || "Shop updating failed. Please try again."
        );
      } else {
        if (onSuccess) {
          onSuccess();
        }
        toast.success("Shop successfully updated");
      }
    } else {
      const res = (await create({
        ...values,
      })) as Response<Category>;

      if (res.error) {
        toast.error(
          res.error?.data.message || "Shop creating failed. Please try again."
        );
      } else {
        toast.success("Shop successfully created");

        navigate("/dashboard/vendor/shop-info");
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
                  placeholder="Enter Shop name"
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
                  placeholder="Enter Shop description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo</FormLabel>
              <FormControl>
                <LogoInput
                  value={field.value as string}
                  disabled={isLoading}
                  onChange={(url) => field.onChange(url)}
                  onRemove={() => field.onChange("")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton
          disabled={isFormUnchanged}
          loading={isLoading}
          type="submit"
          className="w-full"
        >
          {isLoading || isUpdating ? actionLoading : action}
        </LoadingButton>
      </form>
    </Form>
  );
}
