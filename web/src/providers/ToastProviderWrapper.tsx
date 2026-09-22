"use client";

import { ToastProvider } from "@/context";

export default function ToastProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ToastProvider>{children}</ToastProvider>;
}
