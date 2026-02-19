import { motion, AnimatePresence } from "framer-motion";
import { X, Droplets, Activity, ShieldAlert, Calendar, MapPin, BrainCircuit, ShieldCheck, User } from "lucide-react";

const ZoneDetailsPanel = ({ zone, onClose }) => {
  if (!zone) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[2000] flex justify-end pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-gov-navy/20 dark:bg-black/60 backdrop-blur-sm pointer-events-auto"
        />

        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative w-full max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 h-full shadow-2xl pointer-events-auto flex flex-col"
        >
          {/* Header */}
          <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950/50">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={14} className="text-gov-blue" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Ward Assessment Intel</span>
              </div>
              <h2 className="text-xl font-black text-gov-navy dark:text-white uppercase tracking-tight">{zone.name}</h2>
              <div className="text-[10px] font-black text-gov-blue dark:text-accent-cyan mt-1 uppercase tracking-widest">{zone.officialId}</div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-400"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
            {/* Status & Health */}
            <div className="grid grid-cols-2 gap-6">
              <div className="gov-card p-5 bg-slate-50 dark:bg-slate-800/50 border-none shadow-none">
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-2">Integrity Score</p>
                <div className="flex items-center justify-between">
                  <span className={`text-2xl font-black ${zone.assetHealth > 80 ? 'text-emerald-500' : 'text-amber-500'}`}>
                    {zone.assetHealth}%
                  </span>
                  <div className={`p-2 rounded-lg ${zone.assetHealth > 80 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                    <ShieldCheck size={18} />
                  </div>
                </div>
              </div>
              <div className="gov-card p-5 bg-slate-50 dark:bg-slate-800/50 border-none shadow-none">
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-2">Leak Risk</p>
                <div className="flex items-center justify-between">
                  <span className={`text-2xl font-black ${zone.leakProbability > 30 ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {zone.leakProbability}%
                  </span>
                  <div className={`p-2 rounded-lg ${zone.leakProbability > 30 ? 'bg-rose-500/10 text-rose-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                    <ShieldAlert size={18} />
                  </div>
                </div>
              </div>
            </div>

            {/* Pressure Gauge Visualization */}
            <div className="bg-slate-50 dark:bg-slate-950/30 p-8 rounded-2xl border border-slate-100 dark:border-slate-800/50 flex flex-col items-center">
              <div className="relative w-48 h-24 overflow-hidden mb-4">
                <div className="absolute top-0 left-0 w-48 h-48 border-[10px] border-slate-100 dark:border-slate-800 rounded-full" />
                <motion.div
                  initial={{ rotate: -90 }}
                  animate={{ rotate: -90 + (zone.pressure / 5) * 180 }}
                  className="absolute top-0 left-0 w-48 h-48 border-[10px] border-transparent border-t-gov-blue dark:border-t-accent-cyan rounded-full transition-transform duration-1000"
                />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
                  <span className="text-4xl font-black text-gov-navy dark:text-white tracking-tighter">{zone.pressure}</span>
                  <span className="text-[10px] text-slate-400 font-bold block -mt-1 uppercase tracking-widest">Bar</span>
                </div>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Live Inlet Pressure</p>
            </div>

            {/* Technical Metrics List */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 dark:border-slate-800 pb-3">Ward Inventory Specs</h3>
              <div className="space-y-4">
                <MetricRow label="Ward Officer" value={zone.wardOfficer} />
                <MetricRow label="Target Pressure" value="1.8 bar" />
                <MetricRow label="Operational Index" value={`${zone.operationalEfficiency}%`} />
                <MetricRow label="Infrastructure Mode" value={zone.infrastructureStatus} />
              </div>
            </div>

            {/* AI Advisory Panel */}
            <div className="p-6 bg-gov-navy dark:bg-slate-950 border-none rounded-2xl relative overflow-hidden">
              <div className="absolute -right-6 -top-6 text-white opacity-5">
                <BrainCircuit size={100} />
              </div>
              <div className="flex items-center gap-2 mb-4">
                <BrainCircuit size={16} className="text-india-saffron" />
                <h3 className="text-[10px] font-black text-white uppercase tracking-widest">Official AI Advisory</h3>
              </div>
              <p className="text-xs text-white/90 leading-relaxed italic font-medium">
                "{zone.recommendation}"
              </p>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-8 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex gap-4">
            <button className="flex-1 gov-button-primary !py-4 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest shadow-xl">
              Acknowledge Report
            </button>
            <button className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 transition-all text-slate-500">
              <Activity size={20} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const MetricRow = ({ label, value }) => (
  <div className="flex justify-between items-center bg-white dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
    <span className="text-xs font-black text-gov-navy dark:text-white uppercase">{value}</span>
  </div>
);

export default ZoneDetailsPanel;
