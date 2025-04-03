"use client";

import ProductCard from "@/features/product/components/product-card";
import { useGetProductsQuery } from "@/features/product/product-api";
import { ArrowRight, Bolt, Clock, Flame } from "lucide-react";
import { Link } from "react-router";
import CountdownTimer from "../countdown-timer";
import FlashSaleSkeleton from "../skeletons/flash-salse-skeleton";
import { Button } from "../ui/button";

export default function FlashSale() {
  const { data, isLoading, error } = useGetProductsQuery({
    limit: 4,
    include: "category,shop",
    sort: "-discount",
  });

  if (isLoading) return <FlashSaleSkeleton />;

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center max-w-md mx-auto p-6 bg-red-50 rounded-lg">
          <Flame className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-lg font-medium text-red-600 mb-2">
            Error fetching flash sale products
          </p>
          <p className="text-sm text-red-500 mb-4">
            Please try again later or check out our other deals
          </p>
          <Button asChild variant="outline">
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!data || data?.products?.length === 0) {
    return null;
  }

  const flashSaleEndTime = new Date(Date.now() + 24 * 60 * 60 * 1000);

  return (
    <section className="py-12 bg-gradient-to-r from-red-50 via-white to-red-50">
      <div className="container mx-auto px-4">
        <div className="relative mb-10">
          {/* Background decorative elements */}
          <div className="absolute -top-6 left-0 w-24 h-24 bg-red-500 opacity-5 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-8 right-0 w-32 h-32 bg-yellow-500 opacity-5 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-2xl shadow-lg border border-red-100">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 text-red-600 rounded-full mr-4">
                <Bolt className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Flash Sale</h2>
                <p className="text-gray-500">
                  Incredible deals at unbeatable prices
                </p>
              </div>
            </div>

            <div className="flex items-center bg-gray-100 px-6 py-3 rounded-xl border border-gray-100">
              <Clock className="h-5 w-5 text-red-500 mr-3" />
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 mb-1">Ends in:</span>
                <CountdownTimer endTime={flashSaleEndTime} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {data.products.map((product) => (
            <div key={product.id}>
              <div className="relative">
                <div className="absolute -top-3 -right-3 z-10">
                  <div className="flex items-center justify-center w-16 h-16 bg-red-600 text-white rounded-full transform rotate-12 shadow-lg">
                    <div className="transform -rotate-12 text-center">
                      <div className="text-xs font-bold">SAVE</div>
                      <div className="text-lg font-extrabold">
                        {product.discount}%
                      </div>
                    </div>
                  </div>
                </div>
                <ProductCard product={product} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Link to="/flash-sale" className="flex items-center px-8">
              View All Flash Sale Products
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
