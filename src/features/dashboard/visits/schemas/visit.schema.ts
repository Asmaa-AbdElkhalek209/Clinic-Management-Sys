import { z } from "zod";

const prescriptionSchema = z.object({
  medicineName: z
    .string()
    .min(1, "Medicine name is required"),
  dosage: z
    .string()
    .min(1, "Dosage is required"),
  duration: z
    .string()
    .min(1, "Duration is required"),
  instructions: z
    .string()
    .min(1, "Instructions are required"),
});

const visitSchema = z.object({
  patientId: z.coerce.number({
    error: "Patient is required",
  }),
  appointmentId: z.coerce.number({
    error: "Appointment is required",
  }),
  complaint: z
    .string()
    .min(3, "Complaint must be at least 3 characters"),
  diagnosis: z
    .string()
    .min(3, "Diagnosis must be at least 3 characters"),
  treatment: z
    .string()
    .min(3, "Treatment must be at least 3 characters"),
  notes: z.string().nullable().optional(),
  prescriptions: z
    .array(prescriptionSchema)
    .optional()
    .default([]),
});

export const createVisitSchema = visitSchema;

export const updateVisitSchema = z.object({
  complaint: z
    .string()
    .min(3, "Complaint must be at least 3 characters")
    .optional(),
  diagnosis: z
    .string()
    .min(3, "Diagnosis must be at least 3 characters")
    .optional(),
  treatment: z
    .string()
    .min(3, "Treatment must be at least 3 characters")
    .optional(),
  notes: z.string().nullable().optional(),
  prescriptions: z
    .array(prescriptionSchema)
    .optional(),
});
