import { useState } from "react";
import { authService } from "./authService";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom"; // Importar esto

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate(); // Inicializar

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const data = await authService.login(username, password);
      login(data.token); // Esto guarda en localStorage y actualiza el Contexto
      navigate("/");     // Esto nos mueve a la página principal
    } catch (err) {
      setError("Credenciales incorrectas o error de servidor");
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: 300, gap: 10 }}>
        <h2>🔐 Iniciar Sesión</h2>
        <input placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" style={{ padding: 10, cursor: 'pointer' }}>Ingresar</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}