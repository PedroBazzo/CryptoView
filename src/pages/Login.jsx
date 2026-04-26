import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Captcha from "../components/Captcha";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const [captchaValid, setCaptchaValid] = useState(false);
  const [captchaRefresh, setCaptchaRefresh] = useState(0);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // 🔥 regeneração robusta
  function refreshCaptcha() {
    setCaptchaRefresh((prev) => prev + 1);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.identifier || !form.password) {
      alert("Preencha todos os campos");
      refreshCaptcha();
      return;
    }

    if (!captchaValid) {
      alert("Captcha inválido");
      refreshCaptcha();
      return;
    }

    try {
      login(form.identifier, form.password);
      navigate("/");
    } catch (err) {
      alert(err.message);
      refreshCaptcha(); // 🔥 erro também regenera
    }
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
          <h1>Login</h1>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginTop: "15px",
            }}
          >
            <input
              name="identifier"
              placeholder="Email ou usuário"
              onChange={handleChange}
              className="input"
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Senha"
              onChange={handleChange}
              className="input"
              required
            />

            {/* 🔐 CAPTCHA NOVO */}
            <Captcha
              onValidate={setCaptchaValid}
              refresh={captchaRefresh}
            />

            <button type="submit" className="button">
              Entrar
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}