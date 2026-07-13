"use client";

import { Menu, Bell } from "lucide-react";
import UserDropdown from "../dashboard/UserDropdown"; 

type TopbarProps = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Topbar({ collapsed, setCollapsed }: TopbarProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg p-2 hover:bg-slate-100"
        >
          <Menu size={20} className="text-slate-600" />
        </button>

        <h1 className="font-semibold text-slate-700">Dashboard</h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <button className="rounded-lg p-2 hover:bg-slate-100 transition-colors">
          <Bell size={18} className="text-slate-600" />
        </button>
        <UserDropdown />
      </div>
    </header>
  );
}
