"use client";

import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { signOut } from "next-auth/react";

import { loginSchema, LoginFormData } from "../schemas/login.schema";

export const useLogin = () => {
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid email or password");
        return;
      }

      toast.success("Login successful 🎉");

      router.refresh();

      setTimeout(async () => {
        const session = await getSession();

        const role = session?.user?.role;

        switch (role) {
          case "admin":
            router.push("/admin");
            break;

          case "doctor":
            router.push("/doctor");
            break;

          case "receptionist":
            router.push("/receptionist");
            break;

          default:
            router.push("/admin");
            break;
        }
      }, 100);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return {
    register: form.register,
    handleSubmit: form.handleSubmit,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    onSubmit,
  };
};

export const useLogout = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      await signOut({ redirect: false });

      toast.success("Logged out successfully");

      router.replace("/login");
      router.refresh();
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return { logout };
};
