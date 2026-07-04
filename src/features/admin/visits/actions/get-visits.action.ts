import { serverFetch } from "@/shared/lib/server-fetch";
import { getAccessToken } from "@/shared/lib/get-token";
import { VisitsResponse } from "../types/visit.types";

export async function getVisits(
  page: number = 1,
  patientId: string = "",
  doctorId: string = "",
  limit: number = 10
): Promise<VisitsResponse> {
  const token = await getAccessToken();

  const params = new URLSearchParams();
  params.set("page", page.toString());
  params.set("limit", limit.toString());

  if (patientId) params.set("patientId", patientId);
  if (doctorId) params.set("doctorId", doctorId);

  try {
    const data = await serverFetch<VisitsResponse>(
      `/visits?${params.toString()}`,
      { token }
    );
    return data;
  } catch (error) {
    console.error("Failed to fetch visits:", error);
    return {
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0,
      visits: [],
    };
  }
}
