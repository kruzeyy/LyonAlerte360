import React, { useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const lyonDistricts = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Lyon 1", id: 1 },
      geometry: {
        type: "Polygon",
        coordinates: [[45.7694, 4.8320], [45.7739, 4.8365], [45.7694, 4.8410], [45.7649, 4.8365]]
      }
    },
    // Add other districts similarly
  ]
};

const LyonMap: React.FC = () => {
  const mapStyle = {
    height: "500px",
    width: "100%",
    borderRadius: "0.5rem"
  };

  const districtStyle = {
    weight: 2,
    opacity: 1,
    color: "#E53E3E",
    fillOpacity: 0.1
  };

  const onEachDistrict = (feature: any, layer: any) => {
    const name = feature.properties.name;
    layer.bindPopup(`<strong>${name}</strong>`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Carte des arrondissements de Lyon</h2>
      <MapContainer
        center={[45.7578, 4.8320]}
        zoom={12}
        style={mapStyle}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON
          data={lyonDistricts}
          style={districtStyle}
          onEachFeature={onEachDistrict}
        />
      </MapContainer>
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Légende</h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-400 rounded"></div>
            <span>Zones à risque sismique</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-400 rounded"></div>
            <span>Zones à risque d'inondation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-400 rounded"></div>
            <span>Zones sécurisées</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LyonMap;