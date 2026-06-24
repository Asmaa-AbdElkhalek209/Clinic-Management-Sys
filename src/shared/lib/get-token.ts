import { getServerSession } from "next-auth";
import { authOptions } from "./auth-options";

export async function getAccessToken(): Promise<string> {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) {
    throw new Error("Unauthorized");
  }
  return session.accessToken;
}
