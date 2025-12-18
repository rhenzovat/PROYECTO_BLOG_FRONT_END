// src/blogs/blogService.ts
import api from "../api/axios";
// import type { BlogHome } from "../types/Blog";


export const blogService = {
  getHomeBlogs: async (tipo: string, category?: string) => {
  console.log("Enviando al backend:", { tipo, category }); // Agrega esto para ver qué viaja
  const res = await api.get("/blogs/home", {
    params: { tipo, category }
  });
  return res.data;
},
// ESTA ES LA FUNCIÓN QUE TE FALTA O NO ESTÁ SIENDO RECONOCIDA
    create: async (blogData: { title: string; content: string; category: string }) => {
        const res = await api.post("/blogs", blogData);
        return res.data;
    },

    // Agregamos de una vez los otros para el Paso 2
    delete: async (id: number) => {
        await api.delete(`/blogs/${id}`);
    },

    update: async (id: number, blogData: any) => {
        const res = await api.put(`/blogs/${id}`, blogData);
        return res.data;
    }
};