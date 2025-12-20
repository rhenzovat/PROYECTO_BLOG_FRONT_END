import axios from "axios";

// He quitado el /api del final por si acaso, 
// pero asegúrate de que coincida con tu Backend
const api = axios.create({
  baseURL: "http://localhost:8080",
  
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;


