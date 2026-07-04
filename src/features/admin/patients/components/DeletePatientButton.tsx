"use client";

import { useState } from "react";
import { useDeletePatient } from "../hooks/use-patient-mutations";

import DeleteActionButton from "@/shared/components/dashboard/DeleteActionButton";
import DeleteModal from "@/shared/components/dashboard/DeleteModal";

interface DeletePatientButtonProps {
  patientId: number;
  patientName: string;
}

export default function DeletePatientButton({
  patientId,
  patientName,
}: DeletePatientButtonProps) {
  const { mutate: deletePatient, isPending } = useDeletePatient();

  const [isOpen, setIsOpen] = useState(false);

  const handleConfirmDelete = () => {
    deletePatient(patientId, {
      onSuccess: (result) => {
        if (result.success) {
          setIsOpen(false);
        }
      },
    });
  };

  return (
    <>
      <DeleteActionButton
        onClick={() => setIsOpen(true)}
        isPending={isPending}
      />

      <DeleteModal
        isOpen={isOpen}
        itemName={patientName}
        setOpenModalDelete={setIsOpen}
        onConfirm={handleConfirmDelete}
        isPending={isPending}
      />
    </>
  );
}
