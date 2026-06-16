import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken: string;

    user: {
      id: number;
      role: "admin" | "doctor" | "receptionist";
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    role: "admin" | "doctor" | "receptionist";
    accessToken: string;
  }
}
