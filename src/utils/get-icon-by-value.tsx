import { iconOptions } from "@/data/icons";
import { FaExclamationCircle } from "react-icons/fa";

export const getIconByValue = (value: string) => {
  const iconOption = iconOptions.find((option) => option.value === value);
  return iconOption ? iconOption.icon : FaExclamationCircle;
};
