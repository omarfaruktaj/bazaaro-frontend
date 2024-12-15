import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import SingleOrder from "@/features/order/components/order-item";
import { useGetOrdersQuery } from "@/features/order/order-api";
import { ClipboardIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const MyOrders: React.FC = () => {
  const [page, setPage] = useState(0);

  const { data, isLoading, error } = useGetOrdersQuery({
    page: page + 1,
    include: "orderItem.product.review",
  });

  useEffect(() => {
    setPage(0);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-12">
        <p className="text-lg font-medium">
          Error fetching orders. Please try again later.
        </p>
      </div>
    );
  }

  if (!data || data?.orders?.length === 0) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center text-center space-y-6 max-w-lg mx-auto">
        <div className="text-4xl text-primary">
          <ClipboardIcon className="h-16 w-16 text-primary" />
        </div>
        <p className="text-lg font-semibold">No orders available</p>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto">
          You currently have no orders. Once you place an order, it will appear
          here.
        </p>
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
      <h1 className="text-3xl font-semibold text-gray-900 mb-8">My Orders</h1>

      <div className="flex flex-col gap-8">
        {data?.orders.map((order) => (
          <SingleOrder key={order.id} order={order} />
        ))}
      </div>

      <div className="flex items-center justify-end py-4 gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePagination("prev")}
          disabled={!pagination.prevPage}
        >
          Previous
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePagination("next")}
          disabled={!pagination.nextPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default MyOrders;
