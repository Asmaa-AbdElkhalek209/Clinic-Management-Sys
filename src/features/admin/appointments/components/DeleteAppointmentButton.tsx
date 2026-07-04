"use client";

import { useState } from "react";
import { useDeleteAppointment } from "../hooks/use-appointment-mutations";
import DeleteActionButton from "@/shared/components/dashboard/DeleteActionButton";
import DeleteModal from "@/shared/components/dashboard/DeleteModal";

interface DeleteAppointmentButtonProps {
  appointmentId: number;
}

export default function DeleteAppointmentButton({
  appointmentId,
}: DeleteAppointmentButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { mutateAsync: deleteAppointment, isPending } = useDeleteAppointment();

  const handleConfirmDelete = () => {
    deleteAppointment(appointmentId, {
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
        itemName="this appointment"
        setOpenModalDelete={setIsOpen}
        onConfirm={handleConfirmDelete}
        isPending={isPending}
      />
    </>
  );
}
