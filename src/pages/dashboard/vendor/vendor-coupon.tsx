import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-tale";
import Loading from "@/components/ui/loading";
import { columns } from "@/features/coupon/components/table/columns";
import { useGetCouponsQuery } from "@/features/coupon/coupon-api";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";

export default function VendorCoupon() {
  const { data, isLoading, error } = useGetCouponsQuery(null);
  const navigate = useNavigate();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        <p className="text-lg font-medium">
          Error fetching data. Please try again later.
        </p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center text-center  space-y-6 max-w-md mx-auto">
        <div className="text-4xl text-primary">
          <Plus className="h-16 w-16 text-primary" />
        </div>
        <p className="text-lg font-semibold">No coupons available</p>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto">
          It looks like you don’t have any coupons yet. Start by creating your
          first one now.
        </p>
        <Button
          onClick={() => navigate("/dashboard/vendor/coupons/create")}
          variant="default"
          className="w-full py-3 flex items-center justify-center space-x-3 text-white bg-primary hover:bg-primary-dark border-0 rounded-lg shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <Plus className="h-5 w-5 text-white" />
          <span className="text-base font-medium">Create New Coupon</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="py-8 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      <div className="flex items-center justify-between pb-6">
        <h1 className="text-3xl font-semibold text-gray-900">Coupons</h1>
        <Button
          onClick={() => navigate("/dashboard/vendor/coupons/create")}
          variant="outline"
          className="flex items-center space-x-1 rounded-lg "
        >
          <Plus className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium">New Coupon</span>
        </Button>
      </div>

      <div className="shadow-sm rounded-lg overflow-hidden bg-white">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
