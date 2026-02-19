import { motion } from "framer-motion";

const KPICard = ({ title, value, color, icon: Icon, trend }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="gov-card p-5 flex flex-col justify-between h-full relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        {Icon && <Icon size={32} />}
      </div>

      <div className="relative z-10">
        <h3 className="text-slate-400 dark:text-slate-500 text-[9px] uppercase tracking-[0.2em] font-black mb-2">{title}</h3>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`text-2xl font-black ${color || 'text-gov-navy dark:text-white'} tracking-tight`}
        >
          {value}
        </motion.div>
      </div>

      {trend !== undefined && (
        <div className="mt-3 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-tighter">
          <span className={`flex items-center gap-0.5 ${trend >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
            <span className="text-[12px] leading-none mb-0.5">{trend >= 0 ? "▲" : "▼"}</span>
            {Math.abs(trend)}%
          </span>
          <span className="text-slate-400 font-medium italic">Shift %</span>
        </div>
      )}

      {/* Official accent line */}
      <div className="absolute top-0 left-0 h-full w-1 bg-gov-blue/20 group-hover:bg-india-saffron transition-colors" />
    </motion.div>
  );
};

export default KPICard;
