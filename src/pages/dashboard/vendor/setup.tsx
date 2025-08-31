"use client";

import BackButton from "@/components/ui/back-button";
import { Heading } from "@/components/ui/heading";
import Loading from "@/components/ui/loading";
import ShopForm from "@/features/shop/components/shop-form";
import { useGetMyShopsQuery } from "@/features/shop/shop-api";
import { CheckCircle, Palette, Store } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Setup() {
  const { data, isLoading } = useGetMyShopsQuery(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      navigate("/dashboard/vendor/shop-info");
    }
  }, [data, navigate]);

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <BackButton onClick={() => navigate("/")} />

        {/* Progress Steps */}
        <div className="mt-8 mb-12">
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-primary">
                Account Created
              </span>
            </div>
            <div className="w-16 h-0.5 bg-primary"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Store className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-primary">
                Shop Setup
              </span>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <Palette className="w-5 h-5 text-gray-500" />
              </div>
              <span className="text-sm font-medium text-gray-500">
                Customize
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header Section */}
          <div className=" px-8 py-12 ">
            <div className="">
              <div className="w-16 h-16 bg-white/20 rounded-full ">
                <Store className="w-8 h-8 " />
              </div>
              <Heading
                title="Set Up Your Shop"
                description="Let's create your digital storefront. This will only take a few minutes."
              />
            </div>
          </div>

          <div className="p-8">
            <ShopForm />
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            Need help? Check out our{" "}
            <a
              href="#"
              className="text-primary hover:text-blue-700 font-medium"
            >
              setup guide
            </a>{" "}
            or{" "}
            <a
              href="#"
              className="text-primary hover:text-blue-700 font-medium"
            >
              contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
