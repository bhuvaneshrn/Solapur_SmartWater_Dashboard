import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from "framer-motion";

const LiveMap = ({ zones, setSelectedZone }) => {
  // Center of Solapur
  const center = [17.6599, 75.9064];

  const getStatusColor = (status) => {
    switch (status) {
      case 'CRITICAL': return '#ef4444'; // Red-500
      case 'DEGRADED': return '#f59e0b'; // Amber-500
      case 'NOMINAL': return '#3b82f6'; // Blue-500
      case 'OPTIMAL': return '#10b981'; // Emerald-500
      default: return '#94a3b8'; // Slate-400
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden h-[500px] relative border border-slate-200 dark:border-slate-800 shadow-lg"
    >
      <div className="absolute top-4 left-4 z-[1000] bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-3 rounded border border-slate-200 dark:border-slate-800 shadow-xl">
        <h3 className="text-[10px] font-black text-gov-navy dark:text-white flex items-center gap-2 uppercase tracking-[0.2em]">
          GIS Spatiotemporal Feed
          <span className="flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
        </h3>
        <p className="text-[8px] text-slate-400 mt-1 uppercase font-bold tracking-widest">SMC-INFRA-NODE-01</p>
      </div>

      <MapContainer
        center={center}
        zoom={13}
        style={{ height: '100%', width: '100%', background: '#F8F9FA' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; SMC Water Management Portal'
        />

        {zones.filter(zone => zone.coordinates).map((zone) => (
          <CircleMarker
            key={zone.id}
            center={zone.coordinates}
            pathOptions={{
              fillColor: getStatusColor(zone.infrastructureStatus),
              color: 'white',
              fillOpacity: 0.8,
              weight: 2
            }}
            radius={12}
            eventHandlers={{
              click: () => setSelectedZone(zone),
            }}
          >
            <Popup className="custom-popup">
              <div className="p-3 min-w-[180px]">
                <div className="text-[10px] font-black text-slate-400 uppercase mb-1">{zone.officialId}</div>
                <h4 className="font-black text-gov-navy leading-tight mb-2 uppercase tracking-tighter">{zone.name.split(': ')[1]}</h4>
                <div className="space-y-2 text-[10px] font-bold text-slate-600 border-t border-slate-50 pt-2">
                  <div className="flex justify-between">
                    <span className="uppercase text-[9px] text-slate-400">Pressure:</span>
                    <span className="font-black text-gov-navy">{zone.pressure} bar</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="uppercase text-[9px] text-slate-400">Efficiency:</span>
                    <span className="font-black text-emerald-600">{zone.operationalEfficiency}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="uppercase text-[9px] text-slate-400">Status:</span>
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-black ${zone.infrastructureStatus === 'CRITICAL' ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-600'}`}>
                      {zone.infrastructureStatus}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedZone(zone)}
                  className="w-full mt-4 bg-gov-navy text-white py-2 rounded text-[9px] font-black uppercase tracking-widest hover:bg-gov-blue transition-colors shadow-lg"
                >
                  Initiate Full Ward Audit
                </button>
              </div>
            </Popup>
          </CircleMarker>
        ))}

        {/* Pulse Animations for Critical Zones */}
        {zones.filter(z => z.infrastructureStatus === 'CRITICAL' && z.coordinates).map(zone => (
          <CircleMarker
            key={`pulse-${zone.id}`}
            center={zone.coordinates}
            pathOptions={{
              fillColor: '#ef4444',
              color: 'transparent',
              fillOpacity: 0.2,
            }}
            radius={25}
            className="animate-pulse"
          />
        ))}
      </MapContainer>

      <div className="absolute bottom-6 right-6 z-[1000] space-y-2">
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded border border-slate-200 dark:border-slate-800 shadow-2xl min-w-[120px]">
          <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-50 dark:border-slate-800 pb-2">Symbology</h5>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600 dark:text-slate-300">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm" /> Optimal
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600 dark:text-slate-300">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm" /> Nominal
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600 dark:text-slate-300">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm" /> Degraded
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600 dark:text-slate-300">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm" /> Critical
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LiveMap;
