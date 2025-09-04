"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Shield,
  ShoppingBag,
  User,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login process
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  const handleDemoLogin = (role: "customer" | "vendor" | "admin") => {
    const credentials = {
      customer: { email: "customer@gmail.com", password: "123456" },
      vendor: { email: "vendor@gmail.com", password: "123456" },
      admin: { email: "admin@gmail.com", password: "123456" },
    };

    setEmail(credentials[role].email);
    setPassword(credentials[role].password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-foreground">
          Email Address
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 h-12  "
            required
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label
            htmlFor="password"
            className="text-sm font-medium text-foreground"
          >
            Password
          </Label>
          <Link
            to="/forgot-password"
            className="text-xs text-primary hover:text-primary/80 transition-colors"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 pr-10 h-12 "
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Sign In Button */}
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-base shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              <span>Signing in...</span>
            </div>
          ) : (
            "Sign In"
          )}
        </Button>
      </motion.div>

      {/* Demo Accounts */}
      <div className="space-y-4">
        <div className="relative">
          <Separator className="bg-border/50" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground">
            or try demo accounts
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleDemoLogin("customer")}
              className="w-full h-auto py-3 flex flex-col items-center justify-center gap-1 border-muted-foreground/20"
            >
              <User className="h-5 w-5" />
              <span className="text-xs font-medium">Customer</span>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleDemoLogin("vendor")}
              className="w-full h-auto py-3 flex flex-col items-center justify-center gap-1 border-muted-foreground/20"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="text-xs font-medium">Vendor</span>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleDemoLogin("admin")}
              className="w-full h-auto py-3 flex flex-col items-center justify-center gap-1 border-muted-foreground/20"
            >
              <Shield className="h-5 w-5" />
              <span className="text-xs font-medium">Admin</span>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Sign Up Link */}
      <div className="text-center pt-4">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </form>
  );
}
