"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Category } from "@/types";
import { getIconByValue } from "@/utils/get-icon-by-value";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "icon",
    header: "Icon",
    cell: ({ row }) => {
      const iconValue = row.getValue("icon");
      const Icon = getIconByValue(iconValue as string);
      return <Icon size={24} />;
    },
  },
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
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
