export default function ResultCard({ value }) {
  return <h2>Resultado: {value ? value.toFixed(2) : "-"}</h2>;
}