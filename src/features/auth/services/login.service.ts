import { loginApi } from "../api/auth.api";
import { LoginRequest } from "../types/auth.types";

export const loginService = async (data: LoginRequest) => {
  const response = await loginApi(data);

  return {
    id: response.user.id,
    name: response.user.name,
    email: response.user.email,
    role: response.user.role,
    accessToken: response.token,
  };
};
