import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function Chart({ data }) {
  const isMobile = window.innerWidth < 768;

  const formatted = data.map(([time, value]) => ({
    time: new Date(time).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    }),
    value,
  }));

  const isPositive =
    data[0][1] < data[data.length - 1][1];

  const values = data.map((d) => d[1]);
  const max = Math.max(...values);

  const decimals =
    max < 1 ? 6 :
    max < 10 ? 4 :
    max < 1000 ? 2 :
    0;

  return (
    <ResponsiveContainer width="100%" height={isMobile ? 280 : 350}>
      <LineChart
        data={formatted}
        margin={{
          top: 10,
          right: isMobile ? 10 : 20,
          left: isMobile ? 10 : 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          dataKey="time"
          tick={{ fontSize: isMobile ? 10 : 12 }}
          padding={{ left: 10, right: 10 }}
          interval={isMobile ? "preserveStartEnd" : 0} // 🔥 reduz labels
        />

        <YAxis
          width={isMobile ? 80 : 110}
          domain={["dataMin * 0.995", "dataMax * 1.005"]}
          tick={{ fontSize: isMobile ? 10 : 12 }}
          tickFormatter={(value) =>
            isMobile
              ? `R$ ${(value / 1000).toFixed(0)}K` // 🔥 simplifica
              : `R$ ${value.toLocaleString("pt-BR", {
                  minimumFractionDigits: decimals,
                  maximumFractionDigits: decimals,
                })}`
          }
        />

        <Tooltip
          contentStyle={{
            background: "#111",
            border: "none",
            borderRadius: "8px",
            fontSize: isMobile ? "12px" : "14px",
          }}
          formatter={(value) =>
            `R$ ${value.toLocaleString("pt-BR", {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            })}`
          }
        />

        <Line
          type="monotone"
          dataKey="value"
          stroke={isPositive ? "#16a34a" : "#dc2626"}
          strokeWidth={isMobile ? 2 : 3}
          dot={false}
          activeDot={{ r: isMobile ? 4 : 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}