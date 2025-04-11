import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
      toast.success("Coupon code copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to copy coupon code");
    }
  };

  return (
    <TooltipProvider>
      <div className="flex items-center space-x-2">
        <code className="bg-gray-100 px-2 py-1 rounded-md font-mono text-sm">
          {code}
        </code>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => handleCopy(code)}
              aria-label="Copy coupon code"
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-full"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4 text-gray-500" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{copied ? "Copied!" : "Copy code"}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
