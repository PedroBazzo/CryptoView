import { useEffect, useState } from "react";
import { getHistory } from "../services/api/crypto";
import Navbar from "../components/Navbar";
import Chart from "../components/Chart";

export default function History() {
  const [crypto, setCrypto] = useState("bitcoin");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);

        const res = await getHistory(crypto);

        console.log("API RESPONSE:", res); // 🔍 debug

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
  }, [crypto]);

  return (
    <div>
      <Navbar />

      <h1>Histórico de Criptomoedas</h1>

      {}
      <select value={crypto} onChange={(e) => setCrypto(e.target.value)}>
        <option value="bitcoin">Bitcoin</option>
        <option value="ethereum">Ethereum</option>
        <option value="dogecoin">Dogecoin</option>
      </select>

      {}
      {loading && <p>Carregando dados...</p>}

      {}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {}
      {!loading && !error && data.length > 0 && (
        <Chart data={data} />
      )}

      {}
      {!loading && !error && data.length === 0 && (
        <p>Nenhum dado disponível.</p>
      )}
    </div>
  );
}