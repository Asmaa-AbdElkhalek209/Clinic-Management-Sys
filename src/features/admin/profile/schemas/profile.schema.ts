import { z } from "zod";

// تحويل الحقول الفاضية إلى null
const nullableString = z.preprocess(
  (val) => (val === "" ? null : val),
  z.string().max(500).nullable().optional()
);

const nullableNumber = z.preprocess(
  (val) =>
    val === "" || val === undefined || val === null ? null : Number(val),
  z
    .number({ error: "Must be a valid number" })
    .positive("Must be greater than 0")
    .nullable()
    .optional()
);

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
