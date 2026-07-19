import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { createPatient } from "../actions/create-patient.action";
import { updatePatient } from "../actions/update-patient.action";
import { deletePatient } from "../actions/delete-patient.action";

import {
  CreatePatientPayload,
  UpdatePatientPayload,
} from "../types/patient.types";

// 1. Create
export function useCreatePatient() {
  return useMutation({
    mutationFn: (values: CreatePatientPayload) => createPatient(values),
    onSuccess: (result) => {
      if (result.success) {
        toast.success(result.message || "Patient created successfully");
      } else {
        toast.error(result.error);
      }
    },
  });
}

// 2. Update
export function useUpdatePatient() {
  return useMutation({
    mutationFn: ({
      id,
      values,
    }: {
      id: number;
      values: UpdatePatientPayload;
    }) => updatePatient(id, values),
    onSuccess: (result) => {
      if (result.success) {
        toast.success(result.message || "Patient updated successfully");
      } else {
        toast.error(result.error);
      }
    },
  });
}

// 3. Delete
export function useDeletePatient() {
  return useMutation({
    mutationFn: (patientId: number) => deletePatient(patientId),
    onSuccess: (result) => {
      if (result.success) {
        toast.success(result.message || "Patient deleted successfully");
      } else {
        toast.error(result.error);
      }
    },
  });
}
