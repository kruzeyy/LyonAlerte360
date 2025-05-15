import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const LyonMap: React.FC = () => {
  const [districts, setDistricts] = useState<any>(null);

  useEffect(() => {
    fetch("/arrondissements-lyon.json")
      .then(res => res.json())
      .then(json => {
        setDistricts(json);
      })
      .catch(err => {
        console.error("Erreur de chargement des arrondissements :", err);
      });
  }, []);

  const mapStyle = {
    height: "600px",
    width: "100%",
    borderRadius: "0.75rem",
    border: "2px solid #1a202c" // dark border to match alert style
  };

  const districtStyle = (feature: any) => {
    const orangeDistricts = ["Lyon 9", "Lyon 5"];
    const greenDistricts = ["Lyon 4", "Lyon 1", "Lyon 2"];
    const blueDistricts = ["Lyon 6", "Lyon 3", "Lyon 7", "Lyon 8"];

    let color = "#E53E3E"; // couleur par défaut

    if (orangeDistricts.includes(feature.properties.nomreduit)) {
      color = "#FFA500";
    } else if (greenDistricts.includes(feature.properties.nomreduit)) {
      color = "#38A169"; // vert
    } else if (blueDistricts.includes(feature.properties.nomreduit)) {
      color = "#4299E1"; // bleu
    }

    return {
      weight: 2,
      opacity: 1,
      color,
      fillOpacity: 0.1
    };
  };

  const onEachDistrict = (feature: any, layer: any) => {
    const name = feature.properties.nomreduit;
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
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {districts && (
          <GeoJSON
            data={districts}
            style={districtStyle}
            onEachFeature={onEachDistrict}
          />
        )}
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