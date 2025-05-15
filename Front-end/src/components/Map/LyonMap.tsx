import React from "react";

const LyonMap: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Carte des zones de Lyon</h2>
      <div className="relative">
        <img src="/images/carte-lyon.png" alt="Carte des zones de Lyon" className="w-full max-w-2xl mx-auto" />
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
    </div>
  );
};

export default LyonMap;
