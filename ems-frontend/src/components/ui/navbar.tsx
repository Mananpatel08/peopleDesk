"use client";

import React, { FC } from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { UserCircleIcon } from '@heroicons/react/24/solid';
import ProfileDropdown from './profile-dropdown';
import { TextAlignJustify } from 'lucide-react';
import { useDashboardLayout } from '@/context/DashboardContext';

type Props = {
}
export const DashboardHeader: FC<Props> = ({
}) => {
    const themeChange = true;
    const pathname = usePathname();
    const { toggleSidebar } = useDashboardLayout();
    const ActiveTitle =
        pathname === "/"
            ? "Dashboard"
            : pathname === "/users"
                ? "Users"
                : "Forms";
    return (
        <>

            <div
                className={`${themeChange ? "bg-white" : "bg-white"
                    } py-4 xl:px-5 sm:px-4 px-3 flex justify-between items-center h-[70px] border-b`}
            >
                <div className='flex items-center gap-3'>
                    <button onClick={() => toggleSidebar()} className='bg-gray-100 p-1.5 rounded-lg block lg:hidden'>
                        <TextAlignJustify className='w-4 h-4 text-gray-800' />
                    </button>

                    <h1 className='text-lg font-normal transition-all'>
                        {ActiveTitle}
                    </h1>
                </div>

                <div className="flex sm:gap-6 gap-4 items-center">
                    <ProfileDropdown />
                </div>
            </div>

        </>
    )
}
