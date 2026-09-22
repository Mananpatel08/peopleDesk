import type { Metadata } from "next";
import "../style/globals.css";
import "nprogress/nprogress.css";
import NProgressWrapper from "./NProgressWrapper";
import { QueryProvider, ToastProviderWrapper, UserProviderWrapper, DashBoardPrividerWrapper } from "@/providers";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Login | EMS",
  description: "Login page for EMS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </head>
      <body suppressHydrationWarning>
        <ToastProviderWrapper>
          <QueryProvider>
            <UserProviderWrapper>
              <DashBoardPrividerWrapper>
                <NProgressWrapper />
                {children}
              </DashBoardPrividerWrapper>
            </UserProviderWrapper>
          </QueryProvider>
        </ToastProviderWrapper>
      </body>
    </html>
  );
}
