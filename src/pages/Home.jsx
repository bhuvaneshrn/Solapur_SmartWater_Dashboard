import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldCheck, Droplets, MapPin, Activity, ArrowRight, UserCheck } from "lucide-react";
import { MUNICIPAL_METRICS } from "../data/solapurMockData";

const Home = () => {
    return (
        <div className="space-y-16 pb-20">
            {/* Hero Section */}
            <section className="relative h-[500px] flex items-center justify-center -mt-6 -mx-6 overflow-hidden">
                <div className="absolute inset-0 bg-gov-navy z-0">
                    <img
                        src="https://images.unsplash.com/photo-1574950578143-858c6fc58922?q=80&w=2000&auto=format&fit=crop"
                        className="w-full h-full object-cover opacity-30 grayscale"
                        alt="Solapur Infrastructure"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-gov-navy/20 via-gov-navy/80 to-gov-grey dark:to-gov-navy" />
                </div>

                <div className="relative z-10 text-center px-6 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-2 mb-6"
                    >
                        <div className="gov-header-strip w-12 !h-1 rounded-full" />
                        <span className="text-white font-black tracking-[0.3em] text-xs uppercase">Government of Maharashtra</span>
                        <div className="gov-header-strip w-12 !h-1 rounded-full" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9] mb-8"
                    >
                        Smart Water Management <br /> & <span className="text-accent-cyan">Conservation Portal</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-300 text-lg md:text-xl font-medium mb-10 leading-relaxed max-w-2xl mx-auto"
                    >
                        Advanced municipal monitoring system dedicated to equitable water distribution, NRW reduction, and infrastructure longevity for Solapur City.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap justify-center gap-4"
                    >
                        <Link to="/admin" className="gov-button-primary !px-8 !py-4 flex items-center gap-2 text-lg shadow-2xl shadow-accent-blue/20">
                            <UserCheck size={20} /> Officer Login
                        </Link>
                        <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded font-bold hover:bg-white/20 transition-all flex items-center gap-2 text-lg">
                            Public Utility Map <ArrowRight size={20} />
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Key Statistics Grid */}
            <section className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 -mt-32 relative z-20">
                    <StatCard label="Total Water Supply" value={MUNICIPAL_METRICS.totalSupply} icon={Droplets} sub="Daily Average" />
                    <StatCard label="NRW Loss Target" value="25%" icon={Activity} sub="Status: Optimizing" color="text-india-saffron" />
                    <StatCard label="Active Monitoring" value="24/7" icon={ShieldCheck} sub="Real-time Node Status" />
                    <StatCard label="Wards Covered" value="48" icon={MapPin} sub="City-wide Network" />
                </div>
            </section>

            {/* Mission & Transparency */}
            <section className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-gov-navy text-white rounded flex items-center justify-center font-black">SMC</div>
                        <h2 className="text-sm font-black text-gov-navy dark:text-accent-cyan uppercase tracking-widest">Hydraulic Mission Statement</h2>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                        Guaranteeing Equitable Supply through <br /> <span className="text-gov-blue">Precision Telemetry.</span>
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                        In alignment with the <strong>National Smart City Mission</strong> and <strong>AMRUT 2.0</strong>, the Solapur Municipal Corporation is deploying this real-time monitoring bridge to resolve decades-old distribution inequities. Our priority is to eliminate 'Dry-Tap' scenarios in peripheral wards while reducing Non-Revenue Water (NRW) through intelligent leak detection.
                    </p>

                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border-l-4 border-india-saffron mb-8">
                        <h4 className="text-[10px] font-black text-gov-navy dark:text-white uppercase tracking-widest mb-2">Public Assurance Notice</h4>
                        <p className="text-[11px] text-slate-500 font-bold uppercase leading-relaxed">
                            "Transparency is our core protocol. This dashboard provides citizens and officers with the exact same data feed, ensuring accountability in water frequency and pressure stability city-wide."
                        </p>
                    </div>

                    <ul className="space-y-4 mb-10">
                        <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-bold">
                            <div className="w-5 h-5 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center"><ShieldCheck size={12} /></div>
                            100% Compliance with Municipal Disclosure Standards
                        </li>
                        <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-bold">
                            <div className="w-5 h-5 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center"><ShieldCheck size={12} /></div>
                            Zero-Variance Pressure Balancing (ZVPB) Tech
                        </li>
                        <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-bold">
                            <div className="w-5 h-5 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center"><ShieldCheck size={12} /></div>
                            Open-Data Access for Civic Research Groups
                        </li>
                    </ul>
                    <button className="gov-button-primary">View Compliance Ledger</button>
                </div>
                <div className="gov-card p-8 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 overflow-hidden relative shadow-2xl">
                    <div className="absolute top-0 right-0 p-10 opacity-5">
                        <ShieldCheck size={200} />
                    </div>
                    <div className="flex justify-between items-start mb-8 border-b border-slate-50 dark:border-slate-800 pb-4">
                        <div>
                            <h4 className="text-xs font-black text-gov-navy dark:text-white uppercase tracking-[0.2em] mb-1">Civil Defense Feed</h4>
                            <p className="text-[9px] text-slate-400 font-black uppercase">Service: Solapur Infrastructure Link</p>
                        </div>
                        <div className="px-3 py-1 bg-emerald-500 text-white rounded text-[8px] font-black uppercase tracking-widest">
                            Live Stream
                        </div>
                    </div>

                    <div className="space-y-6 relative z-10">
                        <StatusItem label="SCADA Integration" status="Locked" color="text-emerald-500" />
                        <StatusItem label="Distribution Equality" status="94% Stable" color="text-gov-blue" />
                        <StatusItem label="Network Latency" status="14ms" color="text-slate-400" />
                        <div className="h-px bg-slate-100 dark:bg-slate-800" />
                        <div className="flex items-center gap-4">
                            <div className="flex-1">
                                <span className="text-[8px] font-black text-slate-400 uppercase block mb-1">Source Stability</span>
                                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div className="w-[98%] h-full bg-emerald-500" />
                                </div>
                            </div>
                            <span className="text-[10px] font-black text-gov-navy dark:text-white">98%</span>
                        </div>
                    </div>
                    <p className="mt-8 text-[9px] text-slate-400 font-bold uppercase tracking-widest text-center border-t border-slate-50 dark:border-slate-800 pt-4">
                        Municipal Control Center: {MUNICIPAL_METRICS.lastAudit}
                    </p>
                </div>
            </section>
        </div>
    );
};

const StatusItem = ({ label, status, color }) => (
    <div className="flex justify-between items-center group">
        <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-tight">{label}</span>
        <span className={`text-[10px] font-black uppercase ${color}`}>{status}</span>
    </div>
);

const StatCard = ({ label, value, icon: Icon, sub, color }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="gov-card p-8 flex flex-col items-center text-center group"
    >
        <div className={`p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 mb-6 group-hover:bg-gov-navy group-hover:text-white transition-all duration-300`}>
            <Icon size={32} />
        </div>
        <h4 className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2">{label}</h4>
        <p className={`text-4xl font-black ${color || 'text-gov-navy dark:text-white'} mb-1`}>{value}</p>
        <p className="text-[10px] font-bold text-slate-500 uppercase">{sub}</p>
    </motion.div>
);

export default Home;
