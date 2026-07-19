"use server";

import { revalidatePath } from "next/cache";
import { serverFetch } from "@/shared/lib/server-fetch";
import { getAccessToken } from "@/shared/lib/get-token";
import type {
  UpdateAppointmentPayload,
  UpdateAppointmentResult,
} from "../types/appointment.types";
import { updateAppointmentSchema } from "../schemas/appointment.schema";

export async function updateAppointment(
  appointmentId: number,
  values: UpdateAppointmentPayload
): Promise<UpdateAppointmentResult> {
  const validated = updateAppointmentSchema.safeParse(values);

  if (!validated.success) {
    return {
      success: false,
      error: validated.error.issues?.[0]?.message || "Invalid data",
    };
  }

  try {
    const token = await getAccessToken();
    console.log("URL:", `/appointments/${appointmentId}/reschedule`);
    console.log("METHOD:", "PUT");
    console.log("BODY:", validated.data);
    const response = await serverFetch(
      `/appointments/${appointmentId}/reschedule`,
      {
        method: "PUT",
        body: JSON.stringify(validated.data),
        token,
      }
    );

    console.log("Response:", response);
    revalidatePath("/admin/appointments");

    return { success: true, message: "Appointment updated successfully" };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update appointment",
    };
  }
}
