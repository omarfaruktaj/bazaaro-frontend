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
import { PasswordInput } from "@/components/ui/password-input";
import { useAppDispatch } from "@/redux/hooks";
import { User } from "@/types";
import { Response } from "@/types/response";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { useLoginMutation } from "../auth-api";
import { setToken, setUser } from "../auth-slice";
import { TLoginSchema, loginSchema } from "../schemas";

export default function LoginForm() {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const form = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: TLoginSchema) {
    try {
      const res = (await login({
        ...values,
      })) as Response<{ accessToken: string; user: User }>;

      if (res.error) {
        toast.error(
          res.error?.data.message || "Signup failed. Please try again."
        );
      } else {
        toast.success("You’ve successfully Login. ");
        dispatch(
          setToken({ accessToken: res.data?.data?.accessToken as string })
        );
        dispatch(setUser(res.data?.data.user as User));
        navigate("/login");
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

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
              <Link
                to="/forgot-password"
                className="ml-auto inline-block pt-2 text-sm underline"
              >
                Forgot your password?
              </Link>
            </FormItem>
          )}
        />

        <LoadingButton loading={false} type="submit" className="w-full">
          {isLoading ? "Logging in..." : "Login"}
        </LoadingButton>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Don’t have an account?{" "}
          <Button variant={"link"} asChild className="pl-1">
            <Link to="/signup"> Sign up here</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
