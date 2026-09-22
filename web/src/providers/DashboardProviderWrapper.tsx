"use client";

import { DashboardLayoutProvider } from "@/context/DashboardContext";

export default function DashBoardPrividerWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <DashboardLayoutProvider>
            {children}
        </DashboardLayoutProvider>
    )
}
