import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Map as MapIcon,
    ShieldCheck,
    AlertTriangle,
    Droplets,
    Activity,
    Users,
    ChevronRight,
    Info,
    Maximize2,
    Filter
} from "lucide-react";
import LiveMap from "../components/LiveMap";
import { SMC_ZONES } from "../data/solapurMockData";

const ZonesOverview = () => {
    const [selectedZone, setSelectedZone] = useState(null);

    const getStatusColor = (status) => {
        switch (status) {
            case 'OPTIMAL': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
            case 'NOMINAL': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
            case 'DEGRADED': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
            case 'CRITICAL': return 'text-rose-500 bg-rose-500/10 border-rose-500/20';
            default: return 'text-slate-500 bg-slate-500/10 border-slate-500/20';
        }
    };

    return (
        <div className="space-y-8 pb-12">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-6 bg-india-saffron rounded-full" />
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Panel: GIS-MAP-MONITOR-04</h4>
                    </div>
                    <h1 className="text-3xl font-black text-gov-navy dark:text-white tracking-tight">Zone Monitoring & Ward Assessment</h1>
                    <p className="text-sm text-slate-500 font-medium">Visualizing Solapur's water distribution architecture and node-level health</p>
                </div>

                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                        <Filter size={14} /> Layer Selection
                    </button>
                    <button className="gov-button-primary !py-2 flex items-center gap-2 text-xs">
                        <Maximize2 size={14} /> Full Map View
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                {/* Sidebar: Zone List */}
                <div className="xl:col-span-1 space-y-4">
                    <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm flex flex-col h-[700px]">
                        <div className="bg-slate-50 dark:bg-slate-800/50 px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                            <h3 className="text-[10px] font-black text-gov-navy dark:text-white uppercase tracking-[0.2em]">Active Ward Registry</h3>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                            {SMC_ZONES.map((zone) => (
                                <motion.div
                                    key={zone.id}
                                    whileHover={{ x: 4 }}
                                    onClick={() => setSelectedZone(zone)}
                                    className={`p-4 cursor-pointer transition-all border-2 rounded-lg ${selectedZone?.id === zone.id
                                        ? 'border-gov-blue bg-blue-50/10 dark:bg-blue-900/10'
                                        : 'border-slate-50 dark:border-slate-800 bg-white dark:bg-slate-900'}`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{zone.officialId}</span>
                                        <div className={`w-2 h-2 rounded-full ${zone.infrastructureStatus === 'OPTIMAL' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                    </div>
                                    <h4 className="text-[11px] font-black text-gov-navy dark:text-white mb-3 uppercase tracking-tight">{zone.name.split(': ')[1]}</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="flex flex-col">
                                            <span className="text-[8px] font-bold text-slate-400 uppercase">Pressure</span>
                                            <span className="text-[10px] font-black text-slate-700 dark:text-slate-300">{zone.pressure} bar</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[8px] font-bold text-slate-400 uppercase">Efficiency</span>
                                            <span className="text-[10px] font-black text-emerald-600">{zone.operationalEfficiency}%</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Global GIS Map Panel */}
                <div className="xl:col-span-3">
                    <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm h-[700px] relative">
                        <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-3 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <h3 className="text-[10px] font-black text-gov-navy dark:text-white uppercase tracking-[0.2em]">Municipal GIS Spatiotemporal Node Feed</h3>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Live Telemetry</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-full w-full">
                            <LiveMap zones={SMC_ZONES} setSelectedZone={setSelectedZone} />

                            {/* Map Overlay Info */}
                            <div className="absolute bottom-12 left-6 z-[1000] space-y-3">
                                <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-5 rounded-lg border-2 border-slate-100 dark:border-slate-800 shadow-2xl max-w-xs">
                                    <h5 className="text-[10px] font-black text-gov-navy dark:text-accent-cyan uppercase tracking-[0.2em] mb-4 border-b border-slate-50 dark:border-slate-800 pb-2">Symbology Legend</h5>
                                    <div className="space-y-3">
                                        <LegendItem color="bg-emerald-500" label="Optimum Flux Node" />
                                        <LegendItem color="bg-blue-500" label="Nominal Regulation Point" />
                                        <LegendItem color="bg-amber-500" label="Active Intervention Zone" />
                                        <LegendItem color="bg-rose-500" label="Emergency Actuation Point" />
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Selected Zone Detail Overlay */}
                        <AnimatePresence>
                            {selectedZone && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, x: 20 }}
                                    animate={{ opacity: 1, scale: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, x: 20 }}
                                    className="absolute top-6 right-6 z-[1000] w-80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-2 border-slate-100 dark:border-slate-800 rounded-xl shadow-2xl p-6"
                                >
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <div className="text-[9px] font-black text-slate-400 uppercase mb-1">{selectedZone.officialId}</div>
                                            <h4 className="text-lg font-black text-gov-navy dark:text-white leading-tight uppercase tracking-tight">{selectedZone.name.split(': ')[1]}</h4>
                                        </div>
                                        <button onClick={() => setSelectedZone(null)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors text-slate-400 hover:text-gov-navy dark:hover:text-white">
                                            <ChevronRight size={20} />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                                            <div className="text-[8px] font-bold text-slate-400 uppercase mb-1">Current Pressure</div>
                                            <div className="text-xl font-black text-gov-blue dark:text-accent-cyan">{selectedZone.pressure} <span className="text-[10px]">bar</span></div>
                                        </div>
                                        <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                                            <div className="text-[8px] font-bold text-slate-400 uppercase mb-1">Leak Probability</div>
                                            <div className={`text-xl font-black ${selectedZone.leakProbability > 30 ? 'text-rose-500' : 'text-emerald-500'}`}>{selectedZone.leakProbability}%</div>
                                        </div>
                                    </div>

                                    <div className="space-y-4 mb-6">
                                        <div className="flex items-center justify-between text-[10px] font-black uppercase">
                                            <span className="text-slate-500">Asset Integrity Index</span>
                                            <span className="text-gov-navy dark:text-white">{selectedZone.assetHealth}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${selectedZone.assetHealth}%` }}
                                                className={`h-full ${selectedZone.assetHealth > 80 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : selectedZone.assetHealth > 50 ? 'bg-amber-500' : 'bg-rose-500'}`}
                                            />
                                        </div>
                                    </div>

                                    <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg mb-6">
                                        <h5 className="flex items-center gap-2 text-[10px] font-black text-amber-600 uppercase mb-2">
                                            <AlertTriangle size={12} /> Registry Advisory
                                        </h5>
                                        <p className="text-[10px] text-slate-600 dark:text-slate-400 leading-relaxed italic font-medium">
                                            "{selectedZone.recommendation}"
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-700 flex items-center justify-center text-slate-400 shadow-sm">
                                            <Users size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase leading-none mb-1">Ward Authority</p>
                                            <p className="text-xs font-black text-gov-navy dark:text-white uppercase tracking-tighter leading-none">{selectedZone.wardOfficer}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

const LegendItem = ({ color, label }) => (
    <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500 uppercase">
        <div className={`w-2 h-2 rounded-full ${color}`} />
        <span>{label}</span>
    </div>
);

export default ZonesOverview;
