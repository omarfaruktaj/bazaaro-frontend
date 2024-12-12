"use client";

import { useState } from "react";

import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";

import AlertModal from "@/components/alert-model";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Loading from "@/components/ui/loading";
import { Category } from "@/types";
import { Response } from "@/types/response";
import { useDeleteCategoryMutation } from "../../category-api";
import CategoryForm from "../category-form";

export function CellAction({ data }: { data: Category }) {
  const [open, setOpen] = useState(false);
  const [openUpdateModel, setOpenUpdateModel] = useState(false);

  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  const onDelete = async () => {
    const res = (await deleteCategory(data.id)) as Response<Category>;

    if (res.error) {
      toast.error(
        res.error?.data.message || "Category Deleting failed. Please try again."
      );
    } else {
      toast.success("Category Deleted Successfully");
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
      <Modal
        title="Update Category"
        onClose={() => setOpenUpdateModel(false)}
        isOpen={openUpdateModel}
      >
        <CategoryForm
          initialData={{
            id: data.id,
            name: data.name,
            description: data?.description ? data.description : undefined,
          }}
          onSuccess={() => {
            setOpenUpdateModel(false);
          }}
        />
      </Modal>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setOpenUpdateModel(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
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
