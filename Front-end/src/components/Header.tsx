import React from "react";
import { Bell, Menu, User } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bell className="h-6 w-6" />
          <h1 className="text-xl font-bold tracking-tight">LyonAlert360</h1>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="font-medium hover:text-yellow-200 transition-colors">
            Accueil
          </a>
          <a href="#" className="font-medium hover:text-yellow-200 transition-colors">
            Alertes
          </a>
          <a href="#" className="font-medium hover:text-yellow-200 transition-colors">
            Services
          </a>
          <a href="#" className="font-medium hover:text-yellow-200 transition-colors">
            À propos
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <button className="hidden md:flex items-center space-x-1 bg-red-700 hover:bg-red-800 px-3 py-1.5 rounded-full transition-colors">
            <Bell size={16} />
            <span className="text-sm font-medium">Notifications</span>
          </button>

          <button className="p-1.5 rounded-full hover:bg-red-700 transition-colors">
            <User size={20} />
          </button>

          <button className="md:hidden p-1.5 rounded-full hover:bg-red-700 transition-colors">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
