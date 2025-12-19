import { useAuth } from "../auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  const isAdmin = user.role === "ADMIN" || user.role === "ROLE_ADMIN";

  return (
    <nav style={navStyles.nav}>
      <div style={navStyles.leftSection}>
        <Link to="/" style={navStyles.brand}>
          <span style={{ fontSize: '1.5rem' }}>🚀</span> BlogApp
        </Link>
        <div style={navStyles.mainLinks}>
          <Link to="/" style={navStyles.link}>Inicio</Link>
          <Link to="/create" style={navStyles.link}>Crear Post</Link>
          {isAdmin && (
            <Link to="/usuarios" style={navStyles.adminBadge}>
              Gestionar Usuarios
            </Link>
          )}
        </div>
      </div>

      <div style={navStyles.userSection}>
        <div style={navStyles.userInfo}>
          <span style={navStyles.userName}>{user.username}</span>
          <span style={isAdmin ? navStyles.roleAdmin : navStyles.roleUser}>
            {user.role}
          </span>
        </div>
        <button onClick={handleLogout} style={navStyles.logoutBtn}>
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
}

const navStyles: any = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 40px',
    height: '70px',
    backgroundColor: '#1a202c', // Gris muy oscuro/negro moderno
    color: 'white',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
  },
  leftSection: { display: 'flex', alignItems: 'center', gap: '40px' },
  brand: { 
    fontSize: '1.3rem', 
    fontWeight: 'bold', 
    color: 'white', 
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  mainLinks: { display: 'flex', alignItems: 'center', gap: '25px' },
  link: { 
    color: '#cbd5e0', 
    textDecoration: 'none', 
    fontSize: '0.95rem', 
    fontWeight: '500',
    transition: 'color 0.2s'
  },
  adminBadge: {
    backgroundColor: '#ecc94b',
    color: '#1a202c',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    textDecoration: 'none'
  },
  userSection: { display: 'flex', alignItems: 'center', gap: '20px' },
  userInfo: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end' },
  userName: { fontSize: '0.9rem', fontWeight: 'bold' },
  roleAdmin: { fontSize: '0.75rem', color: '#f6ad55', fontWeight: 'bold' },
  roleUser: { fontSize: '0.75rem', color: '#63b3ed', fontWeight: 'bold' },
  logoutBtn: {
    backgroundColor: '#e53e3e',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '0.85rem',
    transition: 'background 0.2s'
  }
};