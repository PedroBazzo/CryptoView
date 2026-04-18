import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

import { Line } from "react-chartjs-2";

// 🔥 REGISTRO OBRIGATÓRIO
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function Chart({ data }) {
  if (!data || data.length === 0) return null;

  const chartData = {
    labels: data.map((item) =>
      new Date(item[0]).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Preço",
        data: data.map((item) => item[1]),
      },
    ],
  };

  return <Line data={chartData} />;
}