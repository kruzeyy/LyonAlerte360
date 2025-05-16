// src/socket.ts
import { Server } from "socket.io";
import { Server as HttpServer } from "http";

export const setupSocket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.ENV === "prod" ? process.env.PUBLIC_URL : process.env.FRONTEND_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
    path: "/socket.io",
    transports: ["websocket", "polling"],
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("message", (message) => {
      console.log("Message received:", message);
      io.emit("message", { text: message, senderId: socket.id });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
