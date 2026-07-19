"use server";

import { serverFetch } from "@/shared/lib/server-fetch";
import { getAccessToken } from "@/shared/lib/get-token";
import { AppointmentReport } from "../types/report.types";

export async function getAppointmentReport(
  doctorId: string,
  startDate: string,
  endDate: string
): Promise<AppointmentReport> {
  const token = await getAccessToken();
  const params = new URLSearchParams();

  if (doctorId) params.set("doctorId", doctorId);
  if (startDate) params.set("startDate", startDate);
  if (endDate) params.set("endDate", endDate);

  try {
    return await serverFetch<AppointmentReport>(
      `/reports/appointments?${params.toString()}`,
      { token }
    );
  } catch (error) {
    console.error("Failed to fetch appointment report:", error);
    return {
      total: 0, 
      byStatus: {
        pending: 0,
        confirmed: 0,
        completed: 0,
        cancelled: 0,
      },
      cancellationRate: 0,
    };
  }
}