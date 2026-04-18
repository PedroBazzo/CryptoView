import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <p>Usuário não logado</p>;
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div>
      <h1>Perfil</h1>
      <p>Email: {user.email}</p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}