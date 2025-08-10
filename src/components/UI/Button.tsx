import React from "react";
import type {
  ButtonProps,
  ButtonSize,
  ButtonVariant,
} from "../../types/buttonTypes";

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) => {
  const baseStyles =
    "rounded transition font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles: Record<ButtonVariant, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 border border-blue-600",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 border border-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700 border border-red-600",
    outline:
      "bg-transparent border border-gray-500 text-gray-700 hover:bg-gray-100",
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  const finalClassName = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className,
  ].join(" ");

  return (
    <button className={finalClassName} {...props}>
      {children}
    </button>
  );
};
