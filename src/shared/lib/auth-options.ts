import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginApi } from "@/features/auth/api/auth.api";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const response = await loginApi({
            email: credentials.email,
            password: credentials.password,
          });

          if (!response.success) return null;

          return {
            id: response.user.id.toString(),
            name: response.user.name,
            email: response.user.email,
            role: response.user.role,
            accessToken: response.token,
          };
        } catch {
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.accessToken = (user as any).accessToken;
        token.id = (user as any).id;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as number;
        session.user.role = token.role as "admin" | "doctor" | "receptionist";
      }

      session.accessToken = token.accessToken as string;

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
