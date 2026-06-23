import { serverFetch } from "@/shared/lib/server-fetch";
import { UsersResponse } from "../types/user.types";

export async function getUsers(
  page: number = 1,
  name: string = "",
  role: string = "",
  status: string = ""
) {
  const params = new URLSearchParams();

  params.set("page", page.toString());
  params.set("limit", "10");

  if (name.trim()) {
    params.set("name", name.trim());
  }

  if (role) {
    params.set("role", role);
  }

  if (status) {
    params.set("status", status);
  }

  try {
    const data = await serverFetch<UsersResponse>(
      `/users?${params.toString()}`
    );
    return data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return {
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0,
      users: [],
    };
  }
}

export async function getUsersStats() {
  try {
    const response = await serverFetch<UsersResponse>(`/users?page=1&limit=1`);
    const total = response.total || 0;

    const doctorsRes = await serverFetch<UsersResponse>(
      `/users?page=1&limit=1&role=doctor`
    );
    const receptionistsRes = await serverFetch<UsersResponse>(
      `/users?page=1&limit=1&role=receptionist`
    );

    return {
      total: total,
      doctors: doctorsRes.total || 0,
      receptionists: receptionistsRes.total || 0,
    };
  } catch (error) {
    return { total: 0, doctors: 0, receptionists: 0 };
  }
}
