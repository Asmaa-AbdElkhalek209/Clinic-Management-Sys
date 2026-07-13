"use server";

import { serverFetch } from "@/shared/lib/server-fetch";
import { getAccessToken } from "@/shared/lib/get-token";
import { UserProfile } from "../types/profile.types";

export async function getProfile(): Promise<UserProfile | null> {
  try {
    const token = await getAccessToken();
    return await serverFetch<UserProfile>("/users/me", { token });
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    return null;
  }
}