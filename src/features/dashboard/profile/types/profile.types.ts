import { z } from "zod";
import { updateProfileSchema } from "../schemas/profile.schema";
import { ActionResult } from "@/shared/types/api";

import type {
  User,
  UserRole,
  UserStatus,
  Speciality,
  SpecialitiesResponse,
} from "@/features/dashboard/users/types/user.types";

export type UserProfile = User;

export type UpdateProfilePayload = z.infer<typeof updateProfileSchema>;

export type UpdateProfileResult = ActionResult<{
  user: UserProfile;
}>;

export type { UserRole, UserStatus, Speciality, SpecialitiesResponse };
