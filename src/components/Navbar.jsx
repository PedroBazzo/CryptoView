import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate(); // 🔥 NOVO

  // 🔥 estado persistente
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // 🔥 aplica tema sempre que muda
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  function toggleDark() {
    setDark((prev) => !prev);
  }

  // 🔥 LOGOUT COM REDIRECIONAMENTO
  function handleLogout() {
    logout();
    setOpen(false); // fecha menu mobile
    navigate("/"); // volta pra home
  }

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    cursor: "pointer",
  };

  return (
    <header
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        padding: "15px clamp(15px, 5vw, 30px)",
        alignItems: "center",
        background: "#1e3a8a",
        color: "#fff",
        width: "100%",
      }}
    >
      {/* LOGO */}
      <Link
        to="/"
        style={{
          ...linkStyle,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          zIndex: 2,
        }}
      >
        <img
          src={logo}
          alt="logo"
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "6px",
          }}
        />
        CryptoView
      </Link>

      {/* NAV DESKTOP */}
      <nav className="nav-links">
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
        <Link to="/news" style={linkStyle}>News</Link>

        {user && (
          <Link to="/history" style={linkStyle}>
            Histórico
          </Link>
        )}
      </nav>

      {/* MENU MOBILE */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <button
          onClick={() => setOpen((prev) => !prev)}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: "24px",
            cursor: "pointer",
          }}
        >
          ☰
        </button>

        {open && (
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "50px",
              background: "#1e40af",
              padding: "15px",
              borderRadius: "10px",
              width: "220px",
              boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
            }}
          >
            {/* NAV MOBILE */}
            <div className="mobile-nav">
              <Link to="/" onClick={() => setOpen(false)} style={linkStyle}>Home</Link>
              <Link to="/dashboard" onClick={() => setOpen(false)} style={linkStyle}>Dashboard</Link>
              <Link to="/news" onClick={() => setOpen(false)} style={linkStyle}>News</Link>

              {user && (
                <Link to="/history" onClick={() => setOpen(false)} style={linkStyle}>
                  Histórico
                </Link>
              )}

              <hr />
            </div>

            {!user ? (
              <>
                <Link to="/login" style={linkStyle}>Login</Link><br />
                <Link to="/register" style={linkStyle}>Criar Conta</Link>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  style={{
                    ...linkStyle,
                    fontWeight: "bold",
                    display: "block",
                    textAlign: "center",
                  }}
                >
                  {user?.username}
                </Link>

                <button
                  onClick={handleLogout} // 🔥 AQUI
                  style={{ width: "100%", marginTop: "10px" }}
                >
                  Logout
                </button>
              </>
            )}

            <hr />

            {/* 🌙 TOGGLE */}
            <button onClick={toggleDark} style={{ width: "100%" }}>
              {dark ? "Modo Claro" : "Modo Escuro"}
            </button>
          </div>
        )}
      </div>
    </header>
  );
}