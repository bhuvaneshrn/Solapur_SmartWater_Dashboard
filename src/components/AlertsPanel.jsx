import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Info, AlertOctagon, Clock, ShieldAlert } from "lucide-react";

const severityConfig = {
  Critical: {
    icon: AlertOctagon,
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-500/5",
    border: "border-rose-500/20",
    label: "CRITICAL BREACH"
  },
  Warning: {
    icon: AlertTriangle,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-500/5",
    border: "border-amber-500/20",
    label: "OPERATIONAL WARNING"
  },
  Low: {
    icon: Info,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-500/5",
    border: "border-blue-500/20",
    label: "SYSTEM NOTICE"
  },
};

const AlertsPanel = ({ alerts }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="gov-card flex flex-col h-[724px] overflow-hidden"
    >
      <div className="p-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-sm font-black text-gov-navy dark:text-white uppercase tracking-wider flex items-center gap-2">
            <ShieldAlert size={18} className="text-rose-600" /> Administrative Alert Log
          </h3>
          <span className="flex items-center gap-1 text-[8px] font-black text-rose-500 border border-rose-500/30 px-2 py-0.5 rounded animate-pulse">
            LIVE REGISTRY
          </span>
        </div>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-loose">Real-time incident tracking & node heartbeat</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        <AnimatePresence initial={false}>
          {alerts.map((alert) => {
            const config = severityConfig[alert.type] || severityConfig.Low;
            const Icon = config.icon;

            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className={`p-5 rounded-xl border ${config.border} ${config.bg} relative group hover:shadow-md transition-all`}
              >
                <div className="flex gap-4 relative z-10">
                  <div className={`p-2 rounded-lg bg-white dark:bg-slate-800 border ${config.border} ${config.color} h-fit shadow-sm`}>
                    <Icon size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${config.color}`}>
                        {config.label}
                      </span>
                      <span className="text-[9px] text-slate-400 font-bold flex items-center gap-1 uppercase">
                        <Clock size={10} /> {alert.time}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-200 leading-relaxed mb-3">{alert.message}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                        Ward ID: <span className="text-slate-500">{alert.zone}</span>
                      </div>
                      <div className="text-[8px] font-black text-gov-blue dark:text-accent-cyan cursor-pointer hover:underline uppercase">
                        View Node History →
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 text-center">
        <button className="text-[10px] font-black text-slate-400 hover:text-gov-navy dark:hover:text-white transition-all uppercase tracking-[0.3em]">
          Access Historical Registry Log
        </button>
      </div>
    </motion.div>
  );
};

export default AlertsPanel;
