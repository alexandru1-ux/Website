import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Home } from "@/pages/Home";
import { Admin } from "@/pages/Admin";
import { Commissions } from "@/pages/Commissions";
import { Toaster } from "@/components/ui/sonner";
import { ParticleRain } from "@/components/ParticleRain";
import { LightningScroll } from "@/components/LightningScroll";
import { CustomCursor } from "@/components/CustomCursor";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ParticleRain />
        <LightningScroll />
        <CustomCursor />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/commissions" element={<Commissions />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
