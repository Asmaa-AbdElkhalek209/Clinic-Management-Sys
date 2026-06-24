"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const pathname = usePathname();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      if (pathname !== "/login") router.replace("/login");
      return;
    }

    const role = session.user?.role;

    const target =
      role === "admin" ? "/admin" :
      role === "doctor" ? "/doctor" :
      role === "receptionist" ? "/receptionist" : "/login";

    if (pathname !== target) router.replace(target);
  }, [status, session?.user?.role, pathname, router]);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 dark:bg-black">
      <p className="text-gray-500">Redirecting...</p>
    </div>
  );
}
