import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-tale";
import { Input } from "@/components/ui/input";
import Loading from "@/components/ui/loading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { selectUser } from "@/features/auth/auth-slice";
import { userPaymentColumns } from "@/features/payment/components/table/user-table-columns";
import { useGetPaymentsQuery } from "@/features/payment/payment-api";
import { useAppSelector } from "@/redux/hooks";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  DollarSign,
  Filter,
  RefreshCcw,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function PaymentTab() {
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterMethod, setFilterMethod] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  const { data, isLoading, error, refetch } = useGetPaymentsQuery({
    page: page + 1,
    include: "order",
  });

  useEffect(() => {
    setPage(0);
  }, [filterStatus, filterMethod, searchTerm, activeTab]);

  const user = useAppSelector(selectUser);

  if (!user?.profile) {
    return null;
  }

  const paymentData =
    data?.payments.filter((payment) => payment.userId === user.id) || [];
  const filteredPayments = paymentData
    ? paymentData.filter((payment) => {
        const matchesSearch =
          searchTerm === "" ||
          payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (payment.orderId &&
            payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesStatus =
          filterStatus === "all" || payment.paymentStatus === filterStatus;
        const matchesMethod =
          filterMethod === "all" || payment.paymentMethod === filterMethod;

        const matchesTab =
          activeTab === "all" ||
          (activeTab === "pending" && payment.paymentStatus === "PENDING") ||
          (activeTab === "paid" && payment.paymentStatus === "PAID") ||
          (activeTab === "failed" && payment.paymentStatus === "FAILED");

        return matchesSearch && matchesStatus && matchesMethod && matchesTab;
      })
    : [];

  const totalPayments = data?.pagination?.totalItem || 0;

  const paymentMethods = data?.payments
    ? [...new Set(data.payments.map((payment) => payment.paymentMethod))]
    : [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <Loading />
          <p className="mt-4 text-muted-foreground">Loading payment data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
        <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-4">
          <AlertCircle className="h-10 w-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Unable to Load Payments
        </h2>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          We encountered a problem while fetching payment data. Please try again
          later.
        </p>
        <Button onClick={() => refetch()} className="flex items-center gap-2">
          <RefreshCcw className="h-4 w-4" />
          Retry
        </Button>
      </div>
    );
  }
  if (!data || data?.payments?.length === 0) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center text-center space-y-8 max-w-md mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-48 h-48 relative"
        >
          <div className="absolute inset-0 bg-primary/5 rounded-full"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <CreditCard
              className="h-24 w-24 text-primary/40"
              strokeWidth={1.5}
            />
          </div>
          <div className="absolute -top-4 -right-4 bg-primary/10 p-3 rounded-full">
            <DollarSign className="h-10 w-10 text-primary" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            No Payments Available
          </h1>
          <p className="text-gray-500 mb-6">
            There are currently no payment records in the system.
          </p>
          <Button
            size="lg"
            className="px-8 shadow-md hover:shadow-lg transition-all duration-300"
          >
            Go to Dashboard
          </Button>
        </motion.div>
      </div>
    );
  }

  const { pagination } = data;

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">All Payments</h1>
            <p className="text-gray-500 mt-1">{totalPayments} payments found</p>
          </div>
        </div>

        <Card className="border-0 shadow-lg mb-8">
          <div className="bg-white p-6 rounded-t-lg border-b">
            <Tabs
              defaultValue="all"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <TabsList className="bg-gray-100">
                  <TabsTrigger value="all">All Payments</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="paid">Paid</TabsTrigger>
                  <TabsTrigger value="failed">Failed</TabsTrigger>
                </TabsList>

                <div className="flex gap-2 w-full sm:w-auto">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search by ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 pr-4 py-2 w-full"
                    />
                  </div>

                  <Select value={filterMethod} onValueChange={setFilterMethod}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Payment Method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Methods</SelectItem>
                      {paymentMethods.map((method) => (
                        <SelectItem key={method} value={method}>
                          {method}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {filteredPayments.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12"
                  >
                    <Filter className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-500">
                      No payments match your filters
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Try adjusting your search or filter criteria
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm("");
                        setFilterStatus("all");
                        setFilterMethod("all");
                        setActiveTab("all");
                      }}
                      className="mt-4"
                    >
                      Clear Filters
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key={activeTab + filterStatus + filterMethod + searchTerm}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="rounded-lg border overflow-hidden">
                      <DataTable
                        columns={userPaymentColumns}
                        data={filteredPayments}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Tabs>
          </div>
        </Card>

        {pagination && (pagination.prevPage || pagination.nextPage) && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-muted-foreground">
              Showing {filteredPayments.length} of {pagination.totalItem}{" "}
              payments
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                disabled={!pagination.prevPage}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Previous</span>
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: pagination.totalPage }, (_, i) => (
                  <Button
                    key={i}
                    variant={i === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPage(i)}
                    className="w-8 h-8 p-0"
                  >
                    {i + 1}
                  </Button>
                )).slice(
                  Math.max(0, page - 2),
                  Math.min(pagination.totalPage, page + 3)
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setPage((prev) =>
                    Math.min(prev + 1, pagination.totalPage - 1)
                  )
                }
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
    </div>
  );
}
