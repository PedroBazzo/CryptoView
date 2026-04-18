import { useState } from "react";
import { getCryptoPrice } from "../services/cryptoApi";

export default function ConverterForm({ setResult }) {
  const [amount, setAmount] = useState(1);

  const handleConvert = async () => {
    const price = await getCryptoPrice("bitcoin", "brl");
    setResult(price * amount);
  };

  return (
    <div>
      <h3>Converter BTC → BRL</h3>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleConvert}>Converter</button>
    </div>
  );
}