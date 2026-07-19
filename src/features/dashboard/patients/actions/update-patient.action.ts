"use server";

import { revalidatePath } from "next/cache";
import { serverFetch } from "@/shared/lib/server-fetch";
import { getAccessToken } from "@/shared/lib/get-token";
import type {
  UpdatePatientPayload,
  UpdatePatientResult,
} from "../types/patient.types";
import { updatePatientSchema } from "../schemas/patient.schema";

export async function updatePatient(
  patientId: number,
  values: UpdatePatientPayload
): Promise<UpdatePatientResult> {
  const validated = updatePatientSchema.safeParse(values);

  if (!validated.success) {
    return {
      success: false,
      error: validated.error.issues?.[0]?.message || "Invalid data",
    };
  }

  try {
    const token = await getAccessToken();

    const data = await serverFetch<{
      patient: import("../types/patient.types").Patient;
    }>(`/patients/${patientId}`, {
      method: "PUT",
      body: JSON.stringify(validated.data),
      token,
    });

    revalidatePath("/admin/patients");

    return {
      success: true,
      data: data,
      message: "Patient updated successfully",
    };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update patient",
    };
  }
}
