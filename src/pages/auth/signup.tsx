"use client";

import BackButton from "@/components/ui/back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignUpForm from "@/features/auth/components/signup-form";
import { motion } from "framer-motion";
import {
  Shield,
  ShoppingBag,
  Star,
  Store,
  TrendingUp,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router";

export default function SignUp() {
  const navigate = useNavigate();

  const customerBenefits = [
    {
      icon: ShoppingBag,
      title: "Quality Products",
      description: "Curated selection from trusted vendors worldwide",
    },
    {
      icon: Shield,
      title: "Secure Shopping",
      description: "Your data and payments are always protected",
    },
    {
      icon: Star,
      title: "Best Deals",
      description: "Exclusive discounts and flash sales daily",
    },
  ];

  const vendorBenefits = [
    {
      icon: Users,
      title: "Large Customer Base",
      description: "Connect with thousands of active shoppers",
    },
    {
      icon: TrendingUp,
      title: "Grow Your Business",
      description: "Advanced analytics and marketing tools",
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Enterprise-grade security for your business",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <BackButton onClick={() => navigate("/")} />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Left Panel - Brand & Dynamic Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block space-y-8 sticky top-8"
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10  rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <span className="text-3xl bg-clip-text text-transparent">
                  ShopEase
                </span>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                Join Our Growing Community
              </h1>

              <p className="text-xl text-gray-600">
                Choose your journey - shop amazing products or start selling
                today
              </p>
            </div>

            {/* Dynamic Benefits Section */}
            <Tabs defaultValue="customer" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/50 backdrop-blur-sm border border-gray-200">
                <TabsTrigger
                  value="customer"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary data-[state=active]:text-white"
                >
                  Customer Benefits
                </TabsTrigger>
                <TabsTrigger
                  value="vendor"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary data-[state=active]:text-white"
                >
                  Vendor Benefits
                </TabsTrigger>
              </TabsList>

              <TabsContent value="customer" className="mt-6 space-y-6">
                {customerBenefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </TabsContent>

              <TabsContent value="vendor" className="mt-6 space-y-6">
                {vendorBenefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </TabsContent>
            </Tabs>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">1K+</div>
                <div className="text-sm text-gray-600">Active Vendors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">100K+</div>
                <div className="text-sm text-gray-600">Products</div>
              </div>
            </div>
          </motion.div>

          {/* Right Panel - Signup Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-md mx-auto lg:mx-0"
          >
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ShopEase
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Create Your Account
              </h2>
              <p className="text-gray-600 mt-2">Join our community today</p>
            </div>

            <Tabs defaultValue="customer" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/80 backdrop-blur-sm border border-gray-200 h-12">
                <TabsTrigger
                  value="customer"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary data-[state=active]:text-white font-medium transition-all duration-200"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Customer
                </TabsTrigger>
                <TabsTrigger
                  value="vendor"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary data-[state=active]:text-white font-medium transition-all duration-200"
                >
                  <Store className="w-4 h-4 mr-2" />
                  Vendor
                </TabsTrigger>
              </TabsList>

              <TabsContent value="customer">
                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="space-y-2 pb-6">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                        <ShoppingBag className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-blue-600">
                        Customer Account
                      </span>
                    </div>
                    <CardTitle className="text-2xl font-bold text-center text-gray-900">
                      Start Shopping Today
                    </CardTitle>
                    <p className="text-center text-gray-600">
                      Discover amazing products from trusted vendors
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <SignUpForm />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="vendor">
                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="space-y-2 pb-6">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                        <Store className="w-4 h-4 text-purple-600" />
                      </div>
                      <span className="text-sm font-medium text-purple-600">
                        Vendor Account
                      </span>
                    </div>
                    <CardTitle className="text-2xl font-bold text-center text-gray-900">
                      Start Selling Today
                    </CardTitle>
                    <p className="text-center text-gray-600">
                      Join thousands of successful vendors on our platform
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <SignUpForm isVendor />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
