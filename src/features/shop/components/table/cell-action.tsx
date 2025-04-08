import {
  ExternalLink,
  Eye,
  MoreHorizontal,
  Store,
  Trash,
  UserCheck,
  UserX,
} from "lucide-react";
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
import { useChangeStatusMutation } from "@/features/user/user-api";
import type { Shop, User } from "@/types";
import type { Response } from "@/types/response";
import { useSelector } from "react-redux";

export function CellAction({ data }: { data: Shop }) {
  const [openStatusAlert, setOpenStatusAlert] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const [changeStatus, { isLoading: isChangingStatus }] =
    useChangeStatusMutation();

  const user = useSelector(selectUser);
  const isSelf = data.user?.id === user?.id;

  const onChangeStatus = async () => {
    const res = (await changeStatus(data.user.id)) as Response<User>;

    if (res.error) {
      toast.error(
        res.error?.data.message || "Status change failed. Please try again."
      );
    } else {
      const newStatus = data.isBlacklisted ? "activated" : "blacklisted";
      toast.success(`Vendor ${newStatus} successfully`);
    }
  };

  const onDelete = () => {
    toast.success("Vendor deleted successfully");
    setOpenDeleteAlert(false);
  };

  if (isChangingStatus) return <Loading />;

  return (
    <>
      <AlertModal
        title={data.isBlacklisted ? "Activate Vendor" : "Blacklist Vendor"}
        description={
          data.isBlacklisted
            ? "This will restore the vendor's access to the platform. They will be able to manage their shop and products normally."
            : "This will prevent the vendor from managing their shop or adding new products. Their existing products will remain visible but cannot be modified."
        }
        isOpen={openStatusAlert}
        onClose={() => setOpenStatusAlert(false)}
        onConfirm={onChangeStatus}
      />

      <AlertModal
        title="Delete Vendor"
        description="Are you sure you want to delete this vendor? This action cannot be undone and will remove all their products from the platform."
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
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem className="cursor-pointer">
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer">
            <Store className="mr-2 h-4 w-4" />
            View Products
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer">
            <ExternalLink className="mr-2 h-4 w-4" />
            Visit Shop
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuSeparator />

          {!isSelf && (
            <>
              <DropdownMenuItem
                onClick={() => setOpenStatusAlert(true)}
                className={`cursor-pointer ${
                  data.isBlacklisted ? "text-green-600" : "text-amber-600"
                }`}
              >
                {data.isBlacklisted ? (
                  <>
                    <UserCheck className="mr-2 h-4 w-4" />
                    Activate Vendor
                  </>
                ) : (
                  <>
                    <UserX className="mr-2 h-4 w-4" />
                    Blacklist Vendor
                  </>
                )}
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => setOpenDeleteAlert(true)}
                className="cursor-pointer text-red-600"
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete Vendor
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
