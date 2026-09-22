"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Squares2X2Icon,
    UsersIcon,
    DocumentTextIcon,
    KeyIcon,
} from "@heroicons/react/24/outline";
import { Settings2 } from "lucide-react";

type MenuItem = {
    name: string;
    href: string;
    icon: React.ElementType;
};

const dashboardMenuItems: MenuItem[] = [
    { name: "Dashboard", href: "/", icon: Squares2X2Icon },
    { name: "Users", href: "/users", icon: UsersIcon },
    { name: "User Forms", href: "/forms", icon: DocumentTextIcon },
];

const profileMenuItems: MenuItem[] = [
    { name: "Profile", href: "/profile", icon: UsersIcon },
    { name: "Security", href: "/profile/security", icon: KeyIcon },
    { name: "Appearance", href: "/profile/appearance", icon: Settings2 },
]

export default function SidebarMenu({ toggleActive, isProfile }: { toggleActive: boolean, isProfile: boolean }) {
    const pathname = usePathname();
    const menuItems = isProfile ? profileMenuItems : dashboardMenuItems

    return (
        <nav>
            <ul className="flex flex-col gap-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <li key={item.name}>
                            <Link
                                href={item.href}
                                className={`text-base px-3 py-2.5 flex items-center gap-3 rounded-xl transition-all ${isActive
                                    ? "bg-blue-100/50 text-blue-600"
                                    : "hover:bg-gray-300/25 hover:shadow-sm text-gray-600"
                                    } ${!toggleActive && "w-fit"}`}
                            >
                                <span className="w-[25px] h-[25px] rounded-full flex items-center justify-center">
                                    <Icon className="w-5 h-5" />
                                </span>

                                <span className={`${toggleActive ? "block" : "lg:hidden"}`}>
                                    {item.name}
                                </span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
