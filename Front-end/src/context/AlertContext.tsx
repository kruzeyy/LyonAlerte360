import React, { createContext, useContext, ReactNode } from "react";

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
}

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

const alerts: Alert[] = [
  {
    id: 1,
    type: "earthquake",
    zones: [9, 5, 4, 1, 2],
    severity: "high",
    timestamp: new Date(),
    description: `Séisme détecté dans les zones : ${[9, 5, 4, 1, 2].map((z) => zoneNames[z.toString()]).join(", ")}`,
  },
  {
    id: 2,
    type: "flood",
    zones: [4, 1, 2, 6, 3, 7, 8],
    severity: "medium",
    timestamp: new Date(),
    description: `Risque d'inondation dans les zones : ${[4, 1, 2, 6, 3, 7, 8].map((z) => zoneNames[z.toString()]).join(", ")}`,
  },
];

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlerts = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlerts must be used within an AlertProvider");
  }
  return context;
};

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <AlertContext.Provider value={{ alerts }}>{children}</AlertContext.Provider>;
};
