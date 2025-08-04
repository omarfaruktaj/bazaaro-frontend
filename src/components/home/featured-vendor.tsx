"use client";

import { useGetShopsQuery } from "@/features/shop/shop-api";
import type { Review } from "@/types";
import {
  ArrowRight,
  Award,
  Building2,
  ShoppingBag,
  Star,
  Store,
  Verified,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import ShopSkeleton from "../skeletons/ShopCardSkeleton";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Ratings } from "../ui/rating";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

const calculateAverageRating = (reviews: Review[] = []) => {
  if (reviews?.length === 0) return 0;
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return (totalRating / reviews.length).toFixed(1);
};

export default function FeaturedVendors() {
  const [filter, setFilter] = useState("all");

  const { data, isLoading } = useGetShopsQuery({
    limit: 8,
    include: "product, review",
  });

  // if (isLoading) {
  //   return (
  //     <div className="container mx-auto px-4 py-12">
  //       <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
  //         Featured Shops
  //       </h2>
  //       <div className="flex justify-center items-center py-12">
  //         <Loading />
  //       </div>
  //     </div>
  //   );
  // }

  if (!data || !data?.shop?.length) return null;

  // Filter shops based on selected filter
  const filteredShops = data.shop.filter((shop) => {
    if (filter === "all") return true;
    if (filter === "top-rated")
      return Number(calculateAverageRating(shop.review)) >= 4.5;
    if (filter === "most-products") return shop.product?.length >= 10;
    return true;
  });

  // Sort shops by rating for "top-rated" filter
  if (filter === "top-rated") {
    filteredShops.sort((a, b) => {
      const ratingA = Number(calculateAverageRating(a.review));
      const ratingB = Number(calculateAverageRating(b.review));
      return ratingB - ratingA;
    });
  }

  if (filter === "most-products") {
    filteredShops.sort((a, b) => {
      return (b.product?.length || 0) - (a.product?.length || 0);
    });
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center mb-3">
            <Store className="h-5 w-5 text-primary mr-2" />
            <span className="text-sm font-medium uppercase tracking-wider text-primary">
              Trusted Partners
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Featured Shops
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover our curated selection of top-rated vendors offering quality
            products and exceptional service
          </p>

          <div className="mt-8">
            <Tabs defaultValue="all" value={filter} onValueChange={setFilter}>
              <TabsList className="bg-white border border-gray-200 p-1 rounded-full inline-flex">
                <TabsTrigger value="all" className="rounded-full">
                  All Shops
                </TabsTrigger>
                <TabsTrigger value="top-rated" className="rounded-full">
                  Top Rated
                </TabsTrigger>
                <TabsTrigger value="most-products" className="rounded-full">
                  Most Products
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {filteredShops.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-lg text-gray-600">
              No shops match the selected filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {isLoading && (
              <div className="container mx-auto px-4 py-12">
                {Array.from({ length: 10 }, (_, index) => (
                  <ShopSkeleton key={index} />
                ))}
              </div>
            )}
            {filteredShops.map((vendor) => {
              const averageRating = Number(
                calculateAverageRating(vendor?.review)
              );
              const isTopRated = averageRating >= 4.5;
              const hasVerifiedBadge = vendor.product?.length > 5 || isTopRated;

              return (
                <div key={vendor.id}>
                  <Link
                    to={`/shops/${vendor.id}`}
                    className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="relative h-32 bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center">
                      {
                        <Badge className="absolute top-2 left-2 bg-primary text-white">
                          <Award className="h-3 w-3 mr-1" /> Featured
                        </Badge>
                      }
                      {isTopRated && (
                        <Badge className="absolute top-2 right-2 bg-yellow-500 text-white">
                          <Star className="h-3 w-3 mr-1 fill-white" /> Top Rated
                        </Badge>
                      )}
                      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                        <div className="w-24 h-24 rounded-full border-4 border-white bg-white shadow-sm overflow-hidden">
                          <img
                            src={vendor.logo || "/images/default-logo.png"}
                            alt={`${vendor.name} logo`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-14 p-4 text-center">
                      <div className="flex items-center justify-center mb-1">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                          {vendor.name}
                        </h3>
                        {hasVerifiedBadge && (
                          <Verified className="h-4 w-4 text-blue-500 ml-1" />
                        )}
                      </div>

                      <div className="flex items-center justify-center mt-2">
                        <Ratings rating={averageRating} disabled size={16} />
                        <span className="text-sm text-gray-500 ml-2">
                          {averageRating} ({vendor?.review?.length || 0})
                        </span>
                      </div>

                      <div className="flex items-center justify-center gap-4 mt-3 text-sm text-gray-500">
                        <div className="flex items-center">
                          <ShoppingBag className="h-3 w-3 mr-1" />
                          <span>{vendor?.product?.length || 0} products</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <span className="text-sm font-medium text-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          View Shop <ArrowRight className="h-3 w-3 ml-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-12 text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="px-8 border-gray-300 hover:bg-gray-50"
          >
            <Link to="/shops" className="flex items-center">
              <Building2 className="mr-2 h-4 w-4" />
              Explore All Shops
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
