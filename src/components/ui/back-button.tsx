"use client";

import { ChevronLeft } from "lucide-react";

import { useNavigate } from "react-router";
import { Button } from "./button";

interface BackButtonProps {
  onClick?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="mb-8 ">
      <div>
        <Button
          onClick={handleClick}
          variant="link"
          className=" flex items-center  space-x-1 p-0"
          size={"sm"}
        >
          <ChevronLeft className="h-5 w-5" />
          <span>Back</span>
        </Button>
      </div>
    </div>
  );
};

export default BackButton;
