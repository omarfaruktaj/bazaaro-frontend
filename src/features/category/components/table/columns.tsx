"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Category } from "@/types";

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "actions",
    // cell: ({ row }) => <CellAction data={row.original} />,
  },
];
