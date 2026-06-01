import { api } from "./api";

import { RegisterRequest } from "../types/auth";

export const registerUser = async (
  data: RegisterRequest
) => {
  const response = await api.post(
    "/auth/register",
    data
  );

  return response.data;
};