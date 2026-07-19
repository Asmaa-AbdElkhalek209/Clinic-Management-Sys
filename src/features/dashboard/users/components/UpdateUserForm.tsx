"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserSchema } from "../schemas/user.schema";
import { User, UpdateUserPayload, Speciality } from "../types/user.types";
import { useUpdateUser } from "../hooks/use-user-mutations";
import FormModal from "@/shared/components/dashboard/FormModal";
import { SquarePen } from "lucide-react";

interface UpdateUserFormProps {
  user: User;
  specialities?: Speciality[];
}

export default function UpdateUserForm({
  user,
  specialities,
}: UpdateUserFormProps) {
  const [open, setOpen] = useState(false);
  const { mutate: updateUser, isPending } = useUpdateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserPayload>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user.name,
      phone: user.phone,
      speciality: user.speciality || undefined,
    },
  });

  function onSubmit(values: UpdateUserPayload) {
    updateUser(
      { id: user.id, values },
      {
        onSuccess: (result) => {
          if (result.success) {
            setOpen(false);
          }
        },
      }
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-gray-400 hover:text-blue-600 transition-colors p-1.5 rounded-md hover:bg-blue-50"
        title="Edit"
      >
        <SquarePen className="w-4 h-4" />
      </button>

      <FormModal
        isOpen={open}
        title={`Edit User: ${user.name}`}
        onClose={() => setOpen(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                {...register("name")}
                className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                {...register("phone")}
                className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.phone && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Read-only Info */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <input
                type="text"
                value={user.userType}
                disabled
                className="w-full rounded-md border border-gray-200 p-2 bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <input
                type="text"
                value={user.status}
                disabled
                className="w-full rounded-md border border-gray-200 p-2 bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>

            {user.userType === "doctor" && (
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Speciality
                </label>
                <select
                  {...register("speciality")}
                  className="w-full rounded-md border border-gray-300 p-2 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Select Speciality...</option>
                  {(specialities || []).map((spec) => (
                    <option key={spec.key} value={spec.label}>
                      {spec.label}
                    </option>
                  ))}
                </select>
                {errors.speciality && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.speciality.message}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t mt-6">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              disabled={isPending}
              type="submit"
              className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </FormModal>
    </>
  );
}
