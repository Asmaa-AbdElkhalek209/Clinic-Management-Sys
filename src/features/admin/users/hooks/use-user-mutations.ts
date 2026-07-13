import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { createUser } from "../actions/create-user.action";
import { updateUser } from "../actions/update-user.action";
import { deleteUser } from "../actions/delete-user.action";
import { toggleUserStatus } from "../actions/toggle-user-status.action";

import { CreateUserPayload, UpdateUserPayload } from "../types/user.types";

export function useCreateUser() {
  return useMutation({
    mutationFn: (values: CreateUserPayload) => createUser(values),
    onSuccess: (result) => {
      if (result.success) {
        toast.success(result.message || "User created successfully");
      } else {
        toast.error(result.error || "Failed to create user");
      }
    },
    onError: () => {
      toast.error("An unexpected error occurred");
    },
  });
}

export function useUpdateUser() {
  return useMutation({
    mutationFn: ({ id, values }: { id: number; values: UpdateUserPayload }) =>
      updateUser(id, values),
    onSuccess: (result) => {
      if (result.success) {
        toast.success(result.message || "User updated successfully");
      } else {
        toast.error(result.error || "Failed to update user");
      }
    },
    onError: () => {
      toast.error("An unexpected error occurred");
    },
  });
}

export function useDeleteUser() {
  return useMutation({
    mutationFn: (userId: number) => deleteUser(userId),
    onSuccess: (result) => {
      if (result.success) {
        toast.success(result.message || "User deleted successfully");
      } else {
        toast.error(result.error || "Failed to delete user");
      }
    },
    onError: () => {
      toast.error("An unexpected error occurred");
    },
  });
}

export function useToggleUserStatus() {
  return useMutation({
    mutationFn: (userId: number) => toggleUserStatus(userId),
    onSuccess: (result) => {
      if (result.success) {
        toast.success(result.message || "Status updated successfully");
      } else {
        toast.error(result.error || "Failed to update status");
      }
    },
    onError: () => {
      toast.error("An unexpected error occurred");
    },
  });
}
