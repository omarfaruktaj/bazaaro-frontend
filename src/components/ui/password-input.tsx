import React, { useState } from "react";

import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "./button";
import { Input } from "./input";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          {...props}
          ref={ref}
          className={cn("pe-10", className)}
        />

        <Button
          onClick={() => setShowPassword(!showPassword)}
          type="button"
          variant="link"
          size="sm"
          className="absolute inset-y-0 right-0 h-full pr-3 text-muted-foreground"
        >
          {showPassword ? <EyeOff className="h-5" /> : <Eye className="h-5" />}
        </Button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
