"use client";

import { useState } from "react";

import { MoreHorizontal, Trash } from "lucide-react";
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
import { User } from "@/types";
import { Response } from "@/types/response";
import { useDeleteUserMutation } from "../../user-api";

export function CellAction({ data }: { data: User }) {
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const onDelete = async () => {
    const res = (await deleteUser(data.id)) as Response<User>;

    if (res.error) {
      toast.error(
        res.error?.data.message || "User Deleting failed. Please try again."
      );
    } else {
      toast.success("User Deleted SuccessFully");
    }
  };

  if (isDeleting) return <Loading />;

  return (
    <>
      <AlertModal
        description="This action can not be undo."
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
