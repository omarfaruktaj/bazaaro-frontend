"use client";

import DialogModal from "@/components/Dialog-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Ratings } from "@/components/ui/rating";

import {
  addToCart,
  getCart,
  replaceCart,
  selectCart,
} from "@/features/cart/cart-slice";
import type { Product, Review } from "@/types";
import { DialogDescription } from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { Eye, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

  const discountedPrice = product.discount
    ? (product.price - (product.price * product.discount) / 100).toFixed(2)
    : null;
  const cart = useSelector(selectCart);

  const averageRating = calculateAverageRating(product.review);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);
  const handleAddToCart = () => {
    // if (!user) return navigate("/login");
    if (cart?.shopId && cart.shopId !== product.shopId) {
      setIsModalOpen(true);
      return;
    }
    try {
      dispatch(addToCart({ product }));
      toast.success("Product successfully added into cart");
    } catch {
      toast.error("Failed to add product. Please try again.");
    }
  };

  const handleReplaceCart = () => {
    try {
      dispatch(replaceCart(product));
      toast.success("Product successfully added into cart");
      setIsModalOpen(false);
    } catch {
      toast.error("Failed to replace cart. Please try again.");
    }
  };

  const handleNavigateToProduct = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <>
      <Card
        className="group border-none shadow-none overflow-hidden flex flex-col h-full"
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
            // <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
            //   {product.discount}% OFF
            // </span>
            /* Discount Badge */
            <div className="absolute top-2 right-2 z-10">
              <motion.div
                className="relative bg-gradient-to-br from-red-500 to-orange-500 text-white px-3 py-1 rounded-full shadow-md text-xs font-semibold tracking-wide uppercase"
                whileHover={{ scale: 1.1, rotate: 2 }}
                transition={{ duration: 0.2 }}
              >
                <span className="block leading-none">
                  🔥 {product.discount}% OFF
                </span>
              </motion.div>
            </div>
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
          <div className="mt-1.5 flex items-center gap-1.5">
            <Ratings
              rating={Number(averageRating)}
              size={16}
              disabled
              variant="yellow"
            />
            <span className="text-xs text-gray-500">
              {averageRating} ({product.review?.length || 0})
            </span>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            className="w-full bg-primary/10 hover:bg-primary text-primary hover:text-white transition-colors"
            onClick={handleAddToCart}
            size="sm"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
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
