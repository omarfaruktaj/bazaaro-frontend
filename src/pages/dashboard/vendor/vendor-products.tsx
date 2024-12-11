import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-tale";
import Loading from "@/components/ui/loading";
import { columns } from "@/features/product/components/table/columns";
import { useGetVendorProductsQuery } from "@/features/product/product-api";
import { useNavigate } from "react-router";

export default function VendorProducts() {
  const { data, isLoading } = useGetVendorProductsQuery(null);

  const navigate = useNavigate();
  if (isLoading) return <Loading />;

  if (!data) return <p>No data found.</p>;

  return (
    <div className="py-10">
      <div className="flex items-start justify-between pb-8">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button
          onClick={() => navigate("/vendor/products/create")}
          variant={"outline"}
          className="flex items-center  space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>New Product</span>
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
