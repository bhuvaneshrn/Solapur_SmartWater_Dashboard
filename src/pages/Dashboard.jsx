import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import KPICard from "../components/KPICard";
import LiveMap from "../components/LiveMap";
import PressureChart from "../components/PressureChart";
import AlertsPanel from "../components/AlertsPanel";
import ValveControl from "../components/ValveControl";
import AIInsights from "../components/AIInsights";
import ZoneDetailsPanel from "../components/ZoneDetailsPanel";
import NRWTrendChart from "../components/NRWTrendChart";
import { useState, useEffect } from "react";

export default function Dashboard() {

  const [zones, setZones] = useState([
    {
      id: 1,
      name: "Zone 1",
      pressure: 2.8,
      status: "normal",
      flowRate: 1200,
      expectedFlow: 1150,
      pipelineAge: 12,
      leakScore: 0,
      burstRisk: 0,
      burstProbability: 0,
      maintenancePriority: "Low"
    },
    {
      id: 2,
      name: "Zone 2",
      pressure: 3.0,
      status: "normal",
      flowRate: 1350,
      expectedFlow: 1280,
      pipelineAge: 18,
      leakScore: 0,
      burstRisk: 0,
      burstProbability: 0,
      maintenancePriority: "Low"
    },
    {
      id: 3,
      name: "Zone 3",
      pressure: 2.5,
      status: "normal",
      flowRate: 980,
      expectedFlow: 950,
      pipelineAge: 22,
      leakScore: 0,
      burstRisk: 0,
      burstProbability: 0,
      maintenancePriority: "Low"
    },
  ]);

  const [valveOpen, setValveOpen] = useState(true);
  const [selectedZone, setSelectedZone] = useState(null);
  const [nrwHistory, setNrwHistory] = useState([]);

  useEffect(() => {

    const interval = setInterval(() => {

      setZones((prevZones) => {

        const updatedZones = prevZones.map((zone) => {

          const newPressure = parseFloat((Math.random() * 2 + 1).toFixed(2));
          const newFlow = zone.flowRate + Math.floor(Math.random() * 100 - 50);

          let newStatus = "normal";
          if (newPressure < 1.8) newStatus = "critical";
          else if (newPressure < 2.3) newStatus = "warning";

          if (newStatus === "critical") {
            setValveOpen(false);
          }

          const pressureDrop = zone.pressure - newPressure;

          // 🔥 Leak Detection
          const leakScore =
            (newFlow - zone.expectedFlow) * 0.6 +
            zone.pipelineAge * 0.2 +
            pressureDrop * 0.2;

          const isLeak = leakScore > 40;

          // 🚀 Advanced Burst Prediction (AI-style weighted scoring)
          const burstRisk =
            zone.pipelineAge * 0.35 +
            leakScore * 0.45 +
            Math.abs(pressureDrop) * 0.2;

          const burstProbability = Math.min(
            100,
            Math.max(0, burstRisk.toFixed(1))
          );

          const isBurstRisk = burstProbability > 60;

          // 🔧 Maintenance Priority Logic
          let maintenancePriority = "Low";
          if (burstProbability > 75) maintenancePriority = "High";
          else if (burstProbability > 50) maintenancePriority = "Medium";

          return {
            ...zone,
            pressure: newPressure,
            status: newStatus,
            flowRate: newFlow,
            leakScore,
            isLeak,
            burstRisk,
            burstProbability,
            isBurstRisk,
            maintenancePriority
          };
        });

        // NRW Tracking
        const totalSupply =
          updatedZones.reduce((sum, z) => sum + z.flowRate, 0);

        const totalBilled =
          updatedZones.reduce((sum, z) => sum + z.expectedFlow, 0);

        const nrw =
          totalSupply > 0
            ? ((totalSupply - totalBilled) / totalSupply) * 100
            : 0;

        setNrwHistory((prev) => {
          const updated = [...prev, parseFloat(nrw.toFixed(2))];
          return updated.slice(-10);
        });

        return updatedZones;
      });

    }, 4000);

    return () => clearInterval(interval);

  }, []);

  // KPI Calculations
  const avgPressure =
    zones.reduce((acc, zone) => acc + zone.pressure, 0) / zones.length;

  const totalSupply =
    zones.reduce((sum, z) => sum + z.flowRate, 0);

  const totalBilled =
    zones.reduce((sum, z) => sum + z.expectedFlow, 0);

  const nrw =
    totalSupply > 0
      ? ((totalSupply - totalBilled) / totalSupply) * 100
      : 0;

  const nrwPercent = nrw.toFixed(2);

  const avgLeakScore =
    zones.reduce((sum, z) => sum + z.leakScore, 0) / zones.length;

  const efficiencyRaw =
    100 - nrw * 0.5 - avgLeakScore * 0.3;

  const efficiency =
    Math.max(0, Math.min(100, efficiencyRaw)).toFixed(2);

  const burstRiskZones =
    zones.filter(z => z.isBurstRisk).length;

  return (
    <div className="flex bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6 space-y-6">

          <div className="grid grid-cols-7 gap-6">
            <KPICard title="Active Zones" value={zones.length} color="text-cyan-400" />
            <KPICard title="Active Alerts"
              value={zones.filter(z => z.status === "critical").length}
              color="text-red-400" />
            <KPICard title="Avg Pressure"
              value={`${avgPressure.toFixed(2)} bar`}
              color="text-green-400" />
            <KPICard title="Valve Status"
              value={valveOpen ? "Open" : "Closed"}
              color={valveOpen ? "text-green-400" : "text-red-400"} />
            <KPICard title="Water Loss (NRW)"
              value={`${nrwPercent}%`}
              color="text-yellow-400" />
            <KPICard title="Infra Efficiency"
              value={`${efficiency}%`}
              color="text-purple-400" />
            <KPICard title="Burst Risk Zones"
              value={burstRiskZones}
              color="text-orange-400" />
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              <LiveMap zones={zones} setSelectedZone={setSelectedZone} />
              <PressureChart zones={zones} />
              <NRWTrendChart data={nrwHistory} />
            </div>
            <AlertsPanel zones={zones} />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <ValveControl valveOpen={valveOpen} setValveOpen={setValveOpen} />
            <AIInsights zones={zones} />
          </div>

          {/* Advanced Monitoring Panel */}
          <div className="bg-slate-800 p-6 rounded-2xl shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-yellow-400">
              Leak & Predictive Maintenance
            </h2>

            {zones.map(zone => (
              <div
                key={zone.id}
                className="flex justify-between border-b border-slate-700 py-2"
              >
                <span>{zone.name}</span>

                <div className="flex gap-4 items-center">
                  {zone.isLeak &&
                    <span className="text-red-400">🚨 Leak</span>}

                  {zone.isBurstRisk &&
                    <span className="text-orange-400">
                      ⚠ {zone.burstProbability}% Risk
                    </span>}

                  <span className={
                    zone.maintenancePriority === "High"
                      ? "text-red-500"
                      : zone.maintenancePriority === "Medium"
                        ? "text-yellow-400"
                        : "text-green-400"
                  }>
                    {zone.maintenancePriority} Priority
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <ZoneDetailsPanel
        zone={selectedZone}
        onClose={() => setSelectedZone(null)}
      />
    </div>
  );
}
