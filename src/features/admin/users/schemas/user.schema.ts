import { z } from "zod";
import { SPECIALITIES } from "../types/user.types";

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
      .regex(
        /^01[0125][0-9]{8}$/,
        "Must be a valid Egyptian phone number (e.g., 01012345678)"
      ),

    userType: z.enum(["doctor", "receptionist"]),
    speciality: z.enum(SPECIALITIES).optional().nullable(),
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

export type CreateUserFormValues = z.infer<typeof createUserSchema>;

// update
export const updateUserSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  phone: z.string().min(11, "Phone number is invalid"),
  speciality: z.enum(SPECIALITIES).optional().nullable(),
});

export type UpdateUserFormValues = z.infer<typeof updateUserSchema>;
