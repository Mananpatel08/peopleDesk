"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, X } from "lucide-react";
import dayjs from "dayjs";
import { CalendarDaysIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useOutsideClick } from "@/hooks/useOutSideClikDetector";
import { Controller, useFormContext } from "react-hook-form";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

type DatePickerProps = {
    name: string;
    placeholder?: string;
    isClearable?: boolean;
    minDate?: string;
    maxDate?: string;
};

export function DatePicker({ name, placeholder = "Select date", isClearable, minDate, maxDate }: DatePickerProps) {
    const [open, setOpen] = useState(false);
    const [view, setView] = useState<"date" | "month" | "year">("date");
    const [current, setCurrent] = useState(dayjs());
    const dropdownRef = useRef<HTMLDivElement>(null);

    const min = minDate ? dayjs(minDate) : null;
    const max = maxDate ? dayjs(maxDate) : null;


    useOutsideClick(dropdownRef, () => setOpen(false), open);

    const formContext = useFormContext();
    const { control } = formContext;

    const startYear = Math.floor(current.year() / 12) * 12;
    const years = Array.from({ length: 12 }, (_, i) => startYear + i);

    const prev = () => {
        if (view === "date") setCurrent(current.subtract(1, "month"));
        if (view === "month") setCurrent(current.subtract(1, "year"));
        if (view === "year") setCurrent(current.subtract(12, "year"));
    };

    const next = () => {
        if (view === "date") setCurrent(current.add(1, "month"));
        if (view === "month") setCurrent(current.add(1, "year"));
        if (view === "year") setCurrent(current.add(12, "year"));
    };

    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => {
                const selected = field.value ? dayjs(field.value) : null;
                const startDay = current.startOf("month").day() || 7;
                const daysInMonth = current.daysInMonth();

                const handleSelect = (date: dayjs.Dayjs) => {
                    field.onChange(date.format("YYYY-MM-DD"));
                    setCurrent(date);
                    setOpen(false);
                };

                return (
                    <div className="relative inline-block w-full" ref={dropdownRef}>
                        <button
                            type="button"
                            onClick={() => setOpen(!open)}
                            className={`w-full px-3 py-2 border rounded-xl bg-white shadow-sm flex justify-between items-center 
                                ${fieldState.error ? "border-red-500" : "border-gray-300"}`}
                        >
                            <span className={`${selected ? "text-gray-900" : "text-gray-400"}`}>
                                {selected ? selected.format("DD MMM YYYY") : placeholder}
                            </span>
                            {isClearable && selected ? (
                                <X className="w-4 h-4 text-red-400 hover:text-red-600" strokeWidth={2.5} onClick={(e) => { e.stopPropagation(); field.onChange("") }} />
                            ) : (
                                <CalendarDaysIcon className="w-5 h-5" />
                            )}
                        </button>

                        {fieldState.error && (
                            <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
                        )}

                        {open && (
                            <div className="absolute z-50 mt-2 w-80 rounded-2xl bg-white shadow-xl p-4 select-none">
                                {/* Header */}
                                <div className="flex justify-between items-center mb-4">
                                    <button
                                        type="button"
                                        className="p-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600"
                                        onClick={prev}
                                    >
                                        <ChevronLeft size={20} />
                                    </button>

                                    <button
                                        type="button"
                                        className="font-medium text-lg flex items-center gap-1"
                                        onClick={() =>
                                            setView(view === "date" ? "month" : view === "month" ? "year" : "date")
                                        }
                                    >
                                        {view === "date" && current.format("MMMM YYYY")}
                                        {view === "month" && current.format("YYYY")}
                                        {view === "year" && `${years[0]} - ${years[11]}`}
                                        <ChevronDown size={18} />
                                    </button>

                                    <button
                                        type="button"
                                        className="p-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600"
                                        onClick={next}
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </div>

                                {/* Year View */}
                                {view === "year" && (
                                    <div className="grid grid-cols-3 gap-2">
                                        {years.map((y) => (
                                            <div
                                                key={y}
                                                className={`text-center cursor-pointer py-2 rounded-xl 
                        ${y === current.year() ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}
                                                onClick={() => {
                                                    setCurrent(current.year(y));
                                                    setView("month");
                                                }}
                                            >
                                                {y}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Month View */}
                                {view === "month" && (
                                    <div className="grid grid-cols-3 gap-2">
                                        {months.map((m, idx) => (
                                            <div
                                                key={m}
                                                className={`text-center cursor-pointer py-2 rounded-xl
                        ${idx === current.month() ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}
                                                onClick={() => {
                                                    setCurrent(current.month(idx));
                                                    setView("date");
                                                }}
                                            >
                                                {m}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Date View */}
                                {view === "date" && (
                                    <>
                                        <div className="grid grid-cols-7 text-center text-gray-500 mb-2">
                                            {daysOfWeek.map((d) => (
                                                <div key={d} className="text-sm">
                                                    {d}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="grid grid-cols-7 gap-1 text-center">
                                            {Array.from({ length: startDay - 1 }).map((_, i) => (
                                                <div key={i} />
                                            ))}

                                            {Array.from({ length: daysInMonth }).map((_, i) => {
                                                const d = i + 1;
                                                const dateObj = current.date(d);
                                                const isDisabled =
                                                    (min && dateObj.isBefore(min, "day")) ||
                                                    (max && dateObj.isAfter(max, "day"));

                                                const isSelected = selected && selected.isSame(current.date(d), "day");
                                                const today = dayjs();
                                                const isToday = today.isSame(current.date(d), "day");

                                                return (
                                                    <div
                                                        key={d}
                                                        onClick={() => !isDisabled && handleSelect(dateObj)}
                                                        className={`cursor-pointer p-2 rounded-full text-sm
                                                                ${isDisabled ? "text-gray-300 cursor-not-allowed" : ""}
                                                                ${isSelected ? "bg-blue-500 text-white" : "hover:bg-blue-50"}
                                                                ${!isSelected && isToday ? "border border-blue-500 font-semibold text-blue-600" : ""}
                                                                ${!isSelected && !isDisabled && !isToday ? "hover:bg-blue-50" : ""}
                                                            `}
                                                    >
                                                        {d}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                );
            }}
        />
    );
}
