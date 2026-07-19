"use server";

import { revalidatePath } from "next/cache";
import { serverFetch } from "@/shared/lib/server-fetch";
import { getAccessToken } from "@/shared/lib/get-token";
import type {
  CreateVisitPayload,
  CreateVisitResult,
  Visit,
} from "../types/visit.types";
import { createVisitSchema } from "../schemas/visit.schema";

export async function createVisit(
  values: CreateVisitPayload
): Promise<CreateVisitResult> {
  const validated = createVisitSchema.safeParse(values);

  if (!validated.success) {
    return {
      success: false,
      error: validated.error.issues?.[0]?.message || "Invalid data",
    };
  }

  try {
    const token = await getAccessToken();

    const data = await serverFetch<{ visit: Visit }>("/visits", {
      method: "POST",
      body: JSON.stringify(validated.data),
      token,
    });

    revalidatePath("/admin/visits");

    return {
      success: true,
      data: data,
      message: "Visit created successfully",
    };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create visit",
    };
  }
}
