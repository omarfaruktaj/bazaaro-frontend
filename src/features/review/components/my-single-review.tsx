import AlertModal from "@/components/alert-model";
import DialogModal from "@/components/Dialog-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Loading from "@/components/ui/loading";
import { Ratings } from "@/components/ui/rating";
import { Review } from "@/types";
import { Response } from "@/types/response";
import { Separator } from "@radix-ui/react-separator";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";
import { useDeleteReviewMutation } from "../review-api";
import ReviewForm from "./review-form";

export default function MySingleReview({ review }: { review: Review }) {
  const [openReviewModal, setOpenReviewModal] = useState(false);
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
      <DialogModal
        isOpen={openReviewModal}
        onClose={() => setOpenReviewModal(false)}
        title="Leave a Review"
      >
        <ReviewForm
          reviewId={review.id}
          initialReviewData={review}
          onSuccess={() => setOpenReviewModal(false)}
        />
      </DialogModal>
      <AlertModal
        isOpen={showDeleteAlert}
        onClose={() => setShowDeleteAlert(false)}
        onConfirm={() => handleDeleteReview(review.id)}
      />
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              {review.product.name}
            </h3>
            <p className="text-sm text-gray-500">
              Reviewed on {format(new Date(review.createdAt), "MMMM dd, yyyy")}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Ratings variant="yellow" rating={review.rating} disabled />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">{review.review}</p>
        <Separator className="my-4" />
        <div className="flex justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpenReviewModal(true)}
          >
            Edit Review
          </Button>
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
