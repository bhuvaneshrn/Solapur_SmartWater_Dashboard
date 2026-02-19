import { motion } from "framer-motion";
import { Power, RotateCw, ShieldCheck, Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const ValveControl = ({ valveOpen, setValveOpen, disabled }) => {
  const [isRotating, setIsRotating] = useState(false);
  const [showRebalancing, setShowRebalancing] = useState(false);

  const handleToggle = () => {
    if (disabled) return;
    setIsRotating(true);
    setShowRebalancing(true);

    // Simulate rebalancing sequence
    setTimeout(() => {
      setValveOpen(!valveOpen);
      setIsRotating(false);
      setTimeout(() => setShowRebalancing(false), 2000);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-sm"
    >
      {showRebalancing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gov-navy/90 dark:bg-slate-950/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-6"
        >
          <div className="w-12 h-12 border-4 border-india-saffron border-t-transparent rounded-full animate-spin mb-4" />
          <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-2">Automated Pressure Correction</h4>
          <div className="flex items-center gap-4 mt-2">
            <div className="text-center">
              <span className="text-[8px] text-slate-400 uppercase block">Before</span>
              <span className="text-sm font-black text-rose-400">0.8 bar</span>
            </div>
            <ArrowRight size={14} className="text-white opacity-40" />
            <div className="text-center">
              <span className="text-[8px] text-slate-400 uppercase block">Target</span>
              <span className="text-sm font-black text-emerald-400">1.8 bar</span>
            </div>
          </div>
          <p className="text-[9px] text-slate-300 mt-4 uppercase font-bold tracking-widest">Rebalancing Network Nodes...</p>
        </motion.div>
      )}

      <div className="absolute top-4 left-4 flex items-center gap-2">
        <div className={`w-1.5 h-1.5 rounded-full ${valveOpen ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
        <span className="text-[9px] uppercase font-black text-slate-400 tracking-widest">Actuator Unit Ref: SMC-V1</span>
      </div>

      <div className="relative mb-6 mt-6">
        <motion.div
          animate={isRotating ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className={`p-10 rounded-full border-2 transition-colors duration-500 ${valveOpen
            ? 'border-emerald-500/20 bg-emerald-500/5'
            : 'border-rose-500/20 bg-rose-500/5'
            }`}
        >
          <RotateCw size={40} className={valveOpen ? 'text-emerald-500' : 'text-rose-500'} />
        </motion.div>
      </div>

      <h3 className="text-xs font-black text-gov-navy dark:text-white uppercase tracking-wider mb-2">Municipal Supply Actuator</h3>
      <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-6 max-w-[200px] leading-relaxed">
        Section A: Solapur Bypass Trunk. Authorization level: OFFICER-3
      </p>

      <button
        onClick={handleToggle}
        disabled={isRotating || disabled}
        className={`w-full py-3 rounded font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all active:scale-95 border ${disabled ? 'opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700' : valveOpen
          ? 'bg-rose-600 text-white border-rose-500 hover:bg-rose-700'
          : 'bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-700'
          }`}
      >
        <Power size={14} />
        {isRotating ? "EXECUTING..." : valveOpen ? "SHUTDOWN AUTHORIZATION" : "INITIATE SUPPLY"}
      </button>

      {valveOpen && !isRotating && (
        <div className="mt-4 p-3 bg-emerald-500/5 rounded-lg border border-emerald-500/10 w-full">
          <p className="text-[9px] text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-widest flex items-center justify-center gap-2">
            <CheckCircle2 size={12} />
            System Rebalanced: 4,200 L/min
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default ValveControl;
