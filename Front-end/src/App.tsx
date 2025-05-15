import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ChatIcon from "./components/Chat/ChatIcon";
import ChatPanel from "./components/Chat/ChatPanel";
import Home from "./pages/Home";
import Activities from "./pages/Activities";
import Safety from "./pages/Safety";
import About from "./pages/About";
import Legal from "./pages/Legal";
import Footer from "./components/Footer";
import { ChatProvider } from "./context/ChatContext";
import { AlertProvider } from "./context/AlertContext";

function App() {
  return (
    <Router>
      <AlertProvider>
        <ChatProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 relative">
              <div className="container mx-auto px-4 py-6">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/activities" element={<Activities />} />
                  <Route path="/safety" element={<Safety />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/legal" element={<Legal />} />
                </Routes>
              </div>
              <div className="fixed bottom-4 right-4 z-50">
                <ChatIcon />
                <ChatPanel />
              </div>
            </main>
            <Footer />
          </div>
        </ChatProvider>
      </AlertProvider>
    </Router>
  );
}
export default App;