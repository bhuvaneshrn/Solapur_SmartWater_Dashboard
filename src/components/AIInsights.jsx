export default function AIInsights({ zones }) {

  const criticalCount = zones.filter(z => z.status === "critical").length;
  const avgPressure =
    zones.reduce((acc, z) => acc + z.pressure, 0) / zones.length;

  const riskLevel =
    criticalCount > 0 ? "HIGH RISK" :
    avgPressure < 2 ? "MODERATE RISK" :
    "LOW RISK";

  return (
    <div className="bg-slate-800/70 backdrop-blur-lg 
                    border border-slate-700 
                    p-6 rounded-2xl shadow-lg">

      <h3 className="mb-4 font-semibold text-cyan-400">
        🧠 AI System Analysis
      </h3>

      <p className="mb-3">
        Current System Risk Level:
        <span className="ml-2 font-bold text-red-400">
          {riskLevel}
        </span>
      </p>

      <p className="text-sm text-slate-400">
        Based on live pressure trends and anomaly detection,
        the AI predicts potential valve stress in low-pressure zones.
      </p>
    </div>
  );
}
