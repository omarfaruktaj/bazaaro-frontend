import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Product } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Calendar, Package, Percent } from "lucide-react";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "images",
    header: "Product",
    cell: ({ row }) => {
      const product = row.original;
      const name = product.name;
      const image = product.images[0];

      return (
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-md overflow-hidden border border-gray-200 bg-gray-50 flex-shrink-0">
            {image ? (
              <img
                src={image || "/placeholder.svg"}
                alt={name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <Package className="h-6 w-6 text-gray-400" />
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-gray-900 line-clamp-1">
              {name.split(" ").slice(0, 3).join(" ")}
            </span>
            <span className="text-xs text-gray-500">
              ID: {product.id.substring(0, 8)}...
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.original.price;
      const discount = row.original.discount;
      const discountedPrice = discount
        ? price - (price * discount) / 100
        : price;

      return (
        <div className="flex flex-col">
          <div className="font-medium text-gray-900">
            ${discountedPrice.toFixed(2)}
          </div>
          {discount && discount > 0 && (
            <div className="text-xs text-gray-500 line-through">
              ${price.toFixed(2)}
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: "Inventory",
    cell: ({ row }) => {
      const quantity = row.original.quantity;
      let statusColor = "bg-green-100 text-green-800";
      let status = "In Stock";

      if (quantity <= 0) {
        statusColor = "bg-red-100 text-red-800";
        status = "Out of Stock";
      } else if (quantity < 10) {
        statusColor = "bg-amber-100 text-amber-800";
        status = "Low Stock";
      }

      return (
        <div className="flex flex-col">
          <div className="font-medium text-gray-900">{quantity}</div>
          <Badge
            variant="outline"
            className={`${statusColor} border-0 text-xs mt-1`}
          >
            {status}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "discount",
    header: "Discount",
    cell: ({ row }) => {
      const discount = row.original.discount;

      if (!discount) {
        return <span className="text-gray-500 text-sm">No discount</span>;
      }

      return (
        <div className="flex items-center">
          <Badge className="bg-green-100 text-green-800 border-0 flex items-center">
            <Percent className="h-3 w-3 mr-1" />
            {discount}% OFF
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Added",
    cell: ({ row }) => {
      const date = row.original.createdAt;

      if (!date) return <span className="text-gray-500">Unknown</span>;

      const formattedDate = format(new Date(date), "MMM d, yyyy");

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="h-3.5 w-3.5 mr-1.5" />
                {formattedDate}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{format(new Date(date), "PPpp")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
