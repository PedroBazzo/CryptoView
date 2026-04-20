import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");

  // 🔢 gerar captcha
  function generateCaptcha() {
    const value = Math.floor(1000 + Math.random() * 9000);
    setCaptcha(value.toString());
  }

  useEffect(() => {
    generateCaptcha();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.identifier || !form.password) {
      alert("Preencha todos os campos");
      return;
    }

    if (captchaInput !== captcha) {
      alert("Captcha incorreto");
      generateCaptcha();
      return;
    }

    try {
      login(form.identifier, form.password);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>

        <input
          name="identifier"
          placeholder="Email ou usuário"
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Senha"
          onChange={handleChange}
          required
        />

        {}
        <div>
          <p>Digite o código: <strong>{captcha}</strong></p>

          <input
            placeholder="Captcha"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            required
          />

          <button type="button" onClick={generateCaptcha}>
            Novo código
          </button>
        </div>

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}