"use client";

import AlertModal from "@/components/alert-model";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Loading from "@/components/ui/loading";
import { Ratings } from "@/components/ui/rating";
import { Separator } from "@/components/ui/separator";
import type { Review } from "@/types";
import type { Response } from "@/types/response";
import { format } from "date-fns";
import { Eye, ShoppingBag, Store, Trash2, User } from "lucide-react";

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
      <AlertModal
        isOpen={showDeleteAlert}
        onClose={() => setShowDeleteAlert(false)}
        onConfirm={() => handleDeleteReview(review.id)}
      />

      <CardHeader className="bg-gray-50 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-shrink-0 w-16 h-16 relative overflow-hidden rounded-md border border-gray-200">
            {review.product.images ? (
              <img
                src={review.product.images[0] || "/placeholder.svg"}
                alt={review.product.name}
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                <ShoppingBag className="h-6 w-6" />
              </div>
            )}
          </div>

          <div className="flex-grow">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Link
                    to={`/products/${review.product.id}`}
                    className="hover:text-primary transition-colors"
                  >
                    {review.product.name}
                  </Link>
                  <Badge variant="outline" className="ml-2">
                    ID: {review.id.substring(0, 8)}
                  </Badge>
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Ratings variant="yellow" rating={review.rating} disabled />
                  <span className="text-sm text-gray-500">
                    {review.rating}/5
                  </span>
                </div>
              </div>

              <div className="text-sm text-gray-500">
                {format(new Date(review.createdAt), "MMM dd, yyyy 'at' h:mm a")}
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1 text-sm">
                <Store className="h-4 w-4 text-gray-400" />
                <Link
                  to={`/shops/${review.shopId}`}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  {review.shop.name}
                </Link>
              </div>

              <div className="flex items-center gap-1 text-sm ml-4">
                <User className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">
                  {review.user?.profile?.name || "Anonymous User"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="h-4 w-4 text-gray-500" />
            </div>
          </div>
          <div className="flex-grow">
            <p className="text-gray-700 whitespace-pre-line">{review.review}</p>

            {review.reviewResponse && (
              <div className="mt-4 ml-4 pl-4 border-l-2 border-primary/20">
                <h4 className="font-medium text-gray-800">Vendor Response:</h4>
                <p className="text-gray-600 mt-1">
                  {review.reviewResponse.response}
                </p>
              </div>
            )}
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            asChild
          >
            <Link to={`/products/${review.product.id}`}>
              <Eye className="h-4 w-4" />
              View Product
            </Link>
          </Button>

          <Button
            variant="destructive"
            size="sm"
            onClick={() => setShowDeleteAlert(true)}
            className="flex items-center gap-1"
          >
            <Trash2 className="h-4 w-4" />
            Delete Review
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
