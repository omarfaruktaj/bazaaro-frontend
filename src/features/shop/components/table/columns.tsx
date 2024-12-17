"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Shop } from "@/types";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<Shop>[] = [
  {
    accessorKey: "images",
    header: "Image",
    cell: ({ row }) => (
      <div className=" ">
        <img
          className=" h-10 w-10 object-cover rounded-md"
          src={row.original.logo[0]}
          alt=""
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <div>{row.original.name}</div>,
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
