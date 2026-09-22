import { cn } from "@/helpers";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface InputProps {
  label?: string;
  required?: boolean;
  type?: string;
  className?: string;
  placeholder?: string;
  name: string;
  icon?: ReactNode;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

export const Input = ({
  label,
  required,
  type = "text",
  className,
  placeholder,
  name,
  icon,
  error,
  ...props
}: InputProps) => {
  const formContext = useFormContext?.();

  const register = formContext?.register;
  const fieldError =
    formContext?.formState?.errors?.[name]?.message || error;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        {icon && (
          <span className={cn("absolute left-3 top-2.5 h-5 w-5 ", fieldError ? "text-red-400" : "text-gray-400")}>
            {icon}
          </span>
        )}

        <input
          type={type}
          {...(register ? register(name) : {})}
          placeholder={placeholder}
          {...props}
          className={cn(
            "w-full rounded-xl border px-3 py-2 outline-none focus:ring-0.5",
            icon && "pl-10",
            fieldError
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500",
            className
          )}
        />
      </div>

      {fieldError && <p className="text-xs text-red-500 mt-1">{fieldError as string}</p>}
    </div>
  );
};
