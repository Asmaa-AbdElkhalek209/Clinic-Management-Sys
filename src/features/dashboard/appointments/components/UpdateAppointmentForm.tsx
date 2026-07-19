"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateAppointmentSchema } from "../schemas/appointment.schema";
import {
  Appointment,
  UpdateAppointmentPayload,
} from "../types/appointment.types";
import { useUpdateAppointment } from "../hooks/use-appointment-mutations";
import FormModal from "@/shared/components/dashboard/FormModal";
import { CalendarSync } from "lucide-react";

interface UpdateAppointmentFormProps {
  appointment: Appointment;
}

export default function UpdateAppointmentForm({
  appointment,
}: UpdateAppointmentFormProps) {
  const [open, setOpen] = useState(false);
  const { mutate: updateAppointment, isPending } = useUpdateAppointment();
  const canReschedule = appointment.status === "cancelled";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateAppointmentPayload>({
    resolver: zodResolver(updateAppointmentSchema),
    defaultValues: {
      slotDate: appointment.slotDate ? appointment.slotDate.split("T")[0] : "",
      slotTime: appointment.slotTime || "",
    },
  });

  function onSubmit(values: UpdateAppointmentPayload) {
    updateAppointment(
      { id: appointment.id, values },
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
        onClick={() => canReschedule && setOpen(true)}
        disabled={!canReschedule}
        title={
          canReschedule
            ? "Reschedule"
            : "Only cancelled appointments can be rescheduled"
        }
        className={`p-1.5 rounded-md transition-colors ${
          canReschedule
            ? "text-gray-400 hover:text-blue-600 hover:bg-blue-50"
            : "text-gray-300 cursor-not-allowed"
        }`}
      >
        <CalendarSync className="w-4 h-4" />
      </button>

      <FormModal
        isOpen={open}
        title={`Reschedule: ${appointment.patient.name}`}
        onClose={() => setOpen(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              {isPending ? "Saving..." : "Reschedule"}
            </button>
          </div>
        </form>
      </FormModal>
    </>
  );
}
