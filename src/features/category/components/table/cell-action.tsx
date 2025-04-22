"use client";

import { Eye, MoreHorizontal, Pencil, Trash } from "lucide-react";
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
import type { Category } from "@/types";
import type { Response } from "@/types/response";
import { useNavigate } from "react-router";
import { useDeleteCategoryMutation } from "../../category-api";
import CategoryForm from "../category-form";

export function CellAction({ data }: { data: Category }) {
  const [open, setOpen] = useState(false);
  const [openUpdateModel, setOpenUpdateModel] = useState(false);

  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  const navigate = useNavigate();
  const onDelete = async () => {
    const res = (await deleteCategory(data.id)) as Response<Category>;

    if (res.error) {
      toast.error(
        res.error?.data.message || "Category deletion failed. Please try again."
      );
    } else {
      toast.success("Category deleted successfully");
    }
  };

  if (isDeleting) return <Loading />;

  return (
    <>
      <AlertModal
        title="Delete Category"
        description="Are you sure you want to delete this category? This action cannot be undone and may affect products assigned to this category."
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
      />

      <Modal
        title="Update Category"
        description="Edit the category details below."
        onClose={() => setOpenUpdateModel(false)}
        isOpen={openUpdateModel}
      >
        <CategoryForm
          initialData={{
            id: data.id,
            name: data.name,
            icon: data.icon,
            description: data?.description ? data.description : undefined,
          }}
          onSuccess={() => {
            setOpenUpdateModel(false);
            toast.success("Category updated successfully");
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
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => navigate(`/products?category=${data.id}`)}
          >
            <Eye className="mr-2 h-4 w-4" />
            View Products
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setOpenUpdateModel(true)}
            className="cursor-pointer"
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit Category
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="cursor-pointer text-red-600"
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete Category
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
