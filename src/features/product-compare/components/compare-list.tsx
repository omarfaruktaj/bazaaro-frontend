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
import { ReviewResponseSchemaType } from "@/features/review/schemas";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Star,
  Package,
  ShoppingCart,
  Heart,
  Eye,
  TrendingUp,
  Award,
  Zap,
  Shield,
} from "lucide-react";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  discount?: number;
  images: string[];
  category: { name: string };
  quantity: number;
  review?: ReviewResponseSchemaType[];
  rating?: number;
  brand?: string;
  features?: string[];
}

interface CompareListProps {
  compareList: Product[];
  handleRemoveFromCompare: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
  onViewProduct?: (product: Product) => void;
}

export default function CompareList({
  compareList,
  handleRemoveFromCompare,
  onAddToCart,
  onAddToWishlist,
  onViewProduct,
}: CompareListProps) {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const calculateDiscountedPrice = (price: number, discount?: number) => {
    if (!discount) return price;
    return price - (price * discount) / 100;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  if (compareList.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
          <TrendingUp className="h-12 w-12 text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          No Products to Compare
        </h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Add products to your comparison list to see detailed side-by-side
          comparisons
        </p>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          Browse Products
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mb-4">
          <TrendingUp className="h-8 w-8 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Product Comparison
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Compare features, prices, and specifications to make the best choice
        </p>
      </div>

      {/* Comparison Grid */}
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
                        onClick={() => onViewProduct?.(product)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-white/90 hover:bg-white"
                        onClick={() => onAddToWishlist?.(product)}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </div>

                  <CardHeader className="pb-4">
                    {/* Category & Brand */}
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {product.category.name}
                      </Badge>
                      {product.brand && (
                        <span className="text-xs text-gray-500 font-medium">
                          {product.brand}
                        </span>
                      )}
                    </div>

                    {/* Product Name */}
                    <h3 className="font-bold text-lg line-clamp-2 text-gray-900 mb-2">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {renderStars(product.rating || 4)}
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

                      {/* Features */}
                      {product.features && product.features.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Award className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600 font-medium">
                              Key Features
                            </span>
                          </div>
                          <div className="space-y-1">
                            {product.features
                              .slice(0, 3)
                              .map((feature, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-2"
                                >
                                  <div className="w-1 h-1 bg-blue-500 rounded-full" />
                                  <span className="text-xs text-gray-600">
                                    {feature}
                                  </span>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}

                      {/* Quality Badge */}
                      <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                        <Shield className="h-4 w-4 text-blue-600" />
                        <span className="text-xs font-medium text-blue-700">
                          Quality Guaranteed
                        </span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-0 space-y-2">
                    {/* Add to Cart Button */}
                    <Button
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                      onClick={() => onAddToCart?.(product)}
                      disabled={product.quantity === 0}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {product.quantity > 0 ? "Add to Cart" : "Out of Stock"}
                    </Button>

                    {/* Remove Button */}
                    <Button
                      variant="outline"
                      className="w-full hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors duration-200 bg-transparent"
                      onClick={() => handleRemoveFromCompare(product)}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Remove from Comparison
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Comparison Summary */}
      {compareList.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100"
        >
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Comparison Summary
            </h3>
            <p className="text-gray-600 mb-4">
              You're comparing {compareList.length} products
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span>
                  Price Range: $
                  {Math.min(
                    ...compareList.map((p) =>
                      calculateDiscountedPrice(p.price, p.discount)
                    )
                  ).toFixed(2)}{" "}
                  - $
                  {Math.max(
                    ...compareList.map((p) =>
                      calculateDiscountedPrice(p.price, p.discount)
                    )
                  ).toFixed(2)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span>
                  Categories:{" "}
                  {new Set(compareList.map((p) => p.category.name)).size}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
