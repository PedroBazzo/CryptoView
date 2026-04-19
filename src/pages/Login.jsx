import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    try {
      login(form.email, form.password);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input name="email" onChange={handleChange} required />

        <input
          name="password"
          type="password"
          onChange={handleChange}
          required
        />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}