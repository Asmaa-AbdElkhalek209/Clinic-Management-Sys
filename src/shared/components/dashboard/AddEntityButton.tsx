"use client";

import { Plus } from "lucide-react";

type AddEntityButtonProps = {
  onOpen?: () => void;
  label: string;
};

export default function AddEntityButton({
  onOpen,
  label,
}: AddEntityButtonProps) {
  return (
    <button
      onClick={onOpen}
      className="
        flex items-center gap-2
        h-11
        px-4
        rounded-sm
        border-2 border-blue-400
        text-sm font-medium text-blue-400
        transition-colors duration-200
        hover:bg-blue-400
        hover:text-white
        cursor-pointer
      "
    >
      <Plus className="h-4 w-4" />
      Add {label}
    </button>
  );
}
