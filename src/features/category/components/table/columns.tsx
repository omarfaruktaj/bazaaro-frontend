"use client";

import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Category } from "@/types";
import { getIconByValue } from "@/utils/get-icon-by-value";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { CalendarIcon, Layers } from "lucide-react";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "icon",
    header: "Icon",
    cell: ({ row }) => {
      const iconValue = row.getValue("icon") as string;
      const Icon = iconValue ? getIconByValue(iconValue) : Layers;

      return (
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      const productCount = Math.floor(Math.random() * 50); // Placeholder - in a real app, you'd have this data

      return (
        <div>
          <div className="font-medium text-gray-900">{name}</div>
          <div className="text-sm text-gray-500">{productCount} products</div>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description") as string | undefined;

      if (!description)
        return <span className="text-gray-400 italic">No description</span>;

      return (
        <div className="max-w-md truncate" title={description}>
          {description}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      // Assuming categories have createdAt - if not, this is a placeholder
      const date = row.original.createdAt || new Date().toISOString();

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center text-gray-500 text-sm">
                <CalendarIcon className="h-3.5 w-3.5 mr-1.5" />
                {format(new Date(date), "MMM d, yyyy")}
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const isActive = (row.getValue("status") as string) === "active";

      return (
        <Badge
          variant={isActive ? "default" : "outline"}
          className="bg-green-100 text-green-700 hover:bg-green-200"
        >
          Active
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
