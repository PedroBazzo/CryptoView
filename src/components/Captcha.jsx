import { useState, useEffect } from "react";

export default function Captcha({ onValidate, refresh }) {
  const [captcha, setCaptcha] = useState("");
  const [input, setInput] = useState("");

  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";

  function generateCaptcha(length = 6) {
    let result = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }

    setCaptcha(result);
    setInput("");
    onValidate(false);
  }

  useEffect(() => {
    generateCaptcha();
  }, []);

  // 🔥 REGENERA AUTOMATICAMENTE
  useEffect(() => {
      generateCaptcha();
  }, [refresh]);

  function handleChange(value) {
    setInput(value);
    onValidate(value === captcha);
  }

  return (
    <div className="captcha-container">
      <div className="captcha-box">
        <span>{captcha}</span>
        <button
          type="button"
          onClick={() => {
            generateCaptcha();
          }}
        >
          ↻
        </button>
      </div>

      <input
        type="text"
        placeholder="Digite o captcha"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        className="input"
      />
    </div>
  );
}