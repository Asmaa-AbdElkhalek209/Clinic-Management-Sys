import { api } from "@/shared/lib/axios";
import { LoginRequest, LoginResponse } from "../types/auth.types";

export const loginApi = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post("/user/login", data);

  return response.data;
};
