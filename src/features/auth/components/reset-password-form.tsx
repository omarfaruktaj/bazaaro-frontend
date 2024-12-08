import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
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
import { Response } from "@/types/response";
import { Link, useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import { useResetPasswordMutation } from "../auth-api";
import { resetPasswordSchema, TResetPasswordSchema } from "../schemas";

export default function ResetPasswordForm() {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const form = useForm<TResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  if (!searchParams.get("token")) {
    navigate("/login");
  }

  async function onSubmit(values: TResetPasswordSchema) {
    try {
      const res = (await resetPassword({
        data: values,
        token: searchParams.get("token")!,
      })) as Response<null>;

      if (res.error) {
        toast.error(
          res.error?.data.message || "Password reset failed. Please try again."
        );
      } else {
        toast.success("Password reset successfully ");
        navigate("/login");
      }
    } catch (error) {
      toast.error("An unknown error occurred.");
      console.error("Password reset failed:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Enter new password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Confirm your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton loading={isLoading} type="submit" className="w-full">
          {isLoading ? "Resetting password..." : "Reset Password"}
        </LoadingButton>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Remembered your password?
          <Button variant={"link"} asChild className="pl-1">
            <Link to="/login"> Log in</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
