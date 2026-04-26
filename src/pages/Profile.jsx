import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <>
        <Navbar />
        <main style={{ padding: "20px" }}>
          <h1>Perfil</h1>
          <p>Usuário não logado</p>
        </main>
        <Footer />
      </>
    );
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <>
      <Navbar />

      <main
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="profile-card">
          <h1>Perfil</h1>

          <div className="profile-info">
            <div>
              <span>Usuário</span>
              <p>{user.username}</p>
            </div>

            <div>
              <span>Nome</span>
              <p>{user.name}</p>
            </div>

            <div>
              <span>Sobrenome</span>
              <p>{user.lastname}</p>
            </div>

            <div>
              <span>Email</span>
              <p>{user.email}</p>
            </div>
          </div>

          <button className="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
}