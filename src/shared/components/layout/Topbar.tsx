"use client";

import { Menu, Bell } from "lucide-react";
import { useSession } from "next-auth/react";

type TopbarProps = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Topbar({ collapsed, setCollapsed }: TopbarProps) {
  const { data: session } = useSession();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg p-2 hover:bg-slate-100"
        >
          <Menu size={20} />
        </button>

        <h1 className="font-semibold text-slate-700">Dashboard</h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <button className="rounded-lg p-2 hover:bg-slate-100">
          <Bell size={18} />
        </button>

        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-blue-500" />

          <div className="hidden md:block">
            <p className="text-sm font-medium">Welcome {session?.user?.name}</p>

            <p className="text-xs text-slate-500">{session?.user?.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
