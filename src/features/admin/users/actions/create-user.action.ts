"use server";

import { revalidatePath } from "next/cache";
import { serverFetch } from "@/shared/lib/server-fetch";
import type {
  CreateUserPayload,
  CreateUserResponse,
} from "../types/user.types";
import { createUserSchema } from "../schemas/user.schema";

export async function createUser(values: CreateUserPayload) {
  const validatedFields = createUserSchema.safeParse(values);

  if (!validatedFields.success) {
    const errorMessage =
      validatedFields.error.issues?.[0]?.message || "Invalid data";
    return { success: false, error: errorMessage };
  }

  try {
    await serverFetch<CreateUserResponse>("/users", {
      method: "POST",
      body: JSON.stringify(validatedFields.data),
    });

    revalidatePath("/admin/users");
    return { success: true, message: "User created successfully" };
  } catch (error: any) {
    console.error("Failed to create user:", error);
    return {
      success: false,
      error: error.message || "Failed to create user",
    };
  }
}
