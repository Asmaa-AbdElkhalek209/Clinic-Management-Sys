"use server";

import { revalidatePath } from "next/cache";
import { serverFetch } from "@/shared/lib/server-fetch";
import { getAccessToken } from "@/shared/lib/get-token";
import type { DeleteVisitResult } from "../types/visit.types";

export async function deleteVisit(visitId: number): Promise<DeleteVisitResult> {
  try {
    const token = await getAccessToken();

    await serverFetch(`/visits/${visitId}`, {
      method: "DELETE",
      token,
    });

    revalidatePath("/admin/visits");

    return { success: true, message: "Visit deleted successfully" };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to delete visit",
    };
  }
}
