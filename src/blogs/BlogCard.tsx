import type { BlogHome } from "../types/Blog";
import { useAuth } from "../auth/AuthContext";
import { blogService } from "./blogService";
import { useNavigate } from "react-router-dom";

interface BlogCardProps {
  blog: BlogHome;
}

export default function BlogCard({ blog }: BlogCardProps) {
  const { user } = useAuth(); // Obtenemos el usuario logueado
  const navigate = useNavigate();

  // Lógica de permisos
  // Comparamos el username del token con el author que viene del backend
  const isOwner = user?.username === blog.author;
  const isAdmin = user?.role === "ADMIN";

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const handleDelete = async () => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar "${blog.title}"?`)) {
      try {
        await blogService.delete(blog.id);
        alert("Blog eliminado correctamente");
        window.location.reload(); // Recarga simple para actualizar la lista
      } catch (error) {
        console.error("Error al eliminar", error);
        alert("No tienes permiso para eliminar este blog o hubo un error de red.");
      }
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <span style={styles.categoryTag}>{blog.category}</span>
        <small style={styles.date}>{formatDate(blog.createdAt)}</small>
      </div>

      <h3 style={styles.title}>{blog.title}</h3>

      <div style={styles.footer}>
        <span style={styles.author}>✍️ Por: <strong>{blog.author}</strong></span>
        <span style={styles.comments}>💬 {blog.totalComments} comentarios</span>
      </div>
      
      <div style={styles.buttonContainer}>
        <button 
          style={styles.button}
          onClick={() => console.log("Navegar al blog ID:", blog.id)}
        >
          Leer más
        </button>

        {/* 🛡️ RENDERIZADO CONDICIONAL POR ROL Y AUTORÍA */}
        {(isOwner || isAdmin) && (
          <div style={styles.adminActions}>
            <button 
                style={styles.editBtn} 
                onClick={() => navigate(`/edit/${blog.id}`)}
            >
                ✏️ Editar
            </button>
            <button 
                style={styles.deleteBtn} 
                onClick={handleDelete}
            >
                🗑️ Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  // ... (Tus estilos anteriores se mantienen igual)
  card: {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  header: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px' },
  categoryTag: { backgroundColor: '#e3f2fd', color: '#1976d2', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' as 'bold' },
  date: { color: '#757575' },
  title: { margin: '0 0 12px 0', color: '#212121', fontSize: '1.25rem' },
  footer: { display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#616161', borderTop: '1px solid #f5f5f5', paddingTop: '12px', marginBottom: '12px' },
  author: { fontStyle: 'italic' as 'italic' },
  comments: { fontWeight: '500' as '500' },
  
  // Nuevos estilos
  buttonContainer: { display: 'flex', flexDirection: 'column' as 'column', gap: '8px' },
  button: { backgroundColor: '#1976d2', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' as 'bold' },
  adminActions: { display: 'flex', gap: '8px', marginTop: '4px' },
  editBtn: { flex: 1, backgroundColor: '#f39c12', color: 'white', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer' },
  deleteBtn: { flex: 1, backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer' }
};