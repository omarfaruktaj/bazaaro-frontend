"use client";

import { useState, useTransition } from "react";

import { MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";

import AlertModal from "@/components/ui/alert-model";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Category } from "@/types";

export function CellAction({ data }: { data: TCategory }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const onDelete = async () => {
    const res = (await update({
      data: values,
      categoryId: initialData.id,
    })) as Response<Category>;

    if (res.error) {
      toast.error(
        res.error?.data.message || "Category updating failed. Please try again."
      );
    } else {
      toast.success("Category successfully updated");
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isPending}
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
