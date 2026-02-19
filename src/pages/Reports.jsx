import { useState } from "react";
import { motion } from "framer-motion";
import {
    FileCheck,
    Download,
    Search,
    FileText,
    ShieldCheck,
    FileSearch,
    History,
    Eye,
    Printer,
    ChevronRight,
    Filter,
    CheckCircle2,
    Clock
} from "lucide-react";
import { MUNICIPAL_METRICS } from "../data/solapurMockData";

const Reports = () => {
    const [activeTab, setActiveTab] = useState("Operational");

    const reportDocs = [
        { title: "Monthly Distribution Efficiency Audit", date: "Feb 01, 2024", id: "SMC-REP-842", category: "Operational", status: "VERIFIED" },
        { title: "NRW Loss Reduction Compliance", date: "Jan 15, 2024", id: "SMC-NRW-104", category: "State Compliance", status: "PENDING" },
        { title: "Infrastructure Integrity Assessment", date: "Jan 28, 2024", id: "SMC-INFRA-92", category: "Maintenance", status: "VERIFIED" },
        { title: "Smart City Mission Multi-Year Audit", date: "Dec 30, 2023", id: "SMC-SCM-005", category: "Strategy", status: "ARCHIVED" },
        { title: "Zone-Level Ward Resource Report", date: "Feb 10, 2024", id: "SMC-ZONE-77", category: "Operational", status: "REVIEW" },
    ];

    return (
        <div className="space-y-8 pb-20">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-6 bg-india-saffron rounded-full" />
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Registry: SMC-VAULT-2024</h4>
                    </div>
                    <h1 className="text-3xl font-black text-gov-navy dark:text-white tracking-tight">Reports & State Compliance</h1>
                    <p className="text-sm text-slate-500 font-medium">Official municipal documentation, audit logs, and smart city mission compliance summary</p>
                </div>

                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                        <FileSearch size={14} /> Global Audit Search
                    </button>
                    <button className="gov-button-primary !py-2 flex items-center gap-2 text-xs">
                        <Printer size={14} /> Print Registry Log
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                {/* Statistics / Quick Compliance View */}
                <div className="xl:col-span-1 space-y-6">
                    <div className="gov-card p-8 bg-gov-navy dark:bg-slate-900 border-none relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-10 text-white">
                            <ShieldCheck size={120} />
                        </div>
                        <div className="relative z-10">
                            <h4 className="text-[10px] font-black text-india-saffron uppercase tracking-[0.2em] mb-4">Compliance Rating</h4>
                            <div className="text-4xl font-black text-white mb-2">92%</div>
                            <p className="text-[10px] font-bold text-accent-cyan uppercase tracking-widest mb-6">Class-A Municipal Performance</p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 size={12} className="text-emerald-500" />
                                    <span className="text-white text-[10px] uppercase font-bold">State Audit 2023 Completed</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 size={12} className="text-emerald-500" />
                                    <span className="text-white text-[10px] uppercase font-bold">NRW Target Met (Ward-level)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="gov-card p-6">
                        <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6 border-b border-slate-100 dark:border-slate-800 pb-3">Operational Summary</h4>
                        <div className="space-y-6">
                            <MetricRow label="Total Reports Filed" value="1,242" />
                            <MetricRow label="Pending Verification" value="14" />
                            <MetricRow label="Audit Discrepancies" value="0%" />
                            <MetricRow label="Last Update" value={MUNICIPAL_METRICS.lastAudit} />
                        </div>
                    </div>

                    <div className="gov-card p-6 bg-slate-50 dark:bg-slate-800 border-dashed">
                        <div className="flex flex-col items-center text-center p-4">
                            <div className="w-12 h-12 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center mb-4 text-gov-blue">
                                <Download size={24} />
                            </div>
                            <h5 className="text-xs font-black text-gov-navy dark:text-white uppercase mb-2">Generate Smart Audit</h5>
                            <p className="text-[9px] text-slate-500 font-bold uppercase leading-relaxed mb-6">
                                Synthesize the last 30 days of telemetry into a formal Board-ready PDF assessment.
                            </p>
                            <button className="w-full py-2 bg-gov-navy hover:bg-gov-blue text-white rounded text-[10px] font-black uppercase tracking-widest transition-all">
                                Initiate Audit Logic
                            </button>
                        </div>
                    </div>
                </div>

                {/* Document Vault View */}
                <div className="xl:col-span-3 space-y-6">
                    <div className="gov-card h-full min-h-[600px] flex flex-col">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <div className="flex gap-8">
                                {["Operational", "State Compliance", "Audit Logs", "Strategy"].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`text-[10px] font-black uppercase tracking-widest pb-6 -mb-6 relative transition-all ${activeTab === tab ? 'text-gov-navy dark:text-white' : 'text-slate-400 hover:text-gov-navy dark:hover:text-white'}`}
                                    >
                                        {tab}
                                        {activeTab === tab && (
                                            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gov-navy dark:bg-accent-cyan" />
                                        )}
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-all">
                                    <Filter size={16} className="text-slate-400" />
                                </button>
                                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-all">
                                    <History size={16} className="text-slate-400" />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1">
                            <div className="p-6">
                                <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Registry Results: {activeTab} Classification</h5>
                                <div className="space-y-4">
                                    {reportDocs.map((doc, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex items-center justify-between p-5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-xl hover:shadow-lg transition-all group"
                                        >
                                            <div className="flex items-center gap-6">
                                                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg text-slate-400 group-hover:text-gov-blue transition-colors">
                                                    <FileText size={24} />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{doc.id}</span>
                                                        <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border ${doc.status === 'VERIFIED' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-200' : 'bg-amber-500/10 text-amber-600 border-amber-200'}`}>
                                                            {doc.status}
                                                        </span>
                                                    </div>
                                                    <h4 className="text-sm font-black text-gov-navy dark:text-white transition-colors">{doc.title}</h4>
                                                    <div className="text-[10px] text-slate-500 font-bold uppercase flex items-center gap-4 mt-2">
                                                        <span className="flex items-center gap-1"><Clock size={12} /> Filed on {doc.date}</span>
                                                        <span className="flex items-center gap-1"><ShieldCheck size={12} /> Digital Ledger Verified</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-gov-navy hover:text-white rounded-lg transition-all">
                                                    <Eye size={18} />
                                                </button>
                                                <button className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-gov-navy hover:text-white rounded-lg transition-all">
                                                    <Download size={18} />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto p-6 bg-slate-50 dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            <div>Showing {reportDocs.length} archived documents in the digital registry.</div>
                            <div className="flex gap-4">
                                <button className="hover:text-gov-navy transition-colors">Previous</button>
                                <button className="hover:text-gov-navy transition-colors">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const MetricRow = ({ label, value }) => (
    <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-900 p-3 rounded border border-slate-100 dark:border-slate-800/50">
        <span className="text-[10px] font-black text-slate-400 uppercase">{label}</span>
        <span className="text-xs font-black text-gov-navy dark:text-white leading-none">{value}</span>
    </div>
);

export default Reports;
