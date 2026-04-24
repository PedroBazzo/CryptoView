export default function CurrencySelector({ value, onChange }) {
  return (
    <div>
      <label>Moeda:</label>
      <select
        className="select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="usd">USD</option>
        <option value="brl">BRL</option>
        <option value="eur">EUR</option>
      </select>
    </div>
  );
}