import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Breadcrumbs from "./Breadcrumbs";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const Layout = ({ children }) => {
    const { isDarkMode } = useTheme();

    return (
        <div className={`flex min-h-screen font-sans overflow-hidden transition-colors duration-500 ${isDarkMode ? 'dark bg-gov-navy text-slate-100' : 'bg-gov-grey text-gov-slate'}`}>
            {/* Sidebar - Fixed width */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-white dark:bg-slate-900">
                {/* Official Header Strip (Tricolor) */}
                <div className="gov-header-strip z-[2000]" />

                {/* Branding Strip */}
                <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-8 py-3 flex items-center justify-between z-[1100]">
                    <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-sm relative group">
                            <img src="/smc-logo.png" alt="SMC Logo" className="w-9 h-9 opacity-70 grayscale group-hover:grayscale-0 transition-all" onError={(e) => e.target.style.display = 'none'} />
                            <span className="text-[10px] font-black text-slate-400 absolute">LOGO</span>
                            <div className="absolute inset-0 rounded-full border-2 border-india-saffron opacity-20" />
                        </div>
                        <div>
                            <h2 className="text-sm font-black tracking-tight uppercase text-gov-navy dark:text-white leading-none mb-1.5">Solapur Municipal Corporation</h2>
                            <p className="text-[10px] font-black text-gov-blue dark:text-accent-cyan uppercase tracking-[0.3em] leading-none">Smart Water Management Mission</p>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <div className="text-right border-r border-slate-100 dark:border-slate-800 pr-8">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Administrative Hub</p>
                            <p className="text-[9px] font-bold text-slate-400 italic">Official Municipal Monitoring Portal</p>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-india-saffron" />
                                <div className="w-2 h-2 rounded-full bg-white border border-slate-200" />
                                <div className="w-2 h-2 rounded-full bg-india-green" />
                            </div>
                            <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mt-2">Govt. of Maharashtra</p>
                        </div>
                    </div>
                </div>

                {/* Global Navbar */}
                <Navbar />

                {/* Dynamic Page Content */}
                <main className={`flex-1 overflow-y-auto overflow-x-hidden px-8 py-6 ${isDarkMode ? 'grid-bg-dark' : 'grid-bg-light'}`}>
                    <div className="max-w-[1600px] mx-auto w-full">
                        <Breadcrumbs />
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={window.location.pathname}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.25 }}
                                className="max-w-[1600px] mx-auto w-full h-full"
                            >
                                {children}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </main>

                {/* Footer Info Strip */}
                <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-6 py-2 flex items-center justify-between text-[10px] font-bold text-slate-500 z-[1100]">
                    <div>© 2024 Solapur Municipal Corporation. All Rights Reserved.</div>
                    <div className="flex gap-4">
                        <span>Privacy Policy</span>
                        <span>Terms of Use</span>
                        <span className="text-gov-blue dark:text-accent-cyan">Official Portal v2.0</span>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Layout;
