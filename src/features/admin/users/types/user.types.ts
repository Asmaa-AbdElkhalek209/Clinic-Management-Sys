import { z } from "zod";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema";

export type UserRole = "admin" | "doctor" | "receptionist";
export type UserStatus = "active" | "inactive";

export const SPECIALITIES = [
  "General Practice",
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Ophthalmology",
  "Psychiatry",
  "Gynecology",
  "Urology",
  "Ear, Nose & Throat",
  "Gastroenterology",
  "Oncology",
  "Endocrinology",
  "Pulmonology",
] as const;

export type Speciality = (typeof SPECIALITIES)[number];

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  userType: UserRole;
  status: UserStatus;
  speciality?: Speciality | null;
  experienceYears?: number | null;
  fees?: number | null;
  about?: string | null;
  imageUrl?: string | null;
  createdAt: string;
}

export interface UsersResponse {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  users: User[];
}

export type CreateUserPayload = z.infer<typeof createUserSchema>;
export type UpdateUserPayload = z.infer<typeof updateUserSchema>;

export type ActionResult<T = void> =
  | { success: true; data?: T; message?: string }
  | { success: false; error: string };
