import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Footer() {
  const linkStyle = {
    color: "#60a5fa",
    textDecoration: "none",
  };

  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    function checkUser() {
      const currentUser = localStorage.getItem("currentUser");

      const valid =
        currentUser &&
        currentUser !== "undefined" &&
        currentUser !== "null" &&
        currentUser !== "" &&
        currentUser !== "{}";

      setIsLogged(!!valid);
    }

    checkUser();

    window.addEventListener("storage", checkUser);

    return () => {
      window.removeEventListener("storage", checkUser);
    };
  }, []);

  return (
    <footer
      style={{
        marginTop: "40px",
        padding: "20px",
        textAlign: "center",
        background: "#1e3a8a",
        color: "#fff",
        width: "100%", // 🔥 garante largura total
        boxSizing: "border-box", // 🔥 evita overflow
      }}
    >
      <p>© 2026 CryptoView</p>

      <p
        style={{
          marginTop: "10px",
          maxWidth: "600px", // 🔥 evita texto estourar
          marginInline: "auto",
        }}
      >
        Plataforma de acompanhamento e análise de criptomoedas em tempo real.
      </p>

      {/* 🔗 NAVEGAÇÃO */}
      <div
        style={{
          marginTop: "15px",
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          flexWrap: "wrap", // 🔥 quebra linha automático
        }}
      >
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
        <Link to="/news" style={linkStyle}>News</Link>

        {isLogged && (
          <Link to="/history" style={linkStyle}>Histórico</Link>
        )}
      </div>

      <p
        style={{
          marginTop: "15px",
          fontSize: "14px",
          maxWidth: "600px",
          marginInline: "auto",
        }}
      >
        Dados fornecidos por APIs públicas • Atualização em tempo real
      </p>

      <p
        style={{
          marginTop: "10px",
          fontSize: "12px",
          opacity: 0.8,
          maxWidth: "600px",
          marginInline: "auto",
        }}
      >
        As informações fornecidas não constituem aconselhamento financeiro.
      </p>
    </footer>
  );
}