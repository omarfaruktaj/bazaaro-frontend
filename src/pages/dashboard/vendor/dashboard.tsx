"use client";

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
import { useGetOrdersQuery } from "@/features/order/order-api";
import { useGetProductsQuery } from "@/features/product/product-api";
import { useGetReviewsQuery } from "@/features/review/review-api";
import { useGetMyShopsQuery } from "@/features/shop/shop-api";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Eye,
  MoreHorizontal,
  Package,
  Plus,
  ShoppingBag,
  ShoppingCart,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router";

const notifications = [
  {
    type: "success",
    title: "Order Completed",
    message: "Order #ORD-001 has been delivered successfully",
    time: "2 hours ago",
  },
  {
    type: "warning",
    title: "Low Stock Alert",
    message: "Laptop Stand is running low on inventory (8 left)",
    time: "4 hours ago",
  },
  {
    type: "info",
    title: "New Review",
    message: "You received a 5-star review for Wireless Headphones",
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

export default function VendorDashboard() {
  const { data: shop, isLoading: isShopLoading } = useGetMyShopsQuery(null);
  const page = 0;

  const { data: products, isLoading: isProductLoading } = useGetProductsQuery(
    {
      shopId: shop?.id as string,
    },
    {
      skip: !shop?.id,
    }
  );

  const { data: orders, isLoading: isOrderLoading } = useGetOrdersQuery({
    include: "orderItem.product",
    limit: 4,
  });

  const { data: reviews, isLoading: isReviewsLoading } = useGetReviewsQuery({
    page: page + 1,
    include: "product,shop",
  });

  const isLoading =
    isProductLoading || isShopLoading || isOrderLoading || isReviewsLoading;

  const averageRating = reviews?.reviews?.length
    ? reviews?.reviews?.length > 0
      ? reviews.reviews.reduce((acc, review) => acc + review.rating, 0) /
        reviews.reviews.length
      : 0
    : 0;
  const totalRevenue = orders?.orders?.length
    ? orders.orders
        .map((order) =>
          order.orderItem.reduce(
            (total, current) => total + current.price * current.quantity,
            0
          )
        )
        .reduce((acc, curr) => acc + curr, 0)
    : 0;

  const vendorStats = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
    },

    {
      title: "Total Orders",
      value: orders?.pagination?.totalItem ?? "0",
      icon: ShoppingBag,
    },

    {
      title: "Products Listed",
      value: products?.pagination?.totalItem ?? "0",
      icon: Package,
    },
    {
      title: "Average Rating",
      value: averageRating.toFixed(1),
      icon: Star,
    },
  ];

  const navigate = useNavigate();
  if (isLoading) return <DashboardSkeleton />;
  // const { data: shop, isLoading: isShopLoading } = useGetMyShopsQuery(null);

  // const { data: products, isLoading: isProductLoading } = useGetProductsQuery(
  //   {
  //     shopId: shop?.id as string,
  //   },
  //   {
  //     skip: !shop?.id,
  //   }
  // );
  // const { data: orders, isLoading: isOrderLoading } = useGetOrdersQuery({
  //   include: "orderItem.product",
  //   limit: 4,
  // });
  // const { data: payments, isLoading: isPaymentLoading } = useGetPaymentsQuery({
  //   include: "order",
  // });
  // const { data: reviews, isLoading: isReviewsLoading } = useGetReviewsQuery({
  //   page: page + 1,
  //   include: "product,shop",
  // });
  // const isLoading =
  //   isProductLoading ||
  //   isShopLoading ||
  //   isPaymentLoading ||
  //   isOrderLoading ||
  //   isReviewsLoading;

  // const navigate = useNavigate();
  // if (isLoading) return <DashboardSkeleton />;

  // const totalReviews = reviews?.pagination.totalItem || reviews?.reviews.length;
  // const averageRating =
  //   reviews?.reviews.reduce((acc, review) => acc + review.rating, 0) /
  //   reviews?.reviews.length;

  // const totalRevenue =
  //   payments?.payments.reduce((acc, payment) => acc + payment.amount, 0) ?? 0;

  // const stats = [
  //   {
  //     title: "Total Revenue",
  //     value: isLoading ? "Loading..." : `$${totalRevenue.toFixed(2)}`,
  //     icon: DollarSign,
  //   },
  //   {
  //     title: "Total Users",
  //     // value: isLoading ? "Loading..." : users?.pagination.totalItem ?? "0",
  //     icon: Users,
  //   },
  //   {
  //     title: "Total Orders",
  //     value: isLoading ? "Loading..." : orders?.pagination.totalItem ?? "0",
  //     icon: ShoppingBag,
  //   },
  //   {
  //     title: "Active Products",
  //     value: isLoading ? "Loading..." : products?.pagination.totalItem ?? "0",
  //     icon: Package,
  //   },
  //   {
  //     title: "Products Listed",
  //     value: isLoading ? "Loading..." : products?.pagination.totalItem ?? "0",
  //     icon: Package,
  //     description: "new this month",
  //   },
  //   {
  //     title: "Average Rating",
  //     value: "4.8",
  //     change: "+0.2",
  //     trend: "up",
  //     icon: Star,
  //     description: "from last month",
  //   },
  // ];
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
              Vendor Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your store and track your performance.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              onClick={() => navigate("/dashboard/vendor/products/create")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {vendorStats.map((stat) => (
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

        {/* Quick Actions */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Frequently used actions to manage your store
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2 bg-transparent"
                  size="sm"
                  onClick={() => navigate("/dashboard/vendor/products/create")}
                >
                  <Plus className="h-5 w-5" />
                  <span className="text-sm">Add Product</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2 bg-transparent"
                  size="sm"
                  onClick={() => navigate("/dashboard/vendor/orders")}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="text-sm">View Orders</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2 bg-transparent"
                  size="sm"
                  onClick={() => navigate("/dashboard/vendor/products")}
                >
                  <Package className="h-5 w-5" />
                  <span className="text-sm">View Products</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2 bg-transparent"
                  size="sm"
                  onClick={() => navigate("/dashboard/vendor/reviews")}
                >
                  <Star className="h-5 w-5" />
                  <span className="text-sm">Reviews</span>
                </Button>
              </div>
            </CardContent>
          </Card>
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
                      Latest orders from your customers
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
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
                      <TableHead>Product</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders?.orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">
                          {order.id}
                        </TableCell>
                        <TableCell>{order.userId}</TableCell>
                        <TableCell>{order.orderItem[0].product.name}</TableCell>
                        <TableCell className="font-medium">
                          {order.totalAmount}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              order.status === "PAID"
                                ? "default"
                                : order.status === "PENDING"
                                ? "secondary"
                                : order.status === "SHIPPED"
                                ? "outline"
                                : "destructive"
                            }
                          >
                            {order.status}
                          </Badge>
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
                              <DropdownMenuItem>Update Status</DropdownMenuItem>
                              <DropdownMenuItem>
                                Contact Customer
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

          {/* Notifications */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Important updates and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {notifications.map((notification, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                  >
                    <div className="mt-0.5">
                      {notification.type === "warning" && (
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                      )}
                      {notification.type === "success" && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                      {notification.type === "info" && (
                        <Clock className="h-4 w-4 text-blue-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">
                        {notification.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Product Performance */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
              <CardDescription>
                Your top-performing products and their metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {products?.products.map((product) => (
                  <div
                    key={product.name}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
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
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Stock: {product.quantity}</span>
                          {/* <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{product.review}</span>
                          </div> */}
                        </div>
                      </div>
                    </div>
                    {/* <div className="text-right">
                      <p className="font-medium text-lg">{product.revenue}</p>
                      <Progress
                        value={(product.stock / 50) * 100}
                        className="w-20 h-2 mt-1"
                      />
                    </div> */}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
