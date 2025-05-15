import React from "react";
import Header from "./components/Header";
import ChatIcon from "./components/Chat/ChatIcon";
import ChatPanel from "./components/Chat/ChatPanel";
import { ChatProvider } from "./context/ChatContext";

function App() {
  return (
    <ChatProvider>
      <div className="flex flex-col h-screen">
        <Header />
        <main className="flex-1 relative">
          <ChatIcon />
          <ChatPanel />
        </main>
      </div>
    </ChatProvider>
  );
}

export default App;
