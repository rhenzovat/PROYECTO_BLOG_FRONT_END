import type { BlogHome } from "../types/Blog";
import { useAuth } from "../auth/AuthContext";
import { blogService } from "./blogService";
import { useNavigate } from "react-router-dom";

interface BlogCardProps {
  blog: BlogHome;
}

export default function BlogCard({ blog }: BlogCardProps) {
  const { user } = useAuth(); 
  const navigate = useNavigate();

  const isOwner = user?.username?.trim() === blog.author?.trim();
  const isAdmin = user?.role === "ADMIN" || user?.role === "ROLE_ADMIN";

  // Genera una imagen según la categoría o una por defecto
  const getImageUrl = (category: string) => {
    const cat = category?.toLowerCase();
    if (cat?.includes("java")) return "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=200&fit=crop";
    if (cat?.includes("angular")) return "https://images.unsplash.com/photo-1550439062-609e1531270e?w=400&h=200&fit=crop";
    if (cat?.includes("spring")) return "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=200&fit=crop";
    return `https://picsum.photos/seed/${blog.id}/400/200`;
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`¿Estás seguro de eliminar "${blog.title}"?`)) {
      try {
        await blogService.delete(blog.id);
        window.location.reload(); 
      } catch (error) {
        alert("No tienes permisos.");
      }
    }
  };

  return (
    <div style={styles.card} onClick={() => navigate(`/blog/${blog.id}`)}>
      {/* Imagen Superior */}
      <img src={getImageUrl(blog.category)} alt="post cover" style={styles.image} />
      
      <div style={styles.content}>
        <div style={styles.header}>
          <span style={styles.categoryTag}>{blog.category}</span>
        </div>

        <h3 style={styles.title}>{blog.title}</h3>

        <div style={styles.footer}>
          <span>👤 <strong>{blog.author}</strong></span>
          <span>💬 {blog.totalComments || 0}</span>
        </div>
        
        <div style={styles.actions}>
          <button style={styles.readBtn}>Leer artículo</button>

          {(isOwner || isAdmin) && (
            <div style={styles.adminButtons}>
              <button 
                onClick={(e) => { e.stopPropagation(); navigate(`/edit/${blog.id}`); }} 
                style={styles.editBtn}
              >✏️</button>
              <button onClick={handleDelete} style={styles.deleteBtn}>🗑️</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles: any = {
  card: { 
    borderRadius: '12px', 
    backgroundColor: '#fff', 
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    border: 'none'
  },
  image: { width: '100%', height: '160px', objectFit: 'cover' },
  content: { padding: '15px', display: 'flex', flexDirection: 'column', flex: 1 },
  header: { marginBottom: '10px' },
  categoryTag: { 
    backgroundColor: '#e8f4fd', 
    color: '#1d9bf0', 
    padding: '4px 10px', 
    borderRadius: '20px', 
    fontSize: '0.75rem', 
    fontWeight: 'bold' 
  },
  title: { margin: '0 0 15px 0', fontSize: '1.1rem', color: '#333', height: '2.4em', overflow: 'hidden' },
  footer: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    fontSize: '0.8rem', 
    color: '#777', 
    marginBottom: '15px',
    borderTop: '1px solid #eee',
    paddingTop: '10px'
  },
  actions: { display: 'flex', gap: '8px', marginTop: 'auto' },
  readBtn: { 
    flex: 2, 
    padding: '10px', 
    cursor: 'pointer', 
    backgroundColor: '#007bff', 
    color: 'white', 
    border: 'none', 
    borderRadius: '6px', 
    fontWeight: 'bold' 
  },
  adminButtons: { display: 'flex', gap: '5px' },
  editBtn: { backgroundColor: '#ffc107', border: 'none', borderRadius: '6px', padding: '8px', cursor: 'pointer' },
  deleteBtn: { backgroundColor: '#dc3545', border: 'none', borderRadius: '6px', padding: '8px', cursor: 'pointer' }
};