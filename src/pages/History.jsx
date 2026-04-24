import { useEffect, useState } from "react";
import { getHistory } from "../services/api/crypto";
import Navbar from "../components/Navbar";
import Chart from "../components/Chart";
import CryptoSelector from "../components/CryptoSelector";
import CurrencySelector from "../components/CurrencySelector"; // 🔥 NOVO

export default function History() {
  const [crypto, setCrypto] = useState("bitcoin");
  const [currency, setCurrency] = useState("brl");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);

        const res = await getHistory(crypto, currency);

        console.log("CRYPTO:", crypto);
        console.log("API RESPONSE:", res);

        if (res && res.prices && Array.isArray(res.prices)) {
          setData(res.prices);
        } else {
          throw new Error("Resposta inválida da API");
        }

      } catch (err) {
        console.error("Erro ao buscar histórico:", err);
        setError("Erro ao carregar dados. Tente novamente.");
        setData([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [crypto, currency]);

  return (
    <div>
      <Navbar />

      <h1>Histórico de Criptomoedas</h1>

      {/* 🔥 SELECTORS */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <CryptoSelector value={crypto} onChange={setCrypto} />
        <CurrencySelector value={currency} onChange={setCurrency} />
      </div>

      {loading && <p>Carregando dados...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && data.length > 0 && (
        <Chart data={data} />
      )}

      {!loading && !error && data.length === 0 && (
        <p>Nenhum dado disponível.</p>
      )}
    </div>
  );
}