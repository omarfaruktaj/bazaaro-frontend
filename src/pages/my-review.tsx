"use client";

import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import MySingleReview from "@/features/review/components/my-single-review";
import { useGetReviewsQuery } from "@/features/review/review-api";
import { ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";

export default function MyReviews() {
  const [page, setPage] = useState(0);

  const { data, isLoading, error } = useGetReviewsQuery({
    page: page + 1,
    include: "product",
  });

  useEffect(() => {
    setPage(0);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <Loading />
      </div>
    );
  }

  if (!data || data?.reviews.length === 0) {
    return (
      <div className="container flex flex-col min-h-[70vh] items-center justify-center text-center space-y-6 max-w-lg mx-auto px-4">
        <div className="rounded-full bg-primary/10 p-6">
          <MessageSquare className="h-12 w-12 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold">No reviews yet</h2>
        <p className="text-muted-foreground max-w-xs mx-auto">
          You haven't left any reviews yet. Reviews you write for products will
          appear here.
        </p>
        <Button className="mt-4">Browse Products</Button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-4">
        <div className="rounded-full bg-red-100 p-3">
          <MessageSquare className="h-8 w-8 text-red-500" />
        </div>
        <p className="text-lg font-medium text-red-600">
          Error loading reviews
        </p>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto">
          We couldn't load your reviews. Please try again later.
        </p>
        <Button
          onClick={() => window.location.reload()}
          variant="outline"
          className="mt-2"
        >
          Retry
        </Button>
      </div>
    );
  }

  const { pagination } = data;

  const handlePagination = (direction: "next" | "prev") => {
    if (direction === "next" && pagination?.nextPage) {
      setPage((prev) => prev + 1);
    } else if (direction === "prev" && pagination?.prevPage) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <div className="container max-w-5xl mx-auto py-10 px-4 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">My Reviews</h1>
        <div className="text-sm text-muted-foreground">
          Showing {data.reviews.length} of {pagination.totalItem} reviews
        </div>
      </div>

      <div className="grid gap-6">
        {data?.reviews.map((review) => (
          <MySingleReview key={review.id} review={review} />
        ))}
      </div>

      {pagination && (pagination.prevPage || pagination.nextPage) && (
        <div className="flex items-center justify-center sm:justify-between mt-8 border-t pt-6">
          <div className="hidden sm:block text-sm text-muted-foreground">
            Page {pagination.page || page + 1} of {pagination.totalPage}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePagination("prev")}
              disabled={!pagination.prevPage}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Previous</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePagination("next")}
              disabled={!pagination.nextPage}
              className="flex items-center gap-1"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
