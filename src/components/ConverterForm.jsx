import { useState } from "react";
import { getCryptoPrice } from "../services/api/crypto";

export default function ConverterForm({ setResult, crypto, currency }) {
  const [amount, setAmount] = useState(1);

  const handleConvert = async () => {
    const price = await getCryptoPrice(crypto, currency);
    setResult(price * amount);
  };

  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleConvert}>Converter</button>
    </div>
  );
}