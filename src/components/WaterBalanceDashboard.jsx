import { motion } from "framer-motion";
import { ArrowRight, Droplets, Home, Factory, Trash2, Gauge } from "lucide-react";
import { WATER_BALANCE_DATA } from "../data/solapurMockData";

const WaterBalanceDashboard = () => {
    const { source, treatment, transmissionLoss, distributionLoss, householdConsumption, unaccounted } = WATER_BALANCE_DATA;
    const totalLoss = transmissionLoss + distributionLoss + unaccounted;
    const lossPercentage = ((totalLoss / source) * 100).toFixed(1);

    return (
        <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gov-navy dark:text-white leading-none">City Water Balance Model</h3>
                    <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">SMC-HYDRAULIC-FLOW-AUDIT</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                        <span className="text-[9px] font-black text-rose-600 uppercase tracking-widest">Live Loss Meter: {lossPercentage}%</span>
                    </div>
                </div>
            </div>

            <div className="p-8">
                <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 max-w-4xl mx-auto py-12">

                    {/* Source */}
                    <BalanceNode
                        icon={Droplets}
                        label="Raw Source"
                        value={`${source} MLD`}
                        sub="Ujani Dam"
                        color="bg-gov-blue"
                    />

                    <FlowArrow />

                    {/* Treatment */}
                    <BalanceNode
                        icon={Factory}
                        label="WTP Yield"
                        value={`${treatment} MLD`}
                        sub="98.1% Yield"
                        color="bg-gov-navy"
                        loss={`-${source - treatment} MLD`}
                    />

                    <FlowArrow />

                    {/* Distribution Network */}
                    <div className="relative">
                        <BalanceNode
                            icon={Gauge}
                            label="Primary Dist"
                            value={`${treatment - transmissionLoss} MLD`}
                            sub="ESR Hubs"
                            color="bg-blue-600"
                            loss={`-${transmissionLoss} MLD Loss`}
                        />

                        {/* Branch out to Loss */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center"
                        >
                            <div className="w-px h-12 bg-rose-200 dark:bg-rose-900/50 dashed" />
                            <div className="p-3 bg-rose-50 dark:bg-rose-900/20 rounded-lg border border-rose-100 dark:border-rose-900/30 text-center min-w-[120px]">
                                <div className="flex justify-center mb-1 text-rose-500"><Trash2 size={14} /></div>
                                <span className="text-[8px] font-black text-rose-400 uppercase block">NRW Leakage</span>
                                <span className="text-xs font-black text-rose-600">{distributionLoss} MLD</span>
                            </div>
                        </motion.div>
                    </div>

                    <FlowArrow />

                    {/* Household */}
                    <BalanceNode
                        icon={Home}
                        label="End Delivery"
                        value={`${householdConsumption} MLD`}
                        sub="Municipal Taps"
                        color="bg-emerald-600"
                    />
                </div>

                <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatBox label="Total Input" value={`${source} MLD`} />
                    <StatBox label="Billed Water" value={`${householdConsumption} MLD`} />
                    <StatBox label="Technical Loss" value={`${transmissionLoss + distributionLoss} MLD`} color="text-rose-500" />
                    <StatBox label="Unaccounted" value={`${unaccounted} MLD`} color="text-amber-500" />
                </div>
            </div>
        </div>
    );
};

const BalanceNode = ({ icon: Icon, label, value, sub, color, loss }) => (
    <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative flex flex-col items-center group"
    >
        <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center text-white shadow-lg z-10 border-4 border-white dark:border-slate-900`}>
            <Icon size={24} />
        </div>
        <div className="mt-3 text-center">
            <span className="text-[10px] font-black text-gov-navy dark:text-white uppercase tracking-tighter block">{label}</span>
            <span className="text-xs font-black text-slate-500 block">{value}</span>
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{sub}</span>
        </div>
        {loss && (
            <div className="absolute -top-6 text-[9px] font-black text-rose-500 uppercase whitespace-nowrap bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-rose-100 dark:border-rose-800">
                {loss}
            </div>
        )}
    </motion.div>
);

const FlowArrow = () => (
    <div className="hidden md:flex items-center text-slate-200 dark:text-slate-800">
        <ArrowRight size={20} className="animate-pulse" />
    </div>
);

const StatBox = ({ label, value, color = "text-gov-navy dark:text-white" }) => (
    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
        <span className="text-[8px] font-black text-slate-400 uppercase block mb-1">{label}</span>
        <span className={`text-sm font-black uppercase ${color}`}>{value}</span>
    </div>
);

export default WaterBalanceDashboard;
