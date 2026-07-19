"use server";

import { revalidatePath } from "next/cache";
import { serverFetch } from "@/shared/lib/server-fetch";
import { getAccessToken } from "@/shared/lib/get-token";
import type {
  UpdateVisitPayload,
  UpdateVisitResult,
  Visit,
} from "../types/visit.types";
import { updateVisitSchema } from "../schemas/visit.schema";

export async function updateVisit(
  visitId: number,
  values: UpdateVisitPayload
): Promise<UpdateVisitResult> {
  const validated = updateVisitSchema.safeParse(values);

  if (!validated.success) {
    return {
      success: false,
      error: validated.error.issues?.[0]?.message || "Invalid data",
    };
  }

  try {
    const token = await getAccessToken();

    const data = await serverFetch<{ visit: Visit }>(`/visits/${visitId}`, {
      method: "PUT",
      body: JSON.stringify(validated.data),
      token,
    });

    revalidatePath("/admin/visits");

    return {
      success: true,
      data: data,
      message: "Visit updated successfully",
    };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update visit",
    };
  }
}
