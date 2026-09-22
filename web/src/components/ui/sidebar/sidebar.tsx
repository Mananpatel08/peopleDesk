"use client";

import { BadgeCent, BadgeSwissFranc, BaggageClaim, CakeSlice, CarFront, ChevronUpIcon, CircleChevronLeft, Lightbulb, LucideLayoutDashboard } from 'lucide-react'
import Image from 'next/image';
import React, { FC, useState } from 'react'
import EMS from '../../../../public/logos/light-ens-logo.png'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeftIcon, DocumentTextIcon, Squares2X2Icon, UsersIcon } from '@heroicons/react/24/outline';
import SidebarMenu from './sidebar-menu';
import { useDashboardLayout } from '@/context/DashboardContext';

type Props = {
    isProfile: boolean
}
export const DashboardSidebar: FC<Props> = ({ isProfile }) => {
    const { toggleActive, setToggleActive, toggleSidebar } = useDashboardLayout();
    const themeChange = true;
    return (
        <>
            <aside
                className={`${toggleActive
                    ? "xl:w-[262px] w-[250px] right-[-250px]"
                    : "lg:w-[100px] w-[250px] right-0"
                    } h-screen flex flex-col transition-all lg:static fixed z-10 border-r`}
            >
                <div className='relative'>
                    <Link
                        href="/"
                        className="bg-white py-4 px-8 w-full lg:flex hidden gap-[10px] items-center h-[70px] "
                    >
                        <div className='flex items-center gap-2 '>
                            {isProfile && (<ChevronLeftIcon className='w-5 h-5' />)}
                            {toggleActive && (isProfile ? "Profile Settings" : "")}
                        </div>
                    </Link>
                    <div
                        onClick={() => toggleSidebar()}
                        className="absolute top-[3.8rem] right-[-0.6rem] border bg-white hover:bg-gray-100
                            rounded-full p-0.5 hidden lg:block cursor-pointer transition-all duration-300 shadow-sm"
                    >
                        <ChevronLeftIcon
                            className={`h-3.5 w-3.5 transition-all duration-300 
                                ${toggleActive ? "rotate-0" : "-rotate-180"}`}
                            strokeWidth={2}
                        />
                    </div>
                </div>
                <div
                    className={`${themeChange ? "bg-white" : "bg-white"
                        } px-[20px] py-1 h-full overflow-y-auto overflow-x-hidden `}
                >
                    <SidebarMenu toggleActive={toggleActive} isProfile={isProfile} />
                </div>
            </aside>
        </>
    )
}
