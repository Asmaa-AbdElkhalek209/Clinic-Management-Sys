"use client";

interface Props {
  isPending: boolean;
}

export default function SaveProfileButton({ isPending }: Props) {
  return (
    <div className="p-5">
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-xl bg-blue-600 px-6 py-2 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
