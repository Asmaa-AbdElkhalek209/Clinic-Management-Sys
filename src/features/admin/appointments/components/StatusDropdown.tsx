"use client";

import { useState, useRef, useEffect } from "react";
import { useUpdateAppointmentStatus } from "../hooks/use-appointment-mutations";
import { AppointmentStatus } from "../types/appointment.types";

interface StatusDropdownProps {
  appointmentId: number;
  currentStatus: AppointmentStatus;
}

const STATUS_OPTIONS: AppointmentStatus[] = [
  "pending",
  "confirmed",
  "cancelled",
  "completed",
];

const STATUS_STYLES: Record<AppointmentStatus, string> = {
  pending: "bg-yellow-50 text-yellow-700 ring-yellow-600/20",
  confirmed: "bg-blue-50 text-blue-700 ring-blue-600/20",
  cancelled: "bg-red-50 text-red-700 ring-red-600/20",
  completed: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
};

export default function StatusDropdown({
  appointmentId,
  currentStatus,
}: StatusDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { mutate: updateStatus, isPending } = useUpdateAppointmentStatus();

  // يقفل الـ Dropdown لما تضغط بره
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (status: AppointmentStatus) => {
    if (status === currentStatus) {
      setIsOpen(false);
      return;
    }
    updateStatus(
      { id: appointmentId, status },
      { onSuccess: () => setIsOpen(false) }
    );
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset cursor-pointer transition-colors disabled:opacity-50 ${STATUS_STYLES[currentStatus]}`}
      >
        {isPending ? (
          <svg
            className="animate-spin h-3 w-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          <>
            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></span>
            {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
          </>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-100 z-50 py-1">
          {STATUS_OPTIONS.map((status) => (
            <button
              key={status}
              onClick={() => handleSelect(status)}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center justify-between ${
                status === currentStatus
                  ? "font-bold text-gray-900"
                  : "text-gray-600"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              {status === currentStatus && (
                <svg
                  className="w-3.5 h-3.5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
