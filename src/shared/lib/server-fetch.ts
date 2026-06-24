export async function serverFetch<T>(
  endpoint: string,
  options?: RequestInit & { token?: string }
): Promise<T> {
  const { token, ...fetchOptions } = options || {};

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
    {
      ...fetchOptions,
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...fetchOptions.headers,
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
