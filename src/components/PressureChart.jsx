import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-lg shadow-xl">
        <p className="text-[10px] text-slate-400 mb-1 font-black uppercase tracking-widest">{label}</p>
        <p className="text-gov-blue dark:text-accent-cyan font-black text-lg">
          {payload[0].value.toFixed(2)} <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">bar</span>
        </p>
      </div>
    );
  }
  return null;
};

const PressureChart = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="gov-card p-6 h-[350px]"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-3 bg-gov-blue rounded-full" />
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Node Stability Log</h3>
          </div>
          <h3 className="text-sm font-black text-gov-navy dark:text-white uppercase tracking-wider">Pressure Variation</h3>
        </div>
        <div className="flex gap-2">
          {['24H', '7D', '30D'].map((t) => (
            <button
              key={t}
              className={`px-3 py-1 text-[9px] font-black rounded border transition-all ${t === '24H' ? 'bg-gov-navy dark:bg-slate-700 border-gov-navy text-white' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-400'
                }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPressure" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis
              dataKey="time"
              stroke="#94a3b8"
              fontSize={9}
              fontWeight="bold"
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              stroke="#94a3b8"
              fontSize={9}
              fontWeight="bold"
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `${val}b`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="pressure"
              stroke="#3b82f6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorPressure)"
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default PressureChart;
