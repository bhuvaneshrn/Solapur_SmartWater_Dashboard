import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function LiveMap({ zones, setSelectedZone }) {

  const center = [17.6599, 75.9064];

  // 🎯 Leak Heat Intensity Color Logic
  const getLeakColor = (zone) => {

    if (zone.isBurstRisk) return "#f97316";   // orange - burst risk
    if (zone.isLeak) return "#ef4444";        // red - leak detected
    if (zone.status === "warning") return "#facc15";  // yellow
    return "#22c55e";                         // green
  };

  // 🎯 Marker Size Based on Severity
  const getRadius = (zone) => {

    if (zone.isBurstRisk) return 18;
    if (zone.isLeak) return 15;
    if (zone.status === "warning") return 13;
    return 10;
  };

  return (
    <div className="bg-slate-800/70 backdrop-blur-lg p-6 rounded-2xl border border-slate-700 shadow-xl">
      <h3 className="mb-4 font-semibold text-cyan-400">
        🌍 Live Zone Heatmap – Solapur
      </h3>

      <div style={{ height: "350px", width: "100%" }}>
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {zones.map((zone) => (
            <CircleMarker
              key={zone.id}
              center={[
                17.66 + zone.id * 0.01,
                75.90 + zone.id * 0.01,
              ]}
              radius={getRadius(zone)}
              pathOptions={{
                color: getLeakColor(zone),
                fillColor: getLeakColor(zone),
                fillOpacity: 0.85,
                weight: 2,
              }}
              eventHandlers={{
                click: () => setSelectedZone(zone),
              }}
            >
              <Popup>
                <strong>{zone.name}</strong>
                <br />
                Pressure: {zone.pressure} bar
                <br />
                Leak Score: {zone.leakScore?.toFixed(1)}
                <br />
                {zone.isLeak && <span style={{color:"red"}}>Leak Detected</span>}
                {zone.isBurstRisk && (
                  <>
                    <br />
                    <span style={{color:"orange"}}>High Burst Risk</span>
                  </>
                )}
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
