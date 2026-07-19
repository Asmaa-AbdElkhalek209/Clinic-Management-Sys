"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAppointmentSchema } from "../schemas/appointment.schema";
import { CreateAppointmentPayload } from "../types/appointment.types";
import { useCreateAppointment } from "../hooks/use-appointment-mutations";
import FormModal from "@/shared/components/dashboard/FormModal";
import SearchableSelect from "@/shared/components/dashboard/SearchableSelect";

interface DropdownItem {
  id: number;
  name: string;
}

interface CreateAppointmentFormProps {
  doctors: DropdownItem[];
  patients: DropdownItem[];
}

export default function CreateAppointmentForm({
  doctors,
  patients,
}: CreateAppointmentFormProps) {
  const [open, setOpen] = useState(false);
  const { mutate: createAppointment, isPending } = useCreateAppointment();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateAppointmentPayload>({
    resolver: zodResolver(createAppointmentSchema),
    defaultValues: {
      patientId: undefined,
      doctorId: undefined,
      slotDate: "",
      slotTime: "",
    },
  });

  function onSubmit(values: CreateAppointmentPayload) {
    createAppointment(values, {
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
          + New Appointment
        </button>
      </div>

      <FormModal
        isOpen={open}
        title="New Appointment"
        onClose={() => setOpen(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Doctor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Doctor
              </label>
              <Controller
                control={control}
                name="doctorId"
                render={({ field }) => (
                  <SearchableSelect
                    items={doctors}
                    value={doctors.find((d) => d.id === field.value) ?? null}
                    onChange={(doctor) => field.onChange(doctor?.id)}
                    placeholder="Select doctor..."
                    emptyMessage="No doctor found."
                    itemKey={(doctor) => doctor.id}
                    itemLabel={(doctor) => doctor.name}
                  />
                )}
              />
              {errors.doctorId && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.doctorId.message}
                </p>
              )}
            </div>

            {/* Patient */}
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
                    value={patients.find((p) => p.id === field.value) ?? null}
                    onChange={(patient) => field.onChange(patient?.id)}
                    placeholder="Select patient..."
                    emptyMessage="No patient found."
                    itemKey={(patient) => patient.id}
                    itemLabel={(patient) => patient.name}
                  />
                )}
              />
              {errors.patientId && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.patientId.message}
                </p>
              )}
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                {...register("slotDate")}
                className="w-full rounded-md border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.slotDate && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.slotDate.message}
                </p>
              )}
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <input
                type="time"
                {...register("slotTime")}
                className="w-full rounded-md border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.slotTime && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.slotTime.message}
                </p>
              )}
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
              {isPending ? "Saving..." : "Book Appointment"}
            </button>
          </div>
        </form>
      </FormModal>
    </>
  );
}
