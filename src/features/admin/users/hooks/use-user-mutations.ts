import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { createUser } from "../actions/create-user.action";
import { updateUser } from "../actions/update-user.action";
import { deleteUser } from "../actions/delete-user.action";
import { toggleUserStatus } from "../actions/toggle-user-status.action";

import { CreateUserPayload, UpdateUserPayload } from "../types/user.types";

// 1. Create
export function useCreateUser() {
  return useMutation({
    mutationFn: (values: CreateUserPayload) => createUser(values),
    onSuccess: (result) => {
      if (result.success) {
        toast.success(result.message || "User created successfully");
      } else {
        toast.error(result.error);
      }
    },
  });
}

// 2. Update
export function useUpdateUser() {
  return useMutation({
    mutationFn: ({ id, values }: { id: number; values: UpdateUserPayload }) =>
      updateUser(id, values),
    onSuccess: (result) => {
      if (result.success) {
        toast.success(result.message || "User updated successfully");
      } else {
        toast.error(result.error);
      }
    },
  });
}

// 3. Delete
export function useDeleteUser() {
  return useMutation({
    mutationFn: (userId: number) => deleteUser(userId),
    onSuccess: (result) => {
      if (result.success) {
        toast.success(result.message || "User deleted successfully");
      } else {
        toast.error(result.error);
      }
    },
  });
}

// 4. Toggle Status
export function useToggleUserStatus() {
  return useMutation({
    mutationFn: (userId: number) => toggleUserStatus(userId),
    onSuccess: (result) => {
      if (result.success) {
        toast.success(result.message || "Status updated");
      } else {
        toast.error(result.error);
      }
    },
  });
}
