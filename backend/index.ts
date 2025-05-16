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

// Regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Random line reader endpoint
app.get("/random-line", async (req: Request, res: Response) => {
  try {
    const filePath = "./clean_file.csv";
    const fileData = fs.readFileSync(filePath, "utf8").split("\n");

    const randomIndex = Math.floor(Math.random() * fileData.length);
    const randomLine = fileData[randomIndex].replace(/\d{4}-\d{2}-\d{2}.*/, ""); // Ignore dates

    console.log(`Random line: ${randomLine.trim()}`);

    res.status(200).json({ line: randomLine.trim() });
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
