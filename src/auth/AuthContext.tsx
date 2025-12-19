import { createContext, useContext, useState, ReactNode } from "react";

type User = {
  username: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

// EXPORTACIÓN 1: El Hook (Asegúrate de que el nombre sea exacto)
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

// EXPORTACIÓN 2: El Provider
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch {
        return null;
      }
    }
    return null;
  });

  const login = (token: string, userData: User) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}