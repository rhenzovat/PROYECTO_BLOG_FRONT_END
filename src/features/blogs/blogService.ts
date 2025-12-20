// src/blogs/blogService.ts
// import api from "../api/axios";
// import type { BlogHome } from "../types/Blog";

import api from "../../api/axios";


export const blogService = {
  getHomeBlogs: async (tipo: string, category?: string) => {
  console.log("Enviando al backend:", { tipo, category }); // Agrega esto para ver qué viaja
  const res = await api.get("api/blogs/home", {
    params: { tipo, category }
  });
  return res.data;
},
// ESTA ES LA FUNCIÓN QUE TE FALTA O NO ESTÁ SIENDO RECONOCIDA
    create: async (blogData: { title: string; content: string; category: string }) => {
        const res = await api.post("api/blogs", blogData);
        return res.data;
    },

    // Agregamos de una vez los otros para el Paso 2
    delete: async (id: number) => {
        await api.delete(`api/blogs/${id}`);
    },

    update: async (id: number, blogData: any) => {
        const res = await api.put(`api/blogs/${id}`, blogData);
        return res.data;
    },
    
    getById: async (id: number) => {
  const res = await api.get(`api/blogs/${id}`); // Verifica si tu backend usa /api/blogs/{id}
  return res.data;
},
};