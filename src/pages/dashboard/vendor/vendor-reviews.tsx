import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import VendorReviewCard from "@/features/review/components/vendor-review-cart";
import { useGetReviewsQuery } from "@/features/review/review-api";
import { useEffect, useState } from "react";

const VendorReviewsPage: React.FC = () => {
  const [page, setPage] = useState(0);

  const { data, isLoading, error } = useGetReviewsQuery({
    page: page + 1,
    include: "product,reviewResponse",
  });

  useEffect(() => {
    setPage(0);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!data || data?.reviews.length === 0) {
    return (
      <div className="max-w-6xl mx-auto py-10 px-4 lg:px-8">
        {data?.reviews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg font-semibold text-gray-600">
              No reviews yet for your products.
            </p>
          </div>
        )}
      </div>
    );
  }
  if (error) {
    return (
      <div className="max-w-6xl mx-auto py-10 px-4 lg:px-8">
        {data?.reviews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg font-semibold text-rose-500">
              Error loading reviews.
            </p>
          </div>
        )}
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
    <div className="max-w-6xl mx-auto py-10 px-4 lg:px-8">
      <h1 className="text-3xl font-semibold text-gray-900 mb-8">
        Product Reviews
      </h1>

      <div className="space-y-8">
        {data?.reviews.map((review) => (
          <VendorReviewCard review={review} />
        ))}
      </div>

      <div className="flex items-center justify-end py-4 gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePagination("prev")}
          disabled={!pagination?.prevPage}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePagination("next")}
          disabled={!pagination?.nextPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default VendorReviewsPage;
