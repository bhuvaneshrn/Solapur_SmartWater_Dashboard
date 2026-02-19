import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Settings2,
    Cpu,
    Activity,
    ShieldCheck,
    RotateCw,
    Power,
    Zap,
    Thermometer,
    ShieldAlert,
    CheckCircle2,
    AlertTriangle,
    Lock,
    Unlock,
    Radio
} from "lucide-react";
import ValveControl from "../components/ValveControl";
import { MUNICIPAL_METRICS } from "../data/solapurMockData";

const Infrastructure = () => {
    const [isEmergencyMode, setIsEmergencyMode] = useState(false);
    const [systemLock, setSystemLock] = useState(true);
    const [valveOpen, setValveOpen] = useState(true);

    const assets = [
        { name: "SMC Core Telemetry Hub", type: "Server", health: 100, status: "Active", load: 12 },
        { name: "Pumping Site 02: Central Solapur", type: "Mechanical", health: 82, status: "Nominal", load: 68 },
        { name: "Ward-42 Distribution Valve", type: "Actuator", health: 64, status: "Caution", load: 92 },
        { name: "Backbone Fiber: SHT-Node", type: "Network", health: 98, status: "Active", load: 5 },
        { name: "Chlorination Control Unit", type: "Chemical", health: 88, status: "Nominal", load: 42 },
    ];

    return (
        <div className="space-y-8 pb-20">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-6 bg-india-saffron rounded-full" />
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Control ID: SMC-SYS-ADM-01</h4>
                    </div>
                    <h1 className="text-3xl font-black text-gov-navy dark:text-white tracking-tight">Infrastructure & Asset Control</h1>
                    <p className="text-sm text-slate-500 font-medium">Global operational control for municipal pumping stations and distribution nodes</p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => setSystemLock(!systemLock)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${systemLock ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'bg-emerald-500 text-white'}`}
                    >
                        {systemLock ? <Lock size={14} /> : <Unlock size={14} />}
                        {systemLock ? 'System Locked' : 'System Operational'}
                    </button>
                    <button
                        onClick={() => setIsEmergencyMode(!isEmergencyMode)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${isEmergencyMode ? 'bg-rose-600 text-white animate-pulse' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700'}`}
                    >
                        <ShieldAlert size={14} /> Emergency Override
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                {/* Left Column: Asset Status List */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="gov-card p-6">
                        <h3 className="text-sm font-black text-gov-navy dark:text-white uppercase tracking-wider mb-8 flex items-center gap-2">
                            <Cpu size={18} className="text-gov-blue" /> Distributed Asset Integrity
                        </h3>
                        <div className="space-y-4">
                            {assets.map((asset, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2.5 rounded-lg ${asset.health > 85 ? 'bg-emerald-500/10 text-emerald-500' : asset.health > 70 ? 'bg-blue-500/10 text-blue-500' : 'bg-rose-500/10 text-rose-500'}`}>
                                            {asset.type === 'Server' ? <Radio size={18} /> : asset.type === 'Mechanical' ? <Settings2 size={18} /> : <Zap size={18} />}
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-black text-gov-navy dark:text-white">{asset.name}</h4>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{asset.type} • ID: S-0{i + 1}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-8">
                                        <div className="text-right">
                                            <div className="text-[10px] font-black text-gov-navy dark:text-white leading-none mb-1">{asset.load}%</div>
                                            <div className="text-[8px] font-bold text-slate-400 uppercase">Load</div>
                                        </div>
                                        <div className="text-right w-20">
                                            <div className={`text-[10px] font-black uppercase leading-none mb-1 ${asset.health > 85 ? 'text-emerald-500' : 'text-amber-500'}`}>{asset.status}</div>
                                            <div className="h-1 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${asset.health}%` }}
                                                    className={`h-full ${asset.health > 85 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="gov-card p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-india-saffron" />
                            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 text-gov-blue">
                                <Activity size={32} />
                            </div>
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Central Pulse Stability</h4>
                            <div className="text-4xl font-black text-gov-navy dark:text-white mb-2">99.98%</div>
                            <p className="text-[10px] font-bold text-emerald-600 uppercase">Official Network Standard Met</p>
                        </div>

                        <div className="gov-card p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
                            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 text-emerald-500">
                                <Zap size={32} />
                            </div>
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Energy Efficiency Index</h4>
                            <div className="text-4xl font-black text-gov-navy dark:text-white mb-2">B+ Rating</div>
                            <p className="text-[10px] font-bold text-emerald-600 uppercase">+12% Since Solar Integration</p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Active Controls */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="gov-card p-8">
                        <div className="flex justify-between items-center mb-8 border-b border-slate-100 dark:border-slate-800 pb-4">
                            <div>
                                <h3 className="text-sm font-black text-gov-navy dark:text-white uppercase tracking-wider">Actuator Control (Ward-24)</h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Manual Valve Nullification</p>
                            </div>
                            <div className={`px-3 py-1 rounded text-[9px] font-black uppercase tracking-tighter shadow-sm border ${valveOpen ? 'bg-emerald-500/10 text-emerald-600 border-emerald-200' : 'bg-rose-500/10 text-rose-600 border-rose-200'}`}>
                                Primary Flow: {valveOpen ? 'NOMINAL' : 'THROTTLED'}
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-12 py-8">
                            <div className="flex-1 text-center md:text-left space-y-4">
                                <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
                                    <RotateCw size={14} /> Rotation Status: {valveOpen ? '0° Fixed' : '15° Null'}
                                </div>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                    Note: Throttling this valve affects supply to North Solapur (Zone A). Emergency overrides will bypass regional safety buffers.
                                </p>
                                <div className="pt-4 flex gap-3">
                                    <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-black uppercase text-slate-500">Torque: 42 Nm</div>
                                    <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-black uppercase text-slate-500">Latency: 400ms</div>
                                </div>
                            </div>
                            <div className="p-10 bg-slate-50 dark:bg-slate-800/50 rounded-full border border-slate-100 dark:border-slate-800 flex items-center justify-center relative shadow-inner">
                                <ValveControl valveOpen={valveOpen} setValveOpen={setValveOpen} disabled={systemLock} />
                                {systemLock && (
                                    <div className="absolute inset-0 bg-white/20 dark:bg-slate-900/40 backdrop-blur-[2px] rounded-full flex items-center justify-center">
                                        <Lock size={32} className="text-gov-navy dark:text-white" />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <button
                                disabled={systemLock}
                                className={`flex items-center justify-center gap-2 py-3 rounded font-black text-xs uppercase tracking-[0.2em] transition-all border ${valveOpen ? 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700' : 'bg-emerald-500 text-white border-emerald-400'}`}
                                onClick={() => setValveOpen(true)}
                            >
                                <Power size={16} /> Open Distribution
                            </button>
                            <button
                                disabled={systemLock}
                                className={`flex items-center justify-center gap-2 py-3 rounded font-black text-xs uppercase tracking-[0.2em] transition-all border ${!valveOpen ? 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700' : 'bg-rose-600 text-white border-rose-500'}`}
                                onClick={() => setValveOpen(false)}
                            >
                                <RotateCw size={16} /> Nullify Flow
                            </button>
                        </div>
                    </div>

                    <div className="gov-card p-8 bg-gov-blue dark:bg-slate-900 border-none relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-10 text-white">
                            <ShieldCheck size={140} />
                        </div>
                        <div className="relative z-10">
                            <h4 className="text-xs font-black text-accent-cyan uppercase tracking-[0.2em] mb-4">Official Infrastructure Compliance</h4>
                            <div className="space-y-4">
                                <ComplianceItem label="Mechanical Inspection (ISO-9001)" status="Verified" date="Feb 12" />
                                <ComplianceItem label="Cybersecurity Hardening (Level 2)" status="Robust" date="Jan 28" />
                                <ComplianceItem label="Pump Efficiency Audit" status="Pass" date="Feb 02" />
                            </div>
                            <button className="w-full mt-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded font-bold text-[10px] uppercase tracking-widest transition-all">
                                Generate Asset Compliance Report
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ComplianceItem = ({ label, status, date }) => (
    <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-3">
            <CheckCircle2 size={14} className="text-accent-teal" />
            <span className="text-white text-xs font-bold leading-none">{label}</span>
        </div>
        <div className="text-right">
            <div className="text-accent-cyan text-[10px] font-black uppercase leading-none mb-1">{status}</div>
            <div className="text-[8px] font-medium text-white/50">{date}</div>
        </div>
    </div>
);

export default Infrastructure;
