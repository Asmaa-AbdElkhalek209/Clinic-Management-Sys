"use client";

import StatsCard from "@/shared/components/dashboard/StatsCard";
import { overviewStats, statusStats } from "../config/dashboard-stats.config";
import { DashboardStatsResponse } from "../types/dashboard.types";

interface DashboardStatsCardsProps {
  data: DashboardStatsResponse | null;
}

export default function DashboardStatsCards({
  data,
}: DashboardStatsCardsProps) {
  return (
    <div className="space-y-6">
      {/* Overview Section */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Overview</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {overviewStats.map((stat) => (
            <StatsCard
              key={stat.title}
              label={stat.title}
              value={stat.getValue(data)}
              icon={stat.icon}
              iconColor={stat.iconColor}
              iconBg={stat.iconBg}
            />
          ))}
        </div>
      </div>

      {/* By Status Section */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Appointments by Status
        </h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {statusStats.map((stat) => (
            <StatsCard
              key={stat.title}
              label={stat.title}
              value={stat.getValue(data)}
              icon={stat.icon}
              iconColor={stat.iconColor}
              iconBg={stat.iconBg}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
