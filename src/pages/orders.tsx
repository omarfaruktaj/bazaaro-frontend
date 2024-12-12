import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-tale";
import Loading from "@/components/ui/loading";
import { columns } from "@/features/order/components/table/columns";
import { useGetOrdersQuery } from "@/features/order/order-api";
import { ClipboardIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function Orders() {
  const [page, setPage] = useState(0);

  const { data, isLoading, error } = useGetOrdersQuery({ page: page + 1 });

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
          You currently have no orders. Once place an order, it will appear
          here.
        </p>
      </div>
    );
  }

  const { pagination } = data;

  return (
    <div className="py-10 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      <div className="flex items-center justify-between pb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Orders</h1>
      </div>

      <div className="shadow-sm rounded-lg overflow-hidden bg-white">
        <DataTable columns={columns} data={data.orders} />
      </div>

      <div className="flex items-center justify-end py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={!pagination.prevPage}
        >
          Previous
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setPage((prev) => Math.min(prev + 1, pagination.totalPage - 1))
          }
          disabled={!pagination.nextPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
