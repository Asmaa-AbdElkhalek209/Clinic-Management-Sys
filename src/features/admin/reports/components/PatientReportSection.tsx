"use client";

import { useState } from "react";

import StatsCard from "./StatsCard";

import { patientReportStats } from "../config/patient-report.config";
import { usePatientReport } from "../hooks/use-patient-report";
import DateFilterInput from "@/shared/components/dashboard/DateFilterInput";

export default function PatientReportSection() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { data, isLoading } = usePatientReport(startDate, endDate);

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
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {patientReportStats.map((stat) => (
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
