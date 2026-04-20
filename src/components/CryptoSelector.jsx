import useAuth from "../hooks/useAuth";

export default function CryptoSelector({
  crypto,
  setCrypto,
  currency,
  setCurrency,
}) {
  const { user } = useAuth();

  return (
    <div>

      {}
      <label>Criptomoeda:</label>
      <select
        value={crypto}
        onChange={(e) => setCrypto(e.target.value)}
      >
        <option value="bitcoin">Bitcoin</option>

        {user && (
          <>
            <option value="ethereum">Ethereum</option>
            <option value="dogecoin">Dogecoin</option>
            <option value="solana">Solana</option>
          </>
        )}
      </select>

      {}
      <label>Moeda:</label>
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
      >
        <option value="usd">USD</option>
        <option value="brl">BRL</option>
        <option value="eur">EUR</option>
      </select>

    </div>
  );
}