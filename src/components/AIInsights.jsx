import { motion } from "framer-motion";
import { Sparkles, Brain, Zap, Target, ShieldCheck } from "lucide-react";

const AIInsights = ({ zones }) => {
  const insights = [
    {
      icon: Zap,
      title: "Distribution Efficiency",
      desc: "Resource allocation has stabilized. Efficiency index increased by 4.2% following nocturnal valve automation.",
      color: "text-gov-blue dark:text-accent-cyan",
      bg: "bg-gov-blue/5"
    },
    {
      icon: Target,
      title: "Predictive Maintenance",
      desc: "Structural node analysis suggests 78% probability of a mechanical seam breach in Ward 42 within 48 hours.",
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-500/5"
    },
    {
      icon: Brain,
      title: "Strategic Resolution",
      desc: "Balancing suggested: Throttle South Solapur inlet by 15% to ensure static pressure at tail-end distribution nodes.",
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/5"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="gov-card p-6 relative overflow-hidden"
    >
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-gov-blue/5 rounded-full blur-3xl" />

      <div className="flex items-center justify-between mb-8 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gov-navy dark:bg-slate-800 rounded-lg text-india-saffron shadow-sm">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="text-sm font-black text-gov-navy dark:text-white uppercase tracking-wider">Official Advisory Service</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">SMC-WATER-AI MODEL v3.1</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 rounded-full text-[9px] font-black uppercase tracking-tighter">
          <ShieldCheck size={12} /> Verified Logic
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-750 transition-all hover:shadow-md"
          >
            <div className={`p-2.5 rounded-lg w-fit mb-4 border ${insight.color} ${insight.bg}`}>
              <insight.icon size={20} />
            </div>
            <h4 className="text-xs font-black text-gov-navy dark:text-white uppercase tracking-wider mb-2">{insight.title}</h4>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed font-bold uppercase">{insight.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <button className="text-[9px] font-black text-gov-blue dark:text-accent-cyan hover:underline flex items-center gap-1 uppercase tracking-widest">
          Access Comprehensive Advisory Ledger →
        </button>
      </div>
    </motion.div>
  );
};

export default AIInsights;
