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
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { getFileURL } from "@/helpers";


type MenuItemProps = {
    icon: JSX.Element;
    label: string;
    onClick?: () => void;
};

export default function ProfileDropdown() {
    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement | null>(null);
    const { mutateAsync: logout, isPending } = useLogout();
    const { user } = useUserContext();

    const handleLogout = async () => {
        await logout();
        Cookies.remove("token");
        router.push("/login");
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
            <button onClick={() => setOpen(!open)} className="flex items-center gap-1.5 focus:outline-none">
                <img
                    src={getFileURL(user?.profile_photo ?? "")?.toString()}
                    width={44}
                    height={44}
                    className="rounded-full object-cover"
                />

                {/* Name + Role */}
                <div className="flex flex-col text-left">
                    <span className="text-sm font-medium text-gray-900">
                        {user?.first_name + " " + user?.last_name}
                    </span>
                    <span className="text-xs text-gray-500 -mt-0.5">
                        {user?.user_role === "SUPER_ADMIN" ? "Admin" : "User"}
                    </span>
                </div>

                {/* Chevron Icon */}
                <ChevronDownIcon className={`w-4 h-4 ml-1 text-gray-500 ${open ? "rotate-180" : ""}`} />
            </button>

            {open && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute right-0 top-11 w-64 rounded-2xl bg-white shadow-xl border p-1 z-50"
                >
                    <div className="flex items-center gap-3 p-2 pb-1">
                        {/* <UserCircleIcon className="w-10 h-10 text-blue-600" /> */}
                        <div className="text-sm">
                            {/* <p className="font-semibold">{user?.first_name + " " + user?.last_name}</p> */}
                            <p className="text-gray-500 text-xs">{user?.email}</p>
                        </div>
                    </div>

                    <div className="space-y-1 pb-2">
                        <MenuItem
                            onClick={() => router.push("/profile")}
                            icon={<Settings size={16} />}
                            label="Settings"
                        />
                    </div>

                    <div className="border-t pt-2 text-red-500" onClick={() => { handleLogout() }}>
                        <MenuItem icon={<LogOut size={16} />} label="Sign Out" />
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