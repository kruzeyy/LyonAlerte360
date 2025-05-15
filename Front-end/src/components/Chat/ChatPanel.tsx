import React, { useState, useRef, useEffect } from "react";
import { Send, X, User } from "lucide-react";
import { useChat } from "../../context/ChatContext";
import { Bell } from "lucide-react";

const ChatPanel: React.FC = () => {
  const { isOpen, closeChat, messages, addMessage } = useChat();
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    // Add user message
    addMessage(inputValue, true);
    setInputValue("");

    // Simulate response after a short delay
    setTimeout(() => {
      addMessage("Merci pour votre message. Notre équipe a été notifiée et reviendra vers vous rapidement.", false);
    }, 1000);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div
      className={`fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-lg shadow-xl z-30 overflow-hidden transition-all duration-300 transform ${
        isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 pointer-events-none"
      }`}
      style={{ maxHeight: "calc(100% - 160px)" }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white p-4 flex justify-between items-center">
        <h3 className="font-bold">Assistance LyonAlert360</h3>
        <button onClick={closeChat} className="p-1 rounded-full hover:bg-red-700 transition-colors" aria-label="Close chat">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="p-4 h-96 overflow-y-auto bg-gray-50">
        {messages.map((message) => (
          <div key={message.id} className={`mb-4 flex ${message.isUser ? "justify-end" : "justify-start"}`}>
            {!message.isUser && (
              <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center mr-2 flex-shrink-0">
                <Bell className="h-4 w-4" />
              </div>
            )}
            <div className={`px-4 py-2 rounded-lg max-w-[80%] ${message.isUser ? "bg-blue-600 text-white rounded-br-none" : "bg-gray-200 text-gray-800 rounded-bl-none"}`}>
              <p className="text-sm">{message.text}</p>
              <p className="text-xs mt-1 opacity-70">{message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
            </div>
            {message.isUser && (
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center ml-2 flex-shrink-0">
                <User className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 flex">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Tapez votre message..."
          className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:border-red-500"
        />
        <button type="submit" className="bg-red-600 text-white p-2 rounded-r-lg hover:bg-red-700 transition-colors">
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
};

export default ChatPanel;
