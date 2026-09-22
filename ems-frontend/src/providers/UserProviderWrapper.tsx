"use client";

import { UserProvider } from "@/context";

export default function UserProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserProvider>{children}</UserProvider>;
}
