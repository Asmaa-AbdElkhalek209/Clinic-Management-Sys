"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createPatientSchema,
  updatePatientSchema,
} from "../schemas/patient.schema";
import {
  Patient,
  CreatePatientPayload,
  UpdatePatientPayload,
} from "../types/patient.types";
import { useCreatePatient } from "../hooks/use-patient-mutations";
import { useUpdatePatient } from "../hooks/use-patient-mutations";
import FormModal from "@/shared/components/dashboard/FormModal";

interface PatientFormModalProps {
  patient?: Patient;
}

export default function PatientFormModal({ patient }: PatientFormModalProps) {
  const [open, setOpen] = useState(false);
  const isEditMode = !!patient;

  const { mutate: createPatient, isPending: isCreating } = useCreatePatient();
  const { mutate: updatePatient, isPending: isUpdating } = useUpdatePatient();
  const isPending = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePatientPayload | UpdatePatientPayload>({
    resolver: zodResolver(
      isEditMode ? updatePatientSchema : createPatientSchema
    ),
    defaultValues: {
      name: patient?.name || "",
      phone: patient?.phone || "",
      age: patient?.age || undefined,
      gender: patient?.gender || "male",
      address: patient?.address || "",
      notes: patient?.notes || "",
    },
  });

  function onSubmit(values: CreatePatientPayload | UpdatePatientPayload) {
    if (isEditMode && patient) {
      updatePatient(
        { id: patient.id, values: values as UpdatePatientPayload },
        {
          onSuccess: (result) => {
            if (result.success) setOpen(false);
          },
        }
      );
    } else {
      createPatient(values as CreatePatientPayload, {
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
            + Add Patient
          </button>
        </div>
      )}

      <FormModal
        isOpen={open}
        title={
          isEditMode ? `Edit Patient: ${patient?.name}` : "Add New Patient"
        }
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                {...register("age", { valueAsNumber: true })}
                className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="e.g. 30"
              />
              {errors.age && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.age.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                {...register("gender")}
                className="w-full rounded-md border border-gray-300 p-2 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.gender.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                {...register("address")}
                className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="e.g. Cairo, Egypt"
              />
              {errors.address && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes (Optional)
              </label>
              <textarea
                {...register("notes")}
                rows={3}
                className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Any medical notes..."
              />
            </div>
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
                  : "Add Patient"}
            </button>
          </div>
        </form>
      </FormModal>
    </>
  );
}
