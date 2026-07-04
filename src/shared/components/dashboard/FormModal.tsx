"use client";

import { ReactNode } from "react";
import { X } from "lucide-react";

interface FormModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export default function FormModal({
  isOpen,
  title,
  onClose,
  children,
}: FormModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="mb-6 flex items-center justify-between border-b pb-3">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
