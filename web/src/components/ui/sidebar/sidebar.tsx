"use client";

import React, { FC } from 'react'
import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import SidebarMenu from './sidebar-menu';
import { useDashboardLayout } from '@/context/DashboardContext';

type Props = {
    isProfile: boolean
}
export const DashboardSidebar: FC<Props> = ({ isProfile }) => {
    const { toggleActive, toggleSidebar } = useDashboardLayout();
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
                        aria-label={isProfile ? "Back to dashboard" : "PeopleDesk dashboard"}
                        className="bg-white py-4 px-5 w-full lg:flex hidden gap-[10px] items-center h-[70px] "
                    >
                        {isProfile ? (
                            <div className='flex items-center gap-2 text-gray-700'>
                                <ChevronLeftIcon className='w-5 h-5' />
                                {toggleActive && "Profile Settings"}
                            </div>
                        ) : (
                            <div className='flex items-center gap-3 min-w-0'>
                                <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white'>
                                    P
                                </span>
                                <span className={`${toggleActive ? "block" : "lg:hidden"} truncate text-lg font-semibold text-gray-800`}>
                                    PeopleDesk
                                </span>
                            </div>
                        )}
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
