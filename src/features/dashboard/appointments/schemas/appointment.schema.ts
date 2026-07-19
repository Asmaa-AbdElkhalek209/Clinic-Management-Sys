import { z } from "zod";

const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

export const createAppointmentSchema = z.object({
  patientId: z.number({
    error: "Patient is required",
  }),

  doctorId: z.number({
    error: "Doctor is required",
  }),

  slotDate: z.string().min(1, "Date is required"),

  slotTime: z.string().regex(timeRegex),
});

export const updateAppointmentSchema = z.object({
  // patientId: z.coerce.number().optional(),
  // doctorId: z.coerce.number().optional(),
  // status: z.enum(["pending", "confirmed", "cancelled", "completed"]).optional(),
  slotDate: z.string().min(1, "Date is required").optional(),
  slotTime: z
    .string()
    .regex(timeRegex, "Invalid time format (e.g., 09:00)")
    .optional(),
});
export const updateAppointmentStatusSchema = z.object({
  status: z.enum(["pending", "confirmed", "cancelled", "completed"], {
    error: "Invalid status value",
  }),
});
