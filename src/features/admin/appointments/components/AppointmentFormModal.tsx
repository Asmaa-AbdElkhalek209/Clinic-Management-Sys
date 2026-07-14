"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { appointmentFormSchema } from "../schemas/appointment.schema";

import {
  Appointment,
  AppointmentFormValues,
  CreateAppointmentPayload,
  UpdateAppointmentPayload,
} from "../types/appointment.types";

import {
  useCreateAppointment,
  useUpdateAppointment,
} from "../hooks/use-appointment-mutations";

import FormModal from "@/shared/components/dashboard/FormModal";
import SearchableSelect from "@/shared/components/dashboard/SearchableSelect";

interface DropdownItem {
  id: number;
  name: string;
}

interface AppointmentFormModalProps {
  doctors: DropdownItem[];
  patients: DropdownItem[];
  appointment?: Appointment;
}

export default function AppointmentFormModal({
  doctors,
  patients,
  appointment,
}: AppointmentFormModalProps) {
  const [open, setOpen] = useState(false);

  const isEditMode = !!appointment;

  const { mutate: createAppointment, isPending: isCreating } =
    useCreateAppointment();

  const { mutate: updateAppointment, isPending: isUpdating } =
    useUpdateAppointment();

  const isPending = isCreating || isUpdating;

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      patientId: appointment?.patient?.id || undefined,
      doctorId: appointment?.doctor?.id || undefined,
      slotDate: appointment?.slotDate ? appointment.slotDate.split("T")[0] : "",
      slotTime: appointment?.slotTime || "",
      status: appointment?.status,
    },
  });

  function onSubmit(values: AppointmentFormValues) {
    if (isEditMode && appointment) {
      const payload: UpdateAppointmentPayload = {
        slotDate: values.slotDate,
        slotTime: values.slotTime,
        status: values.status,
      };

      updateAppointment(
        {
          id: appointment.id,
          values: payload,
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
      const payload: CreateAppointmentPayload = {
        patientId: values.patientId!,
        doctorId: values.doctorId!,
        slotDate: values.slotDate,
        slotTime: values.slotTime,
      };

      createAppointment(payload, {
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
          title="Reschedule"
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
            + New Appointment
          </button>
        </div>
      )}

      <FormModal
        isOpen={open}
        title={
          isEditMode
            ? `Reschedule: ${appointment?.patient?.name}`
            : "New Appointment"
        }
        onClose={() => setOpen(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Doctor
              </label>

              <Controller
                control={control}
                name="doctorId"
                render={({ field }) => {
                  return (
                    <SearchableSelect
                      items={doctors}
                      value={
                        doctors.find((doctor) => doctor.id === field.value) ??
                        null
                      }
                      onChange={(doctor) => field.onChange(doctor?.id)}
                      placeholder="Select doctor..."
                      emptyMessage="No doctor found."
                      itemKey={(doctor) => doctor.id}
                      itemLabel={(doctor) => doctor.name}
                      disabled={isEditMode}
                    />
                  );
                }}
              />

              {errors.doctorId && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.doctorId.message}
                </p>
              )}
            </div>

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
                      patients.find((patient) => patient.id === field.value) ??
                      null
                    }
                    onChange={(patient) => field.onChange(patient?.id)}
                    placeholder="Select patient..."
                    emptyMessage="No patient found."
                    itemKey={(patient) => patient.id}
                    itemLabel={(patient) => patient.name}
                    disabled={isEditMode}
                  />
                )}
              />

              {errors.patientId && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.patientId.message}
                </p>
              )}
            </div>
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
              {isPending
                ? "Saving..."
                : isEditMode
                  ? "Reschedule"
                  : "Book Appointment"}
            </button>
          </div>
        </form>
      </FormModal>
    </>
  );
}
