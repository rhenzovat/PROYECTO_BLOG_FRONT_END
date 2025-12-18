import { useState } from "react";
import { blogService } from "./blogService";
import { useNavigate } from "react-router-dom";
import { Category } from "../types/Blog";
import { useAuth } from "../auth/AuthContext";

export default function BlogCreate() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<string>("JAVA");
  const [loading, setLoading] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // El backend espera título, contenido y categoría. 
      // El autor lo saca del Token en el servidor.
      await blogService.create({ title, content, category });
      alert("🎉 ¡Blog publicado con éxito!");
      navigate("/"); // Redirigir al home tras crear
    } catch (error) {
      console.error("Error al crear el blog:", error);
      alert("Hubo un error al publicar el blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>✍️ Publicar nuevo artículo</h2>
      <p>Publicando como: <strong>{user?.username}</strong></p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <label>Título</label>
        <input 
          style={styles.input}
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
          placeholder="Escribe un título llamativo..."
        />

        <label>Categoría</label>
        <select 
          style={styles.input}
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
        >
          {Object.values(Category).map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <label>Contenido</label>
        <textarea 
          style={{...styles.input, height: '200px'}}
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          required 
          placeholder="Desarrolla tu idea aquí..."
        />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Publicando..." : "Publicar Blog"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: { maxWidth: '700px', margin: '40px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' },
  form: { display: 'flex', flexDirection: 'column' as 'column', gap: '15px' },
  input: { padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem' },
  button: { padding: '12px', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' as 'bold' }
};