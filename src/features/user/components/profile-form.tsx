"use client";

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
import LogoInput from "@/features/shop/components/logo-input";
import { Profile } from "@/types";
import { Response } from "@/types/response";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { ProfileSchema, ProfileSchemaType } from "../schemas";
import { useUpdateProfileMutation } from "../user-api";

interface ProfileFormProps {
  initialData: ProfileSchemaType;
  onSuccess?: () => void;
}

export default function ProfileForm({
  initialData,
  onSuccess,
}: ProfileFormProps) {
  const [update, { isLoading }] = useUpdateProfileMutation();

  const action = "Save changes";
  const actionLoading = "Saving changes...";

  const form = useForm<ProfileSchemaType>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      ...initialData,
    },
  });

  const formValues = useWatch({
    control: form.control,
  });

  const isFormUnchanged =
    formValues?.name === initialData.name &&
    formValues?.address === initialData.address &&
    formValues?.phone === initialData.phone &&
    formValues?.bio === initialData.bio &&
    formValues?.avatar === initialData.avatar;

  async function onSubmit(values: ProfileSchemaType) {
    const res = (await update(values)) as Response<Profile>;

    if (res.error) {
      toast.error(
        res.error?.data.message || "Profile updating failed. Please try again."
      );
    } else {
      if (onSuccess) {
        onSuccess();
      }
      toast.success("Profile successfully updated");
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
                  disabled={isLoading}
                  type="text"
                  placeholder="Enter your name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  type="text"
                  placeholder="Enter your address"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  type="text"
                  placeholder="Enter your phone number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isLoading}
                  placeholder="Tell us about yourself"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
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
          {isLoading ? actionLoading : action}
        </LoadingButton>
      </form>
    </Form>
  );
}
