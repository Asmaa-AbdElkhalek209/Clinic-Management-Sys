import Header from "@/shared/components/dashboard/Header";
import DashboardStatsCards from "@/features/dashboard/dashboard/components/DashboardStatsCards";
import LatestAppointmentsTable from "@/features/dashboard/dashboard/components/LatestAppointmentsTable";
import Link from "next/link";

import { getDashboardStats } from "@/features/dashboard/dashboard/actions/get-dashboard-stats.action";
import { getLatestAppointments } from "@/features/dashboard/dashboard/actions/get-latest-appointments.action";
import QuickActions from "@/features/dashboard/dashboard/components/QuickActions";

export default async function AdminDashboardPage() {
  const [stats, latestAppointments] = await Promise.all([
    getDashboardStats(),
    getLatestAppointments(),
  ]);

  return (
    <div className="min-h-screen space-y-6 bg-gray-50 p-6">
      <Header
        title="Dashboard"
        description="Welcome back! Here's what's happening today."
      />

      {/* Quick Actions */}
      <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
        <QuickActions />
      </div>

      {/* Stats Cards */}
      <DashboardStatsCards data={stats} />

      {/* Latest Appointments */}
      <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">
            Recent Appointments
          </h3>
          <Link
            href="/admin/appointments"
            className="text-xs font-medium text-blue-600 hover:text-blue-700"
          >
            View all
          </Link>
        </div>
        <LatestAppointmentsTable appointments={latestAppointments} />
      </div>
    </div>
  );
}
