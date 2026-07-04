"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface DropdownItem {
  id: number;
  name: string;
}

interface VisitFiltersProps {
  initialPatientId: string;
  initialDoctorId: string;
  patients: DropdownItem[];
  doctors: DropdownItem[];
}

export default function VisitFilters({
  initialPatientId,
  initialDoctorId,
  patients,
  doctors,
}: VisitFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    patientId: initialPatientId,
    doctorId: initialDoctorId,
  });

  useEffect(() => {
    setFilters({
      patientId: initialPatientId,
      doctorId: initialDoctorId,
    });
  }, [initialPatientId, initialDoctorId]);

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

    router.push(`/admin/visits?${params.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-end">
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

      <button
        onClick={applyFilters}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors"
      >
        Apply
      </button>
    </div>
  );
}
