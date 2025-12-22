import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function UserList() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("api/users")
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al cargar usuarios", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={styles.loader}>Cargando panel de administración...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>👥 Gestión de Usuarios</h2>
        <span style={styles.badgeCount}>{users.length} Usuarios registrados</span>
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Nombre de Usuario</th>
              <th style={styles.th}>Rol de Sistema</th>
              <th style={styles.th}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} style={styles.tr}>
                <td style={styles.td}>#{u.id}</td>
                <td style={{ ...styles.td, fontWeight: 'bold' }}>{u.username}</td>
                <td style={styles.td}>
                  <span style={u.role === 'ADMIN' || u.role === 'ROLE_ADMIN' ? styles.adminTag : styles.userTag}>
                    {u.role}
                  </span>
                </td>
                <td style={styles.td}>
                  <span style={styles.activeDot}></span> Activo
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles: any = {
  container: { padding: '40px', maxWidth: '900px', margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  title: { margin: 0, color: '#2c3e50', fontSize: '1.8rem' },
  badgeCount: { backgroundColor: '#34495e', color: 'white', padding: '5px 12px', borderRadius: '20px', fontSize: '0.8rem' },
  tableWrapper: { backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { backgroundColor: '#f8f9fa', padding: '15px', textAlign: 'left', borderBottom: '2px solid #dee2e6', color: '#7f8c8d', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px' },
  td: { padding: '15px', borderBottom: '1px solid #eee', color: '#333', fontSize: '0.95rem' },
  tr: { transition: 'background 0.2s' },
  adminTag: { backgroundColor: '#f1c40f', color: '#000', padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' },
  userTag: { backgroundColor: '#3498db', color: 'white', padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' },
  activeDot: { height: '10px', width: '10px', backgroundColor: '#2ecc71', borderRadius: '50%', display: 'inline-block', marginRight: '5px' },
  loader: { textAlign: 'center', marginTop: '50px', fontSize: '1.2rem', color: '#666' }
};