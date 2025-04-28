"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  useDeleteReviewMutation,
  useGetReviewsQuery,
  useUpdateReviewMutation,
} from "@/features/review/review-api";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import {
  AlertCircle,
  Edit2,
  Loader2,
  RefreshCcw,
  Save,
  Search,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Ratings } from "../ui/rating";

export function ReviewsTab() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editedReviewText, setEditedReviewText] = useState("");
  const [editedRating, setEditedRating] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<string | null>(null);

  const navigate = useNavigate();
  const { data, isLoading, error, refetch, isFetching } = useGetReviewsQuery({
    page,
    limit: 5,
    include: "product",
  });

  const [updateReview, { isLoading: isUpdating }] = useUpdateReviewMutation();
  const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation();

  const startEditing = (review: any) => {
    setEditingReviewId(review.id);
    setEditedReviewText(review.text);
    setEditedRating(review.rating);
  };

  const cancelEditing = () => {
    setEditingReviewId(null);
    setEditedReviewText("");
    setEditedRating(0);
  };

  const saveReview = async (reviewId: string) => {
    try {
      await updateReview({
        reviewId: reviewId,
        data: { review: editedReviewText, rating: editedRating },
      }).unwrap();
      toast({
        title: "Review updated",
        description: "Your review has been successfully updated.",
      });
      setEditingReviewId(null);
    } catch {
      toast({
        title: "Error updating review",
        description:
          "There was a problem updating your review. Please try again.",
        variant: "destructive",
      });
    }
  };

  const confirmDelete = (reviewId: string) => {
    setReviewToDelete(reviewId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteReview = async () => {
    if (!reviewToDelete) return;
    try {
      await deleteReview(reviewToDelete).unwrap();
      toast({
        title: "Review deleted",
        description: "Your review has been deleted.",
      });
      setDeleteDialogOpen(false);
      setReviewToDelete(null);
    } catch {
      toast({
        title: "Error deleting review",
        description:
          "There was a problem deleting your review. Please try again.",
        variant: "destructive",
      });
    }
  };

  const viewProduct = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <div className="inline-flex rounded-full bg-red-100 p-4 mb-4">
          <AlertCircle className="h-6 w-6 text-red-600" />
        </div>
        <h3 className="text-lg font-medium">Failed to load reviews</h3>
        <p className="text-sm text-muted-foreground mt-2 mb-4">
          There was an error loading your reviews.
        </p>
        <Button variant="outline" onClick={() => refetch()} className="gap-2">
          <RefreshCcw className="h-4 w-4" />
          Try Again
        </Button>
      </div>
    );
  }

  if (!data || data.reviews.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Star className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-lg font-medium">No reviews yet</h3>
        <p className="text-sm text-muted-foreground mt-2 mb-6 max-w-md mx-auto">
          You haven't written any product reviews yet. Reviews you write will
          appear here.
        </p>
        <Button onClick={() => navigate("/products")}>Browse Products</Button>
      </div>
    );
  }
  console.log(data.reviews[0].product.images);

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-md">
        <CardHeader className="bg-white border-b pb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle className="text-xl">Your Reviews</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-full sm:w-[250px]"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isFetching && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          <div className="divide-y">
            {data.reviews.map((review: any) => (
              <div
                key={review.id}
                className="px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                {editingReviewId === review.id ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                        {review.product?.images ? (
                          <img
                            src={review.product.images[0] || "/placeholder.svg"}
                            alt={review.product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                            <Star className="h-6 w-6" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{review.product.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Reviewed on{" "}
                          {format(new Date(review.createdAt), "MMM d, yyyy")}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <label className="text-sm font-medium">Rating</label>
                        <Ratings
                          rating={editedRating}
                          onRatingChange={setEditedRating}
                          totalStars={5}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium">Review</label>
                        <Textarea
                          value={editedReviewText}
                          defaultValue={review.review}
                          onChange={(e) => setEditedReviewText(e.target.value)}
                          placeholder="Write your review here..."
                          className="mt-1"
                          rows={4}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={cancelEditing}
                        disabled={isUpdating}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => saveReview(review.id)}
                        disabled={isUpdating}
                      >
                        {isUpdating ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-1" />
                            Save
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                          {review.product?.images ? (
                            <img
                              src={
                                review.product.images[0] || "/placeholder.svg"
                              }
                              alt={review.product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                              <Star className="h-6 w-6" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{review.product.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Reviewed on{" "}
                            {format(new Date(review.createdAt), "MMM d, yyyy")}
                          </p>
                          <div className="flex items-center mt-1">
                            <Ratings
                              rating={review.rating}
                              totalStars={5}
                              disabled
                            />
                          </div>
                          <p className="mt-2 text-muted-foreground">
                            {review.review}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => startEditing(review)}
                        >
                          <Edit2 className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => confirmDelete(review.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm">{review.text}</p>
                    </div>

                    <div>
                      <Button
                        variant="link"
                        size="sm"
                        className="px-0 text-primary"
                        onClick={() => viewProduct(review.product.id)}
                      >
                        View Product
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* {data.totalPages > 1 && <Pagination currentPage={page} totalPages={data.totalPages} onPageChange={setPage} />} */}

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Review</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this review? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteReview}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
