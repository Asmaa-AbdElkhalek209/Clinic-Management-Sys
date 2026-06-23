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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between border-b pb-3">
          <h2 className="text-xl font-bold text-gray-800">
            Delete Confirmation
          </h2>
          <button
            onClick={() => setOpenModalDelete(false)}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        <p className="text-gray-600">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-red-600">{itemName}</span>?
        </p>

        <div className="mt-6 flex justify-end gap-3 pt-4 border-t">
          <button
            onClick={() => setOpenModalDelete(false)}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-md bg-red-600 px-5 py-2 text-sm font-medium text-white hover:bg-red-700 cursor-pointer disabled:opacity-50"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
