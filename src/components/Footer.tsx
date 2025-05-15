import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">LyonAlert360</h3>
            <p className="text-gray-400">Système d'alerte en temps réel pour la sécurité des citoyens de Lyon</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contacts d'urgence</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <span>Urgences: 112</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <span>contact@lyonalert360.fr</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>Lyon, France</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Liens utiles</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-red-400 transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/activities" className="hover:text-red-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-red-400 transition-colors">
                  Plan du site
                </Link>
              </li>
              <li>
                <Link to="/legal" className="hover:text-red-400 transition-colors">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 LyonAlert360. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;