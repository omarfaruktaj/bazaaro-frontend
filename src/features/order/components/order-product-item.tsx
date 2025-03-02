import DialogModal from "@/components/Dialog-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { selectUser } from "@/features/auth/auth-slice";
import ReviewForm from "@/features/review/components/review-form";
import { Order, OrderItem } from "@/types";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";

export default function OrderProductItem({
  order,
  item,
}: {
  order: Order;
  item: OrderItem;
}) {
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
  const discountedPrice = calculateProductPrice(
    item.product.price,
    item.product.discount
  );
  const totalPrice = discountedPrice * item.quantity;
  return (
    <div key={item.productId} className="flex justify-between items-center">
      {isReviewModelOpen && (
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
      )}
      <div>
        <h3 className="text-gray-700 cursor-pointer hover:underline">
          <Link to={`/products/${item?.product?.id}`}>{item.product.name}</Link>
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
}
