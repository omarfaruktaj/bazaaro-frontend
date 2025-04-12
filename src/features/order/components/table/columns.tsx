"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Order } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  Calendar,
  CreditCard,
  DollarSign,
  Eye,
  Package,
  Tag,
} from "lucide-react";
import { Link } from "react-router";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => (
      <div className="font-medium text-gray-900">
        <div className="flex items-center">
          <Package className="h-4 w-4 text-gray-500 mr-2" />
          <span className="font-mono">
            {row.original.id.substring(0, 8)}...
          </span>
        </div>
        <div className="text-xs text-gray-500 mt-1 flex items-center">
          <Calendar className="h-3 w-3 mr-1" />
          {format(new Date(row.original.createdAt), "MMM d, yyyy")}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "items",
    header: "Items",
    cell: ({ row }) => {
      const items = row.original.orderItem || [];
      const itemCount = items.length;

      return (
        <div>
          <div className="font-medium">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </div>
          <div className="text-xs text-gray-500 mt-1 line-clamp-1">
            {items.map((item) => item.product.name).join(", ")}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: ({ row }) => {
      const amount = row.original.totalAmount;
      const discount = row.original.discount || 0;
      const hasDiscount = discount > 0;

      return (
        <div>
          <div className="font-medium text-gray-900 flex items-center">
            <DollarSign className="h-4 w-4 text-gray-500 mr-1" />$
            {amount.toFixed(2)}
          </div>
          {hasDiscount && (
            <div className="text-xs text-green-600 mt-1 flex items-center">
              <Tag className="h-3 w-3 mr-1" />${discount.toFixed(2)} discount
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Order Status",
    cell: ({ row }) => {
      const status = row.original.status;

      let color = "";
      let bgColor = "";

      switch (status) {
        case "PENDING":
          color = "text-amber-700";
          bgColor = "bg-amber-100";
          break;
        case "PAID":
          // case "PROCESSING":
          //   color = "text-blue-700"
          //   bgColor = "bg-blue-100"
          break;
        case "SHIPPED":
          color = "text-purple-700";
          bgColor = "bg-purple-100";
          break;
        case "DELIVERED":
          color = "text-green-700";
          bgColor = "bg-green-100";
          break;
        case "CANCELLED":
          color = "text-red-700";
          bgColor = "bg-red-100";
          break;
        default:
          color = "text-gray-700";
          bgColor = "bg-gray-100";
      }

      return <Badge className={`${bgColor} ${color} border-0`}>{status}</Badge>;
    },
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => {
      const paymentStatus = row.original.paymentStatus || "PENDING";

      let color = "";
      let bgColor = "";

      switch (paymentStatus) {
        case "PENDING":
          color = "text-amber-700";
          bgColor = "bg-amber-100";
          break;
        case "PAID":
          color = "text-green-700";
          bgColor = "bg-green-100";
          break;
        case "FAILED":
          color = "text-red-700";
          bgColor = "bg-red-100";
          break;
        default:
          color = "text-gray-700";
          bgColor = "bg-gray-100";
      }

      return (
        <div className="flex items-center">
          <CreditCard className="h-4 w-4 text-gray-500 mr-2" />
          <Badge className={`${bgColor} ${color} border-0`}>
            {paymentStatus}
          </Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" asChild>
                <Link to={`/orders/${row.original.id}`}>
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">View order details</span>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View order details</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
];
