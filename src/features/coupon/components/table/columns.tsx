import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Coupon } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { format, isAfter, isBefore, isWithinInterval } from "date-fns";
import { Calendar, CalendarDays, DollarSign, Percent } from "lucide-react";
import { CellAction } from "./cell-action";
import CouponCodeAction from "./coupon-code-action";

export const columns: ColumnDef<Coupon>[] = [
  {
    accessorKey: "code",
    header: "Coupon Code",
    cell: ({ row }) => <CouponCodeAction code={row.original.code} />,
  },
  {
    accessorKey: "discountType",
    header: "Discount Type",
    cell: ({ row }) => {
      const type = row.original.discountType;
      const value = row.original.discountValue;

      return (
        <div className="flex items-center">
          {type === "PERCENTAGE" ? (
            <Badge className="bg-blue-100 text-blue-800 border-0 flex items-center">
              <Percent className="h-3 w-3 mr-1" />
              {value}% OFF
            </Badge>
          ) : (
            <Badge className="bg-green-100 text-green-800 border-0 flex items-center">
              <DollarSign className="h-3 w-3 mr-1" />${value} OFF
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const startDate = new Date(row.original.startDate);
      const endDate = new Date(row.original.endDate);
      const now = new Date();

      let status: "active" | "upcoming" | "expired" = "active";
      let statusText = "Active";
      let badgeClass = "bg-green-100 text-green-800 border-0";

      if (isBefore(now, startDate)) {
        status = "upcoming";
        statusText = "Upcoming";
        badgeClass = "bg-amber-100 text-amber-800 border-0";
      } else if (isAfter(now, endDate)) {
        status = "expired";
        statusText = "Expired";
        badgeClass = "bg-gray-100 text-gray-800 border-0";
      }

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge className={badgeClass}>{statusText}</Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {status === "active"
                  ? "Coupon is currently active"
                  : status === "upcoming"
                  ? "Coupon will be active in the future"
                  : "Coupon has expired"}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "validity",
    header: "Validity Period",
    cell: ({ row }) => {
      const startDate = new Date(row.original.startDate);
      const endDate = new Date(row.original.endDate);
      const now = new Date();

      const isActive = isWithinInterval(now, {
        start: startDate,
        end: endDate,
      });
      const textColor = isActive ? "text-green-600" : "text-gray-600";

      return (
        <div className="flex items-center">
          <CalendarDays className={`h-4 w-4 mr-2 ${textColor}`} />
          <div className="text-sm">
            <div>{format(startDate, "MMM d, yyyy")}</div>
            <div className="text-muted-foreground">
              to {format(endDate, "MMM d, yyyy")}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "DayLeft",
    header: "Day Left",
    cell: ({ row }) => {
      const endDate = new Date(row.original.endDate);
      const now = new Date();
      const remainingDays = Math.ceil(
        (endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );
      const isExpired = remainingDays < 0;

      return (
        <div className="flex items-center">
          {!isExpired && (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="h-3 w-3 mr-1" />
                  {remainingDays === 0
                    ? "Expires today"
                    : `${remainingDays} days left`}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Valid until {format(endDate, "MMMM d, yyyy")}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
