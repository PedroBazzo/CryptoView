import { useState } from "react";
import Navbar from "../components/Navbar";
import ConverterForm from "../components/ConverterForm";
import ResultCard from "../components/ResultCard";

export default function Dashboard() {
  const [result, setResult] = useState(null);

  return (
    <div>
      <Navbar />
      <h1>Conversor de Criptomoedas</h1>

      <ConverterForm setResult={setResult} />
      <ResultCard value={result} />
    </div>
  );
}