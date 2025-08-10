import { useRef, useEffect } from "react";
import type { PopoverProps } from "../../types/popoverTypes";

export const Popover = ({
  isOpen,
  onClose,
  children,
  className = "",
  positionClassName = "origin-top-left absolute left-0 mt-2",
}: PopoverProps) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={popoverRef}
      className={`${positionClassName} w-[600px] rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 ${className}`}
      tabIndex={-1}
    >
      {children}
    </div>
  );
};
