import { z } from "zod";
import {
  createVisitSchema,
  updateVisitSchema,
} from "../schemas/visit.schema";
import { ActionResult } from "@/shared/types/api";

import { Patient } from "@/features/admin/patients/types/patient.types";
import { User } from "@/features/admin/users/types/user.types";

export interface Prescription {
  id?: number;
  medicineName: string;
  dosage: string;
  duration: string;
  instructions: string;
}

export interface Visit {
  id: number;
  patientId: number;
  appointmentId: number;
  complaint: string;
  diagnosis: string;
  treatment: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  patient: Patient;
  doctor: User;
  prescriptions: Prescription[];
}

export interface VisitsResponse {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  visits: Visit[];
}

export type CreateVisitPayload = z.infer<typeof createVisitSchema>;
export type UpdateVisitPayload = z.infer<typeof updateVisitSchema>;

export type CreateVisitResult = ActionResult<{ visit: Visit }>;
export type UpdateVisitResult = ActionResult<{ visit: Visit }>;
export type DeleteVisitResult = ActionResult;
