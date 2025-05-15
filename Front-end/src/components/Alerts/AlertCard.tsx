import React from "react";
import { AlertTriangle, Droplets } from "lucide-react";
import { useAlerts } from "../../context/AlertContext";

const AlertCards: React.FC = () => {
  const { alerts } = useAlerts();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {alerts.map((alert) => (
        <div key={alert.id} className={`rounded-lg shadow-lg p-6 ${alert.type === "earthquake" ? "bg-orange-50" : "bg-blue-50"}`}>
          <div className="flex items-center gap-4">
            {alert.type === "earthquake" ? <AlertTriangle className="h-8 w-8 text-orange-500" /> : <Droplets className="h-8 w-8 text-blue-500" />}
            <div>
              <h3 className="text-lg font-semibold">{alert.type === "earthquake" ? "Alerte Séisme" : "Alerte Inondation"}</h3>
              <p className="text-sm text-gray-600">Zones concernées: {alert.zones.join(", ")}</p>
            </div>
          </div>
          <p className="mt-4 text-gray-700">{alert.description}</p>
          <div className="mt-4 flex justify-between items-center">
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                alert.severity === "high" ? "bg-red-100 text-red-800" : alert.severity === "medium" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
              }`}
            >
              {alert.severity === "high" ? "Urgent" : alert.severity === "medium" ? "Important" : "Modéré"}
            </span>
            <span className="text-sm text-gray-500">{alert.timestamp.toLocaleTimeString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertCards;
