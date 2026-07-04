"use client";

import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  isLoading?: boolean;
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
  iconColor,
  iconBg,
  isLoading,
}: StatsCardProps) {
  return (
    <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">
            {isLoading ? (
              <span className="inline-block h-7 w-24 animate-pulse rounded bg-gray-200" />
            ) : (
              value
            )}
          </p>
        </div>
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconBg}`}
        >
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}
