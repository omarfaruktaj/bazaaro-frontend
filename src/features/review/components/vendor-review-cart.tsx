import DialogModal from "@/components/Dialog-modal";
import AlertModal from "@/components/alert-model";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Loading from "@/components/ui/loading";
import { Ratings } from "@/components/ui/rating";
import { Separator } from "@/components/ui/separator";
import { Review, ShopReviewResponse } from "@/types";
import { Response } from "@/types/response";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";
import { useDeleteReviewResponseMutation } from "../review-api";
import ReviewResponseForm from "./review-response-form";

export default function VendorReviewCard({ review }: { review: Review }) {
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const [deleteReviewResponse, { isLoading: isDeleting }] =
    useDeleteReviewResponseMutation();

  if (isDeleting) return <Loading />;

  const handleDeleteResponse = async (responseId: string) => {
    const res = (await deleteReviewResponse(
      responseId
    )) as Response<ShopReviewResponse>;

    if (res.error) {
      toast.error(
        res.error?.data.message || "Response Deleting failed. Please try again."
      );
    } else if (res.data) {
      toast.success("Response Deleted SuccessFully");
    }
  };

  return (
    <Card key={review.id}>
      <DialogModal
        isOpen={openReviewModal}
        onClose={() => setOpenReviewModal(false)}
        title="Leave a Review"
      >
        <ReviewResponseForm
          responseId={review.reviewResponse?.id}
          initialReviewResponseData={review.reviewResponse}
          onSuccess={() => setOpenReviewModal(false)}
        />
      </DialogModal>
      <AlertModal
        isOpen={showDeleteAlert}
        onClose={() => setShowDeleteAlert(false)}
        onConfirm={() =>
          handleDeleteResponse(review?.reviewResponse?.id as string)
        }
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
            <Ratings rating={review.rating} disabled />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">{review.review}</p>
        <Separator className="my-4" />

        {review.reviewResponse ? (
          <div className="mt-4">
            <h4 className="font-semibold text-gray-800">Vendor Response:</h4>
            <p className="text-gray-600">{review.reviewResponse.response}</p>

            <div className="mt-2 flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOpenReviewModal(true)}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setShowDeleteAlert(true)}
              >
                Delete
              </Button>
            </div>
          </div>
        ) : (
          <ReviewResponseForm reviewId={review.id} />
        )}
      </CardContent>
    </Card>
  );
}
