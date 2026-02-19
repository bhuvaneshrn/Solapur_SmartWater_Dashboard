import { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Droplets,
  AlertTriangle,
  Cpu,
  TrendingUp,
  ShieldAlert,
  Search,
  ChevronRight,
  Filter,
  Download
} from "lucide-react";
import KPICard from "../components/KPICard";
import LiveMap from "../components/LiveMap";
import PressureChart from "../components/PressureChart";
import AlertsPanel from "../components/AlertsPanel";
import ValveControl from "../components/ValveControl";
import AIInsights from "../components/AIInsights";
import ZoneDetailsPanel from "../components/ZoneDetailsPanel";
import NRWTrendChart from "../components/NRWTrendChart";
import PressureEquityPanel from "../components/PressureEquityPanel";
import { SMC_ZONES, MUNICIPAL_METRICS, PRESSURE_STABILITY_TREND, NRW_REDUCTION_STATS, INCIDENT_LOGS } from "../data/solapurMockData";

export default function Dashboard() {
  const [zones, setZones] = useState(SMC_ZONES);
  const [selectedZone, setSelectedZone] = useState(null);
  const [valveOpen, setValveOpen] = useState(true);

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-6 bg-india-saffron rounded-full" />
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Section: Operational Overview</h4>
          </div>
          <h1 className="text-3xl font-black text-gov-navy dark:text-white tracking-tight">Municipal Distribution Dashboard</h1>
          <p className="text-sm text-slate-500 font-medium">Real-time telemetry and resource management for Solapur City</p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 transition-all">
            <Filter size={14} /> Global Filters
          </button>
          <button className="flex items-center gap-2 gov-button-primary !py-2 text-xs shadow-lg shadow-gov-navy/10">
            <Download size={14} /> Export Operational Log
          </button>
        </div>
      </div>

      {/* Official KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard
          title="Avg City Pressure"
          value="2.48 bar"
          color="text-gov-navy dark:text-white"
          icon={TrendingUp}
          trend={+2.4}
        />
        <KPICard
          title="Non-Revenue Water"
          value={`${MUNICIPAL_METRICS.nrwLoss}%`}
          color="text-rose-600 dark:text-rose-400"
          icon={Droplets}
          trend={-1.2}
        />
        <KPICard
          title="Equity Score"
          value={`${MUNICIPAL_METRICS.equityScore}%`}
          color="text-gov-blue dark:text-accent-cyan"
          icon={TrendingUp}
        />
        <KPICard
          title="Active Incident Logs"
          value={MUNICIPAL_METRICS.activeIncidents}
          color="text-amber-600 dark:text-amber-400"
          icon={AlertTriangle}
        />
        <KPICard
          title="Asset Health Index"
          value={`${MUNICIPAL_METRICS.infrastructureIndex}%`}
          color="text-emerald-600 dark:text-emerald-400"
          icon={Cpu}
        />
        <KPICard
          title="System Uptime"
          value={MUNICIPAL_METRICS.systemUptime}
          color="text-slate-600 dark:text-slate-300"
          icon={Activity}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left GIS & Analytics Column */}
        <div className="xl:col-span-2 space-y-8">
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-3 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gov-navy dark:text-white">GIS Infrastructure Registry (Live)</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Feed: Active</span>
              </div>
            </div>
            <div className="p-2">
              <LiveMap zones={zones} setSelectedZone={setSelectedZone} />
            </div>
          </div>

          <PressureEquityPanel />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm p-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 border-b border-slate-50 dark:border-slate-800 pb-3">Pressure Stability Index</h3>
              <PressureChart data={PRESSURE_STABILITY_TREND.map(d => ({ time: d.date, pressure: d.avg }))} />
            </div>
            <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm p-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 border-b border-slate-50 dark:border-slate-800 pb-3">NRW Reduction Ledger</h3>
              <NRWTrendChart data={NRW_REDUCTION_STATS} />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm p-6">
            <AIInsights zones={zones} />
          </div>
        </div>

        {/* Right Admin & Log Column */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gov-navy dark:text-white">Incident & Alert Registry</h3>
            </div>
            <AlertsPanel alerts={INCIDENT_LOGS.map(inc => ({
              id: inc.id,
              type: inc.severity === 'CRITICAL' ? 'Critical' : inc.severity === 'MODERATE' ? 'Warning' : 'Low',
              message: inc.description,
              time: inc.timestamp,
              zone: inc.location
            }))} />
          </div>

          <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm p-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 border-b border-slate-50 dark:border-slate-800 pb-3">Critical Actuation Module</h3>
            <ValveControl valveOpen={valveOpen} setValveOpen={setValveOpen} />
          </div>

          {/* Administrative Priority List */}
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm p-6">
            <h3 className="text-[10px] font-black text-slate-400 mb-6 uppercase tracking-[0.2em] border-b border-slate-100 dark:border-slate-800 pb-3">Ward Operational Health Hub</h3>
            <div className="space-y-6">
              {[...zones].sort((a, b) => b.operationalEfficiency - a.operationalEfficiency).map((zone, i) => (
                <div key={i} className="space-y-3 group cursor-pointer" onClick={() => setSelectedZone(zone)}>
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-slate-500 group-hover:text-gov-navy dark:group-hover:text-white transition-colors">
                      {zone.name.split(': ')[1]}
                    </span>
                    <div className="flex items-center gap-2">
                      {zone.tailEndRisk === 'HIGH' && (
                        <span className="text-[8px] bg-rose-500 text-white px-1.5 py-0.5 rounded animate-pulse">Tail-End Risk</span>
                      )}
                      <span className={zone.operationalEfficiency > 80 ? 'text-emerald-600' : 'text-amber-600'}>
                        {zone.operationalEfficiency}% Eff.
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Elev: {zone.elevation}m</span>
                    <span className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Tail Risk: {zone.tailEndRisk}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-sm overflow-hidden border border-slate-200 dark:border-slate-700">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${zone.operationalEfficiency}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className={`h-full ${zone.operationalEfficiency > 80 ? 'bg-emerald-600 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : zone.operationalEfficiency > 60 ? 'bg-amber-500' : 'bg-rose-600'}`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded text-[9px] font-black text-gov-navy dark:text-accent-cyan uppercase tracking-[0.3em] hover:bg-slate-100 transition-all">
              Initiate Full Ward Audit Procedure →
            </button>
          </div>
        </div>
      </div>

      {/* Detailed Assessment Drawer */}
      <ZoneDetailsPanel
        zone={selectedZone}
        onClose={() => setSelectedZone(null)}
      />
    </div>
  );
}
