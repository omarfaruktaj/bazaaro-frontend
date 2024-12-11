"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Order } from "@/types";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => <div>{row.original.id}</div>,
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: ({ row }) => <div>${row.original.finalTotal.toFixed(2)}</div>,
  },
  {
    accessorKey: "discount",
    header: "Discount",
    cell: ({ row }) => (
      <div>
        {row.original.discount ? `${row.original.discount}%` : "No Discount"}
      </div>
    ),
  },

  {
    accessorKey: "status",
    header: "Order Status",
    cell: ({ row }) => {
      const status = row.original.status;
      let variant: "default" | "secondary" | "destructive" | "outline" =
        "default";

      if (status === "PENDING") variant = "secondary";
      if (status === "PAID") variant = "default";
      if (status === "SHIPPED") variant = "secondary";
      if (status === "DELIVERED") variant = "default";
      if (status === "CANCELLED") variant = "destructive";

      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => {
      const paymentStatus = row.original.paymentStatus;
      let variant: "default" | "secondary" | "destructive" | "outline" =
        "default";

      if (paymentStatus === "PENDING") variant = "secondary";
      if (paymentStatus === "PAID") variant = "default";
      if (paymentStatus === "FAILED") variant = "destructive";

      return (
        <Badge variant={variant}>{paymentStatus || "Not Available"}</Badge>
      );
    },
  },
  {
    id: "actions",
    // cell: ({ row }) => <CellAction data={row.original} />,
  },
];
