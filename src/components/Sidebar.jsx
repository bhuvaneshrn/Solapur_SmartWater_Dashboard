import { motion } from "framer-motion";
import {
  Home,
  LayoutDashboard,
  Map,
  BarChart3,
  AlertOctagon,
  Settings2,
  FileCheck,
  Cpu,
  LogOut,
  ChevronRight
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const menuItems = [
  { icon: Home, label: "Portal Home", path: "/home", isPublic: true },
  { icon: LayoutDashboard, label: "Admin Dashboard", path: "/admin" },
  { icon: Map, label: "GIS Monitoring", path: "/zones" },
  { icon: BarChart3, label: "Stability Analytics", path: "/analytics" },
  { icon: AlertOctagon, label: "Incident Reports", path: "/alerts" },
  { icon: Cpu, label: "Infra Controls", path: "/infrastructure" },
  { icon: FileCheck, label: "State Compliance", path: "/reports" },
];

const Sidebar = () => {
  const location = useLocation();
  const { isDarkMode } = useTheme();

  return (
    <motion.aside
      initial={{ x: -260 }}
      animate={{ x: 0 }}
      className="w-64 bg-white dark:bg-gov-navy border-r border-slate-200 dark:border-slate-800 flex flex-col z-[1500] h-screen shadow-2xl transition-colors duration-500"
    >
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gov-navy dark:bg-slate-800 rounded-xl text-white shadow-lg">
            <div className="w-6 h-6 border-2 border-white/20 rounded flex items-center justify-center">
              <div className="w-3 h-3 bg-india-saffron rounded-full opacity-80" />
            </div>
          </div>
          <div>
            <h1 className="font-black text-xl tracking-tighter text-gov-navy dark:text-white leading-tight">SMC <span className="text-gov-blue dark:text-accent-cyan">WATER</span></h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] leading-none mt-1">Official Portal</p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-2">
        <div className="h-[1px] w-full bg-slate-100 dark:bg-slate-800" />
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className="block"
            >
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group relative ${isActive
                  ? 'bg-gov-navy text-white dark:bg-slate-800 dark:text-white shadow-lg'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/50 hover:text-gov-navy dark:hover:text-white'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={18} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-gov-navy dark:group-hover:text-white'} />
                  <span className="font-bold text-xs tracking-wide uppercase">{item.label}</span>
                </div>
                {isActive ? (
                  <motion.div layoutId="activeDot" className="w-1 h-3 bg-india-saffron rounded-full" />
                ) : (
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-4 rounded-xl">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">System Integrity</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">Secure Municipal Node</span>
          </div>
        </div>

        <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 text-slate-500 hover:text-rose-500 transition-all font-bold text-xs uppercase tracking-widest bg-slate-100 dark:bg-slate-900 rounded-lg">
          <LogOut size={16} />
          <span>Exit Account</span>
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
