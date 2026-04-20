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

      <p><strong>Usuário:</strong> {user.username}</p>
      <p><strong>Nome:</strong> {user.name}</p>
      <p><strong>Sobrenome:</strong> {user.lastname}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}