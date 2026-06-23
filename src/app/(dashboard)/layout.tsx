"use client";

import { useState } from "react";
import Topbar from "@/shared/components/layout/Topbar";
import Sidebar from "@/shared/components/layout/Sidebar";
import { useSession } from "next-auth/react";
import { UserRole } from "@/shared/components/layout/sidebar.config";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const { data: session, status } = useSession();

  if (status === "loading" || !session?.user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F9F9F9]">
        <p className="text-gray-500 animate-pulse">Loading...</p>
      </div>
    );
  }

  const role = session.user.role as UserRole;

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <Sidebar role={role} collapsed={collapsed} />

      <div
        className={`flex flex-col min-h-screen transition-all duration-300 ${
          collapsed ? "ml-20" : "ml-64"
        }`}
      >
        <Topbar collapsed={collapsed} setCollapsed={setCollapsed} />

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
