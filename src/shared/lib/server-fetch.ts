// src/shared/lib/server-fetch.ts
import { getServerSession } from "next-auth";
import { authOptions } from "./auth-options"; // تأكدي إن المسار صح

export async function serverFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const session = await getServerSession(authOptions);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
    {
      ...options,
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(session?.accessToken && {
          Authorization: `Bearer ${session.accessToken}`,
        }),
        ...options?.headers,
      },
    }
  );

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {
      errorData = { message: "Unknown error from backend" };
    }

    console.error(`API Error [${response.status}] on ${endpoint}:`, errorData);

    let errorMessage = "Something went wrong";
    if (Array.isArray(errorData.message)) {
      errorMessage = errorData.message.join(", ");
    } else if (typeof errorData.message === "string") {
      errorMessage = errorData.message;
    }

    throw new Error(errorMessage);
  }

  return response.json();
}
