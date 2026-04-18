import { useState } from "react";
import Navbar from "../components/Navbar";
import ConverterForm from "../components/ConverterForm";
import ResultCard from "../components/ResultCard";
import CryptoSelector from "../components/CryptoSelector";
import Comparison from "../components/Comparison";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [result, setResult] = useState(null);
  const [crypto, setCrypto] = useState("bitcoin");
  const [currency, setCurrency] = useState("brl");

  return (
    <div>
      <Navbar />
      <h1>Dashboard</h1>

      <CryptoSelector
        crypto={crypto}
        setCrypto={setCrypto}
        currency={currency}
        setCurrency={setCurrency}
      />

      <ConverterForm
        setResult={setResult}
        crypto={crypto}
        currency={currency}
      />

      <ResultCard value={result} />

      <Comparison />

    </div>
  );
}