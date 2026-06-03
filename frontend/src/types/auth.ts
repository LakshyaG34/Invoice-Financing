export interface RegisterRequest {
  organizationName: string;
  fullName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}