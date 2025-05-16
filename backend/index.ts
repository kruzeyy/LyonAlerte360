// src/server.ts
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { setupSocket } from "./src/socket";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

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

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World");
});

// Create HTTP server
const server = createServer(app);

// Setup WebSocket
setupSocket(server);

// Start the server
server.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
