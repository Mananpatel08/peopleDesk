"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type DashboardLayoutContextType = {
  toggleActive: boolean;
  setToggleActive: (value: boolean) => void;
  toggleSidebar: () => void
};

const DashboardLayoutContext = createContext<DashboardLayoutContextType | null>(null);


export function DashboardLayoutProvider({ children }: { children: React.ReactNode }) {
  const [toggleActive, setToggleActive] = useState(true);


  useEffect(() => {
    const saved = localStorage.getItem("sidebar-toggle");
    if (saved !== null) {
      setToggleActive(saved === "true");
    }
  }, []);

  const toggleSidebar = () => {
    setToggleActive((prev) => {
      localStorage.setItem("sidebar-toggle", (!prev).toString());
      return !prev;
    });
  };

  return (
    <DashboardLayoutContext.Provider value={{ toggleActive, setToggleActive, toggleSidebar }}>
      {children}
    </DashboardLayoutContext.Provider>
  );
};

export const useDashboardLayout = () => {
  const context = useContext(DashboardLayoutContext);
  if (!context) {
    throw new Error("useDashboardLayout must be used within a DashboardLayoutProvider");
  }
  return context;
};