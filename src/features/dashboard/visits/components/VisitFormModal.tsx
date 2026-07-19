"use client";

import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createVisitSchema,
  updateVisitSchema,
} from "../schemas/visit.schema";

import {
  Visit,
  CreateVisitPayload,
  UpdateVisitPayload,
} from "../types/visit.types";

import {
  useCreateVisit,
  useUpdateVisit,
} from "../hooks/use-visits-mutations";

import FormModal from "@/shared/components/dashboard/FormModal";
import SearchableSelect from "@/shared/components/dashboard/SearchableSelect";

interface DropdownItem {
  id: number;
  name: string;
}

interface VisitFormModalProps {
  patients: DropdownItem[];
  appointments: DropdownItem[];
  visit?: Visit;
}

export default function VisitFormModal({
  patients,
  appointments,
  visit,
}: VisitFormModalProps) {
  const [open, setOpen] = useState(false);

  const isEditMode = !!visit;

  const { mutate: createVisitMutation, isPending: isCreating } = useCreateVisit();
  const { mutate: updateVisitMutation, isPending: isUpdating } = useUpdateVisit();

  const isPending = isCreating || isUpdating;

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateVisitPayload | UpdateVisitPayload>({
    resolver: zodResolver(
      isEditMode ? updateVisitSchema : createVisitSchema
    ),
    defaultValues: {
      patientId: visit?.patient?.id || undefined,
      appointmentId: visit?.appointmentId || undefined,
      complaint: visit?.complaint || "",
      diagnosis: visit?.diagnosis || "",
      treatment: visit?.treatment || "",
      notes: visit?.notes || "",
      prescriptions: visit?.prescriptions || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "prescriptions",
  });

  function onSubmit(values: CreateVisitPayload | UpdateVisitPayload) {
    if (isEditMode && visit) {
      updateVisitMutation(
        {
          id: visit.id,
          values: values as UpdateVisitPayload,
        },
        {
          onSuccess: (result) => {
            if (result.success) {
              setOpen(false);
            }
          },
        }
      );
    } else {
      createVisitMutation(values as CreateVisitPayload, {
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
            + New Visit
          </button>
        </div>
      )}

      <FormModal
        isOpen={open}
        title={
          isEditMode ? `Edit Visit: ${visit?.patient?.name}` : "New Visit"
        }
        onClose={() => setOpen(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {!isEditMode && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Patient
                  </label>

                  <Controller
                    control={control}
                    name="patientId"
                    render={({ field }) => (
                      <SearchableSelect
                        items={patients}
                        value={
                          patients.find(
                            (patient) => patient.id === field.value
                          ) ?? null
                        }
                        onChange={(patient) => field.onChange(patient?.id)}
                        placeholder="Select patient..."
                        emptyMessage="No patient found."
                        itemKey={(patient) => patient.id}
                        itemLabel={(patient) => patient.name}
                      />
                    )}
                  />

                  {!isEditMode && "patientId" in errors && errors.patientId && (
                    <p className="mt-1 text-xs text-red-500">
                      {(errors.patientId as any).message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Appointment
                  </label>

                  <Controller
                    control={control}
                    name="appointmentId"
                    render={({ field }) => (
                      <SearchableSelect
                        items={appointments}
                        value={
                          appointments.find(
                            (appt) => appt.id === field.value
                          ) ?? null
                        }
                        onChange={(appt) => field.onChange(appt?.id)}
                        placeholder="Select appointment..."
                        emptyMessage="No appointment found."
                        itemKey={(appt) => appt.id}
                        itemLabel={(appt) => appt.name}
                      />
                    )}
                  />

                  {!isEditMode && "appointmentId" in errors && errors.appointmentId && (
                    <p className="mt-1 text-xs text-red-500">
                      {(errors.appointmentId as any).message}
                    </p>
                  )}
                </div>
              </>
            )}

            <div className={isEditMode ? "col-span-2" : "col-span-2"}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Complaint
              </label>
              <textarea
                {...register("complaint")}
                rows={2}
                className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="e.g. Fever and cough"
              />
              {errors.complaint && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.complaint.message}
                </p>
              )}
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Diagnosis
              </label>
              <textarea
                {...register("diagnosis")}
                rows={2}
                className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="e.g. Upper Respiratory Tract Infection"
              />
              {errors.diagnosis && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.diagnosis.message}
                </p>
              )}
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Treatment
              </label>
              <textarea
                {...register("treatment")}
                rows={2}
                className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="e.g. Rest and hydration"
              />
              {errors.treatment && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.treatment.message}
                </p>
              )}
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes (Optional)
              </label>
              <textarea
                {...register("notes")}
                rows={2}
                className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Additional medical notes..."
              />
            </div>
          </div>

          {/* Prescriptions Section */}
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Prescriptions
              </label>
              <button
                type="button"
                onClick={() =>
                  append({
                    medicineName: "",
                    dosage: "",
                    duration: "",
                    instructions: "",
                  })
                }
                className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
              >
                + Add Prescription
              </button>
            </div>

            {fields.length === 0 && (
              <p className="text-sm text-gray-500 italic">
                No prescriptions added yet
              </p>
            )}

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="mb-3 p-3 border border-gray-200 rounded-md bg-gray-50"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Medicine Name
                    </label>
                    <input
                      {...register(`prescriptions.${index}.medicineName`)}
                      className="w-full rounded-md border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="e.g. Paracetamol"
                    />
                    {errors.prescriptions?.[index]?.medicineName && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.prescriptions[index]?.medicineName?.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Dosage
                    </label>
                    <input
                      {...register(`prescriptions.${index}.dosage`)}
                      className="w-full rounded-md border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="e.g. 500mg"
                    />
                    {errors.prescriptions?.[index]?.dosage && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.prescriptions[index]?.dosage?.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Duration
                    </label>
                    <input
                      {...register(`prescriptions.${index}.duration`)}
                      className="w-full rounded-md border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="e.g. 5 days"
                    />
                    {errors.prescriptions?.[index]?.duration && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.prescriptions[index]?.duration?.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Instructions
                    </label>
                    <input
                      {...register(`prescriptions.${index}.instructions`)}
                      className="w-full rounded-md border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="e.g. Take after meals"
                    />
                    {errors.prescriptions?.[index]?.instructions && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.prescriptions[index]?.instructions?.message}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-xs text-red-600 hover:text-red-800 font-medium"
                >
                  Remove Prescription
                </button>
              </div>
            ))}
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
                  : "Create Visit"}
            </button>
          </div>
        </form>
      </FormModal>
    </>
  );
}
