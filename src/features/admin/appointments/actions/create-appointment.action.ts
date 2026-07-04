"use server";

import { revalidatePath } from "next/cache";
import { serverFetch } from "@/shared/lib/server-fetch";
import { getAccessToken } from "@/shared/lib/get-token";
import type {
  CreateAppointmentPayload,
  CreateAppointmentResult,
  Appointment,
} from "../types/appointment.types";
import { createAppointmentSchema } from "../schemas/appointment.schema";

export async function createAppointment(
  values: CreateAppointmentPayload
): Promise<CreateAppointmentResult> {
  const validated = createAppointmentSchema.safeParse(values);

  if (!validated.success) {
    return {
      success: false,
      error: validated.error.issues?.[0]?.message || "Invalid data",
    };
  }

  try {
    const token = await getAccessToken();

    const data = await serverFetch<{ appointment: Appointment }>(
      "/appointments",
      {
        method: "POST",
        body: JSON.stringify(validated.data),
        token,
      }
    );

    revalidatePath("/admin/appointments");

    return {
      success: true,
      data: data,
      message: "Appointment created successfully",
    };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create appointment",
    };
  }
}
