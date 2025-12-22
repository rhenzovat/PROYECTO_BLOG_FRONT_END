import api from "../../api/axios"; // Asegúrate de que la ruta a tu axios sea correcta

export const authService = {
  // Tu función de login que ya tenías
  login: async (username, password) => {
    const response = await api.post("/auth/login", { username, password });
    return response.data;
  },

  // 👇 ESTA ES LA FUNCIÓN QUE FALTA Y POR ESO SALE EL ERROR
  register: async (username, password) => {
    const response = await api.post("/auth/register", { 
      username: username, 
      password: password 
    });
    return response.data;
  }
};