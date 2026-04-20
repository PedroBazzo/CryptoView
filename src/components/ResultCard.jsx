export default function ResultCard({ result, currency }) {
  const formattedValue = Number(result).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Resultado</h2>
      <p>
        {formattedValue} {currency?.toUpperCase()}
      </p>
    </div>
  );
}