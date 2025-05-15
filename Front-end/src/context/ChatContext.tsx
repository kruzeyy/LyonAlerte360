import React, { createContext, useContext, useState, ReactNode } from "react";

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

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Bonjour et bienvenue sur LyonAlert360. Comment puis-je vous aider aujourd'hui?",
    isUser: false,
    timestamp: new Date(),
  },
];

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  const addMessage = (text: string, isUser: boolean) => {
    const newMessage: Message = {
      id: messages.length + 1,
      text,
      isUser,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <ChatContext.Provider
      value={{
        isOpen,
        toggleChat,
        closeChat,
        messages,
        addMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
