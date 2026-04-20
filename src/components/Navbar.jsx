import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav style={{ marginBottom: "20px" }}>
      <Link to="/">Home</Link> |{" "}
      <Link to="/dashboard">Dashboard</Link> |{" "}
      <Link to="/news">Notícias</Link> |{" "}

      {user && (
        <>
          <Link to="/history">Histórico</Link> |{" "} 
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