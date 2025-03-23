"use client";

import ShopSkeleton from "@/components/skeletons/ShopCardSkeleton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Ratings } from "@/components/ui/rating";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetShopsQuery } from "@/features/shop/shop-api";
import { calculateAverageRating } from "@/utils/calculate-review";
import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  Building2,
  Search,
  ShoppingBag,
  Star,
  Store,
  Verified,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export default function ShopPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const { data, isLoading } = useGetShopsQuery({
    limit: 10,
    include: "product, review",
  });

  if (!data && !isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Building2 className="h-10 w-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No Shops Found
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't find any shops at the moment. Please check back later.
          </p>
          <Button asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Filter and sort shops
  const filteredShops =
    data?.shop?.filter((shop) => {
      // Filter by search term
      const matchesSearch =
        searchTerm === "" ||
        shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (shop.description &&
          shop.description.toLowerCase().includes(searchTerm.toLowerCase()));

      // Filter by category (this is a placeholder - you would need to implement actual category filtering)
      const matchesCategory = categoryFilter === "all" || true;

      return matchesSearch && matchesCategory;
    }) || [];

  // Sort shops
  const sortedShops = [...filteredShops].sort((a, b) => {
    if (sortBy === "popular") {
      return (b.review?.length || 0) - (a.review?.length || 0);
    } else if (sortBy === "rating") {
      return (
        Number(calculateAverageRating(b.review)) -
        Number(calculateAverageRating(a.review))
      );
    } else if (sortBy === "products") {
      return (b.product?.length || 0) - (a.product?.length || 0);
    } else if (sortBy === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortBy === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    return 0;
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center mb-3">
            <Store className="h-5 w-5 text-primary mr-2" />
            <span className="text-sm font-medium uppercase tracking-wider text-primary">
              Discover
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Browse Our Partner Shops
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Explore our curated collection of trusted vendors offering quality
            products and exceptional service
          </p>

          <div className="relative max-w-xl mx-auto mb-8">
            <Search className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search shops by name..."
              className="pl-10 pr-4 py-6 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Tabs
              defaultValue="all"
              value={categoryFilter}
              onValueChange={setCategoryFilter}
            >
              <TabsList className="bg-white border border-gray-200 p-1 rounded-full">
                <TabsTrigger value="all" className="rounded-full">
                  All Shops
                </TabsTrigger>
                <TabsTrigger value="fashion" className="rounded-full">
                  Fashion
                </TabsTrigger>
                <TabsTrigger value="electronics" className="rounded-full">
                  Electronics
                </TabsTrigger>
                <TabsTrigger value="home" className="rounded-full">
                  Home & Garden
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="w-full sm:w-48">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="products">Most Products</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {isLoading ? (
          <ShopSkeleton />
        ) : sortedShops.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No shops match your search
            </h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button variant="outline" onClick={() => setSearchTerm("")}>
              Clear Search
            </Button>
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {sortedShops.map((shop) => {
              const averageRating = Number(
                calculateAverageRating(shop?.review)
              );
              const isTopRated = averageRating >= 4.5;
              const hasVerifiedBadge = shop.product?.length > 5 || isTopRated;

              return (
                <motion.div key={shop.id} variants={item}>
                  <Card className="overflow-hidden hover:shadow-md transition-all duration-300 h-full">
                    <Link to={`/shops/${shop.id}`} className="block h-full">
                      <div className="relative h-32 bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center">
                        {isTopRated && (
                          <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                            <Star className="h-3 w-3 mr-1 fill-white" />
                            {averageRating}
                          </div>
                        )}
                        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                          <div className="w-24 h-24 rounded-full border-4 border-white bg-white shadow-sm overflow-hidden">
                            <img
                              src={shop.logo || "/images/default-logo.png"}
                              alt={`${shop.name} logo`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="pt-14 p-4">
                        <div className="flex items-center justify-center mb-1">
                          <h3 className="text-lg font-semibold text-gray-900 text-center hover:text-primary transition-colors truncate max-w-[90%]">
                            {shop.name}
                          </h3>
                          {hasVerifiedBadge && (
                            <Verified className="h-4 w-4 text-blue-500 ml-1 flex-shrink-0" />
                          )}
                        </div>

                        <div className="flex items-center justify-center mt-2">
                          <Ratings rating={averageRating} disabled size={16} />
                          <span className="text-sm text-gray-500 ml-2">
                            ({shop?.review?.length || 0})
                          </span>
                        </div>

                        <div className="flex items-center justify-center gap-4 mt-3 text-sm text-gray-500">
                          <div className="flex items-center">
                            <ShoppingBag className="h-3 w-3 mr-1" />
                            <span>{shop?.product?.length || 0} products</span>
                          </div>
                        </div>

                        <div className="text-xs text-gray-400 mt-3 text-center">
                          Joined {format(new Date(shop.createdAt), "MMM yyyy")}
                        </div>
                      </div>
                    </Link>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {!isLoading && sortedShops.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Showing {sortedShops.length} of {data?.shop?.length || 0} shops
            </p>
            <Button variant="outline">Load More Shops</Button>
          </div>
        )}
      </div>
    </div>
  );
}
