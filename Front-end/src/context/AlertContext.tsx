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
  // {
  //   id: 1,
  //   type: "earthquake",
  //   zones: [9, 5, 4, 1, 2],
  //   severity: "high",
  //   timestamp: new Date(),
  //   description: `Séisme détecté dans les zones : ${[9, 5, 4, 1, 2].map((z) => zoneNames[z.toString()]).join(", ")}`,
  // },
  // {
  //   id: 2,
  //   type: "flood",
  //   zones: [4, 1, 2, 6, 3, 7, 8],
  //   severity: "medium",
  //   timestamp: new Date(),
  //   description: `Risque d'inondation dans les zones : ${[4, 1, 2, 6, 3, 7, 8].map((z) => zoneNames[z.toString()]).join(", ")}`,
  // },
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
  let inondation = "Risque d'inondation dans les zones : ";
  let seisme = "Séisme détecté dans les zones : ";

  const fetchRandomAlert = async () => {
    try {
      const response = await fetch("http://localhost:4000/random-line");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      console.log("data:", data);

      // const description;

      // alerts.push({
      //   id: alerts.length + 1,
      //   type: Math.random() > 0.5 ? "earthquake" : "flood",
      //   zones: [Math.floor(Math.random() * 9) + 1],
      //   severity: (["high", "medium", "low"] as ("high" | "medium" | "low")[])[Math.floor(Math.random() * 3)],
      //   timestamp: new Date(),
      //   description: description,
      // });
    } catch (error) {
      console.error("Failed to fetch random alert", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchRandomAlert, 5000);
    return () => clearInterval(interval);
  }, []);

  return <AlertContext.Provider value={{ alerts, fetchRandomAlert }}>{children}</AlertContext.Provider>;
};
