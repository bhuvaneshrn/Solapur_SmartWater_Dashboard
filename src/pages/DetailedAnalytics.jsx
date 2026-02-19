import { useState } from "react";
import { motion } from "framer-motion";
import {
    BarChart3,
    TrendingUp,
    Droplets,
    AlertTriangle,
    Filter,
    Download,
    Calendar,
    ChevronDown,
    Info,
    Activity,
    ArrowUpRight,
    ArrowDownRight,
    Brain,
    Scale
} from "lucide-react";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line, BarChart, Bar, Legend, Cell, PieChart, Pie
} from "recharts";
import WaterBalanceDashboard from "../components/WaterBalanceDashboard";
import DemandForecastPanel from "../components/DemandForecastPanel";
import { SMC_ZONES, DEMAND_SUPPLY_DATA, PRESSURE_STABILITY_TREND, NRW_REDUCTION_STATS } from "../data/solapurMockData";

const Analytics = () => {
    const [selectedZone, setSelectedZone] = useState("All Zones");
    const [timeframe, setTimeframe] = useState("Last 7 Days");

    const COLORS = ['#002147', '#003366', '#3b82f6', '#2dd4bf', '#22d3ee'];

    return (
        <div className="space-y-8 pb-20">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-6 bg-india-saffron rounded-full" />
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Registry: SI-ANALYTICS-2024</h4>
                    </div>
                    <h1 className="text-3xl font-black text-gov-navy dark:text-white tracking-tight">Distribution & Stability Analytics</h1>
                    <p className="text-sm text-slate-500 font-medium">Official performance metrics and leak detection pattern analysis</p>
                </div>

                <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2">
                        <Filter size={14} className="text-slate-400" />
                        <select
                            value={selectedZone}
                            onChange={(e) => setSelectedZone(e.target.value)}
                            className="bg-transparent border-none outline-none text-xs font-bold text-slate-600 dark:text-slate-300"
                        >
                            <option>All Zones</option>
                            {SMC_ZONES.map(z => <option key={z.id}>{z.name.split(': ')[1]}</option>)}
                        </select>
                    </div>
                    <div className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2">
                        <Calendar size={14} className="text-slate-400" />
                        <select
                            value={timeframe}
                            onChange={(e) => setTimeframe(e.target.value)}
                            className="bg-transparent border-none outline-none text-xs font-bold text-slate-600 dark:text-slate-300"
                        >
                            <option>Last 24 Hours</option>
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                        </select>
                    </div>
                    <button className="gov-button-primary !py-2 flex items-center gap-2 text-xs">
                        <Download size={14} /> Generate PDF Report
                    </button>
                </div>
            </div>

            {/* Top metrics summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <SummaryCard label="Avg. Daily Demand" value="395 MLD" trend="+4.2%" isUp={true} />
                <SummaryCard label="System Pressure Stability" value="94.2%" trend="+0.8%" isUp={true} />
                <SummaryCard label="NRW Loss Rate" value="32.4%" trend="-2.1%" isUp={false} />
                <SummaryCard label="Node Response Latency" value="1.2s" trend="-0.1s" isUp={false} />
            </div>

            {/* Strategic Analytics Section */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <WaterBalanceDashboard />
                <DemandForecastPanel />
            </div>

            {/* Primary Analytics Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Demand vs Supply Graph */}
                <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                    <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                        <div>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gov-navy dark:text-white leading-none">Resource Balancing Registry</h3>
                            <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Ref: SMC-DEMAND-SUPPLY-LIVE</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-gov-blue" />
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Supply</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-accent-cyan" />
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Demand</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%" minHeight={100} debounce={50}>
                                <AreaChart data={DEMAND_SUPPLY_DATA}>
                                    <defs>
                                        <linearGradient id="colorSupply" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis dataKey="time" axisLine={false} tickLine={false} style={{ fontSize: '10px', fontWeight: 'bold' }} tick={{ fill: '#94a3b8' }} />
                                    <YAxis axisLine={false} tickLine={false} style={{ fontSize: '10px', fontWeight: 'bold' }} tick={{ fill: '#94a3b8' }} unit="M" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        labelStyle={{ fontWeight: 'bold', color: '#002147' }}
                                    />
                                    <Area type="monotone" dataKey="supply" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorSupply)" />
                                    <Area type="monotone" dataKey="demand" stroke="#22d3ee" strokeWidth={3} fillOpacity={1} fill="url(#colorDemand)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* NRW Reduction Trend */}
                <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                    <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gov-navy dark:text-white leading-none">NRW Conservation Compliance Ledger</h3>
                        <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Audit Cycle: FY 2023-24</p>
                    </div>
                    <div className="p-6">
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%" minHeight={100} debounce={50}>
                                <LineChart data={NRW_REDUCTION_STATS}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} style={{ fontSize: '10px', fontWeight: 'bold' }} tick={{ fill: '#94a3b8' }} />
                                    <YAxis axisLine={false} tickLine={false} style={{ fontSize: '10px', fontWeight: 'bold' }} tick={{ fill: '#94a3b8' }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                                    />
                                    <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', paddingTop: '20px' }} />
                                    <Line type="monotone" dataKey="current" name="Current Loss %" stroke="#f43f5e" strokeWidth={4} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
                                    <Line type="monotone" dataKey="target" name="Municipal Target" stroke="#003366" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Distribution Reliability Index */}
                <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                    <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gov-navy dark:text-white leading-none">Distribution Reliability Assessment</h3>
                        <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Ward-Level Integrity Feed</p>
                    </div>
                    <div className="p-6">
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%" minHeight={100} debounce={50}>
                                <BarChart data={SMC_ZONES}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis dataKey="name" tick={false} axisLine={false} tickLine={false} />
                                    <YAxis axisLine={false} tickLine={false} style={{ fontSize: '10px', fontWeight: 'bold' }} tick={{ fill: '#94a3b8' }} unit="%" />
                                    <Tooltip
                                        cursor={{ fill: '#F1F5F9' }}
                                        content={({ active, payload }) => {
                                            if (active && payload && payload.length) {
                                                return (
                                                    <div className="bg-white p-4 border-2 border-slate-100 shadow-xl rounded-lg">
                                                        <p className="text-[10px] font-black text-gov-navy uppercase tracking-widest leading-none mb-2 border-b border-slate-50 pb-2">{payload[0].payload.name}</p>
                                                        <p className="text-sm font-black text-gov-blue">{payload[0].value}% Efficiency Index</p>
                                                    </div>
                                                )
                                            }
                                            return null;
                                        }}
                                    />
                                    <Bar dataKey="operationalEfficiency" radius={[2, 2, 0, 0]}>
                                        {SMC_ZONES.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.operationalEfficiency > 85 ? '#10b981' : entry.operationalEfficiency > 70 ? '#3b82f6' : '#f59e0b'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-8 flex flex-wrap gap-4 justify-center">
                            {SMC_ZONES.map((z, i) => (
                                <div key={i} className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-sm border border-slate-100 dark:border-slate-700">
                                    <div className="text-[9px] font-black text-slate-400 uppercase leading-none">W{i + 1}</div>
                                    <div className="text-[10px] font-black text-gov-navy dark:text-slate-200 uppercase tracking-tighter truncate max-w-[80px]">{z.name.split(': ')[1]}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Asset Health Breakdown */}
                <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                    <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gov-navy dark:text-white leading-none">Critical Infrastructure Categorization</h3>
                        <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Network Integrity Distribution</p>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="h-[300px] w-[50%]">
                                <ResponsiveContainer width="100%" height="100%" minHeight={100} debounce={50}>
                                    <PieChart>
                                        <Pie
                                            data={[
                                                { name: 'Optimal', value: 45 },
                                                { name: 'Nominal', value: 30 },
                                                { name: 'Degraded', value: 15 },
                                                { name: 'Critical', value: 10 },
                                            ]}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={65}
                                            outerRadius={95}
                                            paddingAngle={8}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            <Cell fill="#10b981" />
                                            <Cell fill="#3b82f6" />
                                            <Cell fill="#f59e0b" />
                                            <Cell fill="#f43f5e" />
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="w-[45%] space-y-4">
                                <PieLegendItem color="bg-emerald-500" label="SMC-Optimal" count="1,242" percentage="45%" />
                                <PieLegendItem color="bg-blue-500" label="SMC-Nominal" count="828" percentage="30%" />
                                <PieLegendItem color="bg-amber-500" label="SMC-Degraded" count="414" percentage="15%" />
                                <PieLegendItem color="bg-rose-500" label="SMC-Critical" count="276" percentage="10%" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Zone Comparison Table */}
            <div className="gov-card overflow-hidden">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <h3 className="text-sm font-black text-gov-navy dark:text-white uppercase tracking-wider">Comparative Ward Assessment</h3>
                    <span className="text-[10px] font-black text-slate-400 border border-slate-200 dark:border-slate-700 px-3 py-1 rounded-full">FY 2024 Audit Ready</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                <th className="px-6 py-4">Ward/Zone Name</th>
                                <th className="px-6 py-4">SMC ID</th>
                                <th className="px-6 py-4">Avg Pressure</th>
                                <th className="px-6 py-4">Asset Health</th>
                                <th className="px-6 py-4">Leak Probability</th>
                                <th className="px-6 py-4">Resolution Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {SMC_ZONES.map((zone) => (
                                <tr key={zone.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-xs text-gov-navy dark:text-white">{zone.name}</div>
                                        <div className="text-[10px] text-slate-400 font-medium">Officer: {zone.wardOfficer}</div>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-[10px] font-bold text-slate-500">{zone.officialId}</td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs font-black text-slate-700 dark:text-slate-300">{zone.pressure} bar</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                <div className={`h-full ${zone.assetHealth > 80 ? 'bg-emerald-500' : zone.assetHealth > 50 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${zone.assetHealth}%` }} />
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-500">{zone.assetHealth}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[10px] font-black px-2 py-0.5 rounded ${zone.leakProbability > 30 ? 'bg-rose-500/10 text-rose-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                                            {zone.leakProbability}% RISK
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full ${zone.infrastructureStatus === 'OPTIMAL' ? 'bg-emerald-500' : zone.infrastructureStatus === 'NOMINAL' ? 'bg-blue-500' : 'bg-rose-500'}`} />
                                            <span className="text-[10px] font-black text-slate-500 uppercase">{zone.infrastructureStatus}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const SummaryCard = ({ label, value, trend, isUp }) => (
    <div className="gov-card p-6 border-b-2 border-b-gov-blue">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{label}</p>
        <div className="flex items-end justify-between">
            <h3 className="text-2xl font-black text-gov-navy dark:text-white leading-none">{value}</h3>
            <div className={`flex items-center gap-1 text-[10px] font-black ${isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {trend}
            </div>
        </div>
    </div>
);

const PieLegendItem = ({ color, label, count, percentage }) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${color}`} />
            <span className="text-[10px] font-bold text-slate-500 uppercase">{label}</span>
        </div>
        <div className="text-right">
            <div className="text-[10px] font-black text-gov-navy dark:text-white leading-none">{count}</div>
            <div className="text-[8px] font-bold text-slate-400">{percentage} units</div>
        </div>
    </div>
);

export default Analytics;
