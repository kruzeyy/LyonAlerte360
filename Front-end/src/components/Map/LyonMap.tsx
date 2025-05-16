import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useData } from "../../context/DataContext";

const LyonMap: React.FC = () => {
  const [districts, setDistricts] = useState<any>(null);
  const { latestData } = useData();

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
    border: "2px solid #1a202c"
  };

  const districtStyle = (feature: any) => {
    const districtName = feature.properties.nomreduit;
    const currentZone = latestData?.quartier === `Zone ${districtName.split(" ")[1]}`;

    let color = "#E53E3E";
    let fillOpacity = 0.1;

    if (currentZone) {
      fillOpacity = 0.4;
      if (latestData?.sismicite > 0.5) {
        color = "#FFA500"; // Orange for seismic activity
      } else if (latestData?.pluie_totale > 100) {
        color = "#4299E1"; // Blue for rain
      }
    }

    return {
      weight: 2,
      opacity: 1,
      color,
      fillOpacity
    };
  };

  const onEachDistrict = (feature: any, layer: any) => {
    const districtName = feature.properties.nomreduit;
    const currentZone = latestData?.quartier === `Zone ${districtName.split(" ")[1]}`;

    layer.bindPopup(() => {
      if (currentZone && latestData) {
        return `
          <div class="p-2">
            <strong>${districtName}</strong><br/>
            Température: ${latestData.temperature}°C<br/>
            Humidité: ${latestData.humidite}%<br/>
            Vent moyen: ${latestData.force_moyenne_du_vecteur_de_vent} km/h<br/>
            Vent max: ${latestData.force_du_vecteur_de_vent_max} km/h<br/>
            Sismicité: ${latestData.sismicite}<br/>
            Gaz: ${latestData.concentration_gaz} ppm<br/>
            Pluie: ${latestData.pluie_totale} mm
          </div>
        `;
      }
      return `<strong>${districtName}</strong>`;
    });
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
            <span>Activité sismique élevée</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-400 rounded"></div>
            <span>Fortes précipitations</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-400 rounded"></div>
            <span>Zone normale</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LyonMap;