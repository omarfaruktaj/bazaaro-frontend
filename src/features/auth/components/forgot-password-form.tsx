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
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import { Response } from "@/types/response";
import { Link } from "react-router";
import { toast } from "sonner";
import { useForgotPasswordMutation } from "../auth-api";
import { forgotPasswordSchema, TForgotPasswordSchema } from "../schemas";

export default function ForgotPasswordForm() {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const form = useForm<TForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: TForgotPasswordSchema) {
    try {
      const res = (await forgotPassword({
        ...values,
      })) as Response<null>;

      if (res.error) {
        toast.error(
          res.error?.data.message || "Email send failed. Please try again."
        );
      } else {
        toast.success("Email sent! please check you inbox. ");
      }
    } catch (error) {
      toast.error("An unknown error occurred.");
      console.error("Email send failed:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton loading={isLoading} type="submit" className="w-full">
          {isLoading ? "Reset link sending..." : "Send link in email"}
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
