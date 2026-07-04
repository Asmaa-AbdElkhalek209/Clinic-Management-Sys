"use server";

import { serverFetch } from "@/shared/lib/server-fetch";
import { getAccessToken } from "@/shared/lib/get-token";
import { LatestAppointment } from "../types/dashboard.types";

export async function getLatestAppointments(): Promise<LatestAppointment[]> {
  try {
    const token = await getAccessToken();
    return await serverFetch<LatestAppointment[]>(
      "/appointments/dashboard/latest",
      { token }
    );
  } catch (error) {
    console.error("Failed to fetch latest appointments:", error);
    return [];
  }
}
