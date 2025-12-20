import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";
// import { useAuth } from "./AuthContext";

export default function ProtectedRoute({
  children,
  role,
}: {
  children: JSX.Element;
  role?: string;
}) {
  const { user } = useAuth();

  // 1. Si no hay usuario, al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Si hay rol requerido y el usuario no lo tiene
  // Nota: Si en tu base de datos el rol es "ROLE_ADMIN", aquí debes comparar contra eso
  if (role && user.role !== role) {
    return <Navigate to="/" replace />; // Redirigir al inicio si no es admin
  }

  return children;
}