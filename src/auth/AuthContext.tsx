// src/auth/AuthContext.tsx
import { createContext, useContext, useState } from "react";

type User = {
  username: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      // Decodificamos el payload del JWT
      const payload = JSON.parse(atob(token.split(".")[1]));
      
      return {
        username: payload.sub,
        role: payload.role, 
      };
    } catch (error) {
      console.error("Token inválido", error);
      localStorage.removeItem("token");
      return null;
    }
  });

  const login = (token: string) => {
    localStorage.setItem("token", token);
    const payload = JSON.parse(atob(token.split(".")[1]));
    setUser({
      username: payload.sub,
      role: payload.role,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ⬇️ ESTA ES LA PARTE QUE FALTABA ⬇️
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};