"use server";

import { revalidatePath } from "next/cache";
import { serverFetch } from "@/shared/lib/server-fetch";
import { getAccessToken } from "@/shared/lib/get-token";
import type { DeletePatientResult } from "../types/patient.types";

export async function deletePatient(
  patientId: number
): Promise<DeletePatientResult> {
  try {
    const token = await getAccessToken();

    await serverFetch(`/patients/${patientId}`, {
      method: "DELETE",
      token,
    });

    revalidatePath("/admin/patients");

    return { success: true, message: "Patient deleted successfully" };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to delete patient",
    };
  }
}
