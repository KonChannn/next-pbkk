"use client";

import { SessionProvider } from "next-auth/react";

import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {children}
      </div>
    </SessionProvider>
  );
}