"use client";

import { useState } from "react";
import { useDeleteUser } from "../hooks/use-user-mutations";

import DeleteActionButton from "@/shared/components/dashboard/DeleteActionButton";
import DeleteModal from "@/shared/components/dashboard/DeleteModal";

interface DeleteUserButtonProps {
  userId: number;
  userName: string;
}

export default function DeleteUserButton({
  userId,
  userName,
}: DeleteUserButtonProps) {
  const { mutate: deleteUser, isPending } = useDeleteUser();

  const [isOpen, setIsOpen] = useState(false);

  const handleConfirmDelete = () => {
    deleteUser(userId, {
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
        itemName={userName}
        setOpenModalDelete={setIsOpen}
        onConfirm={handleConfirmDelete}
        isPending={isPending}
      />
    </>
  );
}
