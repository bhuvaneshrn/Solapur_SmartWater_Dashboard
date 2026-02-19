import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Brain, TrendingUp, AlertTriangle, ShieldCheck } from "lucide-react";
import { DEMAND_FORECAST_DATA } from "../data/solapurMockData";

const DemandForecastPanel = () => {
    return (
        <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gov-navy dark:text-white leading-none">AI Demand Forecasting Panel</h3>
                    <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">SMC-PREDICTIVE-ENGINE-V4</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 px-3 py-1 bg-gov-navy text-white rounded-full text-[8px] font-black uppercase tracking-widest">
                        <Brain size={12} className="text-india-saffron" />
                        Inference Active
                    </div>
                </div>
            </div>

            <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%" minHeight={100} debounce={50}>
                                <AreaChart data={DEMAND_FORECAST_DATA}>
                                    <defs>
                                        <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#003366" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#003366" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis
                                        dataKey="date"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 9, fontWeight: 900, fill: '#94a3b8' }}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 9, fontWeight: 900, fill: '#94a3b8' }}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#002147', border: 'none', borderRadius: '8px', color: '#fff' }}
                                        itemStyle={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase' }}
                                        labelStyle={{ display: 'none' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="predicted"
                                        stroke="#003366"
                                        fillOpacity={1}
                                        fill="url(#colorPredicted)"
                                        strokeWidth={3}
                                        name="Predicted Demand (MLD)"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="actual"
                                        stroke="#FF9933"
                                        strokeWidth={3}
                                        dot={{ fill: '#FF9933', r: 4 }}
                                        name="Actual Supply (MLD)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="flex items-center gap-6 px-4 py-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-gov-navy" />
                                <span className="text-[9px] font-black text-slate-500 uppercase">Predicted Demand</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-india-saffron" />
                                <span className="text-[9px] font-black text-slate-500 uppercase">Actual Supply</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="p-5 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                            <div className="flex items-center gap-3 mb-3 text-amber-600">
                                <AlertTriangle size={18} />
                                <h4 className="text-[10px] font-black uppercase tracking-widest">Shortage Warning (Feb 23)</h4>
                            </div>
                            <p className="text-[10px] text-slate-600 dark:text-slate-400 leading-relaxed font-bold uppercase">
                                Predicted demand spike (420 MLD) vs current reservoir capacity. AI suggests increasing WTP output by 12% starting Feb 22, 04:00 AM.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 dark:border-slate-800 pb-2">AI Strategic Recommendations</h5>
                            <RecommendationItem
                                icon={TrendingUp}
                                text="Optimize nocturnal reservoir filling for Zone D."
                                impact="High"
                            />
                            <RecommendationItem
                                icon={ShieldCheck}
                                text="Pressure reduction in Zone C recommended to prevent burst."
                                impact="Critical"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const RecommendationItem = ({ icon: Icon, text, impact }) => (
    <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg shadow-sm">
        <div className="mt-1 text-gov-blue dark:text-accent-cyan">
            <Icon size={14} />
        </div>
        <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
                <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded ${impact === 'Critical' ? 'bg-rose-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'}`}>
                    {impact} Impact
                </span>
            </div>
            <p className="text-[9px] font-bold text-slate-600 dark:text-slate-300 leading-tight uppercase">{text}</p>
        </div>
    </div>
);

export default DemandForecastPanel;
