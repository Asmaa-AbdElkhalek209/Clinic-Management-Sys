import { z } from "zod";

export const createUserSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    phone: z
      .string()
      .regex(/^01[0125][0-9]{8}$/, "Must be a valid Egyptian phone number"),
    userType: z.enum(["doctor", "receptionist"]),
    speciality: z
      .string()
      .min(1, "Speciality is required")
      .optional()
      .nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.userType === "doctor" && !data.speciality) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Speciality is required for doctors",
        path: ["speciality"],
      });
    }
  });

export const updateUserSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  phone: z.string().min(11, "Phone number is invalid"),
  speciality: z.string().min(1).optional().nullable(),
});

export const userFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),

  email: z.string().email("Invalid email").optional(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .optional(),

  phone: z
    .string()
    .regex(/^01[0125][0-9]{8}$/, "Must be a valid Egyptian phone number"),

  userType: z.enum(["doctor", "receptionist"]).optional(),

  speciality: z.string().optional().nullable(),
});
