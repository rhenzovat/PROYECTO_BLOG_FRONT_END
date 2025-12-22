import { useState } from "react";
import { authService } from "./authService";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Limpiar errores

    if (password !== confirmPassword) {
      return setError("Las contraseñas no coinciden");
    }
    
    setLoading(true);
    try {
      await authService.register(username, password);
      alert("✅ Cuenta creada con éxito. Ahora puedes iniciar sesión.");
      navigate("/login");
    } catch (err: any) {
      // 🔍 Esto nos dirá qué salió mal en la consola (F12)
      console.error("Error completo:", err);
      const msg = err.response?.data?.message || "El usuario ya existe o los datos son inválidos.";
      setError(`Error: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <header style={{textAlign: 'center', marginBottom: '30px'}}>
          <span style={{fontSize: '3rem'}}>📚</span>
          <h2 style={styles.title}>Crear Cuenta</h2>
          <p style={styles.subtitle}>Regístrate para empezar a escribir</p>
        </header>

        <form onSubmit={handleRegister} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Usuario</label>
            <input 
              style={styles.input}
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Contraseña</label>
            <input 
              type="password"
              style={styles.input}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirmar Contraseña</label>
            <input 
              type="password"
              style={styles.input}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && <p style={styles.errorMsg}>⚠️ {error}</p>}

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Registrando..." : "Crear mi cuenta"}
          </button>
        </form>

        <div style={styles.footer}>
          <p>¿Ya tienes cuenta? <Link to="/login" style={{color: '#3182ce', fontWeight: 'bold', textDecoration: 'none'}}>Inicia Sesión</Link></p>
        </div>
      </div>
    </div>
  );
}

// --- ESTILOS REUTILIZADOS DEL LOGIN ---
const styles: any = {
  container: {
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    minHeight: '100vh', backgroundColor: '#f8fafc',
    backgroundImage: 'radial-gradient(#cbd5e0 0.5px, transparent 0.5px)',
    backgroundSize: '20px 20px',
  },
  card: {
    backgroundColor: 'white', padding: '40px', borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px',
  },
  title: { margin: '0 0 5px 0', color: '#1a202c', fontSize: '1.6rem', fontWeight: 'bold' },
  subtitle: { margin: '0 0 30px 0', color: '#718096', fontSize: '0.9rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '18px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '0.85rem', fontWeight: 'bold', color: '#4a5568', textAlign: 'left' },
  input: {
    padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0',
    fontSize: '1rem', backgroundColor: '#f1f5f9', outline: 'none'
  },
  button: {
    padding: '14px', marginTop: '10px', backgroundColor: '#2d3748',
    color: 'white', border: 'none', borderRadius: '8px',
    fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer'
  },
  errorMsg: { color: '#e53e3e', fontSize: '0.85rem', textAlign: 'center', fontWeight: '500' },
  footer: { marginTop: '25px', fontSize: '0.8rem', color: '#a0aec0', textAlign: 'center' }
};