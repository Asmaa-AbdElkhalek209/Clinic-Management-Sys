import { serverFetch } from "@/shared/lib/server-fetch";
import { getAccessToken } from "@/shared/lib/get-token";
import { AppointmentsResponse } from "../types/appointment.types";

export async function getAppointments(
  page: number = 1,
  date: string = "",
  status: string = "",
  doctorId: string = "",
  patientId: string = "",
  limit: number = 10
): Promise<AppointmentsResponse> {
  const token = await getAccessToken();

  const params = new URLSearchParams();
  params.set("page", page.toString());
  params.set("limit", limit.toString());

  if (date) params.set("date", date);
  if (status) params.set("status", status);
  if (doctorId) params.set("doctorId", doctorId);
  if (patientId) params.set("patientId", patientId);

  try {
    const data = await serverFetch<AppointmentsResponse>(
      `/appointments?${params.toString()}`,
      { token }
    );
    return data;
  } catch (error) {
    console.error("Failed to fetch appointments:", error);
    return {
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0,
      appointments: [],
    };
  }
}
