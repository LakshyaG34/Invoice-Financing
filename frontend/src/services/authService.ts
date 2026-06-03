import { api } from "./api";

import { LoginRequest, RegisterRequest } from "../types/auth";

export const registerUser = async (
  data: RegisterRequest
) => {
  const response = await api.post(
    "/auth/register",
    data
  );

  return response.data;
};


export const loginUser = async (
  data: LoginRequest
) => {
  const response = await api.post(
    "/auth/login",
    data
  );

  // console.log(response.token);
  return response.data;
};