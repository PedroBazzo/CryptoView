import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

export default function ComparisonChart({ data, name1, name2 }) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="time" />

        <YAxis tickFormatter={(v) => `${v.toFixed(1)}%`} />

        <Tooltip
          formatter={(value) => `${value.toFixed(2)}%`}
        />

        <Legend />

        <Line
          type="monotone"
          dataKey="c1"
          name={name1}
          stroke="#3b82f6"
          strokeWidth={3}
          dot={false}
        />

        <Line
          type="monotone"
          dataKey="c2"
          name={name2}
          stroke="#f59e0b"
          strokeWidth={3}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}