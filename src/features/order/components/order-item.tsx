import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Order } from "@/types";
import { format } from "date-fns";
import OrderProductItem from "./order-product-item";

interface SingleOrderProps {
  order: Order;
}

export default function SingleOrder({ order }: SingleOrderProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Order #{order.id}
            </h2>
            <p className="text-sm text-muted-foreground">
              Date: {format(new Date(order.createdAt), "MMMM dd, yyyy")}
            </p>
          </div>
          <span
            className={`px-4 py-2 rounded-full text-white text-sm ${
              order.status === "PAID"
                ? "bg-green-500"
                : order.status === "SHIPPED"
                ? "bg-blue-500"
                : "bg-gray-500"
            }`}
          >
            {order.status}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <h1 className="text-xl py-2">Products</h1>
        <div className="space-y-6">
          {order.orderItem.map((item) => (
            <OrderProductItem key={item.id} order={order} item={item} />
          ))}
        </div>
        <Separator className="mt-3" />

        <div className="mt-3 flex justify-between items-center">
          <h3 className="font-semibold text-lg text-gray-700">Total Amount</h3>
          <span className="text-xl font-bold text-gray-900">
            ${order.totalAmount.toFixed(2)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
