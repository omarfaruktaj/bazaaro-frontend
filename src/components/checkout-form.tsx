import { Button } from "@/components/ui/button";
import { useCreateOrderMutation } from "@/features/order/order-api";
import { useCreatePaymentIntentMutation } from "@/features/payment/payment-api";
import { Response } from "@/types/response";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElementOptions } from "@stripe/stripe-js";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function CheckoutForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isCardComplete, setIsCardComplete] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [createOrder] = useCreateOrderMutation();

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
      const { clientSecret } = await createPaymentIntent(null).unwrap();

      const { error: paymentError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: { card: cardElement },
        });

      if (paymentError) {
        toast.error(paymentError.message);
      } else if (paymentIntent) {
        const res = (await createOrder(paymentIntent)) as Response<null>;

        if (res.error) {
          toast.error(
            res.error?.data.message ||
              "order confirmation failed. Please try again."
          );
        } else if (res.data) {
          toast.success("You’ve successfully confirm your order.");
          navigate("/payment/success");
        }
      }
    } catch (err) {
      toast.error("An error occurred while processing payment.");
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
        fontFamily: "Arial, sans-serif",
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
    <>
      <form onSubmit={handleSubmit} className="space-y-6 ">
        <div>
          <CardElement
            options={cardElementOptions}
            onChange={handleCardChange}
            className="p-3 border rounded-md shadow-sm"
          />
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            className="mt-auto w-full md:w-auto  "
            size="lg"
            disabled={!stripe || loading || !isCardComplete}
          >
            {loading ? "Confirming..." : "Confirm Order"}
          </Button>
        </div>
      </form>
    </>
  );
}
