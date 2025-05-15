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

const alerts: Alert[] = [
  {
    id: 1,
    type: "earthquake",
    zones: [9, 5, 4, 1, 2],
    severity: "high",
    timestamp: new Date(),
    description: "Séisme détecté dans plusieurs zones de Lyon",
  },
  {
    id: 2,
    type: "flood",
    zones: [4, 1, 2, 6, 3, 7, 8],
    severity: "medium",
    timestamp: new Date(),
    description: "Risque d'inondation dans plusieurs secteurs",
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
