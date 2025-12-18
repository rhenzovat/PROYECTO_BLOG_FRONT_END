import { useAuth } from "../auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Limpia el localStorage y el estado del usuario
    navigate("/login"); // Te manda al login inmediatamente
  };

  // Si no hay usuario logueado, no mostramos la barra (opcional)
  if (!user) return null;

  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>
        <Link to="/" style={styles.link}>📰 BlogApp</Link>
      </div>
      
      <div style={styles.links}>
        <Link to="/" style={styles.link}>🏠 Inicio</Link>
        <Link to="/create" style={styles.link}>➕ Crear Post</Link> {/* NUEVO BOTÓN */}
        {user.role === "ADMIN" && (
            <Link to="/admin" style={styles.link}>🛠️ Admin</Link>
        )}
        </div>

      <div style={styles.menu}>
        {/* Solo el ADMIN ve el Panel de Control */}
        {user.role === "ADMIN" && (
          <Link to="/admin" style={styles.link}>🛠️ Admin Panel</Link>
        )}
        
        <div style={styles.userSection}>
          <span style={styles.userInfo}>
            👤 <strong>{user.username}</strong> ({user.role})
          </span>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Cerrar Sesión
          </button>
        </div>
      </div>

      
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#2c3e50',
    color: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  brand: { fontSize: '1.5rem', fontWeight: 'bold' },
  menu: { display: 'flex', alignItems: 'center', gap: '20px' },
  link: { color: 'white', textDecoration: 'none', fontWeight: '500' },
  userSection: { display: 'flex', alignItems: 'center', gap: '15px', borderLeft: '1px solid #555', paddingLeft: '15px' },
  userInfo: { fontSize: '0.9rem' },
  logoutBtn: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};