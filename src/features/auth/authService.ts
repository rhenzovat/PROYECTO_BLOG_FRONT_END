// import { api } from "../../services/api";

import api from "../../api/axios";

export const authService = {
  login: async (username: string, password: string) => {
    const response = await api.post("/auth/login", {
      username,
      password,
    });

    return response.data; // { token }
  },
};