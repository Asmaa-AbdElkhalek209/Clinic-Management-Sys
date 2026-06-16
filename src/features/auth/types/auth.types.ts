export type UserRole = "admin" | "doctor" | "receptionist";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  userType: UserRole;
  imageUrl: string | null;
  phone: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: User;
}
export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  accessToken: string;
}
