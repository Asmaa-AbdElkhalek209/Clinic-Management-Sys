"use server";

import { serverFetch } from "@/shared/lib/server-fetch";
import { getAccessToken } from "@/shared/lib/get-token";
import { DashboardStatsResponse } from "../types/dashboard.types";

export async function getDashboardStats(): Promise<DashboardStatsResponse | null> {
  try {
    const token = await getAccessToken();
    return await serverFetch<DashboardStatsResponse>(
      "/appointments/dashboard/stats",
      { token }
    );
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    return null;
  }
}
