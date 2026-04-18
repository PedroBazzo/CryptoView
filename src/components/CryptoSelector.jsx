export default function CryptoSelector({ crypto, setCrypto, currency, setCurrency }) {
  return (
    <div>
      <select value={crypto} onChange={(e) => setCrypto(e.target.value)}>
        <option value="bitcoin">Bitcoin</option>
        <option value="ethereum">Ethereum</option>
        <option value="dogecoin">Dogecoin</option>
      </select>

      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="usd">USD</option>
        <option value="brl">BRL</option>
        <option value="eur">EUR</option>
      </select>
    </div>
  );
}