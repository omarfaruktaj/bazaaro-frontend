"use client";

import { MoreHorizontal, Trash, UserCheck, UserX } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import AlertModal from "@/components/alert-model";
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
import { User } from "@/types";
import { Response } from "@/types/response";
import { useSelector } from "react-redux";
import { useChangeStatusMutation, useDeleteUserMutation } from "../../user-api";

export function CellAction({ data }: { data: User }) {
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [changeStatus, { isLoading: isChangingStatus }] =
    useChangeStatusMutation();

  const user = useSelector(selectUser);

  const onDelete = async () => {
    const res = (await deleteUser(data.id)) as Response<User>;

    if (res.error) {
      toast.error(
        res.error?.data.message || "User Deleting failed. Please try again."
      );
    } else {
      toast.success("User Deleted Successfully");
    }
  };

  const onChangeStatus = async () => {
    const res = (await changeStatus(data.id)) as Response<User>;

    if (res.error) {
      toast.error(
        res.error?.data.message || "Status change failed. Please try again."
      );
    } else {
      const newStatus = data.suspended ? "Activated" : "suspended";
      toast.success(`User ${newStatus} successfully`);
    }
  };

  if (isDeleting || isChangingStatus) return <Loading />;

  return (
    <>
      <AlertModal
        description="This action cannot be undone."
        isOpen={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        onConfirm={onDelete}
      />
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
            className={data.suspended ? "!text-green-500" : "!text-yellow-500"}
          >
            {data.suspended ? (
              <>
                <UserCheck className="mr-2 h-4 w-4" />
                Activate
              </>
            ) : (
              <>
                <UserX className="mr-2 h-4 w-4" />
                Suspend
              </>
            )}
          </DropdownMenuItem>

          <DropdownMenuItem
            disabled={data.id === user?.id}
            onClick={() => setOpenDeleteAlert(true)}
            className="!text-red-500"
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
