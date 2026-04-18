import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    localStorage.setItem("user", JSON.stringify({ email }));
    alert("Login realizado!");
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        placeholder="Digite seu email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}