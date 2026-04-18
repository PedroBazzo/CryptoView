import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    window.location.href = "/login";
  }

  return (
    <nav style={{ marginBottom: "20px" }}>
      {/* 🏠 Sempre visível */}
      <Link to="/">Home</Link> |{" "}

      {user && (
        <>
          <Link to="/dashboard">Dashboard</Link> |{" "}
          <Link to="/history">Histórico</Link> |{" "}
          <Link to="/news">Notícias</Link> |{" "}
          <Link to="/profile">Perfil</Link> |{" "}
          <button onClick={handleLogout}>Logout</button>
        </>
      )}

      {!user && (
        <>
          <Link to="/login">Login</Link> |{" "}
          <Link to="/register">Criar Conta</Link>
        </>
      )}
    </nav>
  );
}