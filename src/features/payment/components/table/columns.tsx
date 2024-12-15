"use client";

import { Payment } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const paymentColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "Payment ID",
    cell: ({ row }) => <div>{row.original.id}</div>,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => <div>${row.original.amount.toFixed(2)}</div>,
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
    cell: ({ row }) => <div>{row.original.paymentMethod}</div>,
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => (
      <div className={getPaymentStatusClass(row.original.paymentStatus)}>
        {row.original.paymentStatus}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <div>{new Date(row.original.createdAt).toLocaleDateString()}</div>
    ),
  },
  //   {
  //     id: "actions",
  //     header: "Actions",
  //     cell: ({ row }) => <CellAction data={row.original} />,
  //   },
];

const getPaymentStatusClass = (status: "PENDING" | "PAID" | "FAILED") => {
  switch (status) {
    case "PENDING":
      return "text-yellow-500";
    case "PAID":
      return "text-green-500";
    case "FAILED":
      return "text-red-500";
    default:
      return "";
  }
};
