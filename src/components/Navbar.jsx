import { Bell } from "lucide-react";

export default function Navbar() {
  return (
    <div className="h-16 bg-slate-800 flex items-center justify-between px-6 border-b border-slate-700">
      <h1 className="text-xl font-bold text-cyan-400">
        Smart Water Control – VighnaTech
      </h1>

      <div className="flex items-center gap-6">
        <span className="text-green-400 font-semibold">● System Online</span>
        <Bell className="text-white" />
      </div>
    </div>
  );
}
