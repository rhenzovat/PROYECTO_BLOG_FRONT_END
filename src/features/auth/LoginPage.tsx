import { useState } from "react";
import { authService } from "./authService";
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await authService.login(username, password);
      const decoded: any = jwtDecode(data.token);
      
      const userToSave = {
        username: decoded.sub || username,
        role: decoded.role || "USER"
      };

      login(data.token, userToSave); 
      navigate("/");
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.iconContainer}>
          <span style={{ fontSize: '3rem' }}>🔐</span>
        </div>
        
        <h2 style={styles.title}>BlogApp</h2>
        <p style={styles.subtitle}>Ingresa tus credenciales para continuar</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Usuario</label>
            <input 
              style={styles.input}
              placeholder="Tu nombre de usuario" 
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

          {error && <p style={styles.errorMsg}>⚠️ {error}</p>}

          <button type="submit" style={styles.button}>
            Ingresar al Sistema
          </button>
        </form>

        {/* <div style={styles.footer}>
          <p>¿Olvidaste tu contraseña? <span style={{ color: '#3182ce', cursor: 'pointer' }}>Click aquí</span></p>
        </div> */}
        <div style={styles.footer}>
          <p>¿No tienes cuenta? <Link to="/register" style={{color: '#3182ce', fontWeight: 'bold', textDecoration: 'none'}}>Regístrate gratis</Link></p>
        </div>
      </div>
    </div>
  );
}

// --- ESTILOS QUE TRANSFORMAN LA VISTA ---
const styles: any = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f8fafc', 
    backgroundImage: 'radial-gradient(#cbd5e0 0.5px, transparent 0.5px)', 
    backgroundSize: '20px 20px',
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  iconContainer: { marginBottom: '15px' },
  title: { margin: '0 0 5px 0', color: '#1a202c', fontSize: '1.6rem', fontWeight: 'bold' },
  subtitle: { margin: '0 0 30px 0', color: '#718096', fontSize: '0.9rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '18px', textAlign: 'left' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '0.85rem', fontWeight: 'bold', color: '#4a5568' },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    fontSize: '1rem',
    outline: 'none',
    backgroundColor: '#f1f5f9',
    transition: 'all 0.2s'
  },
  button: {
    padding: '14px',
    marginTop: '10px',
    backgroundColor: '#2d3748', 
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  errorMsg: { color: '#e53e3e', fontSize: '0.85rem', textAlign: 'center', fontWeight: '500' },
  footer: { marginTop: '25px', fontSize: '0.8rem', color: '#a0aec0' }
};