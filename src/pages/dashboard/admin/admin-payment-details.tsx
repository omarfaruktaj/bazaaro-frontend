import BackButton from "@/components/ui/back-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetPaymentsQuery } from "@/features/payment/payment-api";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowUpRight,
  Calendar,
  CheckCircle,
  Clock,
  Copy,
  CreditCard,
  DollarSign,
  Download,
  ExternalLink,
  FileText,
  HelpCircle,
  Info,
  Package,
  Printer,
  Receipt,
  RefreshCw,
  Shield,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router";

const getPaymentMethodIcon = (method: string) => {
  switch (method.toUpperCase()) {
    case "STRIPE":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-blue-500"
        >
          <path d="M2 12h20M2 18h20M2 6h20" />
        </svg>
      );
    case "PAYPAL":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-blue-700"
        >
          <path d="M7 11l4-7h5.5a3 3 0 0 1 3 3v1a3 3 0 0 1-3 3H7m0 0l-2 7h5.5a3 3 0 0 0 3-3v-1a3 3 0 0 0-3-3H7" />
        </svg>
      );
    default:
      return <CreditCard className="h-5 w-5 text-gray-500" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status.toUpperCase()) {
    case "PENDING":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "PAID":
      return "bg-green-100 text-green-800 border-green-200";
    case "FAILED":
      return "bg-red-100 text-red-800 border-red-200";
    case "REFUNDED":
      return "bg-purple-100 text-purple-800 border-purple-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

// Helper function to get status icon
const getStatusIcon = (status: string) => {
  switch (status.toUpperCase()) {
    case "PENDING":
      return <Clock className="h-4 w-4" />;
    case "PAID":
      return <CheckCircle className="h-4 w-4" />;
    case "FAILED":
      return <AlertCircle className="h-4 w-4" />;
    case "REFUNDED":
      return <RefreshCw className="h-4 w-4" />;
    default:
      return <Info className="h-4 w-4" />;
  }
};

// Payment timeline events

export default function AdminPaymentDetails() {
  const [activeTab, setActiveTab] = useState<
    "details" | "receipt" | "security"
  >("details");
  const [isCopied, setIsCopied] = useState(false);
  const { data, isLoading, error } = useGetPaymentsQuery({
    include: "order",
  });

  const { paymentId } = useParams();

  const paymentData = data?.payments?.find(
    (payment) => payment.id === paymentId
  );

  // Function to copy transaction ID to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const paymentTimeline = paymentData
    ? [
        {
          id: "payment_initiated",
          title: "Payment Initiated",
          description: "Payment process started",
          timestamp: new Date(paymentData.createdAt),
          icon: <CreditCard className="h-5 w-5" />,
        },
        {
          id: "payment_processed",
          title: "Payment Processed",
          description: `Processed via ${paymentData.paymentMethod}`,
          timestamp: new Date(
            new Date(paymentData.createdAt).getTime() + 30000
          ), // 30 seconds later
          icon: <RefreshCw className="h-5 w-5" />,
        },
        {
          id: "payment_completed",
          title: "Payment Completed",
          description: "Transaction successful",
          timestamp: new Date(paymentData.updatedAt),
          icon: <CheckCircle className="h-5 w-5" />,
        },
      ]
    : [];

  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-6">
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-10 w-64 mb-1" />
            <Skeleton className="h-5 w-48" />
          </div>
          <Card className="border-0 shadow-md overflow-hidden">
            <CardHeader className="pb-6">
              <Skeleton className="h-24 w-full" />
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-6">
              <AlertCircle className="h-10 w-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Unable to Load Payment Details
            </h2>
            <p className="text-gray-600 mb-6 max-w-md">
              We encountered a problem while fetching the payment information.
              Please try again later.
            </p>
            <Button className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }
  if (!paymentData) {
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
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back button and payment ID */}
        <div className="mb-6">
          <BackButton />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Receipt className="h-6 w-6 text-primary" />
                Payment Details
              </h1>
              <p className="text-gray-500 mt-1 flex items-center gap-1">
                <span className="font-mono">
                  {paymentData.id.substring(0, 8)}...
                </span>
                <span className="text-gray-400">•</span>
                <Calendar className="h-3.5 w-3.5" />
                <span>
                  {format(new Date(paymentData.createdAt), "MMMM d, yyyy")}
                </span>
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-9">
                <Download className="h-4 w-4 mr-2" />
                <span>Receipt</span>
              </Button>
              <Button size="sm" className="h-9">
                <HelpCircle className="h-4 w-4 mr-2" />
                <span>Support</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Payment summary card */}
        <Card className="mb-8 border-0 shadow-md overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 pb-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-3">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Payment Summary
                    </h2>
                    <Badge
                      className={getStatusColor(paymentData.paymentStatus)}
                    >
                      {getStatusIcon(paymentData.paymentStatus)}
                      <span className="ml-1">{paymentData.paymentStatus}</span>
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Transaction ID:{" "}
                    <span className="font-mono">
                      {paymentData.transactionId.substring(0, 12)}
                      ...
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-start sm:items-end gap-1">
                <div className="text-sm text-muted-foreground">Amount</div>
                <div className="text-2xl font-bold text-gray-800">
                  ${paymentData.amount.toFixed(2)}
                </div>
              </div>
            </div>
          </CardHeader>

          <div className="border-b">
            <div className="flex overflow-x-auto">
              <Button
                variant="ghost"
                className={`flex-1 rounded-none border-b-2 ${
                  activeTab === "details"
                    ? "border-primary"
                    : "border-transparent"
                }`}
                onClick={() => setActiveTab("details")}
              >
                <FileText className="h-4 w-4 mr-2" />
                Details
              </Button>
              <Button
                variant="ghost"
                className={`flex-1 rounded-none border-b-2 ${
                  activeTab === "receipt"
                    ? "border-primary"
                    : "border-transparent"
                }`}
                onClick={() => setActiveTab("receipt")}
              >
                <Receipt className="h-4 w-4 mr-2" />
                Receipt
              </Button>
              <Button
                variant="ghost"
                className={`flex-1 rounded-none border-b-2 ${
                  activeTab === "security"
                    ? "border-primary"
                    : "border-transparent"
                }`}
                onClick={() => setActiveTab("security")}
              >
                <Shield className="h-4 w-4 mr-2" />
                Security
              </Button>
            </div>
          </div>

          <CardContent className="p-0">
            <AnimatePresence mode="wait">
              {activeTab === "details" && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Transaction Details */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                          <FileText className="h-5 w-5 text-gray-500" />
                          Transaction Details
                        </h3>

                        <Card className="border-gray-200">
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-gray-500">
                                  Transaction ID:
                                </span>
                                <div className="flex items-center gap-1">
                                  <span className="font-mono text-sm">
                                    {paymentData.transactionId}
                                  </span>
                                  <TooltipProvider>
                                    <Tooltip open={isCopied}>
                                      <TooltipTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-6 w-6"
                                          onClick={() =>
                                            copyToClipboard(
                                              paymentData.transactionId
                                            )
                                          }
                                        >
                                          <Copy className="h-3.5 w-3.5" />
                                          <span className="sr-only">
                                            Copy transaction ID
                                          </span>
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>
                                          {isCopied
                                            ? "Copied!"
                                            : "Copy to clipboard"}
                                        </p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Date:</span>
                                <span>
                                  {format(
                                    new Date(paymentData.createdAt),
                                    "MMMM d, yyyy 'at' h:mm a"
                                  )}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Status:</span>
                                <Badge
                                  className={getStatusColor(
                                    paymentData.paymentStatus
                                  )}
                                >
                                  {paymentData.paymentStatus}
                                </Badge>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">
                                  Payment Method:
                                </span>
                                <div className="flex items-center gap-1.5">
                                  {getPaymentMethodIcon(
                                    paymentData.paymentMethod
                                  )}
                                  <span>{paymentData.paymentMethod}</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Order Information */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                          <Package className="h-5 w-5 text-gray-500" />
                          Order Information
                        </h3>

                        <Card className="border-gray-200">
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-gray-500">Order ID:</span>
                                <Link
                                  to={`/orders/${paymentData.orderId}`}
                                  className="font-mono text-sm text-primary hover:underline flex items-center gap-1"
                                >
                                  {paymentData.orderId.substring(0, 8)}...
                                  <ExternalLink className="h-3.5 w-3.5" />
                                </Link>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">
                                  Order Date:
                                </span>
                                <span>
                                  {format(
                                    new Date(paymentData.order.createdAt),
                                    "MMMM d, yyyy"
                                  )}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">
                                  Order Status:
                                </span>
                                <Badge
                                  className={getStatusColor(
                                    paymentData.order.status
                                  )}
                                >
                                  {paymentData.order.status}
                                </Badge>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">
                                  Order Total:
                                </span>
                                <span>
                                  ${paymentData.order.totalAmount.toFixed(2)}
                                </span>
                              </div>
                              {paymentData.order.discount > 0 && (
                                <div className="flex justify-between">
                                  <span className="text-gray-500">
                                    Discount Applied:
                                  </span>
                                  <span className="text-green-600">
                                    -${paymentData.order.discount.toFixed(2)}
                                  </span>
                                </div>
                              )}
                            </div>
                          </CardContent>
                          <CardFooter className="bg-gray-50 p-3 border-t">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                              asChild
                            >
                              <Link to={`/orders/${paymentData.orderId}`}>
                                <Package className="h-4 w-4 mr-2" />
                                View Order Details
                              </Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      </div>
                    </div>

                    {/* Payment Timeline */}
                    <div className="mt-8">
                      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                        <Clock className="h-5 w-5 text-gray-500" />
                        Payment Timeline
                      </h3>

                      <Card className="border-gray-200">
                        <CardContent className="p-4">
                          <div className="relative">
                            {/* Progress line */}
                            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

                            {/* Timeline events */}
                            {paymentTimeline.map((event, index) => (
                              <div
                                key={event.id}
                                className="relative mb-6 last:mb-0"
                              >
                                <div className="flex items-start">
                                  {/* Event icon */}
                                  <div
                                    className={`
                                    relative z-10 flex items-center justify-center w-12 h-12 rounded-full 
                                    ${
                                      index === paymentTimeline.length - 1
                                        ? "bg-primary text-white"
                                        : "bg-gray-100 text-gray-500 border border-gray-200"
                                    }
                                  `}
                                  >
                                    {event.icon}
                                  </div>

                                  {/* Event content */}
                                  <div className="ml-4 flex-1">
                                    <h4
                                      className={`font-medium ${
                                        index === paymentTimeline.length - 1
                                          ? "text-gray-900"
                                          : "text-gray-700"
                                      }`}
                                    >
                                      {event.title}
                                    </h4>
                                    <p className="text-sm text-gray-500 mt-1">
                                      {event.description}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                      {format(
                                        event.timestamp,
                                        "MMMM d, yyyy 'at' h:mm:ss a"
                                      )}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "receipt" && (
                <motion.div
                  key="receipt"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="p-6"
                >
                  <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900">
                        Payment Receipt
                      </h3>
                      <p className="text-gray-500 mt-1">
                        Thank you for your purchase
                      </p>
                    </div>

                    <div className="flex justify-between items-center mb-6 pb-6 border-b border-dashed">
                      <div>
                        <p className="text-sm text-gray-500">Receipt Number</p>
                        <p className="font-mono font-medium">
                          {paymentData.id.substring(0, 12)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Date</p>
                        <p>
                          {format(
                            new Date(paymentData.createdAt),
                            "MMMM d, yyyy"
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="mb-6 pb-6 border-b border-dashed">
                      <h4 className="font-medium text-gray-900 mb-3">
                        Payment Details
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Payment Method</p>
                          <p className="font-medium">
                            {paymentData.paymentMethod}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Transaction ID</p>
                          <p className="font-mono">
                            {paymentData.transactionId.substring(0, 12)}...
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Status</p>
                          <Badge
                            className={getStatusColor(
                              paymentData.paymentStatus
                            )}
                          >
                            {paymentData.paymentStatus}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-gray-500">Order ID</p>
                          <p className="font-mono">
                            {paymentData.orderId.substring(0, 12)}...
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6 pb-6 border-b border-dashed">
                      <h4 className="font-medium text-gray-900 mb-3">
                        Payment Summary
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Subtotal</span>
                          <span>
                            $
                            {(
                              paymentData.amount + paymentData.order.discount
                            ).toFixed(2)}
                          </span>
                        </div>
                        {paymentData.order.discount > 0 && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">Discount</span>
                            <span className="text-green-600">
                              -${paymentData.order.discount.toFixed(2)}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-500">Shipping</span>
                          <span>Free</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between font-medium">
                          <span>Total</span>
                          <span>${paymentData.amount.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-4">
                        If you have any questions about this receipt, please
                        contact our support team.
                      </p>
                      <Button variant="outline" className="mr-2">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                      <Button variant="outline">
                        <Printer className="h-4 w-4 mr-2" />
                        Print
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "security" && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="p-6"
                >
                  <div className="max-w-3xl mx-auto">
                    <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-6 flex items-start gap-3">
                      <div className="mt-0.5">
                        <ShieldCheck className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-green-800">
                          Secure Transaction
                        </h4>
                        <p className="text-sm text-green-700 mt-1">
                          This transaction was processed securely using
                          industry-standard encryption and security protocols.
                        </p>
                      </div>
                    </div>

                    <Card className="border-gray-200 mb-6">
                      <CardHeader className="pb-2">
                        <h3 className="text-lg font-medium text-gray-900">
                          Transaction Security
                        </h3>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 bg-blue-100 p-1.5 rounded-full">
                              <Shield className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">
                                Encrypted Payment
                              </h4>
                              <p className="text-sm text-gray-500 mt-1">
                                Your payment information was encrypted using TLS
                                1.2+ during transmission.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 bg-blue-100 p-1.5 rounded-full">
                              <CreditCard className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">
                                PCI Compliant
                              </h4>
                              <p className="text-sm text-gray-500 mt-1">
                                We adhere to Payment Card Industry Data Security
                                Standards (PCI DSS) to ensure your card
                                information is handled securely.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 bg-blue-100 p-1.5 rounded-full">
                              <FileText className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">
                                Transaction Verification
                              </h4>
                              <p className="text-sm text-gray-500 mt-1">
                                This transaction has been verified and recorded
                                in our secure payment system.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 bg-blue-100 p-1.5 rounded-full">
                              <AlertCircle className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">
                                Fraud Protection
                              </h4>
                              <p className="text-sm text-gray-500 mt-1">
                                Our system automatically monitors transactions
                                for suspicious activity to protect you from
                                fraud.
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-gray-200">
                      <CardHeader className="pb-2">
                        <h3 className="text-lg font-medium text-gray-900">
                          Verification Details
                        </h3>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-500">IP Address:</span>
                            <span className="font-mono">
                              192.168.1.XXX (Masked for security)
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Device:</span>
                            <span>Desktop - Chrome Browser</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Location:</span>
                            <span>United States (Approximate)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">
                              Authentication:
                            </span>
                            <Badge className="bg-green-100 text-green-800 border-green-200">
                              Verified
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">3D Secure:</span>
                            <Badge className="bg-green-100 text-green-800 border-green-200">
                              Completed
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="bg-gray-50 border-t">
                        <p className="text-xs text-gray-500">
                          If you don't recognize this transaction, please
                          contact our support team immediately.
                        </p>
                      </CardFooter>
                    </Card>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Help and support section */}
        <div className="mt-8 bg-primary/5 rounded-lg p-6 border border-primary/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                Need Help With Your Payment?
              </h3>
              <p className="text-gray-500 mt-1">
                Our customer support team is available to assist you with any
                questions about your payment.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-primary/20">
                <ArrowUpRight className="h-4 w-4 mr-2" />
                Payment FAQ
              </Button>
              <Button>Contact Support</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
