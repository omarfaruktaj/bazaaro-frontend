"use client";

import CountdownTimer from "@/components/countdown-timer";
import FlashSaleSkeleton from "@/components/skeletons/flash-salse-skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ProductCard from "@/features/product/components/product-card";
import { useGetProductsQuery } from "@/features/product/product-api";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  Bolt,
  Clock,
  Flame,
  Sparkles,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export default function FlashSale() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const { data, isLoading, error } = useGetProductsQuery({
    limit: 12,
    include: "category,shop",
    sort: "-discount",
  });

  if (isLoading) return <FlashSaleSkeleton />;

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-red-50 rounded-xl p-8 text-center shadow-sm">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-red-800 mb-2">
            Unable to Load Flash Sale
          </h3>
          <p className="text-red-600 mb-6">
            We're having trouble fetching the flash sale products. Please try
            again later.
          </p>
          <Button variant="outline" asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!data || data?.products?.length === 0) {
    return null;
  }

  const products = data?.products?.slice(0, 14);

  // Extract unique categories for filtering
  const categories = [
    "all",
    ...new Set(products.map((product) => product.category?.name || "Other")),
  ];

  // Filter products by selected category
  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.category?.name === activeCategory);

  const flashSaleEndTime = new Date(Date.now() + 24 * 60 * 60 * 1000);

  return (
    <section className="py-12 bg-gradient-to-b from-red-50 via-white to-red-50 mt-36">
      <div className="container mx-auto px-4">
        {/* Header with animated background */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 p-8 mb-10 shadow-lg">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
            <div className="absolute top-0 left-1/4 w-20 h-20 bg-white rounded-full blur-xl"></div>
            <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-yellow-300 rounded-full blur-xl"></div>
            <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-red-300 rounded-full blur-lg"></div>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-2">
                <Bolt className="h-6 w-6 text-yellow-300 mr-2" />
                <h4 className="text-sm font-bold uppercase tracking-wider text-yellow-300">
                  Limited Time Offer
                </h4>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2 flex items-center gap-2">
                <Zap className="h-8 w-8 text-yellow-300" />
                Flash Sale
                <Zap className="h-8 w-8 text-yellow-300" />
              </h2>
              <p className="text-white/80 max-w-md">
                Incredible deals at unbeatable prices. Hurry before they're
                gone!
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center mb-2">
                <Clock className="h-5 w-5 text-yellow-300 mr-2" />
                <span className="text-white font-medium">Sale Ends In:</span>
              </div>
              <CountdownTimer endTime={flashSaleEndTime} />
            </div>
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              className={`px-4 py-2 text-sm cursor-pointer capitalize ${
                activeCategory === category
                  ? "bg-primary hover:bg-primary/90"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category === "all" ? "All Products" : category}
            </Badge>
          ))}
        </div>

        {/* Products grid with animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="relative"
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* No products message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <Flame className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No products in this category
            </h3>
            <p className="text-gray-500 mb-4">
              Try selecting a different category or check back later
            </p>
            <Button variant="outline" onClick={() => setActiveCategory("all")}>
              View All Products
            </Button>
          </div>
        )}

        {/* CTA section */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center mb-4">
            <Sparkles className="h-5 w-5 text-amber-500 mr-2" />
            <span className="text-sm font-medium uppercase tracking-wider text-amber-600">
              Don't Miss Out
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Explore More Flash Sale Deals
          </h3>
          <Button
            size="lg"
            className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white shadow-md hover:shadow-lg transition-all duration-300"
            asChild
          >
            <Link
              to="/products?sort=-discount"
              className="flex items-center px-8"
            >
              Browse All Deals
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
