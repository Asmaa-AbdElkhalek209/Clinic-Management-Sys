"use client";

import { useState } from "react";
import { useDeleteVisit } from "../hooks/use-visits-mutations";

interface DeleteVisitButtonProps {
  visitId: number;
  patientName: string;
}

export default function DeleteVisitButton({
  visitId,
  patientName,
}: DeleteVisitButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const { mutate: deleteVisit, isPending } = useDeleteVisit();

  const handleDelete = () => {
    deleteVisit(visitId, {
      onSuccess: (result) => {
        if (result.success) {
          setShowConfirm(false);
        }
      },
    });
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="text-gray-400 hover:text-red-600 transition-colors p-1.5 rounded-md hover:bg-red-50"
        title="Delete"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          ></path>
        </svg>
      </button>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 rounded-lg">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Delete Visit
            </h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete the visit for{" "}
              <span className="font-medium">{patientName}</span>? This action
              cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowConfirm(false)}
                disabled={isPending}
                className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isPending}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50"
              >
                {isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
