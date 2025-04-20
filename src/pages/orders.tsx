"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { columns } from "@/features/order/components/table/columns";
import { useGetOrdersQuery } from "@/features/order/order-api";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ClipboardIcon,
  CreditCard,
  Filter,
  Package,
  RefreshCcw,
  Search,
  ShoppingBag,
  TruckIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Orders() {
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPayment, setFilterPayment] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  const { data, isLoading, error, refetch } = useGetOrdersQuery({
    page: page + 1,
    include: "orderItem.product",
  });

  useEffect(() => {
    setPage(0);
  }, [filterStatus, filterPayment, searchTerm, activeTab]);

  // Filter orders based on search term, status, and payment status
  const filteredOrders = data?.orders
    ? data.orders.filter((order) => {
        const matchesSearch =
          searchTerm === "" ||
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.orderItem.some((item) =>
            item.product.name.toLowerCase().includes(searchTerm.toLowerCase())
          );

        const matchesStatus =
          filterStatus === "all" || order.status === filterStatus;
        const matchesPayment =
          filterPayment === "all" || order.paymentStatus === filterPayment;

        const matchesTab =
          activeTab === "all" ||
          (activeTab === "pending" && order.status === "PENDING") ||
          (activeTab === "processing" &&
            ["PAID", "PROCESSING"].includes(order.status)) ||
          (activeTab === "shipped" && order.status === "SHIPPED") ||
          (activeTab === "delivered" && order.status === "DELIVERED") ||
          (activeTab === "cancelled" && order.status === "CANCELLED");

        return matchesSearch && matchesStatus && matchesPayment && matchesTab;
      })
    : [];

  // Calculate order statistics
  const totalOrders = data?.pagination?.totalItem || 0;
  // const pendingOrders =
  //   data?.orders?.filter((order) => order.status === "PENDING").length || 0;
  // const processingOrders =
  //   data?.orders?.filter((order) =>
  //     ["PAID", "PROCESSING"].includes(order.status)
  //   ).length || 0;
  const shippedOrders =
    data?.orders?.filter((order) => order.status === "SHIPPED").length || 0;
  const deliveredOrders =
    data?.orders?.filter((order) => order.status === "DELIVERED").length || 0;
  const cancelledOrders =
    data?.orders?.filter((order) => order.status === "CANCELLED").length || 0;

  // Calculate total revenue
  const totalRevenue =
    data?.orders?.reduce((sum, order) => {
      if (order.paymentStatus === "PAID") {
        return sum + order.totalAmount;
      }
      return sum;
    }, 0) || 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <Loading />
          <p className="mt-4 text-muted-foreground">Loading your orders...</p>
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
          Unable to Load Orders
        </h2>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          We encountered a problem while fetching your orders. Please try again
          later.
        </p>
        <Button onClick={() => refetch()} className="flex items-center gap-2">
          <RefreshCcw className="h-4 w-4" />
          Retry
        </Button>
      </div>
    );
  }

  if (!data || data?.orders?.length === 0) {
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
            <ShoppingBag
              className="h-24 w-24 text-primary/40"
              strokeWidth={1.5}
            />
          </div>
          <div className="absolute -top-4 -right-4 bg-primary/10 p-3 rounded-full">
            <Package className="h-10 w-10 text-primary" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            No Orders Available
          </h1>
          <p className="text-gray-500 mb-6">
            You currently have no orders. Once you place an order, it will
            appear here.
          </p>
          <Button
            size="lg"
            className="px-8 shadow-md hover:shadow-lg transition-all duration-300"
          >
            Start Shopping
          </Button>
        </motion.div>
      </div>
    );
  }

  const { pagination } = data;
  console.log(data.orders);

  // Get the most recent order date
  const mostRecentOrderDate =
    data.orders.length > 0
      ? format(new Date(data.orders[0].createdAt), "MMM d, yyyy")
      : "N/A";

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
            <p className="text-gray-500 mt-1">Track and manage your orders</p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
            <Button className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Continue Shopping</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-xl font-bold">{totalOrders}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                <TruckIcon className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">In Transit</p>
                <p className="text-xl font-bold">{shippedOrders}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <ShoppingBag className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Delivered</p>
                <p className="text-xl font-bold">{deliveredOrders}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Recent Order</p>
                <p className="text-xl font-bold">{mostRecentOrderDate}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                <ClipboardIcon className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cancelled</p>
                <p className="text-xl font-bold">{cancelledOrders}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center">
              <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center mr-3">
                <CreditCard className="h-5 w-5 text-cyan-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-xl font-bold">${totalRevenue.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
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
                <TabsList className="bg-gray-100  flex-wrap">
                  <TabsTrigger value="all">All Orders</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="processing">Processing</TabsTrigger>
                  <TabsTrigger value="shipped">Shipped</TabsTrigger>
                  <TabsTrigger value="delivered">Delivered</TabsTrigger>
                  <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                </TabsList>

                <div className="flex gap-2 w-full sm:w-auto">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search orders..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 pr-4 py-2 w-full"
                    />
                  </div>

                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Order Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="PAID">Paid</SelectItem>
                      <SelectItem value="PROCESSING">Processing</SelectItem>
                      <SelectItem value="SHIPPED">Shipped</SelectItem>
                      <SelectItem value="DELIVERED">Delivered</SelectItem>
                      <SelectItem value="CANCELLED">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {filteredOrders.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12"
                  >
                    <Filter className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-500">
                      No orders match your filters
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Try adjusting your search or filter criteria
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm("");
                        setFilterStatus("all");
                        setFilterPayment("all");
                        setActiveTab("all");
                      }}
                      className="mt-4"
                    >
                      Clear Filters
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key={activeTab + filterStatus + filterPayment + searchTerm}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="rounded-lg border overflow-hidden">
                      <DataTable columns={columns} data={filteredOrders} />
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
              Showing {filteredOrders.length} of {pagination.totalItem} orders
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
