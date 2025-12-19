import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // GET /api/users (Deberías crear este endpoint en tu Java)
    api.get("/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error("No eres admin o error de red"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando panel de control...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>🛠️ Panel de Administración</h1>
      
      <section>
        <h3>👥 Gestión de Usuarios (Punto 8)</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.username}</td>
                <td>{u.role}</td>
                <td>
                  <button style={{color: 'red'}}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

const styles = {
  table: { width: '100%', borderCollapse: 'collapse' as 'collapse', marginTop: '10px' },
  // Agrega bordes y padding a los th y td en tu CSS
};