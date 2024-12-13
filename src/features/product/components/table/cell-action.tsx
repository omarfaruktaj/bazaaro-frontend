"use client";

import { useState } from "react";

import { CopyPlus, Edit, MoreHorizontal, Trash } from "lucide-react";
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
import { selectUser } from "@/features/auth/auth-slice";
import { Product } from "@/types";
import { Response } from "@/types/response";
import { useSelector } from "react-redux";
import { useDeleteProductMutation } from "../../product-api";
import ProductForm from "../product-form";

export function CellAction({ data }: { data: Product }) {
  const [open, setOpen] = useState(false);
  const [openUpdateModel, setOpenUpdateModel] = useState(false);
  const [openProductDuplicateModel, setOpenProductDuplicateModel] =
    useState(false);

  const user = useSelector(selectUser);

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const onDelete = async () => {
    const res = (await deleteProduct(data.id)) as Response<Product>;

    if (res.error) {
      toast.error(
        res.error?.data.message || "Product Deleting failed. Please try again."
      );
    } else {
      toast.success("Product Deleted SuccessFully");
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
        title="Update Product"
        onClose={() => setOpenUpdateModel(false)}
        isOpen={openUpdateModel}
      >
        <ProductForm
          initialData={data}
          onSuccess={() => {
            setOpenUpdateModel(false);
          }}
        />
      </Modal>
      <Modal
        title="Duplicate this Product"
        onClose={() => setOpenProductDuplicateModel(false)}
        isOpen={openProductDuplicateModel}
      >
        <ProductForm
          initialData={data}
          isDuplicate
          onSuccess={() => {
            setOpenProductDuplicateModel(false);
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
          {user?.role === "VENDOR" && (
            <>
              <DropdownMenuItem onClick={() => setOpenUpdateModel(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Update
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setOpenProductDuplicateModel(true)}
              >
                <CopyPlus className="mr-2 h-4 w-4" />
                Duplicate
              </DropdownMenuItem>
            </>
          )}
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
