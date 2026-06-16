"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log(session + "ssssssssssssssssssssssssssssssssssssssssssss");

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.replace("/login");
      return;
    }

    const role = session.user?.role;

    switch (role) {
      case "admin":
        router.replace("/");
        break;

      case "doctor":
        router.replace("/doctor");
        break;

      case "receptionist":
        router.replace("/receptionist");
        break;

      default:
        router.replace("/login");
        break;
    }
  }, [session, status, router]);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 dark:bg-black">
      <p className="text-gray-500">Redirecting...</p>
    </div>
  );
}
