import React from "react";

const teamMembers = [
  {
    name: "Sophie Martin",
    role: "Chef de Projet",
    description: "Coordination générale du projet LyonAlert360",
  },
  {
    name: "Thomas Bernard",
    role: "Développeur Frontend",
    description: "Interface utilisateur et expérience utilisateur",
  },
  {
    name: "Emma Dubois",
    role: "Experte en Sécurité",
    description: "Analyse des risques et protocoles de sécurité",
  },
  {
    name: "Lucas Petit",
    role: "Développeur Backend",
    description: "Architecture système et base de données",
  },
  {
    name: "Julie Roux",
    role: "Designer UX/UI",
    description: "Design et ergonomie de l'application",
  },
  {
    name: "Alexandre Blanc",
    role: "Expert en Données",
    description: "Analyse et traitement des données d'alerte",
  },
  {
    name: "Marie Leroy",
    role: "Responsable Communication",
    description: "Communication et relations publiques",
  },
  {
    name: "Nicolas Moreau",
    role: "Ingénieur Système",
    description: "Infrastructure et déploiement",
  },
  {
    name: "Claire Durand",
    role: "Experte en Géographie",
    description: "Cartographie et zones à risque",
  },
];

const About: React.FC = () => {
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8">À Propos de LyonAlert360</h1>

      <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-semibold mb-4">Notre Mission</h2>
        <p className="text-gray-700 leading-relaxed">
          LyonAlert360 est né de la volonté de créer un système d'alerte moderne et efficace pour la ville de Lyon. Notre objectif est de fournir aux citoyens des informations en temps réel sur les
          risques naturels et de les aider à y faire face de manière appropriée.
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-6">Notre Équipe</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
            <p className="text-red-600 font-medium mb-2">{member.role}</p>
            <p className="text-gray-600">{member.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
