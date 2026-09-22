import { cn } from "@/helpers";
import React from "react";

export type TButtonVariant = "primary" | "secondary" | "danger";
export type TButtonSizes = "sm" | "md" | "lg" | "xl";

interface CommonButtonProps {
  variant?: TButtonVariant;
  size?: TButtonSizes;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<TButtonVariant, string> = {
  primary:
    "bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition",
  secondary:
    "border text-gray-700 hover:bg-gray-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition",
  danger:
    "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed transition",
};

const sizeClasses: Record<TButtonSizes, string> = {
  sm: "text-sm px-3 py-1.5",
  md: "text-base px-5 py-2",
  lg: "text-lg px-6 py-2.5",
  xl: "text-xl px-8 py-3",
};

export const Button: React.FC<CommonButtonProps> = ({
  variant = "primary",
  size = "md",
  onClick,
  type = "button",
  disabled = false,
  children,
  className,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "font-medium rounded-lg transition focus:outline-none",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </button>
  );
};
