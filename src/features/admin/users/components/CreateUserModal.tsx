"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUserSchema,
  type CreateUserFormValues,
} from "../schemas/user.schema";
import { createUser } from "../actions/create-user.action";
import { SPECIALITIES } from "../types/user.types";
import { toast } from "sonner";

export default function CreateUserModal() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CreateUserFormValues>({
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

  function onSubmit(values: CreateUserFormValues) {
    setServerError(null); // مسح أي خطأ قديم

    startTransition(async () => {
      const payload = {
        ...values,
        speciality: values.userType === "doctor" ? values.speciality : null,
      };

      const result = await createUser(payload);

      if (result.success) {
        toast.success(result.message || "User created successfully");
        reset();
        setOpen(false);
      } else {
        toast.error(result.error || "Failed to create user");
        setServerError(result.error);
      }
    }); // قفل الـ startTransition
  } // قفل الـ onSubmit

  return (
    <>
      <div className="flex justify-end w-ful items-center">
        <button
          onClick={() => setOpen(true)}
          className="rounded-md bg-blue-600  px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors"
        >
          + Create User
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between border-b pb-3">
              <h2 className="text-xl font-bold text-gray-800">
                Create New User
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Name */}
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

                {/* Email */}
                <div>
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

                {/* Phone */}
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

                {/* Password */}
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

                {/* User Type */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    User Role
                  </label>
                  <select
                    {...register("userType")}
                    className="w-full rounded-md border border-gray-300 p-2 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
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

                {/* Speciality - Conditionally Rendered */}
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
                      {SPECIALITIES.map((spec) => (
                        <option key={spec} value={spec}>
                          {spec}
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

              {/* Server Error Display */}
              {/* {serverError && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md border border-red-200 col-span-2">
                  {serverError}
                </div>
              )} */}

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t mt-6">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  disabled={isPending}
                  type="submit"
                  className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isPending ? "Creating..." : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
