import React from "react";

const Legal: React.FC = () => {
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8">Mentions Légales</h1>
      
      <div className="space-y-8">
        <section className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Éditeur du site</h2>
          <p className="text-gray-700">
            LyonAlert360<br />
            123 rue de la République<br />
            69001 Lyon<br />
            France<br />
            Email : contact@lyonalert360.fr
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Hébergement</h2>
          <p className="text-gray-700">
            Le site LyonAlert360 est hébergé par :<br />
            Société d'hébergement<br />
            1 rue de l'Internet<br />
            75001 Paris<br />
            France
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Protection des données personnelles</h2>
          <p className="text-gray-700 mb-4">
            Conformément à la loi Informatique et Libertés du 6 janvier 1978, vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant.
          </p>
          <p className="text-gray-700">
            Pour exercer ce droit, veuillez nous contacter à l'adresse : contact@lyonalert360.fr
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
          <p className="text-gray-700">
            Ce site utilise des cookies pour améliorer l'expérience utilisateur. En continuant à naviguer sur ce site, vous acceptez leur utilisation.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Legal;