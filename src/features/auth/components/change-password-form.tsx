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
import LoadingButton from "@/components/ui/loading-button";
import { PasswordInput } from "@/components/ui/password-input";
import { useAppDispatch } from "@/redux/hooks";
import { Response } from "@/types/response";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useChangePasswordMutation } from "../auth-api";
import { logOut } from "../auth-slice";
import { TChangePasswordSchema, changePasswordSchema } from "../schemas";

export default function ChangePasswordForm() {
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const form = useForm<TChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  async function onSubmit(values: TChangePasswordSchema) {
    try {
      const res = (await changePassword({
        ...values,
      })) as Response<null>;

      if (res.error) {
        toast.error(
          res.error?.data.message || "Change password failed. Please try again."
        );
      } else if (res.data) {
        dispatch(logOut());
        navigate("/login");
        toast.success(
          "You’ve successfully change password. Please Login again"
        );
      }
    } catch (error) {
      toast.error("An unknown error occurred.");
      console.error("Login failed:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Enter your current password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Enter your new password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton loading={isLoading} type="submit" className="w-full">
          {isLoading ? "Changing Password..." : "Change Password"}
        </LoadingButton>
      </form>
    </Form>
  );
}
