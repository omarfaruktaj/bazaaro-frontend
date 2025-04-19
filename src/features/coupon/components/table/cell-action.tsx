import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import AlertModal from "@/components/alert-model";
import Modal from "@/components/modal";
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
import { TooltipProvider } from "@/components/ui/tooltip";
import type { Coupon } from "@/types";
import type { Response } from "@/types/response";
import { useDeleteCouponMutation } from "../../coupon-api";
import CouponForm from "../coupon-form";

export function CellAction({ data }: { data: Coupon }) {
  const [open, setOpen] = useState(false);
  const [openUpdateModel, setOpenUpdateModel] = useState(false);

  const [deleteCoupon, { isLoading: isDeleting }] = useDeleteCouponMutation();

  const onDelete = async () => {
    const res = (await deleteCoupon(data.id)) as Response<Coupon>;

    if (res.error) {
      toast.error(
        res.error?.data.message || "Coupon deletion failed. Please try again."
      );
    } else {
      toast.success("Coupon deleted successfully");
    }
  };

  if (isDeleting) return <Loading />;

  return (
    <TooltipProvider>
      <AlertModal
        title="Delete Coupon"
        description="Are you sure you want to delete this coupon? This action cannot be undone."
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
      />
      <Modal
        title="Update Coupon"
        onClose={() => setOpenUpdateModel(false)}
        isOpen={openUpdateModel}
        className="h-[90%]"
      >
        <CouponForm
          initialData={data}
          onSuccess={() => {
            setOpenUpdateModel(false);
            toast.success("Coupon updated successfully");
          }}
        />
      </Modal>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => setOpenUpdateModel(true)}
              className="cursor-pointer"
            >
              <Edit className="mr-2 h-4 w-4 text-blue-500" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setOpen(true)}
              className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </TooltipProvider>
  );
}
