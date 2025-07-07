"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  ArrowRight,
} from "lucide-react";
import { useState, useEffect } from "react";
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
import { Link, useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import { useResetPasswordMutation } from "../auth-api";
import { resetPasswordSchema, type TResetPasswordSchema } from "../schemas";

interface PasswordRequirement {
  label: string;
  test: (password: string) => boolean;
}

const passwordRequirements: PasswordRequirement[] = [
  { label: "At least 8 characters", test: (pwd) => pwd.length >= 8 },
  { label: "Contains uppercase letter", test: (pwd) => /[A-Z]/.test(pwd) },
  { label: "Contains lowercase letter", test: (pwd) => /[a-z]/.test(pwd) },
  { label: "Contains a number", test: (pwd) => /\d/.test(pwd) },
];

export default function ResetPasswordForm() {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const form = useForm<TResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = form.watch("password");
  const confirmPassword = form.watch("confirmPassword");

  useEffect(() => {
    const strength = passwordRequirements.reduce((acc, req) => {
      return acc + (req.test(password) ? 1 : 0);
    }, 0);
    setPasswordStrength(strength);
  }, [password]);

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
        toast.success("Password reset successfully!");
        navigate("/login");
      }
    } catch (error) {
      toast.error("An unknown error occurred.");
      console.error("Password reset failed:", error);
    }
  }

  const getStrengthColor = (strength: number) => {
    if (strength <= 1) return "bg-red-500";
    if (strength <= 2) return "bg-yellow-500";
    if (strength <= 3) return "bg-blue-500";
    return "bg-green-500";
  };

  const getStrengthText = (strength: number) => {
    if (strength <= 1) return "Weak";
    if (strength <= 2) return "Fair";
    if (strength <= 3) return "Good";
    return "Strong";
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-sm font-medium text-gray-700 flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                New Password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your new password"
                    className="pr-12 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </FormControl>

              {/* Password Strength Indicator */}
              {password && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Password strength:
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        passwordStrength <= 1
                          ? "text-red-600"
                          : passwordStrength <= 2
                          ? "text-yellow-600"
                          : passwordStrength <= 3
                          ? "text-blue-600"
                          : "text-green-600"
                      }`}
                    >
                      {getStrengthText(passwordStrength)}
                    </span>
                  </div>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-2 flex-1 rounded-full transition-colors ${
                          level <= passwordStrength
                            ? getStrengthColor(passwordStrength)
                            : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Password Requirements */}
                  <div className="grid grid-cols-1 gap-2">
                    {passwordRequirements.map((req, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        {req.test(password) ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-gray-300" />
                        )}
                        <span
                          className={`text-sm ${
                            req.test(password)
                              ? "text-green-600"
                              : "text-gray-500"
                          }`}
                        >
                          {req.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-sm font-medium text-gray-700 flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                Confirm New Password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your new password"
                    className="pr-12 h-12 "
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </FormControl>

              {/* Password Match Indicator */}
              {confirmPassword && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2"
                >
                  {password === confirmPassword ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-600">
                        Passwords match
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-600">
                        Passwords don't match
                      </span>
                    </>
                  )}
                </motion.div>
              )}

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4 pt-4">
          <LoadingButton
            loading={isLoading}
            type="submit"
            className="w-full h-12 font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            disabled={passwordStrength < 4 || password !== confirmPassword}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Resetting Password...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>Reset Password</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            )}
          </LoadingButton>

          <div className="text-center">
            <span className="text-sm text-gray-600">
              Remembered your password?{" "}
            </span>
            <Button variant="link" asChild className="p-0 h-auto font-medium">
              <Link to="/login" className="text-blue-600 hover:text-blue-700">
                Sign in here
              </Link>
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
