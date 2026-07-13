"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema";
import {
  User,
  CreateUserPayload,
  UpdateUserPayload,
  Speciality,
} from "../types/user.types";
import { useCreateUser } from "../hooks/use-user-mutations";
import { useUpdateUser } from "../hooks/use-user-mutations";
import FormModal from "@/shared/components/dashboard/FormModal";

interface UserFormModalProps {
  user?: User;
  specialities?: Speciality[];
}

export default function UserFormModal({
  user,
  specialities,
}: UserFormModalProps) {
  const [open, setOpen] = useState(false);
  const isEditMode = !!user;

  const { mutate: createUser, isPending: isCreating } = useCreateUser();
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();
  const isPending = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CreateUserPayload | UpdateUserPayload>({
    resolver: zodResolver(isEditMode ? updateUserSchema : createUserSchema),
    defaultValues: isEditMode
      ? {
          name: user.name,
          phone: user.phone,
          speciality: user.speciality || undefined,
        }
      : {
          name: "",
          email: "",
          password: "",
          phone: "",
          userType: "receptionist",
          speciality: undefined,
        },
  });

  const selectedUserType =
    watch("userType") || user?.userType || "receptionist";

  function onSubmit(values: CreateUserPayload | UpdateUserPayload) {
    if (isEditMode && user) {
      updateUser(
        { id: user.id, values: values as UpdateUserPayload },
        {
          onSuccess: (result) => {
            if (result.success) setOpen(false);
          },
        }
      );
    } else {
      createUser(values as CreateUserPayload, {
        onSuccess: (result) => {
          if (result.success) {
            reset();
            setOpen(false);
          }
        },
      });
    }
  }

  return (
    <>
      {isEditMode ? (
        <button
          onClick={() => setOpen(true)}
          className="text-gray-400 hover:text-blue-600 transition-colors p-1.5 rounded-md hover:bg-blue-50"
          title="Edit"
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
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            ></path>
          </svg>
        </button>
      ) : (
        <div className="flex justify-start w-full items-center lg:w-[30%]">
          <button
            onClick={() => setOpen(true)}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            + Create User
          </button>
        </div>
      )}

      <FormModal
        isOpen={open}
        title={isEditMode ? `Edit User: ${user?.name}` : "Create New User"}
        onClose={() => setOpen(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                {...register("name")}
                className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="e.g. Ahmed Ali"
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className={isEditMode ? "col-span-2" : ""}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                disabled={isEditMode}
                className={`w-full rounded-md border p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${isEditMode ? "border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed" : "border-gray-300"}`}
                placeholder="email@clinic.com"
              />
              {errors.email && !isEditMode && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.email.message}
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
                placeholder="01xxxxxxxxx"
              />
              {errors.phone && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {!isEditMode && (
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  {...register("password")}
                  type="password"
                  className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="********"
                />
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            )}

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                User Role
              </label>
              <select
                {...register("userType")}
                disabled={isEditMode}
                className={`w-full rounded-md border p-2 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none ${isEditMode ? "border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed" : "border-gray-300"}`}
              >
                <option value="receptionist">Receptionist</option>
                <option value="doctor">Doctor</option>
              </select>
              {errors.userType && !isEditMode && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.userType.message}
                </p>
              )}
            </div>

            {isEditMode && (
              <>
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
              </>
            )}

            {selectedUserType === "doctor" && (
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
              {isPending
                ? "Saving..."
                : isEditMode
                  ? "Save Changes"
                  : "Create User"}
            </button>
          </div>
        </form>
      </FormModal>
    </>
  );
}
