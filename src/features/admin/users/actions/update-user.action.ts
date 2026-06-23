"use server";

import { revalidatePath } from "next/cache";
import { serverFetch } from "@/shared/lib/server-fetch";
import type { User } from "../types/user.types";
import { updateUserSchema } from "../schemas/user.schema";

export async function updateUser(userId: number, values: unknown) {
  const validatedFields = updateUserSchema.safeParse(values);

  if (!validatedFields.success) {
    const errorMessage =
      validatedFields.error.issues?.[0]?.message || "Invalid data";
    return { success: false, error: errorMessage };
  }

  try {
    await serverFetch<User>(`/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify(validatedFields.data),
    });

    revalidatePath("/admin/users");

    return { success: true, message: "User updated successfully" };
  } catch (error: any) {
    console.error("Failed to update user:", error);
    return {
      success: false,
      error: error.message || "Failed to update user",
    };
  }
}
