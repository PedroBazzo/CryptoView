import { useState } from "react";
import useAuth from "../hooks/useAuth";
import emailjs from "@emailjs/browser";

export default function Register() {
  const { register } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      register(form);

      // 📧 envio de email
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
      window.location.href = "/dashboard";

    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div>
      <h1>Criar Conta</h1>

      <form onSubmit={handleSubmit}>
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

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}