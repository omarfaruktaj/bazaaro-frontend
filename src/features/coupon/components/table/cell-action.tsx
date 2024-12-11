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
import { Coupon } from "@/types";
import { Response } from "@/types/response";
import { useDeleteCouponMutation } from "../../coupon-api";

export function CellAction({ data }: { data: Coupon }) {
  const [open, setOpen] = useState(false);
  const [deleteCoupon, { isLoading: isDeleting }] = useDeleteCouponMutation();

  const onDelete = async () => {
    const res = (await deleteCoupon(data.id)) as Response<Coupon>;

    if (res.error) {
      toast.error(
        res.error?.data.message || "Coupon Deleting failed. Please try again."
      );
    } else {
      toast.success("Coupon Deleted SuccessFully");
    }
  };

  if (isDeleting) return <Loading />;

  return (
    <>
      <AlertModal
        description="This action can not be undo."
        isOpen={open}
        onClose={() => setOpen(false)}
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
          {/* <DropdownMenuItem
            onClick={() => router.push(`/admin/categories/${data._id}`)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem> */}
          <DropdownMenuItem
            onClick={() => setOpen(true)}
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
