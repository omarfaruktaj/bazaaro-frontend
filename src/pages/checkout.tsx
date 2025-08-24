"use client";

import CheckoutForm from "@/components/checkout-form";
import ContractInfo from "@/components/contract-info";
import BackButton from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import envConfig from "@/config/env-config";
import { getCart, selectCart } from "@/features/cart/cart-slice";
import { useApplyCouponMutation } from "@/features/coupon/coupon-api";
import { useAppDispatch } from "@/redux/hooks";
import { Coupon } from "@/types";
import type { Response } from "@/types/response";
import { trackBeginCheckoutFromCart } from "@/utils/gtm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  CheckCircle,
  CreditCard,
  LockIcon,
  Package,
  ShieldCheck,
  ShoppingBag,
  Tag,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const stripePromise = loadStripe(envConfig.VITE_STRIPE_PUBLIC_KEY);

export default function Checkout() {
  const [discount, setDiscount] = useState<number>(0);
  const cart = useSelector(selectCart);
  const dispatch = useAppDispatch();
  const [applyCoupon] = useApplyCouponMutation();
  const cartItems = cart?.cartItems;

  const [couponCode, setCouponCode] = useState<string>("");
  const [couponError, setCouponError] = useState<string>("");
  const [couponLoading, setCouponLoading] = useState(false);
  const hasTracked = useRef(false);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  useEffect(() => {
    if (cartItems && cartItems.length > 0 && !hasTracked.current) {
      trackBeginCheckoutFromCart(cartItems);
      hasTracked.current = true;
    }
  }, [cartItems]);

  const subtotal =
    cartItems?.reduce((total, item) => {
      const discountedPrice = item.discount
        ? item.price - (item.price * item.discount) / 100
        : item.price;
      return total + discountedPrice * item.quantity;
    }, 0) || 0;

  const handleCouponApply = async () => {
    setCouponError("");
    if (!couponCode) {
      setCouponError("Please enter a coupon code");
      return;
    }

    setCouponLoading(true);
    try {
      const res = (await applyCoupon({
        couponCode,
        shopId: cart.shopId ?? "",
      })) as Response<{ coupon: Coupon }>;

      if (res.error) {
        toast.error(
          res.error?.data.message ||
            "Coupon application failed. Please try again."
        );
        setCouponError(res.error?.data.message || "Invalid coupon code");
      } else if (res.data) {
        const { data } = res.data;
        if (data.coupon.discountType === "PERCENTAGE") {
          setDiscount((subtotal * data.coupon.discountValue) / 100);
        } else if (data.coupon.discountType === "FIXED") {
          setDiscount(data.coupon.discountValue);
        }
        toast.success("Coupon successfully applied");
      }
    } catch (error) {
      toast.error("An unknown error occurred");
      console.error("Coupon application failed:", error);
    } finally {
      setCouponLoading(false);
    }
  };

  const discountedAmount = subtotal - discount;

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <BackButton />
        <div className="mb-6 flex items-center">
          <h1 className="text-3xl font-bold text-gray-900 ml-4">Checkout</h1>
        </div>

        {/* Checkout Steps */}
        <div className="mb-8 hidden md:block">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div className="ml-2 text-primary font-medium">Cart</div>
            </div>
            <div className="w-16 h-1 bg-primary mx-2"></div>
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white">
                <CreditCard className="w-5 h-5" />
              </div>
              <div className="ml-2 text-primary font-medium">Payment</div>
            </div>
            <div className="w-16 h-1 bg-gray-300 mx-2"></div>
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 text-gray-500">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div className="ml-2 text-gray-500 font-medium">Confirmation</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Summary */}

          <div className="lg:col-span-2">
            <div className="flex flex-col gap-4">
              <ContractInfo />
              <Card className="overflow-hidden shadow-lg border-0">
                <div className="bg-gray-50 px-6 py-4 border-b">
                  <h2 className="text-xl font-semibold flex items-center">
                    <ShoppingBag className="mr-2 h-5 w-5 text-primary" />
                    Order Summary
                  </h2>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {cartItems?.map((item) => {
                      const discountedPrice = item.discount
                        ? (
                            item.price -
                            (item.price * item.discount) / 100
                          ).toFixed(2)
                        : item.price.toFixed(2);

                      return (
                        <div
                          key={item.productId}
                          className="flex items-center space-x-4 py-4 border-b border-gray-100 last:border-0"
                        >
                          <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200">
                            <img
                              className="w-full h-full object-cover"
                              src={item.image || "/images/placeholder.jpg"}
                              alt={item.name}
                            />
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-medium text-gray-900">
                              {item.name}
                            </h3>
                            <div className="flex items-center mt-1 text-sm text-gray-500">
                              <span>Quantity: {item.quantity}</span>
                              {item.discount && item.discount > 0 && (
                                <span className="ml-4 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                  <Tag className="mr-1 h-3 w-3" />
                                  {item.discount}% OFF
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-gray-900">
                              ${Number(discountedPrice) * item.quantity}
                            </div>
                            {item.discount && item.discount > 0 && (
                              <div className="text-sm text-gray-500 line-through">
                                ${(item.price * item.quantity).toFixed(2)}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between items-center mb-2 text-green-600">
                        <span className="flex items-center">
                          <Tag className="mr-2 h-4 w-4" />
                          Discount
                        </span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex items-center mt-4 mb-4">
                      <div className="flex-grow relative">
                        <Input
                          type="text"
                          className="pr-24"
                          placeholder="Enter coupon code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <Button
                          size="sm"
                          onClick={handleCouponApply}
                          disabled={couponLoading}
                          className="absolute right-1 top-1 h-8"
                        >
                          {couponLoading ? "Applying..." : "Apply"}
                        </Button>
                      </div>
                    </div>
                    {couponError && (
                      <p className="text-red-500 text-sm mb-4">{couponError}</p>
                    )}

                    <Separator className="my-4" />

                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">
                        ${discountedAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Trust Badges */}
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-sm text-gray-600">Secure Payment</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-sm text-gray-600">Fast Shipping</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <LockIcon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-sm text-gray-600">
                    Privacy Protected
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="lg:col-span-1 ">
            <Card className="shadow-lg border-0 sticky top-80">
              <div className="bg-gray-50 px-6 py-4 border-b">
                <h2 className="text-xl font-semibold flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-primary" />
                  Payment Details
                </h2>
              </div>
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="flex items-center mb-4">
                    <LockIcon className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm text-gray-600">
                      Your payment information is secure
                    </span>
                  </div>

                  <Elements stripe={stripePromise}>
                    <CheckoutForm
                      totalAmount={discountedAmount}
                      cartItems={cartItems}
                      couponCode={couponCode}
                    />
                  </Elements>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <h3 className="font-medium mb-2">Order Summary</h3>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm mb-1 text-green-600">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-medium mt-2">
                    <span>Total</span>
                    <span className="text-primary">
                      ${discountedAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 text-xs text-gray-500">
                  By completing your purchase, you agree to our{" "}
                  <a href="#" className="text-primary hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                  .
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
