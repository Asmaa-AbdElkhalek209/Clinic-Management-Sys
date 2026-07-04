import Link from "next/link";
import { UserPlus, CalendarPlus } from "lucide-react";

export default function QuickActions() {
  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href="/admin/patients"
        className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
      >
        <UserPlus className="h-4 w-4" />
        Add Patient
      </Link>

      <Link
        href="/admin/appointments"
        className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
      >
        <CalendarPlus className="h-4 w-4" />
        New Appointment
      </Link>
    </div>
  );
}
