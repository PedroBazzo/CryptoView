import { useState } from "react";
import useAuth from "../hooks/useAuth";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ConverterForm from "../components/ConverterForm";
import CryptoSelector from "../components/CryptoSelector";
import CurrencySelector from "../components/CurrencySelector";
import Comparison from "../components/Comparison";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();

  const [crypto, setCrypto] = useState("bitcoin");
  const [currency, setCurrency] = useState("brl");

  const [selectedCrypto, setSelectedCrypto] = useState("bitcoin");
  const [selectedCurrency, setSelectedCurrency] = useState("brl");

  const [result, setResult] = useState(null);

  const currencySymbol = {
    brl: "R$",
    usd: "$",
    eur: "€",
  };

  return (
    <>
      <Navbar />

      <main style={{ padding: "20px" }}>
        <h1>Dashboard</h1>

        {!user && (
          <p style={{ color: "orange" }}>
            Você está usando o modo público. Faça login para acessar mais criptomoedas e o comparador.
          </p>
        )}

        <div className="card" style={{ marginTop: "20px" }}>
          <h2>Conversor</h2>

          {/* SELECTORS */}
          <div className="selector-row">
            <CryptoSelector value={crypto} onChange={setCrypto} />
            <CurrencySelector value={currency} onChange={setCurrency} />
          </div>

          <div style={{ marginTop: "15px" }}>
            <ConverterForm
              crypto={crypto}
              currency={currency}
              setResult={(value) => {
                setResult(value);
                setSelectedCrypto(crypto);
                setSelectedCurrency(currency);
              }}
            />
          </div>

          {result !== null && (
            <div
              style={{
                marginTop: "20px",
                padding: "15px",
                borderRadius: "10px",
                background: "var(--bg)",
                border: "1px solid var(--border)",
              }}
            >
              <p style={{ fontSize: "14px", opacity: 0.7 }}>
                {selectedCrypto.charAt(0).toUpperCase() +
                  selectedCrypto.slice(1)}{" "}
                hoje:
              </p>

              <p style={{ fontSize: "28px", fontWeight: "bold" }}>
                {currencySymbol[selectedCurrency]}{" "}
                {Number(result).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          )}
        </div>

        <div className="card" style={{ marginTop: "20px" }}>
          <h2>Comparador</h2>

          {user ? (
            <Comparison />
          ) : (
            <div style={{ marginTop: "10px" }}>
              <p style={{ color: "gray" }}>
                O comparador está disponível apenas para usuários logados.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}