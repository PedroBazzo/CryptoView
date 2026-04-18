import useAuth from "../hooks/useAuth";

export default function Profile() {
  const { user, logout } = useAuth();

  if (!user) {
    return <p>Usuário não logado</p>;
  }

  function handleLogout() {
    logout();
    window.location.href = "/login";
  }

  return (
    <div>
      <h1>Perfil</h1>

      <p>Email: {user.email}</p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}