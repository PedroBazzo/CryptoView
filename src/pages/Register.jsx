import { useState } from "react";
import useAuth from "../hooks/useAuth";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Captcha from "../components/Captcha";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    name: "",
    lastname: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  const [captchaValid, setCaptchaValid] = useState(false);
  const [captchaRefresh, setCaptchaRefresh] = useState(0);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function refreshCaptcha() {
    setCaptchaRefresh((prev) => prev + 1);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.username ||
      !form.name ||
      !form.lastname ||
      !form.email ||
      !form.confirmEmail ||
      !form.password ||
      !form.confirmPassword
    ) {
      alert("Preencha todos os campos");
      refreshCaptcha();
      return;
    }

    if (form.email !== form.confirmEmail) {
      alert("Os emails não coincidem");
      refreshCaptcha();
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("As senhas não coincidem");
      refreshCaptcha();
      return;
    }

    if (!captchaValid) {
      alert("Captcha inválido");
      refreshCaptcha();
      return;
    }

    try {
      register(form);

      await emailjs.send(
        "service_p0979tg",
        "template_znvq3pw",
        {
          to_email: form.email,
          message: "Conta criada com sucesso!",
        },
        "RbfIwEzN010iGJQfv"
      );

      alert("Conta criada com sucesso!");
      navigate("/");

    } catch (err) {
      alert(err.message);
      refreshCaptcha();
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
          <h1>Criar Conta</h1>

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
              name="username"
              placeholder="Nome de usuário"
              onChange={handleChange}
              className="input"
              required
            />

            <input
              name="name"
              placeholder="Nome"
              onChange={handleChange}
              className="input"
              required
            />

            <input
              name="lastname"
              placeholder="Sobrenome"
              onChange={handleChange}
              className="input"
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              className="input"
              required
            />

            <input
              name="confirmEmail"
              type="email"
              placeholder="Confirmar email"
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

            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirmar senha"
              onChange={handleChange}
              className="input"
              required
            />

            <Captcha
              onValidate={setCaptchaValid}
              refresh={captchaRefresh}
            />

            <button type="submit" className="button">
              Cadastrar
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}