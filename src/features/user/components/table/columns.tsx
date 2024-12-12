import { Badge } from "@/components/ui/badge";
import { User } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "profile.avatar",
    header: "Avatar",
    cell: ({ row }) => (
      <div>
        {row.original.profile?.avatar ? (
          <img
            className="h-10 w-10 object-cover rounded-md"
            src={row.original.profile.avatar}
            alt="User Avatar"
          />
        ) : (
          <div className="h-10 w-10 bg-gray-200 rounded-md"></div>
        )}
      </div>
    ),
  },
  {
    accessorKey: "profile.name",
    header: "Name",
    cell: ({ row }) => <div>{row.original.profile?.name || "No Name"}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.original.email}</div>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <div>{row.original.role}</div>,
  },
  {
    accessorKey: "suspended",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.suspended ? "destructive" : "default"}>
        {row.original.suspended ? "Suspended" : "Active"}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
