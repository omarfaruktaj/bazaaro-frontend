import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetOrdersQuery } from "@/features/order/order-api";
import formatCurrency from "@/utils/format-currency";
import { formatDate } from "date-fns";
import { AlertCircle, Loader2, Package } from "lucide-react";
import { useState } from "react";

export default function OrdersTab() {
  const [page, setPage] = useState(1);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const { data, isLoading, error } = useGetOrdersQuery({
    page,
    limit: 5,
    include: "orderItem.product",
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h3 className="text-lg font-medium">Failed to load orders</h3>
        <p className="text-muted-foreground">Please try again later</p>
      </div>
    );
  }

  const { orders, pagination } = data || { orders: [], pagination: {} };

  const totalPages = pagination?.totalPage || 0;

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "processing":
        return (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 border-amber-200"
          >
            Processing
          </Badge>
        );
      case "shipped":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            Shipped
          </Badge>
        );
      case "delivered":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Delivered
          </Badge>
        );
      case "cancelled":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Orders</h2>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">No orders yet</h3>
          <p className="text-muted-foreground mb-4">
            When you place orders, they will appear here
          </p>
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/shop")}
          >
            Start Shopping
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <Accordion type="single" collapsible>
            {orders.map((order) => (
              <AccordionItem
                key={order.id}
                value={order.id}
                className="border rounded-lg mb-4 overflow-hidden"
              >
                <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/30">
                  <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-center text-left gap-2">
                    <div className="flex flex-col">
                      <span className="font-medium">Order #{order.id}</span>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(order.createdAt, "PPPP")}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(order.status)}
                      <span className="font-medium">
                        {formatCurrency(order.totalAmount, "USD")}
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="grid gap-4">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Order Timeline</h4>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs">
                            1
                          </span>
                          <span>Ordered</span>
                        </div>
                        <div className="flex-1 h-0.5 bg-muted-foreground/20"></div>
                        <div className="flex items-center gap-1">
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                              order.status !== "PENDING"
                                ? "bg-primary text-white"
                                : "bg-muted-foreground/20 text-muted-foreground"
                            }`}
                          >
                            2
                          </span>
                          <span>Pending</span>
                        </div>
                        <div className="flex-1 h-0.5 bg-muted-foreground/20"></div>
                        <div className="flex items-center gap-1">
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                              order.status === "SHIPPED" ||
                              order.status === "DELIVERED"
                                ? "bg-primary text-white"
                                : "bg-muted-foreground/20 text-muted-foreground"
                            }`}
                          >
                            3
                          </span>
                          <span>Shipped</span>
                        </div>
                        <div className="flex-1 h-0.5 bg-muted-foreground/20"></div>
                        <div className="flex items-center gap-1">
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                              order.status === "DELIVERED"
                                ? "bg-primary text-white"
                                : "bg-muted-foreground/20 text-muted-foreground"
                            }`}
                          >
                            4
                          </span>
                          <span>Delivered</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Items</h4>
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Product</TableHead>
                              <TableHead className="text-right">
                                Quantity
                              </TableHead>
                              <TableHead className="text-right">
                                Price
                              </TableHead>
                              <TableHead className="text-right">
                                Total
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {order.orderItem.map((item) => (
                              <TableRow key={item.id}>
                                <TableCell>
                                  <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded bg-muted flex items-center justify-center overflow-hidden">
                                      <img
                                        src={
                                          item.product.images[0] ||
                                          "/placeholder.svg"
                                        }
                                        alt={item.product.name}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <div>
                                      <div className="font-medium">
                                        {item.product.name}
                                      </div>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">
                                  {item.quantity}
                                </TableCell>
                                <TableCell className="text-right">
                                  {formatCurrency(item.price)}
                                </TableCell>
                                <TableCell className="text-right">
                                  {formatCurrency(item.price * item.quantity)}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">
                          Shipping Information
                        </h4>
                        {/* <div className="bg-muted/30 p-3 rounded-lg text-sm">
                          <p className="font-medium">
                            {order.shippingAddress.name}
                          </p>
                          <p>{order.shippingAddress.street}</p>
                          <p>
                            {order.shippingAddress.city},{" "}
                            {order.shippingAddress.state}{" "}
                            {order.shippingAddress.zipCode}
                          </p>
                          <p>{order.shippingAddress.country}</p>
                          {order.shippingAddress.phone && (
                            <p>Phone: {order.shippingAddress.phone}</p>
                          )}
                        </div> */}
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">
                          Payment Information
                        </h4>
                        <div className="bg-muted/30 p-3 rounded-lg text-sm">
                          <p>
                            <span className="text-muted-foreground">
                              Method:
                            </span>{" "}
                            {order.paymentMethod}
                          </p>
                          <p>
                            <span className="text-muted-foreground">
                              Status:
                            </span>{" "}
                            {order.paymentStatus}
                          </p>
                          {/* {order.paymentMethod && (
                            <p>
                              <span className="text-muted-foreground">
                                Transaction ID:
                              </span>{" "}
                              {order.paymentId}
                            </p>
                          )} */}
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/30 p-3 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="text-muted-foreground">Subtotal:</span>
                        <span>{formatCurrency(order.totalAmount)}</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span className="text-muted-foreground">Shipping:</span>
                        <span>{formatCurrency(0)}</span>
                      </div>
                      {order.discount > 0 && (
                        <div className="flex justify-between mb-1">
                          <span className="text-muted-foreground">
                            Discount:
                          </span>
                          <span className="text-green-600">
                            -{formatCurrency(order.discount)}
                          </span>
                        </div>
                      )}
                      {/* {order.tax > 0 && (
                        <div className="flex justify-between mb-1">
                          <span className="text-muted-foreground">Tax:</span>
                          <span>{formatCurrency(order.tax)}</span>
                        </div>
                      )} */}
                      <div className="border-t mt-2 pt-2 flex justify-between font-medium">
                        <span>Total:</span>
                        <span>{formatCurrency(order.totalAmount)}</span>
                      </div>
                    </div>

                    {/* <div className="flex justify-end">
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={() => handleReorder(order.id)}
                        disabled={isReordering}
                      >
                        {isReordering ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <RefreshCw className="h-4 w-4" />
                        )}
                        Reorder
                      </Button>
                    </div> */}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {totalPages > 1 && (
            <Pagination className="mt-6">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (page > 1) setPage(page - 1);
                    }}
                    className={
                      page <= 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(pageNum);
                        }}
                        isActive={pageNum === page}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (page < totalPages) setPage(page + 1);
                    }}
                    className={
                      page >= totalPages ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      )}
    </div>
  );
}
