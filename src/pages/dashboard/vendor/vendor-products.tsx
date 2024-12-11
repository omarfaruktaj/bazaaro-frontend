import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-tale";
import Loading from "@/components/ui/loading";
import { columns } from "@/features/product/components/table/columns";
import { useGetVendorProductsQuery } from "@/features/product/product-api";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";

export default function VendorProducts() {
  const { data, isLoading, error } = useGetVendorProductsQuery(null);
  const navigate = useNavigate();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-12">
        <p className="text-lg font-medium">
          Error fetching products. Please try again later.
        </p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center space-y-6 py-12">
        <p className="text-lg font-semibold text-gray-600">
          No products available
        </p>
        <Button
          onClick={() => navigate("/vendor/products/create")}
          variant="outline"
          className="w-full py-3 text-white bg-primary hover:bg-primary-dark focus:ring-2 focus:ring-primary rounded-lg shadow-lg transition-all"
        >
          <Plus className="h-5 w-5 text-white" />
          <span className="text-base font-medium">Create New Product</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="py-10 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      <div className="flex items-center justify-between pb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Products</h1>
        <Button
          onClick={() => navigate("/vendor/products/create")}
          variant="outline"
          className="flex items-center space-x-1 rounded-lg "
        >
          <Plus className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium">New Product</span>
        </Button>
      </div>

      <div className="shadow-sm rounded-lg overflow-hidden bg-white">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
