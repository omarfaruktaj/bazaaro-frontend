import AlertModal from "@/components/alert-model";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Loading from "@/components/ui/loading";
import { Ratings } from "@/components/ui/rating";
import { Separator } from "@/components/ui/separator";
import { Review } from "@/types";
import { Response } from "@/types/response";
import { format } from "date-fns";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { useDeleteReviewMutation } from "../review-api";

export default function AdminReviewCard({ review }: { review: Review }) {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation();

  if (isDeleting) return <Loading />;

  const handleDeleteReview = async (reviewId: string) => {
    const res = (await deleteReview(reviewId)) as Response<Review>;

    if (res.error) {
      toast.error(
        res.error?.data.message || "Review Deleting failed. Please try again."
      );
    } else {
      toast.success("Review Deleted SuccessFully");
    }
  };
  return (
    <Card key={review.id}>
      <AlertModal
        isOpen={showDeleteAlert}
        onClose={() => setShowDeleteAlert(false)}
        onConfirm={() => handleDeleteReview(review.id)}
      />
      <CardHeader className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              <Link to={`products/${review.product.id}`}>
                {review.product.name}
              </Link>
            </h3>
            <p className="text-sm text-gray-500">
              Reviewed on {format(new Date(review.createdAt), "MMMM dd, yyyy")}
            </p>
            <div>
              <p>
                Shop:{" "}
                <Link to={`/shops/${review.shopId}`}>{review.shop.name}</Link>
              </p>
            </div>
          </div>
          <div>
            <Ratings variant="yellow" rating={review.rating} disabled />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-gray-700">{review.review}</p>
        <Separator className="my-2" />
        <div className="flex justify-between">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setShowDeleteAlert(true)}
          >
            Delete Review
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
