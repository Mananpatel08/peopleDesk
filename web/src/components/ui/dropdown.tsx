"use client";

import { cn } from "@/helpers";
import { useOutsideClick } from "@/hooks/useOutSideClikDetector";
import { X } from "lucide-react";
import React, { useState, useRef } from "react";

export interface DropdownOption<T = string> {
  label: string;
  value: T;
}

interface CommonDropdownProps<T = string> {
  options: DropdownOption<T>[];
  value?: T;
  onChange?: (value: T) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
  optionClassName?: string;
  name?: string;
  isClearable?: boolean;
}

export function CommonDropdown<T = string>({
  options,
  value,
  onChange,
  placeholder = "Select...",
  label,
  disabled = false,
  error,
  className,
  optionClassName,
  name,
  isClearable
}: CommonDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selected = options.find((opt) => String(opt.value) === String(value));

  const handleSelect = (val: T) => {
    if (disabled) return;
    onChange?.(val);
    setIsOpen(false);
  };

  useOutsideClick(dropdownRef, () => setIsOpen(false), isOpen);

  return (
    <div className={cn("w-full", className)} ref={dropdownRef}>
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor={name}>
          {label}
        </label>
      )}
      <div
        id={name}
        className={cn(
          "relative rounded-xl border transition cursor-pointer select-none",
          disabled
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white hover:border-gray-400 border-gray-300",
          error && "border-red-500"
        )}
        onClick={() => !disabled && setIsOpen((p) => !p)}
      >
        <div className="flex justify-between items-center px-4 py-2">

          <span className={cn(!selected && "text-gray-400", "flex items-center gap-2")}>
            {selected ? selected.label : placeholder}
          </span>
          {(isClearable && selected) ? (
            <X className="w-4 h-4 text-red-400 hover:text-red-600" strokeWidth={2.5} onClick={(e) => { e.stopPropagation(); handleSelect('' as T) }} />
          ) : (
            <svg
              className={cn(
                "w-4 h-4 ml-2 transition-transform duration-200",
                isOpen ? "rotate-180" : "rotate-0"
              )}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          )}
        </div>

        {isOpen && (
          <div
            className={cn(
              "absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-md max-h-48 overflow-auto",
              optionClassName
            )}
          >
            {options.length > 0 ? (
              options.map((opt) => (
                <div
                  key={String(opt.value)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(opt.value);
                  }}
                  className={cn(
                    "px-4 py-2.5 text-sm hover:bg-blue-50 cursor-pointer",
                    selected?.value === opt.value && "bg-blue-100 font-medium"
                  )}
                >
                  {opt.label}
                </div>
              ))
            ) : (
              <div className="px-4 py-2.5 text-sm text-gray-500">No options</div>
            )}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
