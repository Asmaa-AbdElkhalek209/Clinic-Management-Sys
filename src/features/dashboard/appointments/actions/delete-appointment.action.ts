"use server";

import { revalidatePath } from "next/cache";
import { serverFetch } from "@/shared/lib/server-fetch";
import { getAccessToken } from "@/shared/lib/get-token";
import type { DeleteAppointmentResult } from "../types/appointment.types";

export async function deleteAppointment(
  appointmentId: number
): Promise<DeleteAppointmentResult> {
  try {
    const token = await getAccessToken();

    await serverFetch(`/appointments/${appointmentId}`, {
      method: "DELETE",
      token,
    });

    revalidatePath("/admin/appointments");

    return { success: true, message: "Appointment deleted successfully" };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to delete appointment",
    };
  }
}
