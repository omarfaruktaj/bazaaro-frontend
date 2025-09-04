"use client";

import { Button } from "@/components/ui/button";
import LoginForm from "@/features/auth/components/login-form";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, ShoppingBag, Star, Zap } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      {/* Back Button */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute left-4 top-4 sm:left-8 sm:top-8 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Button>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left side - Brand section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex flex-col justify-center space-y-8 px-8"
        >
          {/* Logo and Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                <ShoppingBag className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Bazaro</h1>
                <p className="text-muted-foreground">
                  Your shopping destination
                </p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">
              Why choose Bazaro?
            </h2>
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex items-start space-x-4"
              >
                <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Star className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">
                    Premium Quality
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Curated products from trusted brands worldwide
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex items-start space-x-4"
              >
                <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Fast Delivery</h3>
                  <p className="text-sm text-muted-foreground">
                    Lightning-fast shipping to your doorstep
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex items-start space-x-4"
              >
                <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">
                    Secure Shopping
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Your data and payments are always protected
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50"
          >
            <div className="flex items-center space-x-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground italic mb-3">
              "Bazaro has completely transformed my shopping experience. The
              quality and service are unmatched!"
            </p>
            <p className="text-xs font-medium text-foreground">
              — Sarah Johnson, Verified Customer
            </p>
          </motion.div>
        </motion.div>

        {/* Right side - Login form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center"
        >
          <div className="w-full max-w-md">
            <div className="bg-card/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-border/50 p-8 lg:p-10">
              {/* Mobile logo */}
              <div className="lg:hidden flex items-center justify-center mb-8">
                <div className="h-12 w-12 bg-primary rounded-xl flex items-center justify-center shadow-lg mr-3">
                  <ShoppingBag className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Bazaro</h1>
                </div>
              </div>

              {/* Welcome text */}
              <div className="text-center mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                  Welcome Back!
                </h2>
                <p className="text-muted-foreground">
                  Sign in to continue your shopping journey
                </p>
              </div>

              <LoginForm />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
