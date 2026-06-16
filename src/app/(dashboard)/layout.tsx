"use client";

import { useState } from "react";

import Topbar from "@/shared/components/layout/Topbar";
import Sidebar from "@/shared/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  const role = "admin";

  return (
    <div className="flex min-h-screen bg-[#F9F9F9]">
      <Sidebar role={role} collapsed={collapsed} />

      <div className="flex flex-1 flex-col">
        <Topbar collapsed={collapsed} setCollapsed={setCollapsed} />

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
