import { useState } from "react";
import { getCryptoPrice } from "../services/api/crypto";

export default function Comparison() {
  const [crypto1, setCrypto1] = useState("bitcoin");
  const [crypto2, setCrypto2] = useState("ethereum");
  const [result, setResult] = useState(null);

  const compare = async () => {
    const c1 = await getCryptoPrice(crypto1, "brl");
    const c2 = await getCryptoPrice(crypto2, "brl");
    setResult({ c1, c2 });
  };

  return (
    <div>
      <select onChange={(e) => setCrypto1(e.target.value)}>
        <option value="bitcoin">Bitcoin</option>
        <option value="ethereum">Ethereum</option>
        <option value="dogecoin">Dogecoin</option>
        <option value="solana">Solana</option>
      </select>

      <select onChange={(e) => setCrypto2(e.target.value)}>
        <option value="ethereum">Ethereum</option>
        <option value="bitcoin">Bitcoin</option>
        <option value="dogecoin">Dogecoin</option>
        <option value="solana">Solana</option>
      </select>

      <button onClick={compare}>Comparar</button>

      {result && (
        <div>
          <p>
            {crypto1}: $
            {result.c1 ? Number(result.c1).toFixed(4) : "-"}
          </p>

          <p>
            {crypto2}: $
            {result.c2 ? Number(result.c2).toFixed(4) : "-"}
          </p>
        </div>
      )}
    </div>
  );
}