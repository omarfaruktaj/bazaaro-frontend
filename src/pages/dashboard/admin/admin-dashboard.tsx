import DashboardSkeleton from "@/components/skeletons/dashboardSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetOrdersQuery } from "@/features/order/order-api";
import { useGetPaymentsQuery } from "@/features/payment/payment-api";
import { useGetProductsQuery } from "@/features/product/product-api";
import { useGetUsersQuery } from "@/features/user/user-api";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Eye,
  MoreHorizontal,
  Package,
  ShoppingBag,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router";

const systemAlerts = [
  {
    type: "warning",
    title: "Low Stock Alert",
    message: "5 products are running low on inventory",
    time: "2 hours ago",
  },
  {
    type: "success",
    title: "Payment Processed",
    message: "Monthly subscription payment completed",
    time: "4 hours ago",
  },
  {
    type: "info",
    title: "New Vendor Registration",
    message: "TechStore has requested to join the platform",
    time: "6 hours ago",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AdminDashboard() {
  const { data: products, isLoading: isProductLoading } = useGetProductsQuery({
    limit: 10,
  });
  const { data: users, isLoading: isUserLoading } = useGetUsersQuery({});
  const { data: orders, isLoading: isOrderLoading } = useGetOrdersQuery({
    include: "orderItem.product",
    limit: 4,
  });
  const { data: payments, isLoading: isPaymentLoading } = useGetPaymentsQuery({
    include: "order",
  });
  const isLoading =
    isProductLoading || isUserLoading || isPaymentLoading || isOrderLoading;

  const navigate = useNavigate();
  if (isLoading) return <DashboardSkeleton />;

  const totalRevenue =
    payments?.payments.reduce((acc, payment) => acc + payment.amount, 0) ?? 0;

  const stats = [
    {
      title: "Total Revenue",
      value: isLoading ? "Loading..." : `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
    },
    {
      title: "Total Users",
      value: isLoading ? "Loading..." : users?.pagination.totalItem ?? "0",
      icon: Users,
    },
    {
      title: "Total Orders",
      value: isLoading ? "Loading..." : orders?.pagination.totalItem ?? "0",
      icon: ShoppingBag,
    },
    {
      title: "Active Products",
      value: isLoading ? "Loading..." : products?.pagination.totalItem ?? "0",
      icon: Package,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto space-y-6"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Welcome back! Here's what's happening with your platform.
            </p>
          </div>
          {/* <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Last 30 days
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div> */}
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat) => (
            <motion.div key={stat.title} variants={itemVariants}>
              <Card className="relative overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <div className="p-2 bg-primary/10 rounded-full">
                    <stat.icon className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center text-xs text-muted-foreground"></div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>
                      Latest customer orders and their status
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate("/dashboard/admin/orders")}
                  >
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders?.orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">
                          {order.id}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{order.userId}</div>
                            <div className="text-sm text-muted-foreground">
                              {/* {order.email} */}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {order.totalAmount}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              order.status === "DELIVERED"
                                ? "default"
                                : order.status === "PENDING"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {order.createdAt.toString()}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>Edit Order</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                Cancel Order
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>

          {/* System Alerts */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>System Alerts</CardTitle>
                <CardDescription>
                  Important notifications and updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {systemAlerts.map((alert, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                  >
                    <div className="mt-0.5">
                      {alert.type === "warning" && (
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                      )}
                      {alert.type === "success" && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                      {alert.type === "info" && (
                        <Clock className="h-4 w-4 text-blue-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{alert.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {alert.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {alert.time}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Analytics Section */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>
                Detailed insights into platform performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="products" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="products">Top Products</TabsTrigger>
                  {/* <TabsTrigger value="vendors">Top Vendors</TabsTrigger>
                  <TabsTrigger value="categories">Categories</TabsTrigger> */}
                </TabsList>
                <TabsContent value="products" className="space-y-4">
                  <div className="grid gap-4">
                    {products?.products.map((product) => (
                      <div
                        key={product.name}
                        className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={product.images[0] || "/placeholder.svg"}
                              alt={product.name}
                            />
                            <AvatarFallback>
                              {product.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {product.quantity} sales
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{product.price}</p>
                          <p className="text-sm text-green-500">
                            {product.discount}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="vendors" className="space-y-4">
                  <div className="text-center py-8 text-muted-foreground">
                    <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Vendor analytics will be displayed here</p>
                  </div>
                </TabsContent>
                <TabsContent value="categories" className="space-y-4">
                  <div className="text-center py-8 text-muted-foreground">
                    <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Category analytics will be displayed here</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
