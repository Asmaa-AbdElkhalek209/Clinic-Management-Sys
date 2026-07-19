// hooks/usePermission.ts

import { useSession } from "next-auth/react";
import { hasPermission } from "@/shared/lib/has-permission";

export function usePermission(allowedRoles: readonly string[]) {
  const { data: session } = useSession();

  return hasPermission(session?.user.role, allowedRoles);
}
