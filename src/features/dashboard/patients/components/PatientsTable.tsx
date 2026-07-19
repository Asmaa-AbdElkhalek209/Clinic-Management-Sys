"use client";

import PatientFormModal from "./PatientFormModal";
import DeletePatientButton from "./DeletePatientButton";
import { Patient } from "../types/patient.types";
import DataTable from "@/shared/components/dashboard/DataTable";

interface PatientsTableProps {
  patients: Patient[];
}
const columns = [
  { label: "Patient" },
  { label: "Age" },
  { label: "Gender" },
  { label: "Contact" },
  { label: "Address" },
  { label: "Actions", className: "text-center" },
];
export default function PatientsTable({ patients }: PatientsTableProps) {
  return (
    <DataTable columns={columns} emptyMessage="No patients found.">
      {patients.map((patient) => (
        <tr
          key={patient.id}
          className="hover:bg-gray-50/50 transition-colors duration-150"
        >
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm shadow-sm">
                {patient.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="font-medium text-gray-900">{patient.name}</div>
                <div className="text-xs text-gray-400">ID: #{patient.id}</div>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap font-medium">
            {patient.age} years
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span
              className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${patient.gender === "male" ? "bg-sky-50 text-sky-700 ring-sky-600/20" : "bg-pink-50 text-pink-700 ring-pink-600/20"}`}
            >
              {patient.gender}
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-gray-700">{patient.phone}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-gray-500 max-w-50 truncate">
            {patient.address}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center justify-center gap-2">
              <PatientFormModal patient={patient} />
              <DeletePatientButton
                patientId={patient.id}
                patientName={patient.name}
              />
            </div>
          </td>
        </tr>
      ))}
    </DataTable>
  );
}
