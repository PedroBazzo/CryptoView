import { useState } from "react";
import useAuth from "../hooks/useAuth";
import Navbar from "../components/Navbar";
import ConverterForm from "../components/ConverterForm";
import ResultCard from "../components/ResultCard";
import CryptoSelector from "../components/CryptoSelector";
import CurrencySelector from "../components/CurrencySelector"; // 🔥 NOVO
import Comparison from "../components/Comparison";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();

  const [crypto, setCrypto] = useState("bitcoin");
  const [currency, setCurrency] = useState("brl");
  const [result, setResult] = useState(null);

  return (
    <div>
      <Navbar />

      <h1>Dashboard</h1>

      {/* 🔒 Aviso */}
      {!user && (
        <p style={{ color: "orange" }}>
          Você está usando o modo público. Faça login para acessar mais criptomoedas e o comparador.
        </p>
      )}

      {/* 🪙 Seletores */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <CryptoSelector value={crypto} onChange={setCrypto} />
        <CurrencySelector value={currency} onChange={setCurrency} />
      </div>

      {/* 🔄 Conversor */}
      <ConverterForm
        crypto={crypto}
        currency={currency}
        setResult={setResult}
      />

      {result !== null && <ResultCard result={result} />}

      {/* ⚔️ Comparador (somente logado) */}
      {user ? (
        <Comparison />
      ) : (
        <div style={{ marginTop: "20px" }}>
          <p style={{ color: "gray" }}>
            O comparador está disponível apenas para usuários logados.
          </p>
          <Link to="/login">Fazer login</Link>
        </div>
      )}
    </div>
  );
}