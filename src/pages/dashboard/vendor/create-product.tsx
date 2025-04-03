"use client";

import BackButton from "@/components/ui/back-button";
import { Card, CardContent } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import ProductForm from "@/features/product/components/product-form";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Box,
  CircleDollarSign,
  Layers,
  ShoppingBag,
} from "lucide-react";
import { Link } from "react-router";

export default function CreateProduct() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-6">
          <BackButton />
          <h1 className="text-2xl font-bold text-gray-900">Create Product</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-0 shadow-md rounded-xl overflow-hidden">
                <div className="bg-primary/5 px-6 py-4 border-b">
                  <Heading
                    title="Product Information"
                    description="Add details about your new product"
                    icon={<ShoppingBag className="h-5 w-5 text-primary mt-2" />}
                  />
                </div>
                <CardContent className="p-6">
                  <ProductForm />
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="border-0 shadow-md rounded-xl overflow-hidden">
                  <div className="bg-blue-50 px-6 py-4 border-b">
                    <h3 className="text-lg font-semibold text-blue-700 flex items-center">
                      <CircleDollarSign className="h-5 w-5 mr-2" />
                      Tips for Success
                    </h3>
                  </div>
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-blue-600 text-xs font-bold">
                            1
                          </span>
                        </div>
                        <p className="text-gray-600">
                          Use a <strong>clear, descriptive name</strong> that
                          includes key product features.
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-blue-600 text-xs font-bold">
                            2
                          </span>
                        </div>
                        <p className="text-gray-600">
                          Write a <strong>detailed description</strong>{" "}
                          highlighting benefits and specifications.
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-blue-600 text-xs font-bold">
                            3
                          </span>
                        </div>
                        <p className="text-gray-600">
                          Upload <strong>high-quality images</strong> from
                          multiple angles.
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-blue-600 text-xs font-bold">
                            4
                          </span>
                        </div>
                        <p className="text-gray-600">
                          Set a <strong>competitive price</strong> based on
                          market research.
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-blue-600 text-xs font-bold">
                            5
                          </span>
                        </div>
                        <p className="text-gray-600">
                          Choose the <strong>correct category</strong> to
                          improve discoverability.
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="border-0 shadow-md rounded-xl overflow-hidden">
                  <div className="bg-amber-50 px-6 py-4 border-b">
                    <h3 className="text-lg font-semibold text-amber-700 flex items-center">
                      <Layers className="h-5 w-5 mr-2" />
                      Need Help?
                    </h3>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-gray-600 mb-4">
                      Check out our resources for creating effective product
                      listings or contact our support team.
                    </p>
                    <div className="space-y-2">
                      <Link
                        to="/help/product-guide"
                        className="flex items-center text-primary hover:text-primary/80 font-medium"
                      >
                        <Box className="h-4 w-4 mr-2" />
                        Product Creation Guide
                      </Link>
                      <Link
                        to="/help/image-tips"
                        className="flex items-center text-primary hover:text-primary/80 font-medium"
                      >
                        <Box className="h-4 w-4 mr-2" />
                        Image Best Practices
                      </Link>
                      <Link
                        to="/help/pricing-strategy"
                        className="flex items-center text-primary hover:text-primary/80 font-medium"
                      >
                        <Box className="h-4 w-4 mr-2" />
                        Pricing Strategies
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/dashboard/vendor/products"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}
