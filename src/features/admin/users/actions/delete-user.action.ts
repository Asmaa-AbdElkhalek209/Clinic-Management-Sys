"use server";

import { revalidatePath } from "next/cache";
import { serverFetch } from "@/shared/lib/server-fetch";
import { getAccessToken } from "@/shared/lib/get-token";
import type { ActionResult } from "../types/user.types";

export async function deleteUser(userId: number): Promise<ActionResult> {
  try {
    const token = await getAccessToken();

    await serverFetch(`/users/${userId}`, {
      method: "DELETE",
      token,
    });

    revalidatePath("/admin/users");

    return { success: true, message: "User deleted successfully" };
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete user",
    };
  }
}
