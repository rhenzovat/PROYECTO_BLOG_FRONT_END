import { useAuth } from "../features/auth/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Para saber en qué página estamos
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  const isAdmin = user.role === "ADMIN" || user.role === "ROLE_ADMIN";
  
  // Función para obtener la inicial del nombre
  const initial = user.username?.charAt(0).toUpperCase() || "U";

  return (
    <nav style={navStyles.nav}>
      <div style={navStyles.leftSection}>
        <Link to="/" style={navStyles.brand}>
          <div style={navStyles.logoIcon}>📖</div>
          <span style={navStyles.brandText}>BlogApp</span>
        </Link>
        
        <div style={navStyles.mainLinks}>
          {[
            { name: "Inicio", path: "/", icon: "🏠" },
            { name: "Crear Blog", path: "/create", icon: "✍️" }
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onMouseEnter={() => setIsHovered(item.name)}
              onMouseLeave={() => setIsHovered(null)}
              style={{
                ...navStyles.link,
                color: location.pathname === item.path || isHovered === item.name ? "#fff" : "#cbd5e0",
                borderBottom: location.pathname === item.path ? "2px solid #63b3ed" : "2px solid transparent"
              }}
            >
              <span style={{ marginRight: '5px' }}>{item.icon}</span>
              {item.name}
            </Link>
          ))}

          {isAdmin && (
            <Link to="/usuarios" style={navStyles.adminBadge}>
              🛡️ Gestionar Usuarios
            </Link>
          )}
        </div>
      </div>

      <div style={navStyles.userSection}>
        <div style={navStyles.userProfile}>
          <div style={navStyles.avatar}>{initial}</div>
          <div style={navStyles.userInfo}>
            <span style={navStyles.userName}>{user.username}</span>
            <span style={isAdmin ? navStyles.roleAdmin : navStyles.roleUser}>
              {isAdmin ? "Administrador" : "Usuario"}
            </span>
          </div>
        </div>
        
        <button 
          onClick={handleLogout} 
          style={navStyles.logoutBtn}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#c53030'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e53e3e'}
        >
          Salir
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
    padding: '0 60px',
    height: '80px',
    backgroundColor: 'rgba(26, 32, 44, 0.95)', // Un toque de transparencia
    backdropFilter: 'blur(10px)', // Efecto cristal
    color: 'white',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    borderBottom: '1px solid rgba(255,255,255,0.1)'
  },
  leftSection: { display: 'flex', alignItems: 'center', gap: '50px' },
  brand: { 
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    transition: 'transform 0.2s'
  },
  logoIcon: {
    fontSize: '1.8rem',
    background: 'rgba(255,255,255,0.1)',
    padding: '8px',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
  },
  brandText: {
    fontSize: '1.5rem',
    fontWeight: '800',
    letterSpacing: '1px',
    color: 'white',
    textTransform: 'uppercase'
  },
  mainLinks: { display: 'flex', alignItems: 'center', gap: '30px' },
  link: { 
    textDecoration: 'none', 
    fontSize: '1rem', 
    fontWeight: '600',
    transition: 'all 0.3s ease',
    padding: '8px 0',
    display: 'flex',
    alignItems: 'center'
  },
  adminBadge: {
    backgroundColor: '#ecc94b',
    color: '#1a202c',
    padding: '8px 18px',
    borderRadius: '12px',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    boxShadow: '0 4px 10px rgba(236, 201, 75, 0.3)',
    transition: 'transform 0.2s'
  },
  userSection: { display: 'flex', alignItems: 'center', gap: '25px' },
  userProfile: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '5px 15px',
    borderRadius: '40px',
    backgroundColor: 'rgba(255,255,255,0.05)'
  },
  avatar: {
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    backgroundColor: '#63b3ed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    color: '#1a202c'
  },
  userInfo: { display: 'flex', flexDirection: 'column' },
  userName: { fontSize: '0.9rem', fontWeight: 'bold', color: '#fff' },
  roleAdmin: { fontSize: '0.7rem', color: '#ecc94b', textTransform: 'uppercase', letterSpacing: '0.5px' },
  roleUser: { fontSize: '0.7rem', color: '#63b3ed', textTransform: 'uppercase', letterSpacing: '0.5px' },
  logoutBtn: {
    backgroundColor: '#e53e3e',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 10px rgba(229, 62, 62, 0.2)'
  }
};