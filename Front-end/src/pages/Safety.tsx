import React from "react";
import { Shield, Home, Phone, ChevronFirst as FirstAid, Battery, Radio } from "lucide-react";

const Safety: React.FC = () => {
  const guidelines = {
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
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8">Consignes de Sécurité</h1>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-orange-600">En cas de séisme</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guidelines.earthquake.map((guideline, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-orange-500">
                <guideline.icon className="h-8 w-8 text-orange-500 mb-4" />
                <h3 className="font-semibold mb-2">{guideline.title}</h3>
                <p className="text-gray-600">{guideline.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6 text-blue-600">En cas d'inondation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guidelines.flood.map((guideline, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
                <guideline.icon className="h-8 w-8 text-blue-500 mb-4" />
                <h3 className="font-semibold mb-2">{guideline.title}</h3>
                <p className="text-gray-600">{guideline.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Safety;
