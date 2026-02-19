export default function AlertsPanel({ zones }) {

  const criticalZones = zones.filter(z => z.status === "critical");
  const warningZones = zones.filter(z => z.status === "warning");

  return (
    <div className="bg-slate-800/70 backdrop-blur-lg 
                    border border-slate-700 
                    p-6 rounded-2xl shadow-lg">

      <h3 className="mb-4 font-semibold text-red-400">
        🚨 Active Alerts
      </h3>

      {criticalZones.length === 0 && warningZones.length === 0 && (
        <p className="text-green-400">All systems normal</p>
      )}

      {criticalZones.map(zone => (
        <div key={zone.id}
             className="mb-3 p-3 rounded-lg bg-red-500/20 
                        border border-red-500 animate-pulse">
          <strong>{zone.name}</strong>
          <p className="text-sm">Critical Pressure Drop</p>
        </div>
      ))}

      {warningZones.map(zone => (
        <div key={zone.id}
             className="mb-3 p-3 rounded-lg bg-yellow-500/20 
                        border border-yellow-500">
          <strong>{zone.name}</strong>
          <p className="text-sm">Pressure Warning</p>
        </div>
      ))}
    </div>
  );
}
