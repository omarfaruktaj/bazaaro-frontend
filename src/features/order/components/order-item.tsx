import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Order } from "@/types";
import { format } from "date-fns";
import { Package } from "lucide-react";
import OrderProductItem from "./order-product-item";

interface SingleOrderProps {
  order: Order;
}

export default function SingleOrder({ order }: SingleOrderProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-green-500";
      case "SHIPPED":
        return "bg-blue-500";
      case "DELIVERED":
        return "bg-purple-500";
      case "PROCESSING":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="overflow-hidden border-gray-200 hover:shadow-md transition-shadow duration-300">
      <CardHeader className="bg-gray-50 pb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-2">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Order #{order.id}
              </h2>
              <p className="text-sm text-muted-foreground">
                {format(new Date(order.createdAt), "MMMM dd, yyyy")}
              </p>
            </div>
          </div>
          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <h3 className="text-md font-medium text-gray-700 mb-4">Products</h3>
        <div className="space-y-5">
          {order.orderItem.map((item) => (
            <OrderProductItem key={item.id} order={order} item={item} />
          ))}
        </div>
        <Separator className="my-5" />

        <div className="flex justify-between items-center">
          <h3 className="font-medium text-gray-700">Total Amount</h3>
          <span className="text-xl font-bold text-primary">
            ${order.totalAmount.toFixed(2)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
