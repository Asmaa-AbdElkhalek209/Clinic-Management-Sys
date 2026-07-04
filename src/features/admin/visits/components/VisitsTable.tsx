"use client";

import DataTable from "@/shared/components/dashboard/DataTable";

import { Visit } from "../types/visit.types";
import DeleteVisitButton from "./DeleteVisitButton";
import VisitFormModal from "./VisitFormModal";

interface DropdownItem {
  id: number;
  name: string;
}

interface VisitsTableProps {
  visits: Visit[];
  patients: DropdownItem[];
  appointments: DropdownItem[];
}

const columns = [
  { label: "Patient" },
  { label: "Doctor" },
  { label: "Complaint" },
  { label: "Diagnosis" },
  { label: "Prescriptions" },
  { label: "Actions", className: "text-center" },
];

export default function VisitsTable({
  visits,
  patients,
  appointments,
}: VisitsTableProps) {
  if (visits.length === 0) {
    return (
      <DataTable columns={columns} emptyMessage="No visits found.">
        {[]}
      </DataTable>
    );
  }

  return (
    <DataTable columns={columns}>
      {visits.map((visit) => (
        <tr
          key={visit.id}
          className="hover:bg-gray-50/50 transition-colors duration-150"
        >
          {/* Patient */}
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-600 shadow-sm">
                {visit.patient.name.slice(0, 2).toUpperCase()}
              </div>

              <div>
                <p className="font-medium text-gray-900">
                  {visit.patient.name}
                </p>

                <p className="text-xs text-gray-400">
                  ID: #{visit.patient.id}
                </p>
              </div>
            </div>
          </td>

          {/* Doctor */}
          <td className="px-6 py-4 whitespace-nowrap">
            <p className="font-medium text-gray-900">{visit.doctor.name}</p>

            <p className="text-xs text-blue-600">
              {visit.doctor.speciality || "Doctor"}
            </p>
          </td>

          {/* Complaint */}
          <td className="px-6 py-4">
            <p className="text-sm text-gray-700 max-w-xs truncate">
              {visit.complaint}
            </p>
          </td>

          {/* Diagnosis */}
          <td className="px-6 py-4">
            <p className="text-sm text-gray-700 max-w-xs truncate">
              {visit.diagnosis}
            </p>
          </td>

          {/* Prescriptions */}
          <td className="px-6 py-4 whitespace-nowrap">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
              {visit.prescriptions.length} prescription
              {visit.prescriptions.length !== 1 ? "s" : ""}
            </span>
          </td>

          {/* Actions */}
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center justify-center gap-2">
              <VisitFormModal
                visit={visit}
                patients={patients}
                appointments={appointments}
              />

              <DeleteVisitButton
                visitId={visit.id}
                patientName={visit.patient.name}
              />
            </div>
          </td>
        </tr>
      ))}
    </DataTable>
  );
}
