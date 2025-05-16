import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { CsvReader } from './csvReader';

export const setupSocket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST"],
    },
  });

  const csvReader = new CsvReader();

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    let dataInterval: NodeJS.Timeout;

    // Start sending random data
    const startDataStream = () => {
      dataInterval = setInterval(() => {
        const randomData = csvReader.getRandomRow();
        if (randomData) {
          socket.emit('csvData', randomData);
        }
      }, Math.floor(Math.random() * (180000 - 20000) + 20000)); // Random interval between 20s and 3min
    };

    startDataStream();

    socket.on("message", (message) => {
      console.log("Message received:", message);
      io.emit("message", { text: message, senderId: socket.id });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      clearInterval(dataInterval);
    });
  });
};