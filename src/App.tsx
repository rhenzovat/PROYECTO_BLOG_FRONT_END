import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./auth/LoginPage";
import BlogHome from "./blogs/BlogHome";
import AdminPanel from "./admin/AdminPanel";
import ProtectedRoute from "./auth/ProtectedRoute";
import BlogCreate from "./blogs/BlogCreate";
import BlogEdit from "./blogs/BlogEdit";
import BlogDetail from "./blogs/BlogDetail";
import UserList from "./blogs/UserList";

export default function App() {
  return (
    <BrowserRouter>
      {/* La Navbar se renderiza siempre, pero solo muestra contenido si hay un usuario */}
      <Navbar />

      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <BlogHome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <BlogCreate />
            </ProtectedRoute>
          }
        />

        <Route path="/blog/:id" element={<BlogDetail />} /> {/* Público: cualquiera lee */}
<Route path="/edit/:id" element={
  <ProtectedRoute>
    <BlogEdit />
  </ProtectedRoute>
} />

      <Route path="/usuarios" element={<UserList />} />
      </Routes>
    </BrowserRouter>
  );
}
