"use client";

import { useState, useRef, useEffect, JSX } from "react";
import { motion } from "framer-motion";
import {
    User,
    Settings,
    CreditCard,
    Users,
    Clock,
    Headphones,
    MessageCircle,
    LogOut,
    ChevronDownIcon,
} from "lucide-react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useLogout } from "@/hooks/useAuth";
import { useUserContext } from "@/context";
import { FunnelIcon } from "@heroicons/react/24/outline";
import Checkbox from "../ui/checkbox";
import { p } from "framer-motion/client";

type MenuItemProps = {
    icon: JSX.Element;
    label: string;
    onClick?: () => void;
};

type Props = {
    setParams: any;
    params: any;
}

export const FilterDropdown: React.FC<Props> = ({
    setParams,
    params
}) => {
    const [open, setOpen] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement | null>(null);
    const { mutateAsync: logout, isPending } = useLogout();
    const { user } = useUserContext();

    const toggleStatus = (value: string) => {
        setParams((prev: any) => {
            const exists = prev.status.includes(value);

            return {
                ...prev,
                status: exists
                    ? prev.status.filter((s: any) => s !== value)   // remove
                    : [...prev.status, value]                // add
            };
        });
    };


    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block text-left h-10" ref={ref}>
            <button onClick={() => setOpen(!open)} className="border p-2 rounded-xl focus:outline-none">
                <FunnelIcon className="w-6 h-6 text-gray-400" />
            </button>

            {open && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute right-0 top-11 w-64 rounded-xl bg-white shadow-sm border p-3 z-50"
                >

                    <p className="text-sm text-gray-400 mb-1">Status</p>
                    <div className="flex flex-col gap-0.5">
                        <Checkbox
                            checked={params.status.includes("completed")}
                            setChecked={() => toggleStatus("completed")}
                            label="Completed"
                            labelClassName="text-black p-1 py-1.5 hover:bg-gray-300/25"
                        />
                        
                        <Checkbox
                            checked={params.status.includes("in_progress")}
                            setChecked={() => toggleStatus("in_progress")}
                            label="In Progress"
                            labelClassName="text-black p-1 py-1.5 hover:bg-gray-300/25"
                        />

                        <Checkbox
                            checked={params.status.includes("pending")}
                            setChecked={() => toggleStatus("pending")}
                            label="Pending"
                            labelClassName="text-black p-1 py-1.5 hover:bg-gray-300/25"
                        />
                    </div>


                </motion.div>
            )}
        </div>
    );
}

function MenuItem({ icon, label, onClick }: MenuItemProps) {
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center gap-3 text-left text-sm rounded-lg p-2 hover:bg-gray-100 transition"
        >
            {icon}
            {label}
        </button>
    );
}