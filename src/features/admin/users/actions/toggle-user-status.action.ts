"use server";

import { revalidatePath } from "next/cache";
import { serverFetch } from "@/shared/lib/server-fetch";

export async function toggleUserStatus(userId: number) {
  try {
    await serverFetch(`/users/${userId}/toggle-status`, {
      method: "PATCH",
    });

    revalidatePath("/admin/users");

    return { success: true, message: "User status updated successfully" };
  } catch (error: any) {
    console.error("Failed to toggle status:", error);
    return {
      success: false,
      error: error.message || "Failed to update status",
    };
  }
}
