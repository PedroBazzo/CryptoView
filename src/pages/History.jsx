import { useEffect, useState } from "react";
import { getHistory } from "../services/api/crypto";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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
    <>
      <Navbar />

      <main style={{ padding: "20px" }}>
        <h1>Histórico</h1>

        <div className="history-top">

          <div className="card">
            <h2>Configurações</h2>

            <div className="selector-row">
              <CryptoSelector value={crypto} onChange={setCrypto} />
              <CurrencySelector value={currency} onChange={setCurrency} />
            </div>

            <div style={{ marginTop: "10px" }}>
              <label>Período:</label>
              <select
                className="select"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
              >
                <option value={7}>7 dias</option>
                <option value={30}>30 dias</option>
                <option value={90}>90 dias</option>
                <option value={365}>1 ano</option>
              </select>
            </div>
          </div>

          <div className="card variation-card">
            <h2>Variação</h2>

            <p
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: variation >= 0 ? "#16a34a" : "#dc2626",
              }}
            >
              {variation.toFixed(2)}%
            </p>

            <p style={{ fontSize: "14px", opacity: 0.7 }}>
              {variation >= 0 ? "Alta no período" : "Queda no período"}
            </p>
          </div>
        </div>

        <div className="card chart-card">
          {loading && <p>Carregando...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {!loading && !error && data.length > 0 && (
            <Chart data={data} currency={currency} />
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}