import React from "react";
import { Heading as Surfing, CookingPot as SwimmingPool, Bike, Mountain, Camera } from "lucide-react";

const activities = [
  {
    icon: Surfing,
    title: "Surf urbain",
    description: "Profitez des zones inondées pour surfer en ville ! (Activité à risque, réservée aux experts)",
    level: "Expert",
    zone: "Zones inondées 4, 1, 2",
  },
  {
    icon: SwimmingPool,
    title: "Piscine naturelle",
    description: "Les rues inondées deviennent des piscines naturelles temporaires",
    level: "Intermédiaire",
    zone: "Zones 6, 3, 7, 8",
  },
  {
    icon: Bike,
    title: "Vélo aquatique",
    description: "Parcours à vélo dans les zones légèrement inondées",
    level: "Débutant",
    zone: "Toutes zones",
  },
  {
    icon: Mountain,
    title: "Escalade urbaine",
    description: "Grimpez les façades des bâtiments pour éviter les inondations",
    level: "Expert",
    zone: "Centre-ville",
  },
  {
    icon: Camera,
    title: "Safari photo",
    description: "Capturez des clichés uniques de la ville transformée",
    level: "Débutant",
    zone: "Toutes zones",
  },
];

const Activities: React.FC = () => {
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8">Activités Insolites</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <activity.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">{activity.title}</h3>
            </div>
            <p className="text-gray-600 mb-4">{activity.description}</p>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-semibold">Niveau requis:</span>{" "}
                <span className={`${activity.level === "Expert" ? "text-red-600" : activity.level === "Intermédiaire" ? "text-orange-600" : "text-green-600"}`}>{activity.level}</span>
              </p>
              <p className="text-sm">
                <span className="font-semibold">Zone:</span> {activity.zone}
              </p>
            </div>
            <div className="mt-4 pt-4 border-t">
              <p className="text-xs text-red-600">⚠️ Ces activités sont présentées à titre humoristique. Ne prenez jamais de risques en cas d'inondation !</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activities;
