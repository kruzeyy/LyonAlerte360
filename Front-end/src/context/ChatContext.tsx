// ChatContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { io, Socket } from "socket.io-client";

interface ChatContextType {
  isOpen: boolean;
  toggleChat: () => void;
  closeChat: () => void;
  messages: Message[];
  addMessage: (message: string, isUser: boolean) => void;
}

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketURL = import.meta.env.VITE_ENV === "prod" ? import.meta.env.VITE_WS_URL : import.meta.env.VITE_BACKEND_URL;
    const newSocket = io(socketURL, {
      path: "/socket.io/",
      transports: ["websocket", "polling"],
    });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected with id", newSocket.id);
    });

    newSocket.on("message", (data: { text: string; senderId: string }) => {
      if (data.senderId !== newSocket.id) {
        addMessage(data.text, false);
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);

    // connect to socket when chat is opened
    if (!isOpen && socket) {
      socket.connect();
    } else if (socket) {
      socket.disconnect();
    }
  };

  const closeChat = () => {
    setIsOpen(false);

    // disconnect from socket when chat is closed
    if (socket) {
      socket.disconnect();
    }
  };

  const addMessage = (text: string, isUser: boolean) => {
    const newMessage: Message = {
      id: messages.length + 1,
      text,
      isUser,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);

    if (socket && isUser) {
      socket.emit("message", text);
    }
  };

  return <ChatContext.Provider value={{ isOpen, toggleChat, closeChat, messages, addMessage }}>{children}</ChatContext.Provider>;
};
