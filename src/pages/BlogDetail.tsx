import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CommentSection from "../features/blogs/CommentSection"; 
import { blogService } from "../features/blogs/blogService";

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<any>(null);

  const fetchBlog = async () => {
    try {
      const data = await blogService.getById(Number(id));
      setBlog(data);
    } catch (err) {
      alert("Error al cargar el blog");
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  if (!blog) return (
    <div style={styles.loaderContainer}>
      <div style={styles.loader}>Cargando artículo...</div>
    </div>
  );

  return (
    <div style={styles.pageBackground}>
      <div style={styles.container}>
        {/* Botón Volver */}
        <button onClick={() => navigate("/")} style={styles.backBtn}>
          ← Volver al inicio
        </button>

        <article style={styles.articleCard}>
          {/* Cabecera del Artículo */}
          <header style={styles.header}>
            <span style={styles.categoryBadge}>{blog.category}</span>
            <h1 style={styles.mainTitle}>{blog.title}</h1>
            
            <div style={styles.metaInfo}>
              <div style={styles.authorCircle}>
                {blog.author?.charAt(0).toUpperCase() || "A"}
              </div>
              <div style={styles.authorDetails}>
                <span style={styles.authorName}>Escrito por {blog.author}</span>
                <span style={styles.dateText}>Publicado recientemente</span>
              </div>
            </div>
          </header>

          <hr style={styles.divider} />

          {/* Cuerpo del Artículo */}
          <div style={styles.contentBody}>
            {blog.content}
          </div>

          {/* Sección de Comentarios */}
          <footer style={styles.commentSection}>
            <h3 style={styles.commentTitle}>💬 Conversación</h3>
            <div style={styles.commentBox}>
              <CommentSection 
                blogId={blog.id} 
                comments={blog.comments || []} 
                onCommentAdded={fetchBlog} 
              />
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}

// --- ESTILOS DE LECTURA EDITORIAL ---
const styles: any = {
  pageBackground: {
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    padding: '40px 20px',
    backgroundImage: 'radial-gradient(#cbd5e0 0.5px, transparent 0.5px)',
    backgroundSize: '20px 20px',
  },
  container: {
    maxWidth: '850px',
    margin: '0 auto',
  },
  backBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#64748b',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    transition: 'color 0.2s',
  },
  articleCard: {
    backgroundColor: 'white',
    padding: '60px',
    borderRadius: '20px',
    boxShadow: '0 4px 25px rgba(0,0,0,0.05)',
  },
  header: {
    textAlign: 'left',
    marginBottom: '30px',
  },
  categoryBadge: {
    backgroundColor: '#ebf8ff',
    color: '#3182ce',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  mainTitle: {
    fontSize: '2.5rem',
    color: '#1a202c',
    margin: '20px 0',
    lineHeight: '1.2',
    fontWeight: '800',
  },
  metaInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginTop: '25px',
  },
  authorCircle: {
    width: '45px',
    height: '45px',
    backgroundColor: '#2d3748',
    color: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
  authorDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
  authorName: {
    fontWeight: 'bold',
    color: '#2d3748',
    fontSize: '1rem',
  },
  dateText: {
    color: '#a0aec0',
    fontSize: '0.85rem',
  },
  divider: {
    border: 'none',
    borderTop: '1px solid #edf2f7',
    margin: '40px 0',
  },
  contentBody: {
    fontSize: '1.15rem',
    lineHeight: '1.8', // Espaciado mayor para lectura fácil
    color: '#4a5568',
    whiteSpace: 'pre-wrap',
    marginBottom: '60px',
    textAlign: 'justify' as 'justify',
  },
  commentSection: {
    borderTop: '2px solid #f7fafc',
    paddingTop: '40px',
  },
  commentTitle: {
    fontSize: '1.5rem',
    color: '#2d3748',
    marginBottom: '30px',
    fontWeight: 'bold',
  },
  commentBox: {
    backgroundColor: '#f8fafc',
    padding: '30px',
    borderRadius: '15px',
  },
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
    fontSize: '1.2rem',
    color: '#718096'
  }
};