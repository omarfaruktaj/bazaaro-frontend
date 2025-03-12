"use client";

import AlertModal from "@/components/alert-model";
import DialogModal from "@/components/Dialog-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Loading from "@/components/ui/loading";
import { Ratings } from "@/components/ui/rating";
import { Separator } from "@/components/ui/separator";
import type { Review } from "@/types";
import type { Response } from "@/types/response";
import { format } from "date-fns";
import { Edit, Trash2 } from "lucide-react";
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
        res.error?.data.message || "Review deletion failed. Please try again."
      );
    } else {
      toast.success("Review deleted successfully");
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
        title="Edit Your Review"
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
        <p className="text-gray-700 whitespace-pre-line">{review.review}</p>

        <Separator className="my-5" />

        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpenReviewModal(true)}
            className="flex items-center gap-1"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>

          <Button
            variant="destructive"
            size="sm"
            onClick={() => setShowDeleteAlert(true)}
            className="flex items-center gap-1"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
