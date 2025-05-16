// CORRECTED socket.ts
import { Server } from "socket.io";
import { Server as HttpServer } from "http";

export const setupSocket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      // This needs to be a valid origin or "*", not a URL path
      origin: "*", // In production, you should specify domains
      methods: ["GET", "POST"],
      credentials: true,
    },
    // Make sure the path has a trailing slash to match client configuration
    path: "/socket.io/",
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

    // Add error handler
    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });
  });

  // Log connection errors
  io.engine.on("connection_error", (err) => {
    console.error("Connection error:", err);
  });

  return io; // Return io for potential further configuration
};
