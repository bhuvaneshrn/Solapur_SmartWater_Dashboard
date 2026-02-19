import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function NRWTrendChart({ data }) {
  const chartData = data.map((value, index) => ({
    time: index + 1,
    nrw: value,
  }));

  return (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-xl">
      <h2 className="text-xl font-bold text-cyan-400 mb-4">
        NRW Trend
      </h2>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="nrw" stroke="#facc15" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
