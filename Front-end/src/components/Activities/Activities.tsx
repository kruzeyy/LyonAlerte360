import React from "react";
import { Shield, Home, Phone, ChevronFirst as FirstAid, Battery, Radio } from "lucide-react";

const Activities: React.FC = () => {
  const activities = {
    earthquake: [
      { icon: Shield, title: "Se mettre à l'abri", description: "Éloignez-vous des fenêtres et abritez-vous sous un meuble solide" },
      { icon: Home, title: "Évacuer le bâtiment", description: "Une fois les secousses terminées, évacuez le bâtiment si nécessaire" },
      { icon: Phone, title: "Contacter les secours", description: "Appelez le 112 en cas d'urgence" },
    ],
    flood: [
      { icon: FirstAid, title: "Préparer un kit d'urgence", description: "Eau, nourriture, médicaments, lampe torche" },
      { icon: Battery, title: "Couper l'électricité", description: "Coupez l'électricité si l'eau menace d'envahir votre domicile" },
      { icon: Radio, title: "Rester informé", description: "Écoutez la radio pour suivre l'évolution de la situation" },
    ],
  };

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-8">Consignes de sécurité</h2>

      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-orange-600">En cas de séisme</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activities.earthquake.map((activity, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <activity.icon className="h-8 w-8 text-orange-500 mb-4" />
                <h4 className="font-semibold mb-2">{activity.title}</h4>
                <p className="text-gray-600">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-blue-600">En cas d'inondation</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activities.flood.map((activity, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <activity.icon className="h-8 w-8 text-blue-500 mb-4" />
                <h4 className="font-semibold mb-2">{activity.title}</h4>
                <p className="text-gray-600">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Activities;
