import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../App.css";
import trafficSignalIconPath from "../logo/rec.png";
import trafficSignIconPath from "../logo/road-sign.png";
import pavementMarkingIconPath from "../logo/sidewalk.png";
import trafficSignalsData from "../data/traffic-signals.json";


const trafficSignalIcon = new L.Icon({
  iconUrl: trafficSignalIconPath,
  iconSize: [20, 20],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

const trafficSignIcon = new L.Icon({
  iconUrl: trafficSignIconPath,
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

const pavementMarkingIcon = new L.Icon({
  iconUrl: pavementMarkingIconPath,
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

const trafficSignals = trafficSignalsData;

const trafficSigns = [
  { lat: 29.7174, lng: -95.4142, condition: "Good", type: "Stop Sign", location: "Rice Village" },
  { lat: 29.7405, lng: -95.4671, condition: "Poor", type: "Yield Sign", location: "Galleria" },
];

const pavementMarkings = [
  { lat: 29.7445, lng: -95.3870, condition: "Good", type: "Crosswalk", location: "Montrose" },
  { lat: 29.7643, lng: -95.4473, condition: "Fair", type: "Lane Divider", location: "Memorial Park" },
];

function FocusMap({ positions }) {
  const map = useMap();

  useEffect(() => {
    if (positions.length > 0) {
      const bounds = L.latLngBounds(positions);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [positions, map]);

  return null;
}

function TrafficSignalMap() {
  const [showTrafficSignals, setShowTrafficSignals] = useState(false);
  const [showTrafficSigns, setShowTrafficSigns] = useState(false);
  const [showPavementMarkings, setShowPavementMarkings] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);
  const [activeLayer, setActiveLayer] = useState("street");

  const getStatistics = () => {
    if (showTrafficSignals) {
      return { type: "Bridges", data: trafficSignals, columns: ["Age"] };
    }
    if (showTrafficSigns) {
      return { type: "Traffic Signs", data: trafficSigns, columns: ["Type"] };
    }
    if (showPavementMarkings) {
      return { type: "Pavement Markings", data: pavementMarkings, columns: ["Type"] };
    }
    return null;
  };

  const statistics = getStatistics();

  const getActivePositions = () => {
    if (showTrafficSignals) return trafficSignals.map((signal) => [signal.lat, signal.lng]);
    if (showTrafficSigns) return trafficSigns.map((sign) => [sign.lat, sign.lng]);
    if (showPavementMarkings) return pavementMarkings.map((marking) => [marking.lat, marking.lng]);
    return [];
  };

  const activePositions = getActivePositions();

  return (
    <div className="traffic-signal-map">
      {/* Filters */}
      <header className="innovative-header">
        <h1>Asset Tracker</h1>
        <p>Locating all traffic assets.</p>
      </header>
      <div className="filters">
        <label>
          <input
            type="checkbox"
            checked={showTrafficSignals}
            onChange={() => {
              setShowTrafficSignals(!showTrafficSignals);
              setShowTrafficSigns(false);
              setShowPavementMarkings(false);
            }}
          />
          Bridges
        </label>
        <label>
          <input
            type="checkbox"
            checked={showTrafficSigns}
            onChange={() => {
              setShowTrafficSigns(!showTrafficSigns);
              setShowTrafficSignals(false);
              setShowPavementMarkings(false);
            }}
          />
          Traffic Signs
        </label>
        <label>
          <input
            type="checkbox"
            checked={showPavementMarkings}
            onChange={() => {
              setShowPavementMarkings(!showPavementMarkings);
              setShowTrafficSignals(false);
              setShowTrafficSigns(false);
            }}
          />
          Pavement Markings
        </label>
        <select value={activeLayer} onChange={(e) => setActiveLayer(e.target.value)}>
          <option value="street">Street View</option>
          <option value="satellite">Satellite View</option>
          <option value="topographic">Topographic View</option>
        </select>
      </div>

      {/* Collapsible Statistics */}
      <div className="statistics-wrapper">
        <button
          onClick={() => setShowStatistics(!showStatistics)}
          style={{
            margin: "10px",
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {showStatistics ? "Hide Statistics" : "Show Statistics"}
        </button>
        {showStatistics && statistics && (
          <div className="statistics-table">
            <h4>{statistics.type} Statistics</h4>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Location</th>
                  <th>Condition</th>
                  {statistics.columns.map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {statistics.data.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.location}</td>
                    <td>{item.condition}</td>
                    {statistics.columns.map((col) => (
                      <td key={col}>{item[col.toLowerCase()]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Map Container */}
      <div className="map-wrapper">
        <MapContainer
          center={[29.7604, -95.3698]}
          zoom={12}
          style={{ height: "600px", width: "90%", margin: "0 auto" ,paddingBottom: "5vh"}}
          attributionControl={false}
        >
          <TileLayer
            url={
              activeLayer === "street"
                ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                : activeLayer === "satellite"
                ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                : "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            }
          />
          <FocusMap positions={activePositions} />
          {showTrafficSignals &&
            trafficSignals.map((signal, index) => (
              <Marker
                key={`signal-${index}`}
                position={[signal.lat, signal.lng]}
                icon={trafficSignalIcon}
              >
                <Popup>
                  Condition: {signal.condition}
                  <br />
                  Traffic: {signal.traffic} vehicles/day
                </Popup>
              </Marker>
            ))}
          {showTrafficSigns &&
            trafficSigns.map((sign, index) => (
              <Marker
                key={`sign-${index}`}
                position={[sign.lat, sign.lng]}
                icon={trafficSignIcon}
              >
                <Popup>
                  <b>{sign.location}</b>
                  <br />
                  Condition: {sign.condition}
                  <br />
                  Type: {sign.type}
                </Popup>
              </Marker>
            ))}
          {showPavementMarkings &&
            pavementMarkings.map((marking, index) => (
              <Marker
                key={`marking-${index}`}
                position={[marking.lat, marking.lng]}
                icon={pavementMarkingIcon}
              >
                <Popup>
                  <b>{marking.location}</b>
                  <br />
                  Condition: {marking.condition}
                  <br />
                  Type: {marking.type}
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default TrafficSignalMap;
