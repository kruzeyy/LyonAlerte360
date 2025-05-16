import React, { createContext, useContext, ReactNode, useEffect } from "react";

export interface Alert {
  id: number;
  type: "earthquake" | "flood";
  zones: number[];
  severity: "high" | "medium" | "low";
  timestamp: Date;
  description: string;
}

interface AlertContextType {
  alerts: Alert[];
  fetchRandomAlert: () => Promise<void>;
  unreadCount: number;
  resetUnreadCount: () => void;
}

// const zoneNames: Record<string, string> = {
//   "1": "1 ARR - Vieux Lyon",
//   "2": "2 ARR - Presqu'île",
//   "3": "3 ARR - Part-Dieu",
//   "4": "4 ARR - Croix-Rousse",
//   "5": "5 ARR - Point du Jour",
//   "6": "6 ARR - Parc de la Tête d'Or",
//   "7": "7 ARR - Jean Macé / Gerland",
//   "8": "8 ARR - Monplaisir / États-Unis",
//   "9": "9 ARR - Vaise / Gorge de Loup",
// };

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlerts = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlerts must be used within an AlertProvider");
  }
  return context;
};

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = React.useState<Alert[]>([]);
  const [unreadCount, setUnreadCount] = React.useState(0);

  const baseURL = import.meta.env.VITE_ENV === "prod" ? import.meta.env.VITE_PUBLIC_URL : import.meta.env.VITE_BACKEND_URL;

  const fetchRandomAlert = async () => {
    try {
      const response = await fetch(`${baseURL}/random-line`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      const alertData = data.alertData;

      const newAlert: Alert = {
        id: Date.now(),
        type: alertData.catastrophes.includes("seisme") ? "earthquake" : "flood",
        zones: [parseInt(alertData.quartier.match(/\d+/)?.[0] || "0")],
        severity: "medium",
        timestamp: new Date(),
        description: `Alerte ${alertData.catastrophes.join(", ")} dans le ${alertData.quartier}`,
      };

      setAlerts((prev) => {
        setUnreadCount((count) => count + 1);
        return [...prev, newAlert];
      });
    } catch (error) {
      console.error("Failed to fetch random alert", error);
    }
  };

  const resetUnreadCount = () => setUnreadCount(0);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const scheduleNextAlert = () => {
      const delay = Math.floor(Math.random() * (120000 - 5000 + 1)) + 5000;
      timeoutId = setTimeout(async () => {
        await fetchRandomAlert();
        scheduleNextAlert();
      }, delay);
    };

    scheduleNextAlert();

    return () => clearTimeout(timeoutId);
  }, []);

  return <AlertContext.Provider value={{ alerts, fetchRandomAlert, unreadCount, resetUnreadCount }}>{children}</AlertContext.Provider>;
};
