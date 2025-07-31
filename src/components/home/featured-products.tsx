"use client";

import ProductCard from "@/features/product/components/product-card";
import { useGetProductsQuery } from "@/features/product/product-api";
import { AlertCircle, ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState("all");

  const { data, isLoading, error } = useGetProductsQuery({
    limit: 8,
    include: "category,shop",
  });

  if (error) {
    return (
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-red-50 rounded-lg p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-red-800 mb-2">
            Unable to Load Products
          </h3>
          <p className="text-red-600 mb-4">
            We're having trouble fetching the featured products. Please try
            again later.
          </p>
          <Button variant="outline" asChild>
            <Link to="/products">Browse All Products</Link>
          </Button>
        </div>
      </section>
    );
  }

  if (!data || data?.products?.length === 0) {
    return null;
  }

  // Group products by category for tabs
  const categories = [
    ...new Set(
      data.products.map((product) => product.category?.name || "Other")
    ),
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center mb-2">
              <Sparkles className="h-5 w-5 text-yellow-500 mr-2" />
              <h4 className="text-sm font-medium uppercase tracking-wider text-primary">
                Handpicked For You
              </h4>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Products
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              Discover our collection of premium products selected for their
              exceptional quality, popularity, and value.
            </p>
          </div>

          <Link
            to="/products"
            className="text-primary hover:text-primary/80 font-medium flex items-center group"
          >
            View all products
            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {categories.length > 1 && (
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
            className="mb-8"
          >
            <TabsList className="bg-white border border-gray-200 p-1 rounded-full">
              <TabsTrigger value="all" className="rounded-full">
                All Products
              </TabsTrigger>
              {categories.slice(0, 4).map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="rounded-full"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm p-4 h-80"
              >
                <div className="animate-pulse">
                  <div className="bg-gray-200 h-40 rounded-md mb-4"></div>
                  <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
                  <div className="bg-gray-200 h-4 rounded w-1/2 mb-4"></div>
                  <div className="bg-gray-200 h-6 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-2">
            {data.products
              .filter(
                (product) =>
                  activeTab === "all" || product.category?.name === activeTab
              )
              .map((product) => (
                <div key={product.id} className="h-full">
                  <ProductCard product={product} />
                </div>
              ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Button
            asChild
            size="lg"
            className="px-8 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Link to="/products" className="flex items-center">
              Explore All Products
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
