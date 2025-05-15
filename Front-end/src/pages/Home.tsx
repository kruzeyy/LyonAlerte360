import React from "react";
import AlertCards from "../components/Alerts/AlertCard";
import LyonMap from "../components/Map/LyonMap";

const Home: React.FC = () => {
  return (
    <div className="space-y-8">
      <AlertCards />
      <LyonMap />
    </div>
  );
};

export default Home;
