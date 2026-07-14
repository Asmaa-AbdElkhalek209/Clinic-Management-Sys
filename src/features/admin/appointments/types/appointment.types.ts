import { z } from "zod";
import {
  createAppointmentSchema,
  updateAppointmentSchema,
  updateAppointmentStatusSchema,
} from "../schemas/appointment.schema";
import { ActionResult } from "@/shared/types/api";

import { Patient } from "@/features/admin/patients/types/patient.types";
import { User } from "@/features/admin/users/types/user.types";

export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed";

export interface Appointment {
  id: number;
  slotDate: string;
  slotTime: string;
  status: AppointmentStatus;
  createdAt: string;
  updatedAt: string;
  patient: Patient;
  doctor: User;
  createdBy: User;
}

export interface AppointmentsResponse {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  appointments: Appointment[];
}

export type CreateAppointmentPayload = z.infer<typeof createAppointmentSchema>;
export type UpdateAppointmentPayload = z.infer<typeof updateAppointmentSchema>;
export type UpdateAppointmentStatusPayload = z.infer<
  typeof updateAppointmentStatusSchema
>;
export interface AppointmentFormValues {
  patientId?: number;
  doctorId?: number;

  slotDate: string;
  slotTime: string;

  status?: AppointmentStatus;
}
export type CreateAppointmentResult = ActionResult<{
  appointment: Appointment;
}>;
export type UpdateAppointmentResult = ActionResult<{
  appointment: Appointment;
}>;
export type DeleteAppointmentResult = ActionResult;
