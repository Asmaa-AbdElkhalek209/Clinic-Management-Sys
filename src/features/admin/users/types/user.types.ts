import { z } from "zod";
import {
  createUserSchema,
  updateUserSchema,
  userFormSchema,
} from "../schemas/user.schema";
import { ActionResult } from "@/shared/types/api";

export type UserRole = "admin" | "doctor" | "receptionist";
export type UserStatus = "active" | "inactive";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  userType: UserRole;
  status: UserStatus;

  speciality: string | null;
  experienceYears: number | null;
  fees: number | null;
  about: string | null;

  imageUrl: string | null;
  createdAt: string;
}

export interface UsersResponse {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  users: User[];
}

export interface Speciality {
  key: string;
  label: string;
}

export interface SpecialitiesResponse {
  total: number;
  specialities: Speciality[];
}

export type CreateUserPayload = z.infer<typeof createUserSchema>;
export type UpdateUserPayload = z.infer<typeof updateUserSchema>;
export type UserFormValues = z.infer<typeof userFormSchema>;
export type UsersActionResult<T = void> = ActionResult<T>;
