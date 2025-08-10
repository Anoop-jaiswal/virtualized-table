import React from "react";
import type { InputProps } from "../../types/inputTypes";

export const Input: React.FC<InputProps> = ({
  type = "text",
  label,
  className = "",
  labelClassName = "",
  wrapperClassName = "",
  ...props
}) => {
  return (
    <label
      className={`inline-flex items-center cursor-pointer ${wrapperClassName}`}
    >
      <input
        type={type}
        className={
          type === "checkbox" || type === "radio"
            ? `${
                type === "checkbox" ? "form-checkbox" : "form-radio"
              } text-green-500 ${className}`
            : `border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`
        }
        {...props}
      />
      {label && (
        <span className={`ml-2 select-none ${labelClassName}`}>{label}</span>
      )}
    </label>
  );
};
