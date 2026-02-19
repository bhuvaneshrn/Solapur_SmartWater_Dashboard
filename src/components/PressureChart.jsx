import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function PressureChart({ zones }) {

  const data = zones.map((zone) => ({
    name: zone.name,
    pressure: zone.pressure,
  }));

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
      <h3 className="mb-4 font-semibold">Pressure Overview</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="pressure"
            stroke="#06b6d4"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
