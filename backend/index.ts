// src/server.ts
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { setupSocket } from "./src/socket";
import fs from "fs";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 4000;

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Random line reader endpoint
app.get("/random-line", async (req: Request, res: Response) => {
  try {
    const filePath = "./clean_file.csv";
    const fileData = fs.readFileSync(filePath, "utf8").split("\n");

    const randomIndex = Math.floor(Math.random() * fileData.length);
    const line = fileData[randomIndex].split(",");

    const alertData = {
      temperature: parseFloat(line[0]),
      humidite: parseFloat(line[1]),
      force_moyenne_du_vecteur_de_vent: parseFloat(line[2]),
      force_du_vecteur_de_vent_max: parseFloat(line[3]),
      quartier: line[5],
      sismicite: parseFloat(line[6]),
      concentration_gaz: parseFloat(line[7]),
      pluie_totale: parseFloat(line[8]),
      catastrophes: JSON.parse(line[9].replace(/'/g, '"')),
    };

    res.status(200).json({ alertData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to read the file." });
  }
});

// Create HTTP server
const server = createServer(app);

// Setup WebSocket
setupSocket(server);

// Start the server
server.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
