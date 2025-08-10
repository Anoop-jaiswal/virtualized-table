import type { ReactNode } from "react";

export interface PopoverProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  positionClassName?: string;
}
