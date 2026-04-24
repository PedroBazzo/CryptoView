import { useState } from "react";
import { getCryptoPrice } from "../services/api/crypto";
import CryptoSelector from "../components/CryptoSelector";

export default function Comparison() {
  const [crypto1, setCrypto1] = useState("bitcoin");
  const [crypto2, setCrypto2] = useState("ethereum");

  const [result, setResult] = useState(null);

  // 🔥 NOVO: guarda as criptos usadas na comparação
  const [compared, setCompared] = useState(null);

  const compare = async () => {
    if (crypto1 === crypto2) {
      alert("Escolha criptomoedas diferentes");
      return;
    }

    const c1 = await getCryptoPrice(crypto1, "brl");
    const c2 = await getCryptoPrice(crypto2, "brl");

    setResult({ c1, c2 });

    // 🔥 salva quais criptos foram comparadas
    setCompared({ crypto1, crypto2 });
  };

  return (
    <div>
      <h2>Comparar Criptomoedas</h2>

      <CryptoSelector value={crypto1} onChange={setCrypto1} />
      <CryptoSelector value={crypto2} onChange={setCrypto2} />

      <button onClick={compare} style={{ marginTop: "10px" }}>
        Comparar
      </button>

      {result && compared && (
        <div style={{ marginTop: "15px" }}>
          <p>
            {compared.crypto1}: R${" "}
            {result.c1 ? Number(result.c1).toFixed(2) : "-"}
          </p>

          <p>
            {compared.crypto2}: R${" "}
            {result.c2 ? Number(result.c2).toFixed(2) : "-"}
          </p>
        </div>
      )}
    </div>
  );
}