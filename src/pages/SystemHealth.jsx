import { motion } from "framer-motion";
import {
    ShieldCheck,
    Cpu,
    Battery,
    Radio,
    Server,
    Activity,
    AlertCircle,
    Network,
    Zap,
    Globe
} from "lucide-react";
import { MUNICIPAL_METRICS } from "../data/solapurMockData";

const SystemHealth = () => {
    const components = [
        { name: "Primary Pressure Nodes (SHT-1/8)", status: "OPERATIONAL", health: 98, icon: Activity, load: "Medium" },
        { name: "Industrial Actuator Hubs", status: "OPERATIONAL", health: 94, icon: Cpu, load: "Stable" },
        { name: "City-wide Flow Metering Relay", status: "DEGRADED", health: 65, icon: Radio, issues: 1, load: "High" },
        { name: "Central Command Server (SMC-CC)", status: "OPERATIONAL", health: 100, icon: Server, load: "Low" },
        { name: "Auxiliary Power Backup Rails", status: "STANDBY", health: 88, icon: Battery, load: "None" },
    ];

    return (
        <div className="space-y-8 pb-20">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-6 bg-india-saffron rounded-full" />
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Registry: SMC-SYS-HEALTH-3A</h4>
                    </div>
                    <h1 className="text-3xl font-black text-gov-navy dark:text-white tracking-tight">Infrastructure Integrity & Sensor Network</h1>
                    <p className="text-sm text-slate-500 font-medium">Real-time assessment of municipal digital assets and hardware telemetry status</p>
                </div>

                <div className="flex gap-3">
                    <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-600 border border-emerald-200 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest">
                        <ShieldCheck size={14} /> System Secure
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Network Nodes List */}
                <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1 pb-2">Active Infrastructure Nodes</h3>
                    {components.map((comp, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="gov-card p-5 flex items-center justify-between group"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-xl ${comp.health > 80 ? 'bg-slate-50 dark:bg-slate-800 text-gov-blue dark:text-accent-cyan' : 'bg-rose-500/10 text-rose-500'}`}>
                                    <comp.icon size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-xs text-gov-navy dark:text-white mb-1 uppercase tracking-tight">{comp.name}</h4>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{comp.status}</span>
                                        <span className="text-[9px] font-bold text-slate-400 italic">• Load: {comp.load}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-8">
                                {comp.issues > 0 && (
                                    <div className="flex items-center gap-1.5 text-rose-600 font-black text-[9px] bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20 uppercase">
                                        <AlertCircle size={10} /> Latency Variance
                                    </div>
                                )}
                                <div className="text-right">
                                    <p className={`text-xl font-black ${comp.health > 80 ? 'text-gov-navy dark:text-white' : 'text-rose-600'}`}>
                                        {comp.health}%
                                    </p>
                                    <div className="w-24 h-1 bg-slate-100 dark:bg-slate-800 rounded-full mt-1 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${comp.health}%` }}
                                            className={`h-full ${comp.health > 80 ? 'bg-gov-blue dark:bg-accent-cyan' : 'bg-rose-500'}`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Holistic Integrity Overview */}
                <div className="space-y-8">
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1 pb-2">Central Node Diagnostics</h3>
                    <div className="gov-card p-8 flex flex-col items-center justify-center text-center relative overflow-hidden h-full min-h-[440px]">
                        {/* Saffron Strip */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-india-saffron" />

                        <div className="relative mb-8">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="w-56 h-56 rounded-full border-4 border-slate-100 dark:border-slate-800 border-t-gov-blue dark:border-t-accent-cyan flex items-center justify-center opacity-40"
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <ShieldCheck size={56} className="text-emerald-500 mb-3" />
                                <span className="text-5xl font-black text-gov-navy dark:text-white tracking-tighter">94.8</span>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Official Index</span>
                            </div>
                        </div>

                        <h4 className="text-lg font-black text-gov-navy dark:text-white uppercase tracking-wider mb-3">SMC INFRASTRUCTURE INTEGRITY</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed font-medium">
                            Consolidated health metric based on sensor uptime, response latency, and mechanical feedback loops across all 48 municipal wards.
                        </p>

                        <div className="mt-10 flex gap-4 w-full px-6">
                            <div className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl">
                                <Network size={20} className="text-gov-blue mb-2 mx-auto" />
                                <div className="text-[10px] font-black text-gov-navy dark:text-white uppercase mb-1">Grid Uptime</div>
                                <div className="text-xs font-bold text-slate-500">99.9%</div>
                            </div>
                            <div className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl">
                                <Zap size={20} className="text-amber-500 mb-2 mx-auto" />
                                <div className="text-[10px] font-black text-gov-navy dark:text-white uppercase mb-1">Energy Loss</div>
                                <div className="text-xs font-bold text-slate-500">4.2%</div>
                            </div>
                            <div className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl">
                                <Globe size={20} className="text-emerald-600 mb-2 mx-auto" />
                                <div className="text-[10px] font-black text-gov-navy dark:text-white uppercase mb-1">Connectivity</div>
                                <div className="text-xs font-bold text-slate-500">Robust</div>
                            </div>
                        </div>

                        <button className="mt-8 text-[10px] font-black text-gov-blue dark:text-accent-cyan hover:underline tracking-widest uppercase">
                            Download Full Security Log (SEC-6) →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SystemHealth;
