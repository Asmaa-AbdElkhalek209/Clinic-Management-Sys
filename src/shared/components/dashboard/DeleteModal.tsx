"use client";

type DeleteModalProps = {
  isOpen: boolean;
  itemName?: string;
  setOpenModalDelete: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm?: () => void;
};

export default function DeleteModal({
  isOpen,
  itemName = "this item",
  setOpenModalDelete,
  onConfirm,
}: DeleteModalProps) {
  const handleClose = () => {
    setOpenModalDelete(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          Delete Confirmation
        </h2>

        <p className="text-gray-600">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{itemName}</span>? This action cannot
          be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="h-10 rounded-md border px-4 text-sm font-medium cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="h-10 rounded-md bg-red-600 px-4 text-sm font-medium text-white hover:bg-red-700 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
