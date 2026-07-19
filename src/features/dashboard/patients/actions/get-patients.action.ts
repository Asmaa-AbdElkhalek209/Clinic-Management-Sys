import { serverFetch } from "@/shared/lib/server-fetch";
import { getAccessToken } from "@/shared/lib/get-token";
import { PatientsResponse } from "../types/patient.types";

export async function getPatients(
  page: number = 1,
  search: string = "",
  gender: string = "",
  sortBy: string = "createdAt",
  order: string = "desc",
  limit: number = 10
): Promise<PatientsResponse> {
  const token = await getAccessToken();

  const params = new URLSearchParams();
  params.set("page", page.toString());
  params.set("limit", limit.toString());

  if (search.trim()) params.set("search", search.trim());
  if (gender) params.set("gender", gender);

  if (sortBy) params.set("sortBy", sortBy);
  if (order) params.set("order", order);

  try {
    const data = await serverFetch<PatientsResponse>(
      `/patients?${params.toString()}`,
      { token }
    );
    return data;
  } catch (error) {
    console.error("Failed to fetch patients:", error);
    return {
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0,
      patients: [],
    };
  }
}

export async function getPatientsStats() {
  const token = await getAccessToken();

  try {
    const [allRes, malesRes, femalesRes] = await Promise.all([
      serverFetch<PatientsResponse>("/patients?limit=1", { token }),
      serverFetch<PatientsResponse>("/patients?gender=male&limit=1", { token }),
      serverFetch<PatientsResponse>("/patients?gender=female&limit=1", {
        token,
      }),
    ]);

    return {
      total: allRes.total || 0,
      males: malesRes.total || 0,
      females: femalesRes.total || 0,
    };
  } catch (error) {
    console.error("Failed to fetch patients stats:", error);
    return { total: 0, males: 0, females: 0 };
  }
}
