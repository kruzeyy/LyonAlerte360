import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

interface CsvData {
  temperature: number;
  humidite: number;
  force_moyenne_du_vecteur_de_vent: number;
  force_du_vecteur_de_vent_max: number;
  sismicite: number;
  concentration_gaz: number;
  pluie_totale: number;
  catastrophe: string;
  quartier: string;
  date: string;
}

interface DataContextType {
  latestData: CsvData | null;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [latestData, setLatestData] = useState<CsvData | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000');
    setSocket(newSocket);

    newSocket.on('csvData', (data: CsvData) => {
      setLatestData(data);
      console.log('Received new data:', data);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <DataContext.Provider value={{ latestData }}>
      {children}
    </DataContext.Provider>
  );
};