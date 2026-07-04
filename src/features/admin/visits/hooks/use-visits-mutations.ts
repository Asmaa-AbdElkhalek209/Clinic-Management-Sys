import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { createVisit } from "../actions/create-visits.action";
import { updateVisit } from "../actions/update-visits.action";
import { deleteVisit } from "../actions/delete-visits.action";

import {
  CreateVisitPayload,
  UpdateVisitPayload,
} from "../types/visit.types";

// 1. Create
export function useCreateVisit() {
  return useMutation({
    mutationFn: (values: CreateVisitPayload) => createVisit(values),
    onSuccess: (result) => {
      if (result.success) {
        toast.success(result.message || "Visit created successfully");
      } else {
        toast.error(result.error);
      }
    },
  });
}

// 2. Update
export function useUpdateVisit() {
  return useMutation({
    mutationFn: ({
      id,
      values,
    }: {
      id: number;
      values: UpdateVisitPayload;
    }) => updateVisit(id, values),
    onSuccess: (result) => {
      if (result.success) {
        toast.success(result.message || "Visit updated successfully");
      } else {
        toast.error(result.error);
      }
    },
  });
}

// 3. Delete
export function useDeleteVisit() {
  return useMutation({
    mutationFn: (visitId: number) => deleteVisit(visitId),
    onSuccess: (result) => {
      if (result.success) {
        toast.success(result.message || "Visit deleted successfully");
      } else {
        toast.error(result.error);
      }
    },
  });
}
