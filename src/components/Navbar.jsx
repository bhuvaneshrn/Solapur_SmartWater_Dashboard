import { motion } from "framer-motion";
import { Search, Bell, User, Clock, Sun, Moon, ShieldCheck, Globe, Activity } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).toUpperCase();
  };

  return (
    <nav className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-6 flex items-center justify-between z-[1000] sticky top-0">
      <div className="flex items-center gap-6 flex-1">
        <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
          <Activity size={14} className="text-emerald-500" />
          <div className="flex flex-col">
            <span className="text-[9px] font-black uppercase tracking-widest leading-none mb-1">System Status</span>
            <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase leading-none">Status: Operational</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-lg w-72 group focus-within:ring-2 focus-within:ring-gov-navy/10 dark:focus-within:ring-accent-cyan/10 transition-all shadow-sm">
          <Search size={16} className="text-slate-400" />
          <input
            type="text"
            placeholder="MUNICIPAL ASSET SEARCH..."
            className="bg-transparent border-none outline-none text-[10px] font-bold text-slate-700 dark:text-white placeholder:text-slate-400 w-full uppercase"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Real-Time Clock */}
        <div className="hidden sm:flex flex-col items-end px-6 border-r border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 text-gov-navy dark:text-white font-black text-xs">
            <Clock size={12} className="text-gov-blue" />
            <span className="tracking-widest">{formatTime(time)}</span>
          </div>
          <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-0.5">{formatDate(time)}</p>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all shadow-sm"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button className="p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 transition-all shadow-sm">
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900" />
          </button>
        </div>

        <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2" />

        {/* User Info */}
        <div className="flex items-center gap-4 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-black text-gov-navy dark:text-white leading-none uppercase tracking-wider">Auth: Admin Officer</p>
            <p className="text-[8px] font-black text-gov-blue dark:text-accent-cyan uppercase tracking-widest mt-1.5">REG-ID: SMC-942</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gov-navy dark:bg-slate-800 flex items-center justify-center text-white border border-slate-700 shadow-md">
            <User size={20} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
