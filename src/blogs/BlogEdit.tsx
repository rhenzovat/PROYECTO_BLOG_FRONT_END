import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { blogService } from "./blogService";

export default function BlogEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Inicializamos el estado con los campos que el usuario puede editar
  const [blogData, setBlogData] = useState({ 
    title: "", 
    content: "", 
    category: "JAVA" 
  });

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const data = await blogService.getById(Number(id));
        // Solo guardamos lo que necesitamos editar para no enviar basura al backend
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
    try {
      // Enviamos el ID y el objeto con los datos modificados
      await blogService.update(Number(id), blogData);
      alert("¡Blog actualizado correctamente!");
      navigate("/");
    } catch (err) {
      alert("Error al actualizar: Verifica tus permisos o los datos.");
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2 style={{ borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>✏️ Editar Blog</h2>
      
      <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        
        <div>
          <label style={{ fontWeight: 'bold' }}>Título:</label>
          <input 
            style={styles.input}
            value={blogData.title} 
            onChange={e => setBlogData({...blogData, title: e.target.value})} 
            required
          />
        </div>

        <div>
          <label style={{ fontWeight: 'bold' }}>Contenido:</label>
          <textarea 
            style={{ ...styles.input, height: '200px', resize: 'vertical' }}
            value={blogData.content} 
            onChange={e => setBlogData({...blogData, content: e.target.value})} 
            required
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button type="submit" style={{ ...styles.btn, backgroundColor: '#3498db' }}>
            Guardar Cambios
          </button>

          <button 
            type="button" 
            onClick={() => navigate("/")} 
            style={{ ...styles.btn, backgroundColor: '#95a5a6' }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  input: {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box' as 'border-box'
  },
  btn: {
    flex: 1,
    padding: '12px',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold' as 'bold'
  }
};