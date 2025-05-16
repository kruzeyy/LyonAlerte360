import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Menu } from "lucide-react";
import { useAlerts } from "../context/AlertContext";

const zoneNames: Record<string, string> = {
  "1": "1 ARR - Vieux Lyon",
  "2": "2 ARR - Presqu'île",
  "3": "3 ARR - Part-Dieu",
  "4": "4 ARR - Croix-Rousse",
  "5": "5 ARR - Point du Jour",
  "6": "6 ARR - Parc de la Tête d'Or",
  "7": "7 ARR - Jean Macé / Gerland",
  "8": "8 ARR - Monplaisir / États-Unis",
  "9": "9 ARR - Vaise / Gorge de Loup",
};

const Header: React.FC = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [hasSeenNotifications, setHasSeenNotifications] = useState(false);
  const { alerts } = useAlerts();

  return (
    <header className="bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="" className="flex items-center space-x-2">
          <Bell className="h-6 w-6" />
          <h1 className="text-xl font-bold tracking-tight">LyonAlert360</h1>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="font-medium hover:text-yellow-200 transition-colors">
            Accueil
          </Link>
          <Link to="/activities" className="font-medium hover:text-yellow-200 transition-colors">
            Activités
          </Link>
          <Link to="/safety" className="font-medium hover:text-yellow-200 transition-colors">
            Sécurité
          </Link>
          <Link to="/about" className="font-medium hover:text-yellow-200 transition-colors">
            À propos
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              className="hidden md:flex items-center space-x-1 bg-red-700 hover:bg-red-800 px-3 py-1.5 rounded-full transition-colors"
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen);
                setHasSeenNotifications(true);
              }}
            >
              <Bell size={16} />
              <span className="text-sm font-medium">Notifications</span>
              {alerts.length > 0 && !hasSeenNotifications && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-red-800 text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {alerts.length}
                </span>
              )}
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-96 bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl text-gray-900 z-50 border border-gray-300">
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Notifications récentes</h3>
                  {alerts.map((alert) => (
                    <div key={alert.id} className="p-3 mb-2 bg-white rounded-lg shadow-sm hover:bg-gray-100 transition-colors border border-gray-200">
                      <p className="font-semibold">{alert.type === "earthquake" ? "Alerte Séisme" : "Alerte Inondation"}</p>
                      <p className="text-sm text-gray-700">
                        Zones : {alert.zones.map((z) => zoneNames[z] || z).join(", ")}
                      </p>
                      <p className="text-xs text-gray-600 italic">{alert.timestamp.toLocaleTimeString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button className="md:hidden p-1.5 rounded-full hover:bg-red-700 transition-colors">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
