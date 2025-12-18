import { useEffect, useState } from "react";
import { blogService } from "./blogService";
// import { BlogHome, CategoryMap } from "../types/Blog";
import BlogCard from "./BlogCard";
import { Category, type BlogHome} from "../types/Blog";

export default function BlogHome() {
  const [blogs, setBlogs] = useState<BlogHome[]>([]);
  const [tipo, setTipo] = useState("recentes");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  let ignore = false;
  
  const loadData = async () => {
    setLoading(true);
    try {
      // Cambio clave: Si category es vacío, pasamos null explícitamente 
      // o nos aseguramos que el servicio lo maneje.
      const selectedCategory = category === "" ? undefined : category;
      
      const data = await blogService.getHomeBlogs(tipo, selectedCategory);
      
      if (!ignore) {
        setBlogs(data);
      }
    } catch (error) {
      console.error("Error al cargar blogs", error);
    } finally {
      if (!ignore) setLoading(false);
    }
  };

  loadData();
  return () => { ignore = true; };
}, [tipo, category]);

  return (
    <div style={{ padding: 20 }}>
      <h1>📰 Blog Home</h1>

      {/* Selector de Filtro Principal */}
      <select value={tipo} onChange={e => {
          setTipo(e.target.value);
          if (e.target.value !== 'categoria') setCategory("");
      }}>
        <option value="recentes">Recientes</option>
        <option value="comentados">Más comentados</option>
        <option value="categoria">Por categoría</option>
      </select>

      {/* Selector de Categoría (solo si el tipo es 'categoria') */}
      {tipo === "categoria" && (
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">Seleccione una categoría</option>
          {Object.values(Category).map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      )}

      {loading ? (
        <p>Cargando contenido...</p>
      ) : (
        <div style={{ marginTop: 20 }}>
          {blogs.length === 0 && <p>No se encontraron blogs para este filtro.</p>}
          {blogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
}