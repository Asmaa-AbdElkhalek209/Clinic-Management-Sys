import { z } from "zod";
import {
  createPatientSchema,
  updatePatientSchema,
} from "../schemas/patient.schema";
import { ActionResult } from "@/shared/types/api";

export type PatientGender = "male" | "female";

export interface Patient {
  id: number;
  name: string;
  phone: string;
  age: number;
  gender: PatientGender;
  address: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface PatientsResponse {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  patients: Patient[];
}

export type CreatePatientPayload = z.infer<typeof createPatientSchema>;
export type UpdatePatientPayload = z.infer<typeof updatePatientSchema>;

export type CreatePatientResult = ActionResult<{ patient: Patient }>;
export type UpdatePatientResult = ActionResult<{ patient: Patient }>;
export type DeletePatientResult = ActionResult;
