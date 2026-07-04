import {
  Users,
  CalendarDays,
  CalendarCheck,
  Clock,
  CheckCircle,
  XCircle,
  CircleDot,
} from "lucide-react";
import { DashboardStatsResponse } from "../types/dashboard.types";

export const overviewStats = [
  {
    title: "Total Patients",
    icon: Users,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    getValue: (data?: DashboardStatsResponse | null) =>
      data?.overview?.totalPatients ?? 0,
  },
  {
    title: "Total Appointments",
    icon: CalendarDays,
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-50",
    getValue: (data?: DashboardStatsResponse | null) =>
      data?.overview?.totalAppointments ?? 0,
  },
  {
    title: "Today's Appointments",
    icon: CalendarCheck,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    getValue: (data?: DashboardStatsResponse | null) =>
      data?.overview?.todayAppointments ?? 0,
  },
];

export const statusStats = [
  {
    title: "Pending",
    icon: Clock,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
    getValue: (data?: DashboardStatsResponse | null) =>
      data?.appointmentsByStatus?.pending ?? 0,
  },
  {
    title: "Confirmed",
    icon: CircleDot,
    iconColor: "text-sky-600",
    iconBg: "bg-sky-50",
    getValue: (data?: DashboardStatsResponse | null) =>
      data?.appointmentsByStatus?.confirmed ?? 0,
  },
  {
    title: "Completed",
    icon: CheckCircle,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    getValue: (data?: DashboardStatsResponse | null) =>
      data?.appointmentsByStatus?.completed ?? 0,
  },
  {
    title: "Cancelled",
    icon: XCircle,
    iconColor: "text-red-600",
    iconBg: "bg-red-50",
    getValue: (data?: DashboardStatsResponse | null) =>
      data?.appointmentsByStatus?.cancelled ?? 0,
  },
];
