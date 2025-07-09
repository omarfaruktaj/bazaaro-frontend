"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { motion } from "framer-motion";
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
import type { Response } from "@/types/response";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useChangePasswordMutation } from "../auth-api";
import { logOut } from "../auth-slice";
import { type TChangePasswordSchema, changePasswordSchema } from "../schemas";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  Shield,
  Lock,
  Check,
  X,
  AlertTriangle,
  KeyRound,
  CheckCircle2,
} from "lucide-react";

export default function ChangePasswordForm() {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<TChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  const newPassword = form.watch("newPassword");

  // Password strength calculation
  const calculatePasswordStrength = (password: string) => {
    let score = 0;
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      numbers: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    Object.values(checks).forEach((check) => {
      if (check) score += 20;
    });

    return { score, checks };
  };

  const { score: passwordStrength, checks: passwordChecks } =
    calculatePasswordStrength(newPassword || "");

  const getStrengthText = (strength: number) => {
    if (strength < 40) return "Weak";
    if (strength < 60) return "Fair";
    if (strength < 80) return "Good";
    return "Strong";
  };

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
        setShowSuccess(true);
        setTimeout(() => {
          dispatch(logOut());
          navigate("/login");
          toast.success("Password changed successfully. Please login again.");
        }, 2000);
      }
    } catch (error) {
      toast.error("An unknown error occurred.");
      console.error("Password change failed:", error);
    }
  }

  if (showSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Password Changed Successfully!
        </h3>
        <p className="text-gray-600 mb-4">
          Your password has been updated. You'll be redirected to login shortly.
        </p>
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
          <span className="ml-2 text-sm text-gray-500">Redirecting...</span>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
            <KeyRound className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Change Password
            </h2>
            <p className="text-sm text-gray-600">
              Update your password to keep your account secure
            </p>
          </div>
        </div>

        <Alert className="border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            After changing your password, you'll be logged out and need to sign
            in again with your new password.
          </AlertDescription>
        </Alert>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border shadow-sm">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="flex items-center text-lg">
                <Lock className="h-5 w-5 mr-2 text-primary" />
                Password Update
              </CardTitle>
              <CardDescription>
                Enter your current password and choose a new secure password
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <Shield className="h-4 w-4 mr-2" />
                          Current Password
                        </FormLabel>
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
                        <FormLabel className="flex items-center">
                          <Lock className="h-4 w-4 mr-2" />
                          New Password
                        </FormLabel>
                        <FormControl>
                          <PasswordInput
                            placeholder="Enter your new password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />

                        {newPassword && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-3"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700">
                                Password Strength
                              </span>
                              <span
                                className={`text-sm font-medium ${
                                  passwordStrength < 40
                                    ? "text-red-600"
                                    : passwordStrength < 60
                                    ? "text-yellow-600"
                                    : passwordStrength < 80
                                    ? "text-blue-600"
                                    : "text-green-600"
                                }`}
                              >
                                {getStrengthText(passwordStrength)}
                              </span>
                            </div>
                            <Progress
                              value={passwordStrength}
                              className="h-2 mb-3"
                            />
                          </motion.div>
                        )}
                      </FormItem>
                    )}
                  />

                  <LoadingButton
                    loading={isLoading}
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                    disabled={passwordStrength < 60}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Changing Password...
                      </>
                    ) : (
                      <>
                        <KeyRound className="h-4 w-4 mr-2" />
                        Change Password
                      </>
                    )}
                  </LoadingButton>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Password Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    key: "length",
                    text: "At least 8 characters",
                    check: passwordChecks.length,
                  },
                  {
                    key: "uppercase",
                    text: "One uppercase letter",
                    check: passwordChecks.uppercase,
                  },
                  {
                    key: "lowercase",
                    text: "One lowercase letter",
                    check: passwordChecks.lowercase,
                  },
                  {
                    key: "numbers",
                    text: "One number",
                    check: passwordChecks.numbers,
                  },
                  {
                    key: "special",
                    text: "One special character",
                    check: passwordChecks.special,
                  },
                ].map((requirement) => (
                  <div key={requirement.key} className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
                        requirement.check ? "bg-green-100" : "bg-gray-100"
                      }`}
                    >
                      {requirement.check ? (
                        <Check className="h-3 w-3 text-green-600" />
                      ) : (
                        <X className="h-3 w-3 text-gray-400" />
                      )}
                    </div>
                    <span
                      className={`text-sm ${
                        requirement.check ? "text-green-700" : "text-gray-600"
                      }`}
                    >
                      {requirement.text}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-sm bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="text-lg">Security Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-blue-600 text-xs font-bold">1</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    Use a <strong>unique password</strong> that you don't use
                    elsewhere
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-blue-600 text-xs font-bold">2</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    Consider using a <strong>password manager</strong> for
                    better security
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-blue-600 text-xs font-bold">3</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    <strong>Never share</strong> your password with anyone
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
