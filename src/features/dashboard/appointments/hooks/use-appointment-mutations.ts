import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { createAppointment } from "../actions/create-appointment.action";
import { updateAppointment } from "../actions/update-appointment.action";
import { deleteAppointment } from "../actions/delete-appointment.action";
import { updateAppointmentStatus } from "../actions/update-appointment-status.action";

import {
  CreateAppointmentPayload,
  UpdateAppointmentPayload,
  AppointmentStatus,
} from "../types/appointment.types";

// 1. Create
export function useCreateAppointment() {
  return useMutation({
    mutationFn: (values: CreateAppointmentPayload) => createAppointment(values),
    onSuccess: (result) => {
      if (result.success)
        toast.success(result.message || "Appointment created successfully");
      else toast.error(result.error);
    },
  });
}

// 2. Update (General)
export function useUpdateAppointment() {
  return useMutation({
    mutationFn: ({
      id,
      values,
    }: {
      id: number;
      values: UpdateAppointmentPayload;
    }) => updateAppointment(id, values),

    onSuccess: (result) => {
      if (result.success)
        toast.success(result.message || "Appointment updated successfully");
      else toast.error(result.error);
    },
  });
}

// 3. Delete
export function useDeleteAppointment() {
  return useMutation({
    mutationFn: (appointmentId: number) => deleteAppointment(appointmentId),
    onSuccess: (result) => {
      if (result.success)
        toast.success(result.message || "Appointment deleted successfully");
      else toast.error(result.error);
    },
  });
}

// 4. Update Status
export function useUpdateAppointmentStatus() {
  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: AppointmentStatus }) =>
      updateAppointmentStatus(id, status),
    onSuccess: (result) => {
      if (result.success) toast.success(result.message || "Status updated");
      else toast.error(result.error);
    },
  });
}
