import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "./ui/button";

interface AlertModalProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function AlertModal({
  title,
  description,
  isOpen,
  onClose,
  onConfirm,
}: AlertModalProps) {
  const onOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title ? title : "Are you sure you want to proceed?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {description
              ? description
              : "This action will mark the item for deletion, but it can be recovered if needed."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-2">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            onClick={onConfirm}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
