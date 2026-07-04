"use client";

import { CalendarDays } from "lucide-react";

import DataTable from "@/shared/components/dashboard/DataTable";

import { Appointment } from "../types/appointment.types";
import DeleteAppointmentButton from "./DeleteAppointmentButton";
import StatusDropdown from "./StatusDropdown";
import AppointmentFormModal from "./AppointmentFormModal";

interface DropdownItem {
  id: number;
  name: string;
}

interface AppointmentsTableProps {
  appointments: Appointment[];
  doctors: DropdownItem[];
  patients: DropdownItem[];
}

const columns = [
  { label: "Patient" },
  { label: "Doctor" },
  { label: "Date & Time" },
  { label: "Status" },
  { label: "Booked By" },
  { label: "Actions", className: "text-center" },
];

export default function AppointmentsTable({
  appointments,
  doctors,
  patients,
}: AppointmentsTableProps) {
  if (appointments.length === 0) {
    return (
      <DataTable columns={columns} emptyMessage="No appointments found.">
        {[]}
      </DataTable>
    );
  }

  return (
    <DataTable columns={columns}>
      {appointments.map((appointment) => (
        <tr
          key={appointment.id}
          className="hover:bg-gray-50/50 transition-colors duration-150"
        >
          {/* Patient */}
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-600 shadow-sm">
                {appointment.patient.name.slice(0, 2).toUpperCase()}
              </div>

              <div>
                <p className="font-medium text-gray-900">
                  {appointment.patient.name}
                </p>

                <p className="text-xs text-gray-400">
                  {appointment.patient.phone}
                </p>
              </div>
            </div>
          </td>

          {/* Doctor */}
          <td className="px-6 py-4 whitespace-nowrap">
            <p className="font-medium text-gray-900">
              {appointment.doctor.name}
            </p>

            <p className="text-xs text-blue-600">
              {appointment.doctor.speciality || "Doctor"}
            </p>
          </td>

          {/* Date */}
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center gap-2 text-gray-700">
              <CalendarDays size={14} className="text-gray-400" />

              <div>
                <p className="text-sm font-medium">{appointment.slotDate}</p>

                <p className="text-xs text-gray-400">{appointment.slotTime}</p>
              </div>
            </div>
          </td>

          {/* Status */}
          <td className="px-6 py-4 whitespace-nowrap">
            <StatusDropdown
              appointmentId={appointment.id}
              currentStatus={appointment.status}
            />
          </td>

          {/* Booked By */}
          <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
            {appointment.createdBy?.name ?? "System"}
          </td>

          {/* Actions */}
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center justify-center gap-2">
              <AppointmentFormModal
                appointment={appointment}
                doctors={doctors}
                patients={patients}
              />

              <DeleteAppointmentButton appointmentId={appointment.id} />
            </div>
          </td>
        </tr>
      ))}
    </DataTable>
  );
}
