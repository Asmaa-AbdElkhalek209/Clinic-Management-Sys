import { serverFetch } from "@/shared/lib/server-fetch";
import { getAccessToken } from "@/shared/lib/get-token";
import { UsersResponse } from "../types/user.types";

export async function getUsers(
  page: number = 1,
  name: string = "",
  role: string = "",
  status: string = ""
) {
  const token = await getAccessToken();

  const params = new URLSearchParams();
  params.set("page", page.toString());
  params.set("limit", "10");

  if (name.trim()) params.set("name", name.trim());
  if (role) params.set("role", role);
  if (status) params.set("status", status);

  try {
    const data = await serverFetch<UsersResponse>(
      `/users?${params.toString()}`,
      { token }
    );
    return data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return { total: 0, page: 1, limit: 10, totalPages: 0, users: [] };
  }
}

export async function getUsersStats() {
  const token = await getAccessToken();

  try {
    const [allRes, doctorsRes, receptionistsRes] = await Promise.all([
      serverFetch<UsersResponse>("/users?page=1&limit=1", { token }),
      serverFetch<UsersResponse>("/users?page=1&limit=1&role=doctor", {
        token,
      }),
      serverFetch<UsersResponse>("/users?page=1&limit=1&role=receptionist", {
        token,
      }),
    ]);

    return {
      total: allRes.total || 0,
      doctors: doctorsRes.total || 0,
      receptionists: receptionistsRes.total || 0,
    };
  } catch (error) {
    return { total: 0, doctors: 0, receptionists: 0 };
  }
}
