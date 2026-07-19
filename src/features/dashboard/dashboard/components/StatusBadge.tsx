import { AppointmentStatus } from "@/features/dashboard/appointments/types/appointment.types";

const STATUS_STYLES: Record<AppointmentStatus, string> = {
  pending: "bg-yellow-50 text-yellow-700 ring-yellow-600/20",
  confirmed: "bg-blue-50 text-blue-700 ring-blue-600/20",
  cancelled: "bg-red-50 text-red-700 ring-red-600/20",
  completed: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
};

interface StatusBadgeProps {
  status: AppointmentStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${STATUS_STYLES[status]}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-40" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
