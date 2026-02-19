import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    AlertOctagon,
    AlertTriangle,
    Info,
    Filter,
    Search,
    Clock,
    User,
    MapPin,
    ChevronRight,
    ShieldCheck,
    CheckCircle2,
    MoreHorizontal,
    Plus
} from "lucide-react";
import { INCIDENT_LOGS } from "../data/solapurMockData";

const Alerts = () => {
    const [filter, setFilter] = useState("ALL");
    const [selectedIncident, setSelectedIncident] = useState(null);

    const getSeverityStyle = (severity) => {
        switch (severity) {
            case 'CRITICAL': return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
            case 'MODERATE': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
            case 'LOW': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'OPEN': return 'bg-rose-500 text-white shadow-lg shadow-rose-500/20';
            case 'UNDER REVIEW': return 'bg-amber-500 text-white shadow-lg shadow-amber-500/20';
            case 'RESOLVED': return 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20';
            default: return 'bg-slate-500 text-white';
        }
    };

    return (
        <div className="space-y-8 pb-12">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-6 bg-india-saffron rounded-full" />
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Registry: INC-MANAGER-LVL3</h4>
                    </div>
                    <h1 className="text-3xl font-black text-gov-navy dark:text-white tracking-tight">Incident Management & Response</h1>
                    <p className="text-sm text-slate-500 font-medium">Tracking distribution failures, maintenance logs, and asset repair status city-wide</p>
                </div>

                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                        <Filter size={14} /> Filter Status
                    </button>
                    <button className="gov-button-primary !py-2 flex items-center gap-2 text-xs">
                        <Plus size={14} /> New Incident Log
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Incident List */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800">
                        {["ALL", "OPEN", "UNDER REVIEW", "RESOLVED"].map((s) => (
                            <button
                                key={s}
                                onClick={() => setFilter(s)}
                                className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${filter === s ? 'bg-gov-navy dark:bg-slate-800 text-white' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
                            >
                                {s}
                            </button>
                        ))}
                        <div className="ml-auto pr-4 flex items-center gap-2 text-slate-400">
                            <Search size={14} />
                            <input type="text" placeholder="ID / Ward Search..." className="bg-transparent border-none outline-none text-[10px] font-bold uppercase w-32" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        {INCIDENT_LOGS.filter(i => filter === "ALL" || i.status === filter).map((incident) => (
                            <motion.div
                                key={incident.id}
                                layout
                                onClick={() => setSelectedIncident(incident)}
                                className={`gov-card p-6 cursor-pointer border-l-4 transition-all hover:bg-slate-50/50 dark:hover:bg-slate-900/50 ${selectedIncident?.id === incident.id ? 'border-l-gov-blue ring-1 ring-gov-blue/20 bg-slate-50/50 dark:bg-slate-900/50' : 'border-l-transparent'}`}
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className={`p-3 rounded-xl border ${getSeverityStyle(incident.severity)}`}>
                                            {incident.severity === 'CRITICAL' ? <AlertOctagon size={24} /> : incident.severity === 'MODERATE' ? <AlertTriangle size={24} /> : <Info size={24} />}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{incident.id}</span>
                                                <span className="text-[10px] font-black text-gov-blue dark:text-accent-cyan uppercase">{incident.category}</span>
                                            </div>
                                            <h3 className="text-base font-black text-gov-navy dark:text-white leading-tight mb-2">{incident.location}</h3>
                                            <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                                                <span className="flex items-center gap-1"><Clock size={12} /> {incident.timestamp}</span>
                                                <span className="flex items-center gap-1"><User size={12} /> Officer: {incident.assignedOfficer}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusStyle(incident.status)}`}>
                                            {incident.status}
                                        </div>
                                        <div className="p-2 text-slate-400 hover:text-gov-navy dark:hover:text-white transition-colors">
                                            <MoreHorizontal size={20} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Resolution tracking panel */}
                <div className="space-y-8">
                    <AnimatePresence mode="wait">
                        {selectedIncident ? (
                            <motion.div
                                key={selectedIncident.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="gov-card p-8 space-y-8"
                            >
                                <div className="pb-6 border-b border-slate-100 dark:border-slate-800">
                                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Incident Deep-Dive</h3>
                                    <h4 className="text-xl font-black text-gov-navy dark:text-white mb-2">{selectedIncident.id} Assessment</h4>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-loose">
                                        Current Integrity Rating: <span className={selectedIncident.severity === 'CRITICAL' ? 'text-rose-500' : 'text-amber-500'}>ACTION REQUIRED</span>
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Resolution Timeline</h5>
                                        <div className="space-y-4 border-l-2 border-slate-100 dark:border-slate-800 ml-2 pl-6">
                                            <TimelineItem status="Reported" time="10:42 AM" desc="Automated telemetry breach detected at Node SM-32." current />
                                            <TimelineItem status="Assigned" time="11:15 AM" desc="Officer R. Gaikwad assigned for investigation." />
                                            <TimelineItem status="Audit" time="1:30 PM" desc="Flow-meter variance confirmed. Illegal tapping suspected." />
                                            <TimelineItem status="Enforcement" time="Pending" desc="Police coordination requested for node inspection." inactive />
                                        </div>
                                    </div>

                                    <div>
                                        <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Technical Impact Assessment</h5>
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <ImpactMetric label="Pressure Drop" value="-1.2 bar" color="text-rose-500" />
                                            <ImpactMetric label="NRW Est. Loss" value="4.2 MLD" color="text-amber-500" />
                                            <ImpactMetric label="Pop. Affected" value="12,400" color="text-gov-navy dark:text-white" />
                                            <ImpactMetric label="SLA Deadline" value="14:30 IST" color="text-gov-blue dark:text-accent-cyan" />
                                        </div>

                                        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-[8px] font-black text-rose-500 uppercase tracking-widest">Escalation Phase: II</span>
                                                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Auto-Escalation in 45m</span>
                                            </div>
                                            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium italic leading-relaxed">
                                                "Throttle inlet valves SM-32A and SM-32B to 15% capacity to prevent secondary surge damage during ward-level enforcement action."
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                                        <button className="w-full gov-button-primary !py-3 flex items-center justify-center gap-2 mb-3 shadow-xl">
                                            <ShieldCheck size={18} /> Acknowledge & Assign Task
                                        </button>
                                        <button className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 py-3 rounded font-bold text-xs uppercase tracking-widest transition-all">
                                            Archive Incident Log
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="gov-card p-12 text-center flex flex-col items-center justify-center min-h-[500px]">
                                <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300 dark:text-slate-600 mb-6">
                                    <CheckCircle2 size={40} />
                                </div>
                                <h4 className="text-base font-black text-gov-navy dark:text-white uppercase tracking-widest mb-3">No Entry Selected</h4>
                                <p className="text-xs text-slate-500 font-bold uppercase max-w-xs leading-loose">
                                    Select an incident from the log to view detailed resolution timeline and operational advisories.
                                </p>
                            </div>
                        )}
                    </AnimatePresence>

                    {/* Health Summary Card */}
                    <div className="gov-card p-6 bg-gov-navy dark:bg-slate-900 overflow-hidden relative border-none">
                        <div className="absolute top-0 right-0 p-10 opacity-10 text-white">
                            <ShieldCheck size={120} />
                        </div>
                        <h4 className="text-xs font-black text-india-saffron uppercase tracking-[0.2em] mb-4">Official Notice</h4>
                        <p className="text-white text-sm font-bold leading-relaxed relative z-10 mb-6">
                            Solapur Municipal Corporation is currently operating at <span className="text-accent-cyan">STABLE MONITORING LEVEL (III)</span>. No city-wide outages reported in the last 72 hours.
                        </p>
                        <button className="text-[10px] font-black text-accent-teal uppercase tracking-widest hover:underline">
                            View SMC Maintenance Protocol →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TimelineItem = ({ status, time, desc, current, inactive }) => (
    <div className="relative mb-6 last:mb-0">
        <div className={`absolute -left-[31px] top-1 w-3 h-3 rounded-full border-2 border-white dark:border-gov-navy ${current ? 'bg-gov-blue shadow-[0_0_8px_rgba(59,130,246,0.5)]' : inactive ? 'bg-slate-300 dark:bg-slate-700' : 'bg-emerald-500'}`} />
        <div className="flex justify-between items-center mb-1">
            <span className={`text-[10px] font-black uppercase tracking-widest ${current ? 'text-gov-blue dark:text-accent-cyan' : inactive ? 'text-slate-400' : 'text-slate-700 dark:text-slate-300'}`}>{status}</span>
            <span className="text-[9px] font-bold text-slate-400">{time}</span>
        </div>
        <p className={`text-[10px] font-medium leading-normal ${inactive ? 'text-slate-400' : 'text-slate-500 dark:text-slate-400'}`}>{desc}</p>
    </div>
);

const ImpactMetric = ({ label, value, color }) => (
    <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700 shadow-sm">
        <span className="text-[8px] font-black text-slate-400 uppercase block mb-1">{label}</span>
        <span className={`text-xs font-black uppercase ${color}`}>{value}</span>
    </div>
);

export default Alerts;
