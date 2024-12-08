"use client";

import { ChevronLeft } from "lucide-react";

import { Button } from "./button";
import { useNavigate } from "react-router";

interface BackButtonProps {
  onClick?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate("-1");
    }
  };

  return (
    <div className="mb-8 ">
      <div className="flex items-center pl-0  w-full space-x-2  ">
        <Button
          onClick={handleClick}
          variant="ghost"
          className="rounded-full"
          size={"icon"}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <span>Back</span>
      </div>
    </div>
  );
};

export default BackButton;
