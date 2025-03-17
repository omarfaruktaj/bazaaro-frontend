import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Loading from "@/components/ui/loading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SingleOrder from "@/features/order/components/order-item";
import { useGetOrdersQuery } from "@/features/order/order-api";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  ClipboardIcon,
  Filter,
  Package,
  Search,
  ShoppingBag,
  TruckIcon,
} from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";

const MyOrders: React.FC = () => {
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [activeTab, setActiveTab] = useState("all");

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

  // Filter and sort orders
  const filteredOrders = data.orders.filter((order) => {
    // Filter by search term (order ID or product name)
    const matchesSearch =
      searchTerm === "" ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderItem.some((item) =>
        item.product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

    // Filter by status
    const matchesStatus =
      filterStatus === "all" || order.status === filterStatus;

    // Filter by tab
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "processing" &&
        ["PENDING", "PROCESSING"].includes(order.status)) ||
      (activeTab === "shipped" && order.status === "SHIPPED") ||
      (activeTab === "delivered" && order.status === "DELIVERED") ||
      (activeTab === "cancelled" && order.status === "CANCELLED");

    return matchesSearch && matchesStatus && matchesTab;
  });

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortBy === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else if (sortBy === "price-high") {
      return b.totalAmount - a.totalAmount;
    } else if (sortBy === "price-low") {
      return a.totalAmount - b.totalAmount;
    }
    return 0;
  });

  const handlePagination = (direction: "next" | "prev") => {
    if (direction === "next" && pagination?.nextPage) {
      setPage((prev) => prev + 1);
    } else if (direction === "prev" && pagination?.prevPage) {
      setPage((prev) => prev - 1);
    }
  };

  // Count orders by status
  const statusCounts = {
    processing: data.orders.filter((order) =>
      ["PENDING", "PROCESSING"].includes(order.status)
    ).length,
    shipped: data.orders.filter((order) => order.status === "SHIPPED").length,
    delivered: data.orders.filter((order) => order.status === "DELIVERED")
      .length,
    cancelled: data.orders.filter((order) => order.status === "CANCELLED")
      .length,
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-muted-foreground mt-1">
            Track, manage, and review your orders
          </p>
        </div>

        {/* Order Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-xl font-bold">{pagination.totalItem}</p>
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
                <p className="text-xl font-bold">{statusCounts.shipped}</p>
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
                <p className="text-xl font-bold">{statusCounts.delivered}</p>
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
                <p className="text-xl font-bold">
                  {data.orders[0]?.createdAt
                    ? new Date(data.orders[0].createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-lg mb-8">
          <CardHeader className="pb-0">
            <Tabs
              defaultValue="all"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-5 mb-4">
                <TabsTrigger value="all">
                  All Orders
                  <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                    {pagination.totalItem}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="processing">
                  Processing
                  <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                    {statusCounts.processing}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="shipped">
                  Shipped
                  <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                    {statusCounts.shipped}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="delivered">
                  Delivered
                  <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                    {statusCounts.delivered}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="cancelled">
                  Cancelled
                  <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                    {statusCounts.cancelled || 0}
                  </span>
                </TabsTrigger>
              </TabsList>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search orders by ID or product name..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="flex gap-2">
                  <div className="w-40">
                    <Select
                      value={filterStatus}
                      onValueChange={setFilterStatus}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="PROCESSING">Processing</SelectItem>
                        <SelectItem value="SHIPPED">Shipped</SelectItem>
                        <SelectItem value="DELIVERED">Delivered</SelectItem>
                        <SelectItem value="CANCELLED">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="w-40">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="price-high">
                          Price: High to Low
                        </SelectItem>
                        <SelectItem value="price-low">
                          Price: Low to High
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <TabsContent value="all" className="mt-0">
                {sortedOrders.length === 0 ? (
                  <div className="text-center py-12">
                    <Filter className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-500">
                      No orders match your filters
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sortedOrders.map((order) => (
                      <SingleOrder key={order.id} order={order} />
                    ))}
                  </div>
                )}
              </TabsContent>

              {["processing", "shipped", "delivered", "cancelled"].map(
                (tab) => (
                  <TabsContent key={tab} value={tab} className="mt-0">
                    {sortedOrders.length === 0 ? (
                      <div className="text-center py-12">
                        <p className="text-lg font-medium text-gray-500">
                          No {tab} orders found
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Check back later or try a different filter
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {sortedOrders.map((order) => (
                          <SingleOrder key={order.id} order={order} />
                        ))}
                      </div>
                    )}
                  </TabsContent>
                )
              )}
            </Tabs>
          </CardHeader>

          <CardContent className="pt-0">
            {pagination && (pagination.prevPage || pagination.nextPage) && (
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                <div className="text-sm text-muted-foreground">
                  Showing {sortedOrders.length} of {pagination.totalItem} orders
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

                  <div className="text-sm px-2">
                    Page {pagination.page} of {pagination.totalPage}
                  </div>

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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyOrders;
