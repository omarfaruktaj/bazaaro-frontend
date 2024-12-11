"use client";

import { Badge } from "@/components/ui/badge";
import { Coupon } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns"; // To format dates
import { CellAction } from "./cell-action";

export const columns: ColumnDef<Coupon>[] = [
  {
    accessorKey: "code",
    header: "Coupon Code",
    cell: ({ row }) => <code>{row.original.code}</code>,
  },
  {
    accessorKey: "discountType",
    header: "Discount Type",
    cell: ({ row }) => {
      const type = row.original.discountType;
      let variant: "default" | "secondary" | "destructive" | "outline" =
        "default";

      if (type === "FIXED") variant = "secondary";
      if (type === "PERCENTAGE") variant = "default";

      return <Badge variant={variant}>{type}</Badge>;
    },
  },
  {
    accessorKey: "discountValue",
    header: "Discount Value",
    cell: ({ row }) => {
      const value = row.original.discountValue;
      const type = row.original.discountType;

      return type === "PERCENTAGE" ? `${value}%` : `$${value}`;
    },
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => format(new Date(row.original.startDate), "yyyy-MM-dd"),
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => format(new Date(row.original.endDate), "yyyy-MM-dd"),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />, // Placeholder for actions (edit, delete)
  },
];
