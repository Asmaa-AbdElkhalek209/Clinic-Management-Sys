"use server";

import { serverFetch } from "@/shared/lib/server-fetch";
import { getAccessToken } from "@/shared/lib/get-token";
import { Speciality } from "../types/user.types";

export async function getSpecialities(): Promise<Speciality[]> {
  try {
    const token = await getAccessToken();
    const response = await serverFetch<{ specialities: Speciality[] }>(
      "/users/specialities",
      { token }
    );
    return response.specialities || [];
  } catch (error) {
    console.error("Failed to fetch specialities:", error);
    return [];
  }
}
