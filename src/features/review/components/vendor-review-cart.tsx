"use client";

import DialogModal from "@/components/Dialog-modal";
import AlertModal from "@/components/alert-model";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Loading from "@/components/ui/loading";
import { Ratings } from "@/components/ui/rating";
import type { Review, ShopReviewResponse } from "@/types";
import type { Response } from "@/types/response";
import { format } from "date-fns";
import { Edit, MessageCircle, Trash2, User } from "lucide-react";
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
        res.error?.data.message || "Response deletion failed. Please try again."
      );
    } else if (res.data) {
      toast.success("Response deleted successfully");
    }
  };

  return (
    <Card
      key={review.id}
      className="overflow-hidden border-gray-200 hover:shadow-md transition-shadow duration-300"
    >
      <DialogModal
        isOpen={openReviewModal}
        onClose={() => setOpenReviewModal(false)}
        title="Edit Your Response"
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

      <CardHeader className="bg-gray-50 pb-4">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <div className="flex-shrink-0 w-16 h-16 relative overflow-hidden rounded-md border border-gray-200">
            {review.product.images ? (
              <img
                src={review.product.images[0] || "/placeholder.svg"}
                alt={review.product.name}
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                No image
              </div>
            )}
          </div>

          <div className="flex-grow">
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
              {review.product.name}
            </h3>
            <div className="flex items-center mt-1">
              <Ratings variant="yellow" rating={review.rating} disabled />
              <span className="ml-2 text-sm text-gray-500">
                {review.rating}/5
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Reviewed on {format(new Date(review.createdAt), "MMMM dd, yyyy")}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="h-4 w-4 text-gray-500" />
            </div>
          </div>
          <div className="flex-grow">
            <p className="text-gray-700 whitespace-pre-line">{review.review}</p>
          </div>
        </div>

        {review.reviewResponse ? (
          <div className="mt-6 ml-4 pl-4 border-l-2 border-primary/20">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 text-primary" />
                </div>
              </div>
              <div className="flex-grow">
                <h4 className="font-medium text-gray-800">Your Response:</h4>
                <p className="text-gray-600 mt-1 whitespace-pre-line">
                  {review.reviewResponse.response}
                </p>

                <div className="mt-3 flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setOpenReviewModal(true)}
                    className="flex items-center gap-1"
                  >
                    <Edit className="h-3 w-3" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setShowDeleteAlert(true)}
                    className="flex items-center gap-1"
                  >
                    <Trash2 className="h-3 w-3" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6 ml-4 pl-4 border-l-2 border-primary/20">
            <h4 className="font-medium text-gray-800 mb-2">
              Respond to this review:
            </h4>
            <ReviewResponseForm reviewId={review.id} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
