import { Button } from "@/components/ui/button";
import { clearCart } from "@/features/cart/cart-slice";
import { useCreateOrderMutation } from "@/features/order/order-api";
import { useCreatePaymentIntentMutation } from "@/features/payment/payment-api";
import { useAppDispatch } from "@/redux/hooks";
import type { Response } from "@/types/response";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import type { StripeCardElementOptions } from "@stripe/stripe-js";
import { CreditCard, Lock } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
type CartItem = {
  productId: string;
  quantity: number;
}[];
export default function CheckoutForm({
  totalAmount,
  cartItems,
  couponCode,
}: {
  totalAmount: number;
  cartItems: CartItem;
  couponCode?: string;
}) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isCardComplete, setIsCardComplete] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [createOrder] = useCreateOrderMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setError("Stripe has not been loaded");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Card element not found");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const { clientSecret } = await createPaymentIntent(totalAmount).unwrap();

      const { error: paymentError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: { card: cardElement },
        });

      if (paymentError) {
        toast.error(paymentError.message || "Payment failed");
        setError(paymentError.message || "Payment failed");
      } else if (paymentIntent) {
        const res = (await createOrder({
          cartItems,
          couponCode,
          paymentData: paymentIntent,
        })) as Response<null>;

        if (res.error) {
          toast.error(
            res.error?.data.message ||
              "Order confirmation failed. Please try again."
          );
        } else if (res.data) {
          toast.success("Your order has been successfully placed!");
          dispatch(clearCart());
          navigate("/payment/success");
        }
      }
    } catch (err) {
      toast.error("An error occurred while processing payment");
      console.error("Payment error:", err);
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCardChange = (event: any) => {
    setError(event.error ? event.error.message : null);
    setIsCardComplete(event.complete);
  };

  const cardElementOptions: StripeCardElementOptions = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Inter, system-ui, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
    hidePostalCode: true,
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Card Information
          </label>
          <div className="flex items-center">
            <img
              src="https://cdn.jsdelivr.net/npm/payment-icons@1.1.0/min/flat/visa.svg"
              className="h-6 w-auto mr-1"
              alt="Visa"
            />
            <img
              src="https://cdn.jsdelivr.net/npm/payment-icons@1.1.0/min/flat/mastercard.svg"
              className="h-6 w-auto mr-1"
              alt="Mastercard"
            />
            <img
              src="https://cdn.jsdelivr.net/npm/payment-icons@1.1.0/min/flat/amex.svg"
              className="h-6 w-auto"
              alt="Amex"
            />
          </div>
        </div>

        <div className="p-4 border rounded-md shadow-sm bg-white focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all duration-200">
          <CardElement
            options={cardElementOptions}
            onChange={handleCardChange}
            className="py-2"
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm flex items-center mt-2">
            <CreditCard className="h-4 w-4 mr-1" />
            {error}
          </div>
        )}

        <div className="flex items-center text-xs text-gray-500 mt-2">
          <Lock className="h-3 w-3 mr-1" />
          Your card information is encrypted and secure
        </div>
      </div>

      <Button
        type="submit"
        className="w-full py-3"
        size="lg"
        disabled={!stripe || loading || !isCardComplete}
      >
        {loading ? "Processing..." : "Complete Purchase"}
      </Button>
    </form>
  );
}
