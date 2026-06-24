"use client";

import { useToggleUserStatus } from "../hooks/use-user-mutations";
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
  const { mutate: toggleStatus, isPending } = useToggleUserStatus();

  const isActive = status === "active";

  const handleToggle = () => {
    toggleStatus(userId);
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
