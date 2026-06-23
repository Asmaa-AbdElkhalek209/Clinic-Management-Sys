import { api } from "@/shared/lib/axios";
import { LoginRequest, LoginResponse } from "../types/auth.types";

export const loginApi = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post("/users/login", data);
  console.log(response + "response");
  return response.data;
};
