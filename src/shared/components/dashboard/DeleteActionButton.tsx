"use client";

import { Loader2, Trash2 } from "lucide-react";

interface DeleteActionButtonProps {
  onClick: () => void;
  isPending: boolean;
}

export default function DeleteActionButton({
  onClick,
  isPending,
}: DeleteActionButtonProps) {
  const Icon = isPending ? Loader2 : Trash2;

  return (
    <button
      onClick={onClick}
      disabled={isPending}
      className="text-gray-400 hover:text-red-600 transition-colors p-1.5 rounded-md hover:bg-red-50 disabled:opacity-50"
      title="Delete"
    >
      <Icon
        className={`w-4 h-4 ${isPending ? "animate-spin text-red-500" : ""}`}
      />
    </button>
  );
}
