"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema } from "../schemas/user.schema";
import { CreateUserPayload, Speciality } from "../types/user.types";
import { useCreateUser } from "../hooks/use-user-mutations";
import FormModal from "@/shared/components/dashboard/FormModal";

interface CreateUserFormProps {
  specialities?: Speciality[];
}

export default function CreateUserForm({ specialities }: CreateUserFormProps) {
  const [open, setOpen] = useState(false);
  const { mutate: createUser, isPending } = useCreateUser();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CreateUserPayload>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      userType: "receptionist",
      speciality: undefined,
    },
  });

  const selectedUserType = watch("userType");

  function onSubmit(values: CreateUserPayload) {
    createUser(values, {
      onSuccess: (result) => {
        if (result.success) {
          reset();
          setOpen(false);
        }
      },
    });
  }

  return (
    <>
      <div className="flex justify-start w-full items-center lg:w-[30%]">
        <button
          onClick={() => setOpen(true)}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors"
        >
          + Create User
        </button>
      </div>

      <FormModal
        isOpen={open}
        title="Create New User"
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
                placeholder="e.g. Ahmed Ali"
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
                placeholder="01xxxxxxxxx"
              />
              {errors.phone && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="email@clinic.com"
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

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

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                User Role
              </label>
              <select
                {...register("userType")}
                className="w-full rounded-md border p-2 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300"
              >
                <option value="receptionist">Receptionist</option>
                <option value="doctor">Doctor</option>
              </select>
              {errors.userType && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.userType.message}
                </p>
              )}
            </div>

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
              {isPending ? "Saving..." : "Create User"}
            </button>
          </div>
        </form>
      </FormModal>
    </>
  );
}
