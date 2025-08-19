"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
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
import { useAppDispatch } from "@/redux/hooks";
import type { User as UserType } from "@/types";
import type { Response } from "@/types/response";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { useSignupMutation } from "../auth-api";
import { setToken, setUser } from "../auth-slice";
import {
  type TSignUpSchema,
  signUpSchema,
  vendorSignUpSchema,
} from "../schemas";

interface SignUpFormProps {
  isVendor?: boolean;
}

export default function SignUpForm({ isVendor = false }: SignUpFormProps) {
  const [signup, { isLoading }] = useSignupMutation();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const redirectPath = new URLSearchParams(location.search).get("redirect");
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
      })) as Response<{ accessToken: string; user: UserType }>;

      if (res.error) {
        toast.error(
          res.error?.data.message || "Signup failed. Please try again."
        );
      } else {
        toast.success("You've successfully signed up!");
        dispatch(
          setToken({ accessToken: res.data?.data?.accessToken as string })
        );
        dispatch(setUser(res.data?.data.user as UserType));

        if (res.data?.data.user.role === "VENDOR") {
          navigate("/dashboard/vendor/setup");
        } else if (redirectPath) {
          navigate(redirectPath);
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      toast.error("An unknown error occurred.");
      console.error("Signup failed:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                {isVendor ? "Business Name" : "Full Name"}
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder={
                      isVendor
                        ? "Enter your business name"
                        : "Enter your full name"
                    }
                    className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-white/50 "
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                Email Address
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-white/50 "
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                Password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className="pl-10 pr-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-white/50 "
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
              <p className="text-xs text-gray-500 mt-1">
                Password must be at least 6 characters long
              </p>
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <LoadingButton
          loading={isLoading}
          type="submit"
          className="w-full h-12  font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
        >
          {isLoading ? (
            <span className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Creating Account...</span>
            </span>
          ) : (
            `Create ${isVendor ? "Vendor" : ""} Account`
          )}
        </LoadingButton>

        {/* Login Link */}
        <div className="text-center text-sm text-gray-500 border-t pt-6">
          Already have an account?{" "}
          <Button
            variant="link"
            asChild
            className="p-0 h-auto font-medium text-blue-600 hover:text-blue-700"
          >
            <Link to="/login">Sign in here</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
