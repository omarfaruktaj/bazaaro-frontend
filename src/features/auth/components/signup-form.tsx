"use client";

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
import { useSignupMutation } from "../auth-api";
import { setToken, setUser } from "../auth-slice";
import { TSignUpSchema, signUpSchema, vendorSignUpSchema } from "../schemas";

export default function SignUpForm({ isVendor = false }) {
  const [signup, { isLoading }] = useSignupMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const form = useForm<TSignUpSchema>({
    resolver: zodResolver(isVendor ? vendorSignUpSchema : signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: TSignUpSchema) {
    try {
      const res = (await signup({
        ...values,
        ...(isVendor ? { role: "VENDOR" } : {}),
      })) as Response<{ accessToken: string; user: User }>;

      if (res.error) {
        toast.error(
          res.error?.data.message || "Signup failed. Please try again."
        );
      } else {
        toast.success(
          "You’ve successfully signed up. Please log in to continue."
        );
        dispatch(
          setToken({ accessToken: res.data?.data?.accessToken as string })
        );
        dispatch(setUser(res.data?.data.user as User));
        navigate("/login");
      }

      console.log(res.data?.data?.accessToken, res.data?.data.user);
    } catch (error) {
      toast.error("An unknown error occurred.");
      console.error("Signup failed:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {!isVendor && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

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
            </FormItem>
          )}
        />

        <LoadingButton loading={false} type="submit" className="w-full">
          {isLoading ? "Signing up..." : "Sign Up"}
        </LoadingButton>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?
          <Button variant={"link"} asChild className="pl-1">
            <Link to="/login">Log in here</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
