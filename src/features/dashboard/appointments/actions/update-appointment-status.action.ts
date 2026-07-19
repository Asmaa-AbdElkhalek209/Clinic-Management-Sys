"use server";

import { revalidatePath } from "next/cache";
import { serverFetch } from "@/shared/lib/server-fetch";
import { getAccessToken } from "@/shared/lib/get-token";
import { updateAppointmentStatusSchema } from "../schemas/appointment.schema";
import { ActionResult } from "@/shared/types/api";

export async function updateAppointmentStatus(
  appointmentId: number,
  status: string
): Promise<ActionResult> {
  // 1. Validation
  const validated = updateAppointmentStatusSchema.safeParse({ status });

  if (!validated.success) {
    return {
      success: false,
      error: validated.error.issues?.[0]?.message || "Invalid status",
    };
  }

  try {
    const token = await getAccessToken();

    await serverFetch(`/appointments/${appointmentId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status: validated.data.status }),
      token,
    });

    revalidatePath("/admin/appointments");

    return {
      success: true,
      message: "Appointment status updated successfully",
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update status",
    };
  }
}
