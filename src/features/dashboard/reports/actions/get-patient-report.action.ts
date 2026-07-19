"use server";

import { serverFetch } from "@/shared/lib/server-fetch";
import { getAccessToken } from "@/shared/lib/get-token";
import { PatientReport } from "../types/report.types";

export async function getPatientReport(
  startDate: string,
  endDate: string
): Promise<PatientReport> {
  const token = await getAccessToken();
  const params = new URLSearchParams();

  if (startDate) params.set("startDate", startDate);
  if (endDate) params.set("endDate", endDate);

  try {
    return await serverFetch<PatientReport>(
      `/reports/patients?${params.toString()}`,
      { token }
    );
  } catch (error) {
    console.error("Failed to fetch patient report:", error);
    return {
      totalPatients: 0,
      newRegistrations: 0,
      genderBreakdown: {
        male: 0,
        female: 0,
        other: 0,
      },
    };
  }
}
