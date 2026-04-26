import { useState } from "react";
import { getCryptoPrice, getHistory } from "../services/api/crypto";
import CryptoSelector from "../components/CryptoSelector";
import ComparisonChart from "../components/ComparisonChart";

export default function Comparison() {
  const [crypto1, setCrypto1] = useState("bitcoin");
  const [crypto2, setCrypto2] = useState("ethereum");

  const [selected1, setSelected1] = useState("bitcoin");
  const [selected2, setSelected2] = useState("ethereum");

  const [result, setResult] = useState(null);

  const [history1, setHistory1] = useState([]);
  const [history2, setHistory2] = useState([]);

  const [variation1, setVariation1] = useState(0);
  const [variation2, setVariation2] = useState(0);

  function calculateVariation(data) {
    if (!data || data.length < 2) return 0;
    const first = data[0][1];
    const last = data[data.length - 1][1];
    return ((last - first) / first) * 100;
  }

  function normalizeData(data) {
    if (!data || data.length === 0) return [];

    const first = data[0][1];

    return data.map((item) => ({
      time: new Date(item[0]).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      }),
      value: ((item[1] - first) / first) * 100,
    }));
  }

  async function compare() {
    const c1 = await getCryptoPrice(crypto1, "brl");
    const c2 = await getCryptoPrice(crypto2, "brl");

    setResult({ c1, c2 });
    setSelected1(crypto1);
    setSelected2(crypto2);

    const h1 = await getHistory(crypto1, "brl");
    const h2 = await getHistory(crypto2, "brl");

    setHistory1(h1.prices);
    setHistory2(h2.prices);

    setVariation1(calculateVariation(h1.prices));
    setVariation2(calculateVariation(h2.prices));
  }

  const normalized1 = normalizeData(history1);
  const normalized2 = normalizeData(history2);

  const mergedData = normalized1.map((item, index) => ({
    time: item.time,
    c1: item.value,
    c2: normalized2[index]?.value,
  }));

  return (
    <div style={{ marginTop: "15px" }}>
      {/* 🔧 CONFIG */}
      <div className="card">
        <h3>Comparar Criptomoedas</h3>

        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <CryptoSelector value={crypto1} onChange={setCrypto1} />
          <CryptoSelector value={crypto2} onChange={setCrypto2} />

          <button className="button" onClick={compare}>
            Comparar
          </button>
        </div>
      </div>

      {result && (
        <div className="comparison-cards">
          {/* 💰 RESULTADOS */}
          <div className="card">
            <h3>Preços atuais</h3>

            <p>
              {selected1}:{" "}
              <strong>
                R${" "}
                {Number(result.c1).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </strong>
            </p>

            <p>
              {selected2}:{" "}
              <strong>
                R${" "}
                {Number(result.c2).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </strong>
            </p>
          </div>

          <div className="card">
            <h3>Variação (7 dias)</h3>

            <p style={{ color: variation1 >= 0 ? "#16a34a" : "#dc2626" }}>
              {selected1}: {variation1.toFixed(2)}%
            </p>

            <p style={{ color: variation2 >= 0 ? "#16a34a" : "#dc2626" }}>
              {selected2}: {variation2.toFixed(2)}%
            </p>
          </div>
        </div>
      )}

      {mergedData.length > 0 && (
        <div className="card" style={{ marginTop: "15px" }}>
          <h3>Comparação (7 dias)</h3>

          <ComparisonChart
            data={mergedData}
            name1={selected1}
            name2={selected2}
          />
        </div>
      )}
    </div>
  );
}