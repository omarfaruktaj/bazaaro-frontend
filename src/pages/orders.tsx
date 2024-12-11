import { DataTable } from "@/components/ui/data-tale";
import Loading from "@/components/ui/loading";
import { columns } from "@/features/order/components/table/columns";
import { useGetOrdersQuery } from "@/features/order/order-api";
import { ClipboardIcon } from "lucide-react";

export default function Orders() {
  const { data, isLoading, error } = useGetOrdersQuery(null);

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

  if (!data || data.length === 0) {
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

  return (
    <div className="py-10 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      <div className="flex items-center justify-between pb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Orders</h1>
      </div>

      <div className="shadow-sm rounded-lg overflow-hidden bg-white">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
