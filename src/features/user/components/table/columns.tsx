import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { User } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ShieldAlert, ShieldCheck, UserIcon } from "lucide-react";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "profile.avatar",
    header: "User",
    cell: ({ row }) => {
      const user = row.original;
      const name = user.profile?.name || "Unknown User";
      const email = user.email;
      const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2);

      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border border-gray-200">
            <AvatarImage src={user.profile?.avatar as string} alt={name} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-gray-900">{name}</div>
            <div className="text-sm text-gray-500">{email}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.original.role;

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1.5">
                {role === "ADMIN" && (
                  <Badge
                    variant="outline"
                    className="bg-purple-50 text-purple-700 border-purple-200 font-medium"
                  >
                    <ShieldAlert className="h-3 w-3 mr-1" />
                    Admin
                  </Badge>
                )}
                {role === "VENDOR" && (
                  <Badge
                    variant="outline"
                    className="bg-amber-50 text-amber-700 border-amber-200 font-medium"
                  >
                    <ShieldCheck className="h-3 w-3 mr-1" />
                    Vendor
                  </Badge>
                )}
                {role === "CUSTOMER" && (
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200 font-medium"
                  >
                    <UserIcon className="h-3 w-3 mr-1" />
                    Customer
                  </Badge>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {role === "ADMIN"
                  ? "Administrator with full access"
                  : role === "VENDOR"
                  ? "Seller with product management access"
                  : "Regular customer account"}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "suspended",
    header: "Status",
    cell: ({ row }) => {
      const isSuspended = row.original.suspended;

      return (
        <Badge
          variant={isSuspended ? "destructive" : "default"}
          className={
            isSuspended
              ? "bg-red-100 text-red-700 hover:bg-red-200"
              : "bg-green-100 text-green-700 hover:bg-green-200"
          }
        >
          {isSuspended ? "Suspended" : "Active"}
        </Badge>
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
              <span className="text-gray-600">{formattedDate}</span>
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
    accessorKey: "lastLogin",
    header: "Last Active",
    cell: ({ row }) => {
      // This is a placeholder - in a real app, you'd have a lastLogin field
      const date = row.original.updatedAt || row.original.createdAt;

      if (!date) return <span className="text-gray-500">Never</span>;

      const formattedDate = format(new Date(date), "MMM d, yyyy");

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-gray-600">{formattedDate}</span>
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
