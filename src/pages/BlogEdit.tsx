import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { blogService } from "../features/blogs/blogService";
import { Category } from "../types/Blog";

export default function BlogEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [blogData, setBlogData] = useState({ 
    title: "", 
    content: "", 
    category: "JAVA" 
  });

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const data = await blogService.getById(Number(id));
        setBlogData({
          title: data.title,
          content: data.content,
          category: data.category
        });
      } catch (err) {
        alert("No se pudo cargar el blog");
        navigate("/");
      }
    };
    loadBlog();
  }, [id, navigate]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await blogService.update(Number(id), blogData);
      alert("✅ ¡Blog actualizado correctamente!");
      navigate("/");
    } catch (err) {
      alert("Error al actualizar: Verifica tus permisos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Cabecera idéntica a Create pero con icono de edición */}
        <header style={styles.header}>
          <span style={{ fontSize: '3rem' }}>✏️</span>
          <h2 style={styles.title}>Editar artículo</h2>
          <p style={styles.subtitle}>
            Modifica los detalles de tu publicación con el ID: <strong>{id}</strong>
          </p>
        </header>

        <form onSubmit={handleUpdate} style={styles.form}>
          {/* Campo: Título */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Título del Blog</label>
            <input 
              style={styles.input}
              value={blogData.title} 
              onChange={e => setBlogData({...blogData, title: e.target.value})} 
              required 
              placeholder="Ej: Microservicios con Spring Boot"
            />
          </div>

          {/* Campo: Categoría */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Categoría Técnica</label>
            <select 
              style={styles.select}
              value={blogData.category} 
              onChange={e => setBlogData({...blogData, category: e.target.value})}
            >
              {Object.values(Category).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Campo: Contenido */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Contenido del Artículo</label>
            <textarea 
              style={styles.textarea}
              value={blogData.content} 
              onChange={e => setBlogData({...blogData, content: e.target.value})} 
              required 
              placeholder="Escribe aquí el cuerpo de tu blog..."
            />
          </div>

          {/* Botones de Acción */}
          <div style={styles.buttonGroup}>
            <button 
              type="button" 
              onClick={() => navigate("/")} 
              style={styles.cancelBtn}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={loading} 
              style={styles.submitBtn}
            >
              {loading ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Reutilizamos exactamente los mismos estilos para que la App sea coherente
const styles: any = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '90vh',
    backgroundColor: '#f8fafc',
    backgroundImage: 'radial-gradient(#cbd5e0 0.5px, transparent 0.5px)',
    backgroundSize: '20px 20px',
    padding: '40px 20px',
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
    width: '100%',
    maxWidth: '700px',
  },
  header: { textAlign: 'center', marginBottom: '35px' },
  title: { fontSize: '1.8rem', color: '#1a202c', margin: '10px 0 5px 0', fontWeight: 'bold' },
  subtitle: { fontSize: '0.95rem', color: '#718096' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '0.9rem', fontWeight: 'bold', color: '#4a5568', marginLeft: '2px' },
  input: {
    padding: '12px 16px',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    fontSize: '1rem',
    backgroundColor: '#f1f5f9',
    outline: 'none',
  },
  select: {
    padding: '12px 16px',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    fontSize: '1rem',
    backgroundColor: '#f1f5f9',
    cursor: 'pointer',
    outline: 'none',
  },
  textarea: {
    padding: '16px',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    fontSize: '1rem',
    backgroundColor: '#f1f5f9',
    minHeight: '200px',
    resize: 'vertical',
    outline: 'none',
    fontFamily: 'inherit',
  },
  buttonGroup: { display: 'flex', gap: '15px', marginTop: '10px' },
  submitBtn: {
    flex: 2,
    padding: '14px',
    backgroundColor: '#3498db', // Un color azul para diferenciarlo de "Crear"
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  cancelBtn: {
    flex: 1,
    padding: '14px',
    backgroundColor: '#edf2f7',
    color: '#4a5568',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
  }
};