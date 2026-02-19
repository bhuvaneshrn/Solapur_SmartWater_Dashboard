import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { Scale, AlertCircle, CheckCircle2 } from "lucide-react";
import { EQUITY_ANALYSIS_DATA } from "../data/solapurMockData";

const PressureEquityPanel = () => {
    const avgPressure = EQUITY_ANALYSIS_DATA.reduce((acc, curr) => acc + curr.pressure, 0) / EQUITY_ANALYSIS_DATA.length;
    const equityScore = 100 - (EQUITY_ANALYSIS_DATA.reduce((acc, curr) => acc + curr.variance, 0) / EQUITY_ANALYSIS_DATA.length);

    return (
        <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gov-navy dark:text-white leading-none">Pressure Equity Monitoring</h3>
                    <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Ref: SMC-EQUITY-DIST-ALPHA</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${equityScore > 80 ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600' : 'bg-amber-500/10 border-amber-500/20 text-amber-600'}`}>
                        <Scale size={12} />
                        <span className="text-[10px] font-black uppercase tracking-tighter">Equity Index: {equityScore.toFixed(1)}%</span>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
                    <div className="lg:col-span-3 h-[300px]">
                        <ResponsiveContainer width="100%" height="100%" minHeight={100} debounce={50}>
                            <BarChart data={EQUITY_ANALYSIS_DATA}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="zone"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 9, fontWeight: 900, fill: '#94a3b8' }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 9, fontWeight: 900, fill: '#94a3b8' }}
                                    label={{ value: 'PRESSURE (BAR)', angle: -90, position: 'insideLeft', style: { fontSize: 8, fontWeight: 900, fill: '#cbd5e1' } }}
                                />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            const data = payload[0].payload;
                                            return (
                                                <div className="bg-gov-navy text-white p-3 rounded-lg shadow-xl border border-slate-700">
                                                    <p className="text-[10px] font-black uppercase tracking-widest border-b border-white/10 pb-1 mb-2">{data.zone}</p>
                                                    <div className="space-y-1">
                                                        <div className="flex justify-between gap-4">
                                                            <span className="text-[8px] font-bold text-slate-400 uppercase">Avg Pressure</span>
                                                            <span className="text-[10px] font-black">{data.pressure} bar</span>
                                                        </div>
                                                        <div className="flex justify-between gap-4">
                                                            <span className="text-[8px] font-bold text-slate-400 uppercase">Tail-End Drop</span>
                                                            <span className="text-[10px] font-black text-rose-400">-{(data.pressure - data.tailEnd).toFixed(2)} bar</span>
                                                        </div>
                                                        <div className="flex justify-between gap-4">
                                                            <span className="text-[8px] font-bold text-slate-400 uppercase">Variance</span>
                                                            <span className="text-[10px] font-black">{data.variance}%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <ReferenceLine y={avgPressure} stroke="#cbd5e1" strokeDasharray="5 5" label={{ value: 'CITY TARGET', position: 'right', fill: '#94a3b8', fontSize: 8, fontWeight: 900 }} />
                                <Bar dataKey="pressure" radius={[4, 4, 0, 0]} barSize={40}>
                                    {EQUITY_ANALYSIS_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.variance > 20 ? '#ef4444' : '#003366'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                            <h4 className="text-[9px] font-black text-slate-400 uppercase mb-3">Equitable Distribution Status</h4>
                            {equityScore > 80 ? (
                                <div className="flex items-center gap-2 text-emerald-600">
                                    <CheckCircle2 size={16} />
                                    <span className="text-xs font-black uppercase tracking-tight">System Rebalanced</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-rose-600">
                                    <AlertCircle size={16} />
                                    <span className="text-xs font-black uppercase tracking-tight">Imbalance Detected</span>
                                </div>
                            )}
                            <p className="text-[9px] text-slate-500 mt-2 leading-relaxed">
                                {equityScore > 80
                                    ? "Zone-to-zone pressure variance is within the 15% threshold for municipal equity certification."
                                    : "Action Required: South Solapur (Zone B) tail-end nodes reporting critical pressure drop (>25%)."}
                            </p>
                        </div>

                        <div className="p-4 border-2 border-slate-50 dark:border-slate-800 rounded-lg">
                            <span className="text-[8px] font-black text-slate-400 uppercase block mb-1">Max Deviation</span>
                            <span className="text-lg font-black text-gov-navy dark:text-white uppercase leading-none">33% <span className="text-[10px] text-rose-500">↑ HIGH</span></span>
                            <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full mt-2">
                                <div className="w-[33%] h-full bg-rose-500 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PressureEquityPanel;
