import { DataTable } from "@/components/ui/data-tale";
import Loading from "@/components/ui/loading";
import { columns } from "@/features/order/components/table/columns";
import { useGetOrdersQuery } from "@/features/order/order-api";

export default function Orders() {
  const { data, isLoading } = useGetOrdersQuery(null);

  if (isLoading) return <Loading />;

  if (!data) return <p>No data found.</p>;

  return (
    <div className="py-10">
      <div className="flex items-start justify-between pb-8">
        <h1 className="text-2xl font-bold">Orders</h1>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
