// src/socket.ts
import { Server } from "socket.io";
import { Server as HttpServer } from "http";

export const setupSocket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    socket.on("message", (message) => {
      console.log("Message received:", message);
      io.emit("message", message);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });

    setInterval(() => {
      io.emit("message", "[SERVER]: Ceci est un message de test envoyé toutes les 30 secondes.");
    }, 30000);
  });
};
