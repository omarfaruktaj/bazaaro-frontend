"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
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
import type { Response } from "@/types/response";
import { Link } from "react-router";
import { toast } from "sonner";
import { useForgotPasswordMutation } from "../auth-api";
import { forgotPasswordSchema, type TForgotPasswordSchema } from "../schemas";

export default function ForgotPasswordForm() {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [emailSent, setEmailSent] = useState(false);

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
        toast.success("Email sent! Please check your inbox.");
        setEmailSent(true);
      }
    } catch (error) {
      toast.error("An unknown error occurred.");
      console.error("Email send failed:", error);
    }
  }

  if (emailSent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900">Email Sent!</h3>
          <p className="text-gray-600">
            We've sent a password reset link to{" "}
            <span className="font-medium text-gray-900">
              {form.getValues("email")}
            </span>
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-left">
              <p className="text-sm font-medium text-blue-900">
                Didn't receive the email?
              </p>
              <ul className="text-xs text-blue-700 mt-1 space-y-1">
                <li>• Check your spam/junk folder</li>
                <li>• Make sure the email address is correct</li>
                <li>• The link expires in 15 minutes</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            onClick={() => setEmailSent(false)}
            variant="outline"
            className="w-full"
          >
            Try Different Email
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Remembered your password?{" "}
            <Button variant="link" asChild className="p-0 h-auto">
              <Link to="/login">Log in here</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    className="pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 transition-all duration-200"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <LoadingButton
            loading={isLoading}
            type="submit"
            className="w-full h-12 font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <span className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Sending Reset Link...</span>
              </span>
            ) : (
              <span className="flex items-center justify-center space-x-2">
                <span>Send Reset Link</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </LoadingButton>

          <div className="text-center text-sm text-muted-foreground">
            Remembered your password?{" "}
            <Button variant="link" asChild className="p-0 h-auto font-medium">
              <Link to="/login">Log in here</Link>
            </Button>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-700">
                Security Notice
              </p>
              <p className="text-xs text-gray-600 mt-1">
                For your security, the reset link will expire in 15 minutes. If
                you don't receive the email, please check your spam folder.
              </p>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
