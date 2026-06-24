"use server";

import { revalidatePath } from "next/cache";
import { serverFetch } from "@/shared/lib/server-fetch";
import { getAccessToken } from "@/shared/lib/get-token";
import type {
  CreateUserPayload,
  User,
  ActionResult,
} from "../types/user.types";
import { createUserSchema } from "../schemas/user.schema";

export async function createUser(
  values: CreateUserPayload
): Promise<ActionResult<{ user: User }>> {
  const validated = createUserSchema.safeParse(values);

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
      email: validated.data.email,
      password: validated.data.password,
      phone: validated.data.phone,
      userType: validated.data.userType,
      speciality:
        validated.data.userType === "doctor" ? validated.data.speciality : null,
    };

    const data = await serverFetch<{ user: User }>("/users", {
      method: "POST",
      body: JSON.stringify(payload),
      token,
    });

    revalidatePath("/admin/users");

    return {
      success: true,
      data: data,
      message: "User created successfully",
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create user",
    };
  }
}
