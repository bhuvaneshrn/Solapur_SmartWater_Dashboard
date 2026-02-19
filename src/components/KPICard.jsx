export default function KPICard({ title, value, color }) {
  return (
    <div className="bg-slate-800/70 backdrop-blur-lg border border-slate-700 
                    p-6 rounded-2xl shadow-lg 
                    hover:scale-105 hover:shadow-cyan-500/20 
                    transition duration-300">

      <p className="text-slate-400 text-sm mb-2 uppercase tracking-wide">
        {title}
      </p>

      <p className={`text-3xl font-bold ${color}`}>
        {value}
      </p>
    </div>
  );
}
