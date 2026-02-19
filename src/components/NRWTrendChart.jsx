import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { motion } from "framer-motion";

const NRWTrendChart = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 rounded-2xl h-[350px]"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-white">NRW Reduction Trend</h3>
          <p className="text-xs text-slate-500">Non-Revenue Water (Water Loss) metrics</p>
        </div>
        <div className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-bold border border-emerald-500/20">
          -15% reduction this quarter
        </div>
      </div>

      <div className="w-full h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis
              dataKey="month"
              stroke="#64748b"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              stroke="#64748b"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `${val}%`}
            />
            <Tooltip
              contentStyle={{ backgroundColor: 'var(--tw-bg-opacity)', border: '1px solid #e2e8f0', borderRadius: '8px' }}
              itemStyle={{ fontSize: '10px', fontWeight: 'bold' }}
              labelStyle={{ color: '#64748b', marginBottom: '4px' }}
            />
            <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 'black', textTransform: 'uppercase', letterSpacing: '0.1em' }} />
            <Line
              type="monotone"
              dataKey="current"
              stroke="#f59e0b"
              strokeWidth={3}
              dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
              animationDuration={2500}
              name="Actual Loss"
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke="#003366"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              animationDuration={2500}
              name="SMC Target"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default NRWTrendChart;
