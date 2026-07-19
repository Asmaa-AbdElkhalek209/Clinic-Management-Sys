import {
  CalendarDays,
  Clock,
  CheckCircle,
  XCircle,
  TrendingDown,
} from "lucide-react";
import { AppointmentReport } from "../types/report.types";

export const appointmentReportStats = [
  {
    title: "Total Appointments",
    icon: CalendarDays,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    getValue: (data?: AppointmentReport) => data?.total ?? 0,
  },
  {
    title: "Pending",
    icon: Clock,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
    getValue: (data?: AppointmentReport) => data?.byStatus?.pending ?? 0,
  },
  {
    title: "Confirmed",
    icon: CheckCircle,
    iconColor: "text-sky-600",
    iconBg: "bg-sky-50",
    getValue: (data?: AppointmentReport) => data?.byStatus?.confirmed ?? 0,
  },
  {
    title: "Completed",
    icon: CheckCircle,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    getValue: (data?: AppointmentReport) => data?.byStatus?.completed ?? 0,
  },
  {
    title: "Cancelled",
    icon: XCircle,
    iconColor: "text-red-600",
    iconBg: "bg-red-50",
    getValue: (data?: AppointmentReport) => data?.byStatus?.cancelled ?? 0,
  },
  {
    title: "Cancellation Rate",
    icon: TrendingDown,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-50",
    getValue: (data?: AppointmentReport) =>
      `${(data?.cancellationRate ?? 0).toFixed(1)}%`,
  },
];
