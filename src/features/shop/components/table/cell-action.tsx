"use client";

import { MoreHorizontal, UserCheck, UserX } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Loading from "@/components/ui/loading";
import { selectUser } from "@/features/auth/auth-slice";
import { useChangeStatusMutation } from "@/features/user/user-api";
import { Shop, User } from "@/types";
import { Response } from "@/types/response";
import { useSelector } from "react-redux";

export function CellAction({ data }: { data: Shop }) {
  const [changeStatus, { isLoading: isChangingStatus }] =
    useChangeStatusMutation();

  const user = useSelector(selectUser);

  const onChangeStatus = async () => {
    const res = (await changeStatus(data.user.id)) as Response<User>;

    if (res.error) {
      toast.error(
        res.error?.data.message || "Status change failed. Please try again."
      );
    } else {
      const newStatus = data.isBlacklisted ? "Activated" : "BlackList";
      toast.success(`Vendor ${newStatus} successfully`);
    }
  };

  if (isChangingStatus) return <Loading />;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            disabled={data.id === user?.id}
            onClick={onChangeStatus}
            className={
              data.isBlacklisted ? "!text-green-500" : "!text-yellow-500"
            }
          >
            {data.isBlacklisted ? (
              <>
                <UserCheck className="mr-2 h-4 w-4" />
                Activate
              </>
            ) : (
              <>
                <UserX className="mr-2 h-4 w-4" />
                Blacklist
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
