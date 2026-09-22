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
                    } h-screen shrink-0 flex flex-col bg-white transition-[width,right] duration-300 lg:static fixed z-30 border-r border-gray-200`}
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
                        role="button"
                        aria-label={toggleActive ? "Collapse sidebar" : "Expand sidebar"}
                        tabIndex={0}
                        onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") toggleSidebar();
                        }}
                        className="absolute top-1/2 right-[-0.6rem] -translate-y-1/2 border border-gray-200 bg-white hover:bg-gray-50
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
                        } px-5 py-4 h-full overflow-y-auto overflow-x-hidden `}
                >
                    <SidebarMenu toggleActive={toggleActive} isProfile={isProfile} />
                </div>
            </aside>
            {!toggleActive && (
                <button
                    type="button"
                    aria-label="Close sidebar"
                    onClick={() => toggleSidebar()}
                    className="fixed inset-0 z-20 bg-gray-900/20 lg:hidden"
                />
            )}
        </>
    )
}
