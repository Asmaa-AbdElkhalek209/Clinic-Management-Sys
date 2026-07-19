"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";

interface DropdownItem {
  id: number;
  name: string;
}

interface AppointmentFiltersProps {
  initialDate: string;
  initialStatus: string;
  initialDoctorId: string;
  initialPatientId: string;
  doctors: DropdownItem[];
  patients: DropdownItem[];
}

export default function AppointmentFilters({
  initialDate,
  initialStatus,
  initialDoctorId,
  initialPatientId,
  doctors,
  patients,
}: AppointmentFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  console.log(pathname);

  const updateFilter = (
    key: "date" | "status" | "doctorId" | "patientId",
    value: string
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-end">
      {/* Date */}
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">
          Date
        </label>

        <input
          type="date"
          value={initialDate}
          onChange={(e) => updateFilter("date", e.target.value)}
          className="w-full sm:w-auto rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Status */}
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">
          Status
        </label>

        <select
          value={initialStatus}
          onChange={(e) => updateFilter("status", e.target.value)}
          className="w-full sm:w-auto rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Doctor */}
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">
          Doctor
        </label>

        <select
          value={initialDoctorId}
          onChange={(e) => updateFilter("doctorId", e.target.value)}
          className="w-48 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">All Doctors</option>

          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name}
            </option>
          ))}
        </select>
      </div>

      {/* Patient */}
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">
          Patient
        </label>

        <select
          value={initialPatientId}
          onChange={(e) => updateFilter("patientId", e.target.value)}
          className="w-48 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">All Patients</option>

          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
