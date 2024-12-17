import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-tale";
import Loading from "@/components/ui/loading";
import { paymentColumns } from "@/features/payment/components/table/columns";
import { useGetPaymentsQuery } from "@/features/payment/payment-api";
import { useEffect, useState } from "react";

export default function AdminPayment() {
  const [page, setPage] = useState(0);

  const { data, isLoading, error } = useGetPaymentsQuery({ page: page + 1 });

  useEffect(() => {
    setPage(0);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className=" flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium text-center text-red-600 py-12">
          Error fetching payments. Please try again later.
        </p>
      </div>
    );
  }

  if (!data || data?.payments?.length === 0) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center text-center space-y-6 max-w-md mx-auto px-4">
        <div className="flex justify-center max-w-xs"></div>

        <div>
          <h1 className="text-lg font-semibold text-primary">
            Looks like there is no payments!{" "}
          </h1>
        </div>
      </div>
    );
  }

  const { pagination } = data;

  return (
    <div className="py-10 px-6 sm:px-8 lg:px-12 ">
      <div className="flex items-center justify-between pb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Payments</h1>
      </div>

      <div className="shadow-sm rounded-lg overflow-hidden bg-white">
        <DataTable columns={paymentColumns} data={data.payments} />
      </div>

      <div className="flex items-center justify-end py-4 gap-4">
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
