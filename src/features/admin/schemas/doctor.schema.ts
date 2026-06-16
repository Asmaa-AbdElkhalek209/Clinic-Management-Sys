import { z } from "zod";

export const doctorSchema = z.object({
  name: z.string().min(2, "Name is required"),

  speciality: z.string().min(2, "Speciality is required"),

  experienceYears: z
    .string()
    .min(1, "Experience is required")
    .regex(/^\d+$/, "Must be a number"),

  fees: z
    .string()
    .min(1, "Fees is required")
    .regex(/^\d+$/, "Must be a number"),

  about: z.string().min(2, "About must be at least 10 characters"),

  file: z.any().refine((file) => file?.length > 0, "Image is required"),
});

export type DoctorFormData = z.infer<typeof doctorSchema>;
