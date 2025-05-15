import React from "react";
import { MessageCircle } from "lucide-react";
import { useChat } from "../../context/ChatContext";

const ChatIcon: React.FC = () => {
  const { toggleChat, isOpen } = useChat();

  return (
    <button
      onClick={toggleChat}
      className={`fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-lg z-40 transition-all duration-300 ${
        isOpen ? "bg-red-700 rotate-90" : "bg-red-600 hover:bg-red-700"
      }`}
      aria-label="Toggle chat"
    >
      <div className={`absolute w-full h-full rounded-full ${!isOpen ? "animate-ping-slow bg-red-500 opacity-30" : "opacity-0"}`}></div>
      <MessageCircle className="h-6 w-6 text-white" />
    </button>
  );
};

export default ChatIcon;
