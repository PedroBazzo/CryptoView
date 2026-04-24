import useAuth from "../hooks/useAuth";

export default function CryptoSelector({ value, onChange }) {
  const { user } = useAuth();

  return (
    <div>
      <label>Criptomoeda:</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {/* 🌐 público */}
        <option value="bitcoin">Bitcoin</option>

        {/* 🔒 logado */}
        {user && (
          <>
            <option value="ethereum">Ethereum</option>
            <option value="binancecoin">BNB</option>
            <option value="solana">Solana</option>
            <option value="ripple">XRP</option>
            <option value="cardano">Cardano</option>
            <option value="dogecoin">Dogecoin</option>
            <option value="polygon">Polygon</option>
            <option value="polkadot">Polkadot</option>
            <option value="litecoin">Litecoin</option>
          </>
        )}
      </select>
    </div>
  );
}