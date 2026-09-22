"use client";

import React from 'react'
import { DashboardSidebar } from '../ui/sidebar/sidebar';
import { DashboardHeader } from '../ui/navbar';
import { useDashboardLayout } from '@/context/DashboardContext';
import { useUserContext } from '@/context';
import { Spinner } from '../ui';

export const DashboardLayout = ({
    children,
    isProfile = false,
}: {
    children: React.ReactNode
    isProfile?: boolean
}) => {
    const { toggleActive } = useDashboardLayout()
    const { isLoadingCurrentUser } = useUserContext();

    if (isLoadingCurrentUser) {
        return <Spinner />;
    }

    return (
        <>
            <div className='flex'>
                <DashboardSidebar isProfile={isProfile} />
                <div
                    className={`${toggleActive
                        ? "xl:w-[calc(100%-262px)] lg:w-[calc(100%-250px)] w-full"
                        : "lg:w-[calc(100%-100px)] w-full"
                        } min-w-0 h-screen overflow-hidden transition-[width] duration-300 flex-1`}
                >
                    {!isProfile && (<DashboardHeader />)}
                    <main className={`main-panel overflow-auto ${isProfile ? "h-full" : "h-[calc(100%-70px)]"} custom-scrollbar`}>
                        <div className='w-full h-full'>
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}