import { CalendarDays } from "lucide-react";
import { LatestAppointment } from "../types/dashboard.types";
import StatusBadge from "./StatusBadge";

interface LatestAppointmentsTableProps {
  appointments: LatestAppointment[];
}

export default function LatestAppointmentsTable({
  appointments,
}: LatestAppointmentsTableProps) {
  if (appointments.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-gray-500">
        No recent appointments found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="pb-3 pr-4 font-medium text-gray-500">Patient</th>
            <th className="pb-3 pr-4 font-medium text-gray-500">Doctor</th>
            <th className="pb-3 pr-4 font-medium text-gray-500">Date & Time</th>
            <th className="pb-3 font-medium text-gray-500">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {appointments.map((apt) => (
            <tr key={apt.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="py-3 pr-4">
                <div>
                  <p className="font-medium text-gray-900">
                    {apt.patient.name}
                  </p>
                  <p className="text-xs text-gray-400">{apt.patient.phone}</p>
                </div>
              </td>
              <td className="py-3 pr-4 text-gray-700">{apt.doctor.name}</td>
              <td className="py-3 pr-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <CalendarDays size={14} className="text-gray-400" />
                  <span>{apt.slotDate}</span>
                  <span className="text-gray-400">•</span>
                  <span>{apt.slotTime}</span>
                </div>
              </td>
              <td className="py-3">
                <StatusBadge status={apt.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
