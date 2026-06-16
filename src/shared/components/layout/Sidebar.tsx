"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LogOut } from "lucide-react";

import { sidebarConfig, UserRole } from "./sidebar.config";
import { useLogout } from "@/features/auth/hooks/auth.hooks";

type SidebarProps = {
  role: UserRole;
  collapsed: boolean;
};

export default function Sidebar({ role, collapsed }: SidebarProps) {
  const pathname = usePathname();
  const links = sidebarConfig[role];

  const { logout } = useLogout();
  const [isPending, setIsPending] = useState(false);

  return (
    <aside
      className={`border-r bg-white transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white font-bold">
            MC
          </div>

          {!collapsed && <span className="text-lg font-bold">MediCare</span>}
        </div>
      </div>
      <div className="flex flex-col justify-between h-[calc(100vh-4rem)]">
        {/* Links */}
        <nav className="space-y-2 p-4">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Icon size={20} />
                {!collapsed && <span>{link.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="pb-4 px-3">
          <button
            className="flex items-start gap-3 w-full p-3 rounded-lg
           text-red-500 hover:bg-red-50 transition-colors duration-200 justify-baseline"
            onClick={async () => {
              setIsPending(true);
              await logout();
              setIsPending(false);
            }}
            disabled={isPending}
          >
            <LogOut size={20} />

            {!collapsed && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
