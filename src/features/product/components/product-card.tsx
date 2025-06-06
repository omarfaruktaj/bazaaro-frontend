"use client";

import DialogModal from "@/components/Dialog-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Loading from "@/components/ui/loading";
import { Ratings } from "@/components/ui/rating";
import { Spinner } from "@/components/ui/spinner"; // Import Spinner
import { selectUser } from "@/features/auth/auth-slice";
import {
  useAddProductToCartMutation,
  useGetCartQuery,
} from "@/features/cart/cart-api";
import type { Cart, Product, Review } from "@/types";
import type { Response } from "@/types/response";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Eye, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const calculateAverageRating = (reviews: Review[] = []) => {
  if (reviews?.length === 0) return 0;
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return (totalRating / reviews.length).toFixed(1);
};

export default function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const user = useSelector(selectUser);
  const [addProductToCart, { isLoading }] = useAddProductToCartMutation();
  const { data: cart, isLoading: isCartLoading } = useGetCartQuery(null, {
    skip: !user,
  });

  const discountedPrice = product.discount
    ? (product.price - (product.price * product.discount) / 100).toFixed(2)
    : null;

  const averageRating = calculateAverageRating(product.review);

  if (isCartLoading) {
    return <Loading />;
  }

  const handleAddToCart = async () => {
    if (!user) return navigate("/login");

    if (
      cart?.shopId &&
      cart.shopId !== product.shopId &&
      cart.cartItems.length
    ) {
      setIsModalOpen(true);
      return;
    }

    const res = (await addProductToCart({
      productId: product.id,
    })) as Response<Cart>;

    if (res.error) {
      toast.error(
        res.error?.data.message ||
          "Failed to add product into cart. Please try again."
      );
    } else {
      toast.success("Product successfully added into cart");
    }
  };

  const handleReplaceCart = async () => {
    const res = (await addProductToCart({
      productId: product.id,
    })) as Response<Cart>;

    if (res.error) {
      toast.error(
        res.error?.data.message ||
          "Failed to add product into cart. Please try again."
      );
    } else {
      toast.success("Product successfully added into cart");
    }
    setIsModalOpen(false);
  };

  const handleNavigateToProduct = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <>
      <Card
        className="group border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="relative cursor-pointer overflow-hidden"
          onClick={handleNavigateToProduct}
        >
          <div className="aspect-square bg-gray-50">
            <img
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              src={product.images[0] || "/images/placeholder.jpg"}
              alt={product.name}
              loading="lazy"
            />
          </div>

          {product.discount && product.discount > 0 ? (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
              {product.discount}% OFF
            </span>
          ) : null}

          <div
            className={`absolute inset-0 bg-black/5 flex items-center justify-center transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <Button
              variant="secondary"
              size="sm"
              className="bg-white/90 hover:bg-white shadow-sm"
              onClick={(e) => {
                e.stopPropagation();
                handleNavigateToProduct();
              }}
            >
              <Eye className="h-4 w-4 mr-2" />
              Quick View
            </Button>
          </div>
        </div>

        <CardContent className="p-4 flex-grow flex flex-col">
          <div className="mb-1.5 flex items-center gap-1.5">
            <Ratings
              rating={Number(averageRating)}
              size={16}
              disabled
              variant="default"
            />
            <span className="text-xs text-gray-500">
              {averageRating} ({product.review?.length || 0})
            </span>
          </div>

          <h3
            className="font-medium text-gray-800 line-clamp-2 mb-2 hover:text-primary cursor-pointer transition-colors"
            onClick={handleNavigateToProduct}
          >
            {product.name}
          </h3>

          <div className="mt-auto flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900">
              ${discountedPrice || product.price.toFixed(2)}
            </span>
            {discountedPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            className="w-full bg-primary/10 hover:bg-primary text-primary hover:text-white transition-colors"
            disabled={isLoading}
            onClick={handleAddToCart}
            size="sm"
          >
            {isLoading ? (
              <Spinner size="small" className="mr-2" />
            ) : (
              <ShoppingCart className="mr-2 h-4 w-4" />
            )}
            Add to Cart
          </Button>
        </CardFooter>
      </Card>

      <DialogModal
        className="max-w-md"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Different Vendor Detected"
      >
        <DialogDescription className="text-gray-600 mt-2">
          Your cart already contains items from another vendor. Would you like
          to replace your current cart with this new product?
        </DialogDescription>
        <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => setIsModalOpen(false)}
            className="order-1 sm:order-none"
          >
            Keep Current Cart
          </Button>
          <Button variant="destructive" onClick={handleReplaceCart}>
            Replace Cart
          </Button>
        </div>
      </DialogModal>
    </>
  );
}
