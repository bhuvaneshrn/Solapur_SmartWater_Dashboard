import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

export default function ZoneDetailsPanel({ zone, onClose }) {

  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!zone) return;

    const interval = setInterval(() => {
      setHistory(prev => [
        ...prev.slice(-10),
        {
          time: Date.now(),
          pressure: zone.pressure,
        }
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, [zone]);

  if (!zone) return null;

  return (
    <div className="fixed top-0 right-0 w-96 h-full 
                    bg-black/90 backdrop-blur-xl
                    border-l border-cyan-500/30
                    p-6 shadow-2xl z-50
                    transition-transform duration-300">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-cyan-400">
          {zone.name}
        </h2>

        <button
          onClick={onClose}
          className="text-red-400 hover:text-red-600"
        >
          ✕
        </button>
      </div>

      <p className="text-sm text-slate-400 mb-2">
        Current Pressure
      </p>

      <p className="text-3xl font-bold mb-6">
        {zone.pressure} bar
      </p>

      <ResponsiveContainer width="100%" height={150}>
        <LineChart data={history}>
          <Line
            type="monotone"
            dataKey="pressure"
            stroke="#06b6d4"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-6">
        <p className="text-sm text-slate-400">
          AI Trend Prediction
        </p>
        <p className="mt-2 text-red-400 font-semibold">
          Possible pressure instability detected.
        </p>
      </div>
    </div>
  );
}
