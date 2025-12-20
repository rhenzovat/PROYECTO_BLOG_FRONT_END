import { useState } from "react";
import api from "../../api/axios";

export default function CommentSection({ blogId, comments, onCommentAdded }: any) {
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // 1. Obtenemos el usuario para validar permisos
  const userJson = localStorage.getItem("user");
  const currentUser = userJson ? JSON.parse(userJson) : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      if (editingId) {
        // Lógica para EDITAR (Punto 5)
        await api.put(`api/blogs/${blogId}/comments/${editingId}`, { content: text });
        setEditingId(null);
      } else {
        // Lógica para CREAR (Punto 4)
        await api.post(`api/blogs/${blogId}/comments`, { content: text });
      }
      setText("");
      onCommentAdded(); // Refresca la lista en el componente padre
    } catch (err) {
      alert("Error al procesar el comentario. Verifica tu sesión.");
    }
  };

  const handleDelete = async (commentId: number) => {
    if (!window.confirm("¿Estás seguro de eliminar este comentario?")) return;
    try {
      await api.delete(`api/blogs/${blogId}/comments/${commentId}`);
      onCommentAdded();
    } catch (err) {
      alert("No tienes permisos o el comentario ya no existe.");
    }
  };

  return (
    <div style={{ marginTop: '30px' }}>
      <h4>💬 Comentarios ({comments?.length || 0})</h4>
      
      {/* Formulario Dinámico: Sirve para crear y editar */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <textarea 
          value={text} 
          onChange={e => setText(e.target.value)}
          placeholder={editingId ? "Editando comentario..." : "Escribe un comentario..."}
          style={{...styles.textarea, borderColor: editingId ? '#3498db' : '#ddd'}}
        />
        <div style={{ marginTop: '10px' }}>
          <button type="submit" style={styles.btn}>
            {editingId ? "Actualizar Comentario" : "Enviar Comentario"}
          </button>
          {editingId && (
            <button 
              type="button" 
              onClick={() => { setEditingId(null); setText(""); }}
              style={{ marginLeft: '10px', cursor: 'pointer' }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Lista de Comentarios */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {comments && comments.length > 0 ? (
          comments.map((c: any) => {
            // Validación de permisos
            const isOwner = currentUser?.username === c.authorUsername;
            const isAdmin = currentUser?.role === 'ADMIN' || currentUser?.role === 'ROLE_ADMIN';

            return (
              <div key={c.id} style={styles.commentCard}>
                <div style={styles.commentHeader}>
                  <div>
                    <strong>👤 {c.authorUsername}</strong>
                    <span style={{ fontSize: '0.75rem', color: '#888', marginLeft: '10px' }}>
                      {c.createdAt ? new Date(c.createdAt).toLocaleString() : 'Reciente'}
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {/* Botón Editar: Solo el dueño */}
                    {isOwner && (
                      <button 
                        onClick={() => { setEditingId(c.id); setText(c.content); }} 
                        style={styles.iconBtn}
                        title="Editar"
                      >
                        ✏️
                      </button>
                    )}
                    
                    {/* Botón Borrar: Dueño o Admin */}
                    {(isOwner || isAdmin) && (
                      <button 
                        onClick={() => handleDelete(c.id)} 
                        style={styles.deleteBtn}
                        title="Eliminar"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                </div>
                <p style={{ margin: '8px 0 0 0', color: '#333' }}>{c.content}</p>
              </div>
            );
          })
        ) : (
          <p style={{ color: '#888', fontStyle: 'italic' }}>No hay comentarios aún.</p>
        )}
      </div>
    </div>
  );
}

const styles: any = {
  textarea: { width: '100%', height: '70px', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '14px', resize: 'none' },
  btn: { padding: '8px 15px', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  commentCard: { padding: '12px', backgroundColor: '#f9f9f9', borderRadius: '6px', borderLeft: '4px solid #3498db' },
  commentHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '5px' },
  iconBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' },
  deleteBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#e74c3c' }
};