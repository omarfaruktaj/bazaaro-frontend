"use client";

import { ArrowLeft, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

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
import { clearCompare, removeFromCompare } from "../product-compare-slice";

export default function Compare() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  if (compareList.length === 0) {
    return (
      <div className="container mx-auto px-4 flex items-center justify-center min-h-[70vh]">
        <div className="text-center max-w-md mx-auto p-8 rounded-xl bg-muted/30">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">
            No Products to Compare
          </h2>
          <p className="text-muted-foreground mb-6">
            Add products to comparison to see how they stack up against each
            other.
          </p>
          <Button size="lg" onClick={handleGoBack} className="w-full">
            Browse Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Product Comparison
          </h1>
          <p className="text-muted-foreground mt-1">
            Compare {compareList.length} product
            {compareList.length > 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearComparison}
            className="text-sm"
          >
            Clear All
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleGoBack}
            className="text-sm"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Products
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {compareList.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden transition-all duration-200 hover:shadow-md"
          >
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                onClick={() => handleRemoveFromCompare(product)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove</span>
              </Button>
              <div className="h-56 overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  src={product.images[0] || "/images/placeholder.jpg"}
                  alt={product.name}
                />
              </div>
              {product.discount && product.discount > 0 && (
                <Badge
                  className="absolute top-3 left-3 font-medium"
                  variant="destructive"
                >
                  {product.discount}% OFF
                </Badge>
              )}
            </div>

            <CardHeader className="pt-5 pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {product.category.name}
                  </p>
                  <h3 className="font-semibold text-lg line-clamp-2">
                    {product.name}
                  </h3>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pb-3">
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-xl font-bold">
                  $
                  {product.discount
                    ? (
                        product.price -
                        (product.price * product.discount) / 100
                      ).toFixed(2)
                    : product.price.toFixed(2)}
                </span>
                {product.discount && product.discount > 0 && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>

              <Separator className="my-3" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rating</span>
                  <span className="font-medium">
                    {product?.review?.length || 0} reviews
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Availability</span>
                  <span
                    className={`font-medium ${
                      product.quantity > 0
                        ? "text-green-600 dark:text-green-500"
                        : "text-red-600 dark:text-red-500"
                    }`}
                  >
                    {product.quantity > 0
                      ? `${product.quantity} in stock`
                      : "Out of Stock"}
                  </span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="pt-0">
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => handleRemoveFromCompare(product)}
              >
                Remove from Comparison
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={handleGoBack}
          className="flex-1 max-w-xs"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Continue Shopping
        </Button>
        <Button
          variant="default"
          size="lg"
          onClick={() => navigate("/checkout")}
          className="flex-1 max-w-xs"
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}
