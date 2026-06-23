"use server";

import { revalidatePath } from "next/cache";
import { serverFetch } from "@/shared/lib/server-fetch";

export async function deleteUser(userId: number) {
  try {
    await serverFetch(`/users/${userId}`, {
      method: "DELETE",
    });

    revalidatePath("/admin/users");
    return { success: true, message: "User deleted successfully" };
  } catch (error: any) {
    console.error("Failed to delete user:", error);
    return {
      success: false,
      error: error.message || "Failed to delete user",
    };
  }
}
