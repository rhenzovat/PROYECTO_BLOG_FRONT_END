import { useEffect, useState } from "react";
// import { blogService } from "./blogService";
// import { BlogHome, CategoryMap } from "../types/Blog";
import BlogCard from "../components/BlogCard";
import { Category, type BlogHome } from "../types/Blog";
import { blogService } from "../features/blogs/blogService";

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
      // Si tipo es 'categoria' pero no hay categoría seleccionada,
      // pedimos 'recentes' temporalmente para que la pantalla no esté vacía.
      const fetchTipo = (tipo === "categoria" && !category) ? "recentes" : tipo;
      const selectedCategory = category === "" ? undefined : category;
      
      const data = await blogService.getHomeBlogs(fetchTipo, selectedCategory);
      
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
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.mainTitle}>📰 Explora el Blog</h1>
        <p style={styles.subtitle}>Encuentra los mejores artículos de tecnología</p>
      </header>

      {/* --- SECCIÓN DE FILTROS ESTILIZADA --- */}
      <div style={styles.filterSection}>
        <div style={styles.selectGroup}>
          <label style={styles.label}>Ver por:</label>
          <select 
            style={styles.select} 
            value={tipo} 
            onChange={e => {
              setTipo(e.target.value);
              if (e.target.value !== 'categoria') setCategory("");
            }}
          >
            <option value="recentes">🕒 Recientes</option>
            <option value="comentados">🔥 Más comentados</option>
            <option value="categoria">📂 Por categoría</option>
          </select>
        </div>

        {/* Selector de Categoría (solo si el tipo es 'categoria') */}
        {tipo === "categoria" && (
          <div style={styles.selectGroup}>
            <label style={styles.label}>Categoría:</label>
            <select 
              style={{...styles.select, borderColor: '#3498db'}} 
              value={category} 
              onChange={e => setCategory(e.target.value)}
            >
              <option value="">🎯 Seleccione una...</option>
              {Object.values(Category).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* --- LISTADO --- */}
      {loading ? (
        <div style={styles.loader}>Cargando contenido...</div>
      ) : (
        <div style={styles.grid}>
          {blogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
}

// --- ESTILOS MEJORADOS ---
const styles: any = {
  container: { padding: '30px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Arial, sans-serif' },
  header: { textAlign: 'center', marginBottom: '30px' },
  mainTitle: { fontSize: '2rem', color: '#2c3e50', marginBottom: '8px' },
  subtitle: { color: '#7f8c8d', fontSize: '1rem' },
  
  filterSection: { 
    display: 'flex', 
    justifyContent: 'center', 
    gap: '20px', 
    marginBottom: '40px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
  },
  selectGroup: { display: 'flex', flexDirection: 'column', gap: '5px' },
  label: { fontSize: '0.8rem', fontWeight: 'bold', color: '#7f8c8d', marginLeft: '5px' },
  select: {
    padding: '10px 15px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '0.95rem',
    backgroundColor: '#fff',
    cursor: 'pointer',
    minWidth: '200px',
    outline: 'none',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
  },
  
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '25px'
  },
  loader: { textAlign: 'center', padding: '50px', color: '#95a5a6' }
};