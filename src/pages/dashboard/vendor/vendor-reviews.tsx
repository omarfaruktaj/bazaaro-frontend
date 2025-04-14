import type React from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Loading from "@/components/ui/loading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import VendorReviewCard from "@/features/review/components/vendor-review-cart";
import { useGetReviewsQuery } from "@/features/review/review-api";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  MessageSquare,
  Search,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";

const VendorReviewsPage: React.FC = () => {
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const { data, isLoading, error } = useGetReviewsQuery({
    page: page + 1,
    include: "product,reviewResponse",
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
          <Star className="h-12 w-12 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold">No reviews yet</h2>
        <p className="text-muted-foreground max-w-xs mx-auto">
          Your products haven't received any reviews yet. Reviews will appear
          here once customers leave feedback.
        </p>
        <Button className="mt-4">View Products</Button>
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
          We couldn't load your product reviews. Please try again later.
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

  // Calculate average rating

  // Calculate review statistics
  const totalReviews = pagination.totalItem || data.reviews.length;
  const averageRating =
    data.reviews.reduce((acc, review) => acc + review.rating, 0) /
    data.reviews.length;

  // Group reviews by rating
  const ratingCounts = {
    5: data.reviews.filter((r) => r.rating === 5).length,
    4: data.reviews.filter((r) => r.rating === 4).length,
    3: data.reviews.filter((r) => r.rating === 3).length,
    2: data.reviews.filter((r) => r.rating === 2).length,
    1: data.reviews.filter((r) => r.rating === 1).length,
  };

  // Filter reviews based on search term and rating filter
  const filteredReviews = data.reviews.filter((review) => {
    const matchesSearch =
      searchTerm === "" ||
      review.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review?.shop?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.review.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRating =
      filterRating === "all" || review.rating === Number.parseInt(filterRating);

    return matchesSearch && matchesRating;
  });

  // Sort reviews
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortBy === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else if (sortBy === "highest") {
      return b.rating - a.rating;
    } else if (sortBy === "lowest") {
      return a.rating - b.rating;
    }
    return 0;
  });
  return (
    <div className="container max-w-5xl mx-auto py-10 px-4 lg:px-8">
      {/* <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Reviews</h1>
          <div className="flex items-center mt-2">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(averageRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700">
              {averageRating.toFixed(1)} out of 5
            </span>
            <span className="ml-2 text-sm text-muted-foreground">
              ({data.reviews.length} reviews)
            </span>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          Showing {data.reviews.length} of{" "}
          {pagination.totalItem || data.reviews.length} reviews
        </div>
      </div> */}

      <div className="flex flex-col gap-6 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Product Reviews</h1>
          <div className="text-sm text-muted-foreground">
            Showing {sortedReviews.length} of {totalReviews} reviews
          </div>
        </div>

        <Card className="p-6 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-medium">Review Summary</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.round(averageRating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-medium">
                  {averageRating.toFixed(1)}
                </span>
                <span className="text-sm text-muted-foreground">out of 5</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {totalReviews} total reviews
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-medium mb-1">Rating Breakdown</h3>
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-2">
                  <div className="flex items-center w-16">
                    <span className="text-sm">{rating}</span>
                    <Star className="h-4 w-4 ml-1 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{
                        width: `${
                          (ratingCounts[rating as keyof typeof ratingCounts] /
                            totalReviews) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-muted-foreground w-10">
                    {ratingCounts[rating as keyof typeof ratingCounts]}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reviews..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select value={filterRating} onValueChange={setFilterRating}>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Filter by rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ratings</SelectItem>
                      <SelectItem value="5">5 Stars</SelectItem>
                      <SelectItem value="4">4 Stars</SelectItem>
                      <SelectItem value="3">3 Stars</SelectItem>
                      <SelectItem value="2">2 Stars</SelectItem>
                      <SelectItem value="1">1 Star</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="highest">Highest Rated</SelectItem>
                    <SelectItem value="lowest">Lowest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6">
        {data?.reviews.map((review) => (
          <VendorReviewCard key={review.id} review={review} />
        ))}
      </div>

      {pagination && (pagination.prevPage || pagination.nextPage) && (
        <div className="flex items-center justify-center sm:justify-between mt-8 border-t pt-6">
          <div className="hidden sm:block text-sm text-muted-foreground">
            Page {pagination.page || page + 1} of{" "}
            {pagination.totalPage ||
              Math.ceil(pagination.totalItem / (pagination.limit || 10))}
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
};

export default VendorReviewsPage;
