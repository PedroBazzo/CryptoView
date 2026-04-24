import { useEffect, useState } from "react";
import { getHistory } from "../services/api/crypto";
import Navbar from "../components/Navbar";
import Chart from "../components/Chart";
import CryptoSelector from "../components/CryptoSelector";
import CurrencySelector from "../components/CurrencySelector";

export default function History() {
  const [crypto, setCrypto] = useState("bitcoin");
  const [currency, setCurrency] = useState("brl");
  const [days, setDays] = useState(7);

  const [data, setData] = useState([]);
  const [variation, setVariation] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 📊 cálculo de variação
  function calculateVariation(data) {
    if (!data || data.length < 2) return 0;

    const first = data[0][1];
    const last = data[data.length - 1][1];

    return ((last - first) / first) * 100;
  }

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);

        const res = await getHistory(crypto, currency, days);

        if (res && Array.isArray(res.prices)) {
          setData(res.prices);
          setVariation(calculateVariation(res.prices));
        } else {
          throw new Error("Resposta inválida");
        }

      } catch (err) {
        console.error(err);
        setError("Erro ao carregar dados.");
        setData([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [crypto, currency, days]);

  return (
    <div>
      <Navbar />

      <h1>Histórico de Criptomoedas</h1>

      {/* SELECTORS */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <CryptoSelector value={crypto} onChange={setCrypto} />
        <CurrencySelector value={currency} onChange={setCurrency} />
      </div>

      {/* 📅 PERÍODO */}
      <div style={{ marginTop: "10px" }}>
        <label>Período:</label>
        <select value={days} onChange={(e) => setDays(Number(e.target.value))}>
          <option value={7}>7 dias</option>
          <option value={30}>30 dias</option>
          <option value={90}>90 dias</option>
          <option value={365}>1 ano</option>
        </select>
      </div>

      {loading && <p>Carregando dados...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && data.length > 0 && (
        <>
          <Chart data={data} />

          {/* 📊 VARIAÇÃO */}
          <p
            style={{
              marginTop: "10px",
              fontWeight: "bold",
              color: variation >= 0 ? "green" : "red",
            }}
          >
            Variação: {variation.toFixed(2)}%
          </p>
        </>
      )}

      {!loading && !error && data.length === 0 && (
        <p>Nenhum dado disponível.</p>
      )}
    </div>
  );
}