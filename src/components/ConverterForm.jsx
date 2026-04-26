import { useState } from "react";
import { getCryptoPrice } from "../services/api/crypto";

export default function ConverterForm({ crypto, currency, setResult }) {
  const [amount, setAmount] = useState(1);

  async function handleConvert() {
    try {
      if (!amount || amount <= 0) {
        alert("Digite um valor válido");
        return;
      }

      const price = await getCryptoPrice(crypto, currency);

      if (price === undefined || price === null) {
        alert("Erro ao obter preço");
        return;
      }

      setResult((price * amount).toFixed(4));

    } catch (err) {
      console.error(err);
      alert("Erro na conversão");
    }
  }

  return (
    <div
      style={{
        marginTop: "10px",
        maxWidth: "420px", 
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "10px",
          width: "100%",
        }}
      >
        <input
          type="number"
          className="input"
          style={{ flex: 2 }}
          value={amount}
          min="0"
          step="any"
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <button
          type="button"
          className="button"
          style={{ flex: 1 }}
          onClick={handleConvert}
        >
          Converter
        </button>
      </div>
    </div>
  );
}