import CheckoutForm from "@/components/checkout-form";
import BackButton from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Loading from "@/components/ui/loading";
import { Separator } from "@/components/ui/separator";
import envConfig from "@/config/env-config";
import { useGetCartQuery } from "@/features/cart/cart-api";
import { useApplyCouponMutation } from "@/features/coupon/coupon-api";
import { Response } from "@/types/response";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const stripePromise = loadStripe(envConfig.VITE_STRIPE_PUBLIC_KEY);

export default function Checkout() {
  const { data: cart, isLoading } = useGetCartQuery(null);
  const [applyCoupon] = useApplyCouponMutation();
  const cartItems = cart?.cartItems;

  const [couponCode, setCouponCode] = useState<string>("");
  const [couponError, setCouponError] = useState<string>("");

  const navigate = useNavigate();

  if (isLoading) return <Loading />;
  if (!cart || cart?.cartItems?.length === 0) {
    navigate("/");
    return;
  }

  const handleCouponApply = async () => {
    setCouponError("");
    if (!couponCode) {
      setCouponError("Please enter a coupon code.");
      return;
    }

    try {
      const res = (await applyCoupon(couponCode)) as Response<null>;

      if (res.error) {
        toast.error(
          res.error?.data.message || "Coupon apply failed. Please try again."
        );
      } else if (res.data) {
        toast.success("Coupon Success fully applied ");
      }
    } catch (error) {
      toast.error("An unknown error occurred.");
      console.error("Login failed:", error);
    }
  };

  const calculateSubtotal = () => {
    return (
      cartItems?.reduce((total, item) => {
        const discountedPrice = item.product.discount
          ? item.product.price -
            (item.product.price * item.product.discount) / 100
          : item.product.price;
        return total + discountedPrice * item.quantity;
      }, 0) || 0
    );
  };

  return (
    <div className="p-8">
      <BackButton />
      <div className="flex items-center justify-center">
        <div className=" max-w-4xl p-8 bg-white shadow-xl rounded-lg">
          <h1 className="text-2xl font-bold text-gray-900 mb-10 text-center">
            Checkout
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Cart Summary
              </h2>
              {cartItems?.map((item) => {
                const discountedPrice = item.product.discount
                  ? (
                      item.product.price -
                      (item.product.price * item.product.discount) / 100
                    ).toFixed(2)
                  : item.product.price.toFixed(2);

                return (
                  <Card
                    key={item.id}
                    className="flex flex-col md:flex-row items-center shadow-md"
                  >
                    <div className="w-full md:w-1/4 p-2">
                      <img
                        className="w-full h-24 object-cover rounded-md"
                        src={
                          item.product.images[0] || "/images/placeholder.jpg"
                        }
                        alt={item.product.name}
                      />
                    </div>
                    <div className="w-full md:w-3/4 p-4">
                      <CardHeader className="p-0">
                        <CardTitle className="text-lg font-semibold text-gray-800">
                          {item.product.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0 mt-2">
                        <p className="text-lg font-semibold text-gray-900">
                          ${discountedPrice}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity}
                        </p>
                      </CardContent>
                    </div>
                  </Card>
                );
              })}

              <div className="border-t pt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium">Subtotal:</span>
                  <span className="text-lg">
                    ${calculateSubtotal().toFixed(2)}
                  </span>
                </div>
                {cart.discount ? (
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-medium">Discount:</span>
                    <span className="text-lg">${cart.discount.toFixed(2)}</span>
                  </div>
                ) : null}

                <Separator />

                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total:</span>
                  <span>${cart.totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Input
                  type="text"
                  className="px-4 py-2 border rounded-md w-full focus:ring focus:ring-blue-500"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <Button onClick={handleCouponApply}>Apply</Button>
              </div>
              {couponError && (
                <p className="text-red-500 text-sm mt-2">{couponError}</p>
              )}
            </div>

            <div className=" p-6 ">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Payment
              </h2>
              <Elements stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
