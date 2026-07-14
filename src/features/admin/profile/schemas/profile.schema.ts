import { z } from "zod";

const nullableString = z.string().max(500).nullable().optional();

const nullableNumber = z
  .number({ error: "Must be a valid number" })
  .positive("Must be greater than 0")
  .nullable()
  .optional();

export const updateProfileSchema = z.object({
  name: z.string().min(1, "Name is required").max(50),
  phone: z
    .string()
    .regex(/^01[0125][0-9]{8}$/, "Must be a valid Egyptian phone number"),
  speciality: nullableString,
  experienceYears: nullableNumber,
  fees: nullableNumber,
  about: nullableString,
});
