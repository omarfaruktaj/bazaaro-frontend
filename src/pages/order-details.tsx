import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetOrdersQuery } from "@/features/order/order-api";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  ChevronRight,
  CircleDashed,
  Clock,
  CreditCard,
  Download,
  ExternalLink,
  HelpCircle,
  MapPin,
  Package,
  PackageCheck,
  Printer,
  Receipt,
  RefreshCw,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router";

// Helper function to get status color
const getStatusColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "PAID":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "PROCESSING":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "SHIPPED":
      return "bg-indigo-100 text-indigo-800 border-indigo-200";
    case "DELIVERED":
      return "bg-green-100 text-green-800 border-green-200";
    case "CANCELLED":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

// Helper function to get status icon
const getStatusIcon = (status: string) => {
  switch (status) {
    case "PENDING":
      return <Clock className="h-4 w-4" />;
    case "PAID":
      return <CreditCard className="h-4 w-4" />;
    case "PROCESSING":
      return <RefreshCw className="h-4 w-4" />;
    case "SHIPPED":
      return <Truck className="h-4 w-4" />;
    case "DELIVERED":
      return <PackageCheck className="h-4 w-4" />;
    case "CANCELLED":
      return <Package className="h-4 w-4" />;
    default:
      return <CircleDashed className="h-4 w-4" />;
  }
};

const getCurrentStep = (status: string) => {
  switch (status) {
    case "PENDING":
      return 0;
    case "PAID":
      return 1;
    case "PROCESSING":
      return 2;
    case "SHIPPED":
      return 3;
    case "DELIVERED":
      return 4;
    default:
      return 0;
  }
};

export default function OrderDetails() {
  const [activeTab, setActiveTab] = useState<"items" | "tracking" | "details">(
    "items"
  );
  const { orderId } = useParams();
  //   const { data: orderData, isLoading, error } = useGetOrderQuery(orderId!);

  const { data, isLoading, error } = useGetOrdersQuery({
    include: "orderItem.product",
  });

  if (isLoading) return <div className="p-8">Loading...</div>;
  if (error)
    return (
      <div className="p-8 text-red-600">Failed to load order details.</div>
    );

  const orderData = data?.orders.find((order) => order.id === orderId);

  if (!orderData)
    return (
      <div className="p-8 text-red-600">Failed to load order details.</div>
    );

  const currentStep = getCurrentStep(orderData.status);
  const subtotal = orderData.orderItem.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping: number = 0;
  const tax: number = 0;

  const orderSteps = [
    {
      id: "order_placed",
      label: "Order Placed",
      icon: <ShoppingBag className="h-5 w-5" />,
      date: orderData.createdAt,
    },
    {
      id: "payment_confirmed",
      label: "Payment Confirmed",
      icon: <CreditCard className="h-5 w-5" />,
      date: orderData.updatedAt,
    },
    {
      id: "processing",
      label: "Processing",
      icon: <Package className="h-5 w-5" />,
      date: null,
    },
    {
      id: "shipped",
      label: "Shipped",
      icon: <Truck className="h-5 w-5" />,
      date: null,
    },
    {
      id: "delivered",
      label: "Delivered",
      icon: <CheckCircle2 className="h-5 w-5" />,
      date: null,
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back button and order ID */}
        <div className="mb-6">
          <Button variant="ghost" size="sm" className="mb-2" asChild>
            <Link to={"/dashboard/vendor/orders"}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Orders
            </Link>
          </Button>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Receipt className="h-6 w-6 text-primary" />
                Order Details
              </h1>
              <p className="text-gray-500 mt-1 flex items-center gap-1">
                <span className="font-mono">
                  {orderData.id.substring(0, 8)}...
                </span>
                <span className="text-gray-400">•</span>
                <Calendar className="h-3.5 w-3.5" />
                <span>
                  {format(new Date(orderData.createdAt), "MMMM d, yyyy")}
                </span>
              </p>
            </div>
            <div className="flex gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9">
                      <Printer className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Print</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Print order details</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9">
                      <Download className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Download</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Download invoice</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Button size="sm" className="h-9">
                <HelpCircle className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Support</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Order summary card */}
        <Card className="mb-8 border-0 shadow-md overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 pb-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-3">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Order Summary
                    </h2>
                    <Badge className={getStatusColor(orderData.status)}>
                      {getStatusIcon(orderData.status)}
                      <span className="ml-1">{orderData.status}</span>
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {orderData.orderItem.reduce(
                      (sum, item) => sum + item.quantity,
                      0
                    )}{" "}
                    items from{" "}
                    <Link
                      to={`/shop/${orderData.shopId}`}
                      className="text-primary hover:underline"
                    >
                      Shop Name
                    </Link>
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-start sm:items-end gap-1">
                <div className="text-sm text-muted-foreground">
                  Estimated Delivery
                </div>
                <div className="flex items-center gap-1.5 text-gray-800 font-medium">
                  <Truck className="h-4 w-4 text-primary" />
                  {format(new Date(), "MMMM d, yyyy")}
                </div>
              </div>
            </div>
          </CardHeader>

          <div className="border-b">
            <div className="flex overflow-x-auto">
              <Button
                variant="ghost"
                className={`flex-1 rounded-none border-b-2 ${
                  activeTab === "items"
                    ? "border-primary"
                    : "border-transparent"
                }`}
                onClick={() => setActiveTab("items")}
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Items
              </Button>
              <Button
                variant="ghost"
                className={`flex-1 rounded-none border-b-2 ${
                  activeTab === "tracking"
                    ? "border-primary"
                    : "border-transparent"
                }`}
                onClick={() => setActiveTab("tracking")}
              >
                <Truck className="h-4 w-4 mr-2" />
                Tracking
              </Button>
              <Button
                variant="ghost"
                className={`flex-1 rounded-none border-b-2 ${
                  activeTab === "details"
                    ? "border-primary"
                    : "border-transparent"
                }`}
                onClick={() => setActiveTab("details")}
              >
                <Receipt className="h-4 w-4 mr-2" />
                Details
              </Button>
            </div>
          </div>

          <CardContent className="p-0">
            <AnimatePresence mode="wait">
              {activeTab === "items" && (
                <motion.div
                  key="items"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-6">
                    <div className="space-y-6">
                      {orderData.orderItem.map((item) => (
                        <div
                          key={item.id}
                          className="flex flex-col sm:flex-row gap-4 pb-6 border-b last:border-0 last:pb-0"
                        >
                          <div className="sm:w-24 sm:h-24 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                            <img
                              src={item.product.images[0] || "/placeholder.svg"}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                              <div>
                                <h3 className="font-medium text-gray-900 hover:text-primary transition-colors">
                                  <Link to={`/products/${item.product.id}`}>
                                    {item.product.name}
                                  </Link>
                                </h3>
                                <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                                  {item.product.description}
                                </p>
                                <div className="flex items-center gap-4 mt-2">
                                  <span className="text-sm text-gray-500">
                                    Qty: {item.quantity}
                                  </span>
                                  {(item?.product?.discount ?? 0) > 0 && (
                                    <Badge
                                      variant="outline"
                                      className="text-green-600 bg-green-50"
                                    >
                                      {item.product.discount}% OFF
                                    </Badge>
                                  )}
                                </div>
                              </div>

                              <div className="flex flex-col items-start sm:items-end mt-2 sm:mt-0">
                                <div className="font-medium text-gray-900">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </div>
                                {(item.product.discount ?? 0) > 0 && (
                                  <div className="text-sm text-gray-500 line-through">
                                    $
                                    {(
                                      (item.price /
                                        (1 -
                                          (item.product.discount ?? 0) / 100)) *
                                      item.quantity
                                    ).toFixed(2)}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex gap-2 mt-4">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 text-xs"
                                asChild
                              >
                                <Link to={`/products/${item.product.id}`}>
                                  View Product
                                </Link>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 text-xs"
                              >
                                <Star className="h-3.5 w-3.5 mr-1" />
                                Write Review
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "tracking" && (
                <motion.div
                  key="tracking"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="p-6"
                >
                  <div className="max-w-3xl mx-auto">
                    <div className="relative">
                      {/* Progress line */}
                      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

                      {/* Steps */}
                      {orderSteps.map((step, index) => (
                        <div key={step.id} className="relative mb-8 last:mb-0">
                          <div className="flex items-start">
                            {/* Step icon */}
                            <div
                              className={`
                              relative z-10 flex items-center justify-center w-12 h-12 rounded-full 
                              ${
                                index <= currentStep
                                  ? "bg-primary text-white"
                                  : "bg-gray-100 text-gray-400 border border-gray-200"
                              }
                            `}
                            >
                              {step.icon}
                            </div>

                            {/* Step content */}
                            <div className="ml-4 flex-1">
                              <h3
                                className={`font-medium ${
                                  index <= currentStep
                                    ? "text-gray-900"
                                    : "text-gray-500"
                                }`}
                              >
                                {step.label}
                              </h3>

                              {step.date ? (
                                <p className="text-sm text-gray-500 mt-1">
                                  {format(
                                    new Date(step.date),
                                    "MMMM d, yyyy 'at' h:mm a"
                                  )}
                                </p>
                              ) : (
                                <p className="text-sm text-gray-400 mt-1">
                                  {index <= currentStep
                                    ? "In progress"
                                    : "Pending"}
                                </p>
                              )}

                              {index === 3 && currentStep >= 3 && (
                                <div className="mt-3 bg-gray-50 p-3 rounded-md border border-gray-100">
                                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <Truck className="h-4 w-4 text-primary" />
                                    Tracking Information
                                  </div>
                                  <div className="mt-2 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-gray-500">
                                        Carrier:
                                      </span>
                                      <span className="font-medium">FedEx</span>
                                    </div>
                                    <div className="flex justify-between mt-1">
                                      <span className="text-gray-500">
                                        Tracking Number:
                                      </span>
                                      <span className="font-medium font-mono">
                                        FX123456789
                                      </span>
                                    </div>
                                  </div>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full mt-3 text-xs h-8"
                                  >
                                    <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                                    Track Package
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "details" && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="p-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Shipping Information */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-gray-500" />
                        Shipping Information
                      </h3>

                      {/* <Card className="border-gray-200">
                        <CardContent className="p-4">
                          <div className="space-y-1.5">
                            <p className="font-medium">John Doe</p>
                            <p>{orderData.shippingAddress.street}</p>
                            <p>
                              {orderData.shippingAddress.city},{" "}
                              {orderData.shippingAddress.state}{" "}
                              {orderData.shippingAddress.zipCode}
                            </p>
                            <p>{orderData.shippingAddress.country}</p>
                            <p className="text-gray-500">+1 (555) 123-4567</p>
                          </div>
                        </CardContent>
                      </Card> */}
                    </div>

                    {/* Payment Information */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-gray-500" />
                        Payment Information
                      </h3>

                      <Card className="border-gray-200">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-500">
                                Payment Method:
                              </span>
                              <span className="font-medium">
                                {orderData.paymentMethod || "N/A"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">
                                Payment Status:
                              </span>
                              <Badge
                                className={getStatusColor(
                                  orderData.paymentStatus || "PENDING"
                                )}
                              >
                                {orderData.paymentStatus || "PENDING"}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">
                                Transaction ID:
                              </span>
                              <span className="font-mono text-sm">
                                TXN123456789
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">
                                Payment Date:
                              </span>
                              <span>
                                {format(
                                  new Date(orderData.updatedAt),
                                  "MMM d, yyyy"
                                )}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-gray-500" />
                      Additional Information
                    </h3>

                    <Card className="border-gray-200">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Order ID:</span>
                            <span className="font-mono text-sm">
                              {orderData.id}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Order Date:</span>
                            <span>
                              {format(
                                new Date(orderData.createdAt),
                                "MMMM d, yyyy"
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Order Status:</span>
                            <Badge className={getStatusColor(orderData.status)}>
                              {orderData.status}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Shop:</span>
                            <Link
                              to={`/shop/${orderData.shopId}`}
                              className="text-primary hover:underline"
                            >
                              View Shop{" "}
                              <ChevronRight className="inline h-3 w-3" />
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>

          <CardFooter className="bg-gray-50 border-t p-6">
            <div className="w-full max-w-md ml-auto">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Discount</span>
                  <span className="text-green-600">
                    -${orderData.discount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {tax > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                )}
                <Separator className="my-2" />
                <div className="flex justify-between font-medium text-base">
                  <span>Total</span>
                  <span>${orderData.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>

        {/* Recommended products section could go here */}

        {/* Help and support section */}
        <div className="mt-8 bg-primary/5 rounded-lg p-6 border border-primary/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                Need Help With Your Order?
              </h3>
              <p className="text-gray-500 mt-1">
                Our customer support team is available 24/7 to assist you with
                any questions or concerns about your order.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-primary/20">
                <HelpCircle className="h-4 w-4 mr-2" />
                FAQs
              </Button>
              <Button>Contact Support</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
