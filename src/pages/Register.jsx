import { useState } from "react";
import useAuth from "../hooks/useAuth";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");

  function generateCaptcha() {
    const value = Math.floor(1000 + Math.random() * 9000);
    setCaptcha(value.toString());
  }

  useState(() => {
    generateCaptcha();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.username ||
      !form.name ||
      !form.lastname ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      alert("Preencha todos os campos");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }

    if (captchaInput !== captcha) {
      alert("Captcha incorreto");
      generateCaptcha();
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
    }
  }

  return (
    <div>
      <h1>Criar Conta</h1>

      <form onSubmit={handleSubmit}>

        <input
          name="username"
          placeholder="Nome de usuário"
          onChange={handleChange}
          required
        />

        <input
          name="name"
          placeholder="Nome"
          onChange={handleChange}
          required
        />

        <input
          name="lastname"
          placeholder="Sobrenome"
          onChange={handleChange}
          required
        />

        <input
          name="email"
          placeholder="Email"
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

        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirmar senha"
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
            Gerar novo código
          </button>
        </div>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}