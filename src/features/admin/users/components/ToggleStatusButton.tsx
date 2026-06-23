"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { toggleUserStatus } from "../actions/toggle-user-status.action";
import { UserStatus } from "../types/user.types";
import { Switch } from "@/shared/components/ui/switch";

interface ToggleStatusButtonProps {
  userId: number;
  status: UserStatus;
}

export default function ToggleStatusButton({
  userId,
  status,
}: ToggleStatusButtonProps) {
  const [isPending, startTransition] = useTransition();
  const isActive = status === "active";

  const handleToggle = () => {
    startTransition(async () => {
      const result = await toggleUserStatus(userId);

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.error || "Failed to update status");
      }
    });
  };

  return (
    <Switch
      checked={isActive}
      onCheckedChange={handleToggle}
      disabled={isPending}
      className="data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-gray-300"
    />
  );
}
