import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Sidebar() {

  const [open, setOpen] = useState(true);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 bg-slate-800 p-2 rounded-xl shadow-lg text-white"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-slate-900 text-white p-6
        transition-transform duration-300 z-40
        ${open ? "translate-x-0 w-64" : "-translate-x-full"}
      `}>
        <h2 className="text-2xl font-bold mb-8">Navigation</h2>

        <div className="space-y-6 text-lg">

          <button onClick={() => scrollToSection("dashboard")} className="hover:text-cyan-400 block">
            Dashboard
          </button>

          <button onClick={() => scrollToSection("zones")} className="hover:text-cyan-400 block">
            Zones
          </button>

          <button onClick={() => scrollToSection("analytics")} className="hover:text-cyan-400 block">
            Analytics
          </button>

          <button onClick={() => scrollToSection("alerts")} className="hover:text-cyan-400 block">
            Alerts
          </button>

          <button onClick={() => scrollToSection("reports")} className="hover:text-cyan-400 block">
            Reports
          </button>

        </div>
      </div>
    </>
  );
}
