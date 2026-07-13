"use server";

import { serverFetch } from "@/shared/lib/server-fetch";
import { getAccessToken } from "@/shared/lib/get-token";
import { updateProfileSchema } from "../schemas/profile.schema";
import {
  UpdateProfilePayload,
  UpdateProfileResult,
  UserProfile,
  UserRole,
} from "../types/profile.types";

type DoctorPayload = {
  name: string;
  phone: string;
  speciality: string | null;
  experienceYears: number | null;
  fees: number | null;
  about: string | null;
};

type BasicPayload = Pick<DoctorPayload, "name" | "phone">;

export async function updateProfile(
  values: UpdateProfilePayload,
  userType: UserRole
): Promise<UpdateProfileResult> {
  const validated = updateProfileSchema.safeParse(values);

  if (!validated.success) {
    return {
      success: false,
      error: validated.error.issues?.[0]?.message || "Invalid data",
    };
  }

  try {
    const token = await getAccessToken();

    const payloadToSend: DoctorPayload | BasicPayload =
      userType === "doctor"
        ? {
            name: validated.data.name,
            phone: validated.data.phone,
            speciality: validated.data.speciality ?? null,
            experienceYears: validated.data.experienceYears ?? null,
            fees: validated.data.fees ?? null,
            about: validated.data.about ?? null,
          }
        : {
            name: validated.data.name,
            phone: validated.data.phone,
          };

    const response = await serverFetch<{
      success: boolean;
      message: string;
      user: UserProfile;
    }>("/users/me", {
      method: "PUT",
      body: JSON.stringify(payloadToSend),
      token,
    });

    return {
      success: response.success,
      message: response.message,
      data: { user: response.user },
    };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update profile",
    };
  }
}
