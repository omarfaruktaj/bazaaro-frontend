"use client";

import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import SingleOrder from "@/features/order/components/order-item";
import { useGetOrdersQuery } from "@/features/order/order-api";
import {
  ChevronLeft,
  ChevronRight,
  ClipboardIcon,
  ShoppingBag,
} from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";

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
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-4">
        <div className="rounded-full bg-red-100 p-3">
          <ClipboardIcon className="h-8 w-8 text-red-500" />
        </div>
        <p className="text-lg font-medium text-red-600">
          Error fetching orders
        </p>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto">
          We couldn't load your orders. Please try again later.
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

  if (!data || !data?.orders?.length) {
    return (
      <div className="container flex flex-col min-h-[70vh] items-center justify-center text-center space-y-6 max-w-lg mx-auto px-4">
        <div className="rounded-full bg-primary/10 p-6">
          <ShoppingBag className="h-12 w-12 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold">No orders yet</h2>
        <p className="text-muted-foreground max-w-xs mx-auto">
          You currently have no orders. Once you place an order, it will appear
          here.
        </p>
        <Button className="mt-4">Start Shopping</Button>
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
        <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
        <div className="text-sm text-muted-foreground">
          Showing {data.orders.length} of {pagination.totalItem} orders
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {data?.orders.map((order) => (
          <SingleOrder key={order.id} order={order} />
        ))}
      </div>

      {pagination && (pagination.prevPage || pagination.nextPage) && (
        <div className="flex items-center justify-center sm:justify-between mt-8 border-t pt-6">
          <div className="hidden sm:block text-sm text-muted-foreground">
            Page {pagination.page} of {pagination.totalPage}
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

export default MyOrders;
