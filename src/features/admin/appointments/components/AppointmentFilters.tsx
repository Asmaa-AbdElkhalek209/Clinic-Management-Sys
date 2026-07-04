"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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

  const [filters, setFilters] = useState({
    date: initialDate,
    status: initialStatus,
    doctorId: initialDoctorId,
    patientId: initialPatientId,
  });

  useEffect(() => {
    setFilters({
      date: initialDate,
      status: initialStatus,
      doctorId: initialDoctorId,
      patientId: initialPatientId,
    });
  }, [initialDate, initialStatus, initialDoctorId, initialPatientId]);

  const handleChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });

    params.set("page", "1");

    router.push(`/admin/appointments?${params.toString()}`);
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
          value={filters.date}
          onChange={(e) => handleChange("date", e.target.value)}
          className="w-full sm:w-auto rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Status */}
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">
          Status
        </label>

        <select
          value={filters.status}
          onChange={(e) => handleChange("status", e.target.value)}
          className="w-full sm:w-auto rounded-md border border-gray-300 px-3 py-2 bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
          value={filters.doctorId}
          onChange={(e) => handleChange("doctorId", e.target.value)}
          className="w-48 rounded-md border border-gray-300 px-3 py-2 bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
          value={filters.patientId}
          onChange={(e) => handleChange("patientId", e.target.value)}
          className="w-48 rounded-md border border-gray-300 px-3 py-2 bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">All Patients</option>

          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={applyFilters}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors"
      >
        Apply
      </button>
    </div>
  );
}
