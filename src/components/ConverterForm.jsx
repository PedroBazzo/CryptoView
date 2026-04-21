import { useState } from "react";
import { getCryptoPrice } from "../services/api/crypto";

export default function ConverterForm({ crypto, currency, setResult }) {
  const [amount, setAmount] = useState(1);

  async function handleConvert() {
    try {
      console.log("Crypto:", crypto);
      console.log("Currency:", currency);

      const price = await getCryptoPrice(crypto, currency);

      console.log("Preço:", price);

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
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />

      <button onClick={handleConvert}>Converter</button>
    </div>
  );
}