import Header from "./components/Header";
import ChatIcon from "./components/Chat/ChatIcon";
import ChatPanel from "./components/Chat/ChatPanel";
import AlertCards from "./components/Alerts/AlertCard";
import LyonMap from "./components/Map/LyonMap";
import Activities from "./components/Activities/Activities";
import Footer from "./components/Footer";
import { ChatProvider } from "./context/ChatContext";
import { AlertProvider } from "./context/AlertContext";

function App() {
  return (
    <AlertProvider>
      <ChatProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 relative">
            <div className="container mx-auto px-4 py-6 space-y-8">
              <AlertCards />
              <LyonMap />
              <Activities />
            </div>
            <ChatIcon />
            <ChatPanel />
          </main>
          <Footer />
        </div>
      </ChatProvider>
    </AlertProvider>
  );
}

export default App;
