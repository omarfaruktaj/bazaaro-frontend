"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Shop } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  CalendarIcon,
  ShoppingBag,
  Star,
  UserCheck,
  UserX,
} from "lucide-react";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<Shop>[] = [
  {
    accessorKey: "logo",
    header: "Vendor",
    cell: ({ row }) => {
      const shop = row.original;
      const name = shop.name;
      const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2);

      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border border-gray-200">
            <AvatarImage src={shop.logo} alt={name} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-gray-900">{name}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.original.description;

      if (!description)
        return <span className="text-gray-400 italic">No description</span>;

      return (
        <div className="max-w-xs truncate" title={description}>
          {description}
        </div>
      );
    },
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => {
      const productCount = row.original.product?.length || 0;

      return (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-2">
            <ShoppingBag className="h-4 w-4 text-blue-500" />
          </div>
          <span className="font-medium">{productCount}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => {
      const reviews = row.original.review || [];
      const averageRating = reviews.length
        ? (
            reviews.reduce((sum, review) => sum + review.rating, 0) /
            reviews.length
          ).toFixed(1)
        : "N/A";

      return (
        <div className="flex items-center">
          <Star
            className={`h-4 w-4 mr-1 ${
              averageRating !== "N/A"
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
          <span>{averageRating}</span>
          <span className="text-xs text-gray-500 ml-1">({reviews.length})</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const isBlacklisted = row.original.isBlacklisted;

      return (
        <div className="flex flex-col gap-1">
          <Badge
            variant={isBlacklisted ? "destructive" : "default"}
            className={
              isBlacklisted
                ? "bg-red-100 text-red-700 hover:bg-red-200"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            }
          >
            {isBlacklisted ? (
              <UserX className="h-3 w-3 mr-1" />
            ) : (
              <UserCheck className="h-3 w-3 mr-1" />
            )}
            {isBlacklisted ? "Blacklisted" : "Active"}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Joined",
    cell: ({ row }) => {
      const date = row.original.createdAt;

      if (!date) return <span className="text-gray-500">Unknown</span>;

      const formattedDate = format(new Date(date), "MMM d, yyyy");

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center text-gray-500 text-sm">
                <CalendarIcon className="h-3.5 w-3.5 mr-1.5" />
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
