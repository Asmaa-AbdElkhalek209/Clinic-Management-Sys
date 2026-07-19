"use client";

import { useState } from "react";

import StatsCard from "./StatsCard";

import { useAppointmentReport } from "../hooks/use-appointment-report";
import { appointmentReportStats } from "../config/appointment-report.config";
import DateFilterInput from "@/shared/components/dashboard/DateFilterInput";

interface AppointmentReportSectionProps {
  doctors: {
    id: number;
    name: string;
  }[];
}

const selectClasses =
  "w-48 rounded-md border border-gray-300 px-3 py-2 bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none";

export default function AppointmentReportSection({
  doctors,
}: AppointmentReportSectionProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [doctorId, setDoctorId] = useState("");

  const { data, isLoading } = useAppointmentReport(
    doctorId,
    startDate,
    endDate
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <DateFilterInput
          label="Start Date"
          value={startDate}
          onChange={setStartDate}
        />

        <DateFilterInput
          label="End Date"
          value={endDate}
          onChange={setEndDate}
        />

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">
            Doctor
          </label>

          <select
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            className={selectClasses}
          >
            <option value="">All Doctors</option>

            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {appointmentReportStats.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.getValue(data)}
            icon={stat.icon}
            iconColor={stat.iconColor}
            iconBg={stat.iconBg}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  );
}
