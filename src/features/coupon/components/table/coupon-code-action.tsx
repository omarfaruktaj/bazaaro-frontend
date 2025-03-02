import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CouponCodeCellProps {
  code: string;
}

export default function CouponCodeAction({ code }: CouponCodeCellProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (couponCode: string) => {
    try {
      await navigator.clipboard.writeText(couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy coupon");
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <code>{code}</code>
      <Button
        onClick={() => handleCopy(code)}
        aria-label="Copy coupon code"
        size={"icon"}
        variant={"ghost"}
        className="rounded-lg"
      >
        {copied ? <Check className="text-green-500" /> : <Copy />}
      </Button>
    </div>
  );
}
