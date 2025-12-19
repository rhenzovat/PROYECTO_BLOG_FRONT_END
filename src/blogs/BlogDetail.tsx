import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { blogService } from "./blogService";
import CommentSection from "./CommentSection"; // 👈 Asegúrate de importarlo

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<any>(null);

  const fetchBlog = async () => {
    try {
      const data = await blogService.getById(Number(id));
      console.log("Datos del blog recibidos:", data); // 👀 Revisa la consola para ver si trae .comments
      setBlog(data);
    } catch (err) {
      alert("Error al cargar el blog");
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  if (!blog) return <h2>Cargando...</h2>;

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
      <button onClick={() => navigate("/")} style={styles.backBtn}>← Volver</button>
      
      <h1>{blog.title}</h1>
      <p><em>Por: {blog.author}</em> | Categoría: <strong>{blog.category}</strong></p>
      <hr />
      
      <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', marginBottom: '40px' }}>
        {blog.content}
      </div>

      {/* 💬 SECCIÓN DE COMENTARIOS (Punto 4) */}
      <div style={styles.commentContainer}>
        <CommentSection 
          blogId={blog.id} 
          comments={blog.comments || []} // Si no hay comentarios, pasa una lista vacía
          onCommentAdded={fetchBlog}     // Esta función recarga el blog para ver el nuevo comentario
        />
      </div>
    </div>
  );
}

const styles = {
  backBtn: { padding: '8px 12px', cursor: 'pointer', marginBottom: '20px' },
  commentContainer: { marginTop: '50px', borderTop: '2px solid #eee', paddingTop: '20px' }
};