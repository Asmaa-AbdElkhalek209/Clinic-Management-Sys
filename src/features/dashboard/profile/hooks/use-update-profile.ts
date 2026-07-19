import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateProfile } from "../actions/update-profile.action";
import { UpdateProfilePayload, UserRole } from "../types/profile.types";
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      values,
      userType,
    }: {
      values: UpdateProfilePayload;
      userType: UserRole;
    }) => updateProfile(values, userType),
    onSuccess: (result) => {
      if (result.success) {
        toast.success(result.message || "Profile updated successfully");
        queryClient.invalidateQueries({ queryKey: ["profile"] });
      } else {
        toast.error(result.error);
      }
    },
  });
}
