"use server";

import { revalidatePath } from "next/cache";
import { serverFetch } from "@/shared/lib/server-fetch";
import { getAccessToken } from "@/shared/lib/get-token";
import type {
  UpdateUserPayload,
  User,
  ActionResult,
} from "../types/user.types";
import { updateUserSchema } from "../schemas/user.schema";

export async function updateUser(
  userId: number,
  values: UpdateUserPayload
): Promise<ActionResult<{ user: User }>> {
  const validated = updateUserSchema.safeParse(values);

  if (!validated.success) {
    return {
      success: false,
      error: validated.error.issues?.[0]?.message || "Invalid data",
    };
  }

  try {
    const token = await getAccessToken();

    const payload = {
      name: validated.data.name,
      phone: validated.data.phone,
      speciality: validated.data.speciality,
    };

    const data = await serverFetch<{ user: User }>(`/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify(payload),
      token,
    });

    revalidatePath("/admin/users");

    return {
      success: true,
      data: data,
      message: "User updated successfully",
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update user",
    };
  }
}
