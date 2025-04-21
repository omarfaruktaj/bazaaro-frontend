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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Loading from "@/components/ui/loading";
import { selectUser } from "@/features/auth/auth-slice";
import type { User } from "@/types";
import type { Response } from "@/types/response";
import { useSelector } from "react-redux";
import { useChangeStatusMutation, useDeleteUserMutation } from "../../user-api";

export function CellAction({ data }: { data: User }) {
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [openStatusAlert, setOpenStatusAlert] = useState(false);

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [changeStatus, { isLoading: isChangingStatus }] =
    useChangeStatusMutation();

  const currentUser = useSelector(selectUser);
  const isSelf = data.id === currentUser?.id;

  const onDelete = async () => {
    const res = (await deleteUser(data.id)) as Response<User>;

    if (res.error) {
      toast.error(
        res.error?.data.message || "User deletion failed. Please try again."
      );
    } else {
      toast.success("User deleted successfully");
    }
  };

  const onChangeStatus = async () => {
    const res = (await changeStatus(data.id)) as Response<User>;

    if (res.error) {
      toast.error(
        res.error?.data.message || "Status change failed. Please try again."
      );
    } else {
      const newStatus = data.suspended ? "activated" : "suspended";
      toast.success(`User ${newStatus} successfully`);
    }
  };

  if (isDeleting || isChangingStatus) return <Loading />;

  return (
    <>
      <AlertModal
        title={`Delete User`}
        description="This action cannot be undone. This will permanently delete the user account and remove their data from our servers."
        isOpen={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        onConfirm={onDelete}
      />

      <AlertModal
        title={data.suspended ? "Activate User" : "Suspend User"}
        description={
          data.suspended
            ? "This will restore the user's access to the platform. They will be able to log in and use their account normally."
            : "This will prevent the user from logging in or using their account. Their data will be preserved."
        }
        isOpen={openStatusAlert}
        onClose={() => setOpenStatusAlert(false)}
        onConfirm={onChangeStatus}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuLabel>User Actions</DropdownMenuLabel>

          {/* <DropdownMenuItem className="cursor-pointer">
            <Eye className="mr-2 h-4 w-4" />
            View Profile
          </DropdownMenuItem> */}

          {/* <DropdownMenuItem className="cursor-pointer">
            <UserCog className="mr-2 h-4 w-4" />
            Edit User
          </DropdownMenuItem> */}

          {/* {data.role !== "ADMIN" && !isSelf && (
            <DropdownMenuItem className="cursor-pointer">
              <Shield className="mr-2 h-4 w-4" />
              Change Role
            </DropdownMenuItem>
          )} */}

          <DropdownMenuSeparator />

          {!isSelf && (
            <>
              <DropdownMenuItem
                onClick={() => setOpenStatusAlert(true)}
                className={`cursor-pointer ${
                  data.suspended ? "text-green-600" : "text-amber-600"
                }`}
              >
                {data.suspended ? (
                  <>
                    <UserCheck className="mr-2 h-4 w-4" />
                    Activate User
                  </>
                ) : (
                  <>
                    <UserX className="mr-2 h-4 w-4" />
                    Suspend User
                  </>
                )}
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => setOpenDeleteAlert(true)}
                className="cursor-pointer text-red-600"
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete User
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
