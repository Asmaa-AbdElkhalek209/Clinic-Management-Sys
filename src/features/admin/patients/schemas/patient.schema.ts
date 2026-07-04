import { z } from "zod";

const patientSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),

  phone: z
    .string()
    .regex(/^01[0125][0-9]{8}$/, "Must be a valid Egyptian phone number"),

  age: z
    .number({ error: "Age is required" })
    .int("Age must be a whole number")
    .min(0, "Age cannot be negative")
    .max(150, "Please enter a valid age"),

  gender: z.enum(["male", "female"], {
    error: "Gender is required",
  }),

  address: z.string().min(3, "Address must be at least 3 characters"),

  notes: z.string().nullable().optional(),
});

export const createPatientSchema = patientSchema;

export const updatePatientSchema = patientSchema.partial();
