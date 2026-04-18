export default function ResultCard({ value }) {
  return (
    <div>
      <h2>Resultado:</h2>
      <p>R$ {value?.toFixed(2)}</p>
    </div>
  );
}