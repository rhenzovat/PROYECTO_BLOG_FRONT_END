import { api } from "../services/api";

export const authService = {
  login: async (username: string, password: string) => {
    const response = await api.post("/auth/login", {
      username,
      password,
    });

    return response.data; // { token }
  },
};