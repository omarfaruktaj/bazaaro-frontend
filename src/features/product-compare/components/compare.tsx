"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/redux/hooks";
import type { Product } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  X,
  Package,
  ShoppingCart,
  Eye,
  TrendingUp,
  Zap,
  Shield,
  BarChart3,
  Trash2,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { clearCompare, removeFromCompare } from "../product-compare-slice";
import { Ratings } from "@/components/ui/rating";

export default function Compare() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const compareList = useAppSelector(
    (state) => state.productComparison.products
  );

  const handleRemoveFromCompare = (product: Product) => {
    dispatch(removeFromCompare(product.id));
  };

  const handleClearComparison = () => {
    dispatch(clearCompare());
  };

  const handleGoBack = () => {
    navigate("/products");
  };

  const calculateDiscountedPrice = (price: number, discount?: number) => {
    if (!discount) return price;
    return price - (price * discount) / 100;
  };

  const getComparisonStats = () => {
    if (compareList.length === 0) return null;

    const prices = compareList.map((p) =>
      calculateDiscountedPrice(p.price, p.discount)
    );
    const categories = new Set(compareList.map((p) => p.category.name));

    return {
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
      avgPrice: prices.reduce((a, b) => a + b, 0) / prices.length,
      categoriesCount: categories.size,
      totalReviews: compareList.reduce(
        (sum, p) => sum + (p.review?.length || 0),
        0
      ),
    };
  };

  const stats = getComparisonStats();

  if (compareList.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 flex items-center justify-center min-h-[70vh]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
              <TrendingUp className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              No Products to Compare
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Add products to your comparison list to see detailed side-by-side
              comparisons and make informed purchasing decisions.
            </p>
            <div className="space-y-4">
              <Button size="lg" onClick={handleGoBack} className="w-full ">
                <Plus className="mr-2 h-5 w-5" />
                Browse Products
              </Button>
              <p className="text-sm text-gray-500">
                Find products you love and add them to compare features, prices,
                and reviews
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Product Comparison
                  </h1>
                  <p className="text-gray-600">
                    Comparing {compareList.length} product
                    {compareList.length > 1 ? "s" : ""} • Make the best choice
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearComparison}
                className="hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors duration-200 bg-transparent"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleGoBack}
                className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors duration-200 bg-transparent"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
              </Button>
            </div>
          </div>

          {/* Comparison Stats */}
          {stats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    ${stats.minPrice.toFixed(2)} - ${stats.maxPrice.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600">Price Range</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    ${stats.avgPrice.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600">Average Price</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {stats.categoriesCount}
                  </div>
                  <div className="text-sm text-gray-600">Categories</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {stats.totalReviews}
                  </div>
                  <div className="text-sm text-gray-600">Total Reviews</div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {compareList.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onHoverStart={() => setHoveredProduct(product.id)}
                onHoverEnd={() => setHoveredProduct(null)}
              >
                <Card className="overflow-hidden h-full bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border-0 relative group">
                  {/* Gradient Border Effect */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ padding: "2px" }}
                  >
                    <div className="bg-white rounded-lg h-full w-full"></div>
                  </div>

                  <div className="relative z-10">
                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm hover:bg-red-50 hover:text-red-600 rounded-full shadow-md transition-all duration-200"
                      onClick={() => handleRemoveFromCompare(product)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove from comparison</span>
                    </Button>

                    {/* Product Image */}
                    <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                      <motion.img
                        className="w-full h-full object-cover"
                        src={
                          product.images[0] ||
                          "/placeholder.svg?height=256&width=256"
                        }
                        alt={product.name}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Discount Badge */}
                      {typeof product.discount === "number" &&
                        product.discount > 0 && (
                          <motion.div
                            initial={{ scale: 0, rotate: -12 }}
                            animate={{ scale: 1, rotate: -12 }}
                            className="absolute top-4 left-4"
                          >
                            <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold px-3 py-1 shadow-lg">
                              <Zap className="h-3 w-3 mr-1" />
                              {product.discount}% OFF
                            </Badge>
                          </motion.div>
                        )}

                      {/* Quick Actions Overlay */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: hoveredProduct === product.id ? 1 : 0,
                          y: hoveredProduct === product.id ? 0 : 20,
                        }}
                        className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2"
                      >
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-white/90 hover:bg-white"
                          onClick={() => navigate(`/products/${product.id}`)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        {/* <Button
                          size="sm"
                          variant="secondary"
                          className="bg-white/90 hover:bg-white"
                        >
                          <Heart className="h-4 w-4" />
                        </Button> */}
                      </motion.div>
                    </div>

                    <CardHeader className="pb-4">
                      {/* Category */}
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {product.category.name}
                        </Badge>
                      </div>

                      {/* Product Name */}
                      <h3 className="font-bold text-lg line-clamp-2 text-gray-900 mb-2">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          <Ratings
                            rating={product.review.reduce((acc, curr) => {
                              acc += curr.rating;
                              return acc;
                            }, 0)}
                            disabled
                          />
                        </div>
                        <span className="text-sm text-gray-600">
                          ({product?.review?.length || 0})
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gray-900">
                          $
                          {calculateDiscountedPrice(
                            product.price,
                            product.discount
                          ).toFixed(2)}
                        </span>
                        {product.discount && product.discount > 0 && (
                          <span className="text-lg text-gray-500 line-through">
                            ${product.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="pb-4">
                      <Separator className="mb-4" />

                      {/* Product Details */}
                      <div className="space-y-3">
                        {/* Availability */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Stock</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                product.quantity > 0
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              }`}
                            />
                            <span
                              className={`text-sm font-medium ${
                                product.quantity > 0
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {product.quantity > 0
                                ? `${product.quantity} available`
                                : "Out of Stock"}
                            </span>
                          </div>
                        </div>

                        {/* Quality Badge */}
                        <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                          <Shield className="h-4 w-4 text-blue-600" />
                          <span className="text-xs font-medium text-blue-700">
                            Quality Guaranteed
                          </span>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="pt-0 space-y-2 flex items-center justify-center gap-2">
                      {/* Add to Cart Button */}
                      <Button
                        className="w-full shadow-md hover:shadow-lg 
                        mt-2 transition-all duration-200"
                        disabled={product.quantity === 0}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {product.quantity > 0 ? "Add to Cart" : "Out of Stock"}
                      </Button>

                      {/* Remove Button */}
                      <Button
                        variant="outline"
                        className="w-full hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors 
                        duration-200 bg-transparent"
                        onClick={() => handleRemoveFromCompare(product)}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </CardFooter>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex flex-col sm:flex-row justify-center gap-4"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={handleGoBack}
            className="flex-1 max-w-xs transition-colors duration-200 bg-transparent"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Button>
          <Button
            size="lg"
            onClick={() => navigate("/checkout")}
            className="flex-1 max-w-xs transition-all duration-200"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Proceed to Checkout
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
