import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  const [dark, setDark] = useState(false);

  function toggleDark() {
    setDark((prev) => {
      const newValue = !prev;

      if (newValue) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      return newValue;
    });
  }

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    cursor: "pointer",
  };

  return (
    <header
      style={{
        position: "relative", // 🔥 IMPORTANTE
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 30px",
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

      {/* 🔥 NAV CENTRALIZADO */}
      <nav
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "20px",
        }}
      >
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
        <Link to="/news" style={linkStyle}>News</Link>

        {user && (
          <Link to="/history" style={linkStyle}>
            Histórico
          </Link>
        )}
      </nav>

      {/* DROPDOWN */}
      <div style={{ position: "relative" }}>
        <button
          onClick={() => setOpen((prev) => !prev)}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: "22px",
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
              top: "40px",
              background: "#1e40af",
              padding: "12px",
              borderRadius: "8px",
              minWidth: "160px",
            }}
          >
            {!user ? (
              <>
                <Link to="/login" style={linkStyle}>Login</Link>
                <br />
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
                    marginBottom: "10px",
                    textAlign: "center",
                  }}
                >
                  {user?.username}
                </Link>

                <button
                  onClick={logout}
                  style={{
                    width: "100%",
                    marginBottom: "10px",
                    cursor: "pointer",
                  }}
                >
                  Logout
                </button>
              </>
            )}

            <hr />

            <button
              onClick={toggleDark}
              style={{
                marginTop: "10px",
                width: "100%",
                cursor: "pointer",
              }}
            >
              {dark ? "Modo Claro" : "Modo Escuro"}
            </button>
          </div>
        )}
      </div>
    </header>
  );
}