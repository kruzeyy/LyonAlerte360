import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Menu } from "lucide-react";
import { useAlerts } from "../context/AlertContext";

const Header: React.FC = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { alerts } = useAlerts();

  return (
    <header className="bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
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
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            >
              <Bell size={16} />
              <span className="text-sm font-medium">Notifications</span>
              {alerts.length > 0 && <span className="absolute -top-1 -right-1 bg-yellow-400 text-red-800 text-xs w-5 h-5 flex items-center justify-center rounded-full">{alerts.length}</span>}
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl text-gray-800 z-50">
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Notifications récentes</h3>
                  {alerts.map((alert) => (
                    <div key={alert.id} className="py-2 border-b last:border-0">
                      <p className="font-medium">{alert.type === "earthquake" ? "Alerte Séisme" : "Alerte Inondation"}</p>
                      <p className="text-sm text-gray-600">Zones: {alert.zones.join(", ")}</p>
                      <p className="text-xs text-gray-500">{alert.timestamp.toLocaleTimeString()}</p>
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
