"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Product } from "@/types";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "images",
    header: "Image",
    cell: ({ row }) => (
      <div className=" ">
        <img
          className=" h-10 w-10 object-cover rounded-md"
          src={row.original.images[0]}
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
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <div>${row.original.price.toFixed(2)}</div>,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <div>{row.original.quantity}</div>,
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
    id: "actions",
    // cell: ({ row }) => <CellAction data={row.original} />,
  },
];
