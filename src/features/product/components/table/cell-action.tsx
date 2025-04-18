import { Copy, Edit, ExternalLink, MoreHorizontal, Trash } from "lucide-react";
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
import { selectUser } from "@/features/auth/auth-slice";
import type { Product } from "@/types";
import type { Response } from "@/types/response";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useDeleteProductMutation } from "../../product-api";
import ProductForm from "../product-form";

export function CellAction({ data }: { data: Product }) {
  const [open, setOpen] = useState(false);
  const [openUpdateModel, setOpenUpdateModel] = useState(false);
  const [openProductDuplicateModel, setOpenProductDuplicateModel] =
    useState(false);

  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const onDelete = async () => {
    const res = (await deleteProduct(data.id)) as Response<Product>;

    if (res.error) {
      toast.error(
        res.error?.data.message || "Product deletion failed. Please try again."
      );
    } else {
      toast.success("Product deleted successfully");
    }
  };
  const handleViewDetails = () => {
    navigate(`/products/${data.id}`);
  };

  if (isDeleting) return <Loading />;

  return (
    <TooltipProvider>
      <AlertModal
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
      />

      <Modal
        title="Update Product"
        onClose={() => setOpenUpdateModel(false)}
        isOpen={openUpdateModel}
        className="h-[90%]"
      >
        <ProductForm
          initialData={data}
          onSuccess={() => {
            setOpenUpdateModel(false);
          }}
        />
      </Modal>

      <Modal
        title="Duplicate Product"
        onClose={() => setOpenProductDuplicateModel(false)}
        isOpen={openProductDuplicateModel}
        className="h-[90%]"
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
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 p-0 focus:ring-0 focus:ring-offset-0"
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[180px]">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          {/* <DropdownMenuItem
            className="cursor-pointer"
            onClick={handleViewDetails}
          >
            <Eye className="mr-2 h-4 w-4 text-gray-500" />
            View Details
          </DropdownMenuItem> */}

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={handleViewDetails}
          >
            <ExternalLink className="mr-2 h-4 w-4 text-gray-500" />
            View on Site
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {user?.role === "VENDOR" && (
            <>
              <DropdownMenuItem
                onClick={() => setOpenUpdateModel(true)}
                className="cursor-pointer"
              >
                <Edit className="mr-2 h-4 w-4 text-blue-500" />
                Edit Product
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => setOpenProductDuplicateModel(true)}
                className="cursor-pointer"
              >
                <Copy className="mr-2 h-4 w-4 text-amber-500" />
                Duplicate
              </DropdownMenuItem>

              <DropdownMenuSeparator />
            </>
          )}

          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
}
