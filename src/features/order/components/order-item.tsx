import DialogModal from "@/components/Dialog-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { selectUser } from "@/features/auth/auth-slice";
import ReviewForm from "@/features/review/components/review-form";
import { Order, OrderItem } from "@/types";
import { format } from "date-fns";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";

interface SingleOrderProps {
  order: Order;
}

export default function SingleOrder({ order }: SingleOrderProps) {
  const [isReviewModelOpen, setIsReviewModelOpen] = useState(false);
  const user = useSelector(selectUser);

  const isUserReviewed = (item: OrderItem) => {
    return item.product?.review?.some((review) => review.userId === user?.id);
  };

  const calculateProductPrice = (price: number, discount?: number): number => {
    if (discount) {
      return price - (price * discount) / 100;
    }
    return price;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Order #{order.id}
            </h2>
            <p className="text-sm text-muted-foreground">
              Date: {format(new Date(order.createdAt), "MMMM dd, yyyy")}
            </p>
          </div>
          <span
            className={`px-4 py-2 rounded-full text-white text-sm ${
              order.status === "PAID"
                ? "bg-green-500"
                : order.status === "SHIPPED"
                ? "bg-blue-500"
                : "bg-gray-500"
            }`}
          >
            {order.status}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <h1 className="text-xl py-2">Products</h1>
        <div className="space-y-6">
          {order.orderItem.map((item) => {
            const discountedPrice = calculateProductPrice(
              item.product.price,
              item.product.discount
            );
            const totalPrice = discountedPrice * item.quantity;
            return (
              <div
                key={item.productId}
                className="flex justify-between items-center"
              >
                <DialogModal
                  isOpen={isReviewModelOpen}
                  onClose={() => setIsReviewModelOpen(false)}
                  title="Submit Review"
                >
                  <ReviewForm
                    productId={item.product.id}
                    onSuccess={() => setIsReviewModelOpen(false)}
                  />
                </DialogModal>
                <div>
                  <h3 className="text-gray-700 cursor-pointer hover:underline">
                    <Link to={`/products/${item?.product?.id}`}>
                      {item.product.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Quantity: {item.quantity}
                  </p>
                  <span className="text-gray-700 font-medium">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                {order.status === "PAID" && !isUserReviewed(item) && (
                  <div className="mt-4 flex flex-col gap-3">
                    <Button onClick={() => setIsReviewModelOpen(true)}>
                      Leave a Review
                    </Button>
                  </div>
                )}
                {order.status === "PAID" && isUserReviewed(item) && (
                  <Badge variant={"outline"}>Reviewed</Badge>
                )}
              </div>
            );
          })}
        </div>
        <Separator className="mt-3" />

        <div className="mt-3 flex justify-between items-center">
          <h3 className="font-semibold text-lg text-gray-700">Total Amount</h3>
          <span className="text-xl font-bold text-gray-900">
            ${order.totalAmount.toFixed(2)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
