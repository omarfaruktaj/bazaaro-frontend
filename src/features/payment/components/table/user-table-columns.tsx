"use client";

import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Payment } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  DollarSign,
  FileText,
  Package,
} from "lucide-react";

export const userPaymentColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "Payment ID",
    cell: ({ row }) => (
      <div className="font-medium text-gray-900">
        <div className="flex items-center">
          <FileText className="h-4 w-4 text-gray-500 mr-2" />
          <span className="font-mono">
            {row.original.id.substring(0, 8)}...
          </span>
        </div>
        {row.original.orderId && (
          <div className="text-xs text-gray-500 mt-1 flex items-center">
            <Package className="h-3 w-3 mr-1" />
            Order: {row.original.orderId.substring(0, 8)}...
          </div>
        )}
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <div className="font-medium text-gray-900 flex items-center">
        <DollarSign className="h-4 w-4 text-gray-500 mr-1" />
        {row.original.amount.toFixed(2)}
      </div>
    ),
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
    cell: ({ row }) => {
      const method = row.original.paymentMethod;
      let icon = <CreditCard className="h-4 w-4 mr-2" />;

      // Customize icon based on payment method
      if (method.toLowerCase().includes("card")) {
        icon = <CreditCard className="h-4 w-4 mr-2" />;
      } else if (method.toLowerCase().includes("paypal")) {
        icon = <DollarSign className="h-4 w-4 mr-2" />;
      }

      return (
        <div className="flex items-center">
          {icon}
          <span>{method}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => {
      const status = row.original.paymentStatus;

      let color = "";
      let bgColor = "";
      let icon = null;

      switch (status) {
        case "PENDING":
          color = "text-amber-700";
          bgColor = "bg-amber-100";
          icon = <Clock className="h-3 w-3 mr-1" />;
          break;
        case "PAID":
          color = "text-green-700";
          bgColor = "bg-green-100";
          icon = <CheckCircle className="h-3 w-3 mr-1" />;
          break;
        case "FAILED":
          color = "text-red-700";
          bgColor = "bg-red-100";
          icon = <AlertCircle className="h-3 w-3 mr-1" />;
          break;
        default:
          color = "text-gray-700";
          bgColor = "bg-gray-100";
      }

      return (
        <Badge className={`${bgColor} ${color} border-0 flex items-center`}>
          {icon}
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return (
        <div className="flex items-center text-gray-700 text-sm">
          <Calendar className="h-3.5 w-3.5 mr-1.5 text-gray-500" />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>{format(date, "MMM d, yyyy")}</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{format(date, "PPpp")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
];
