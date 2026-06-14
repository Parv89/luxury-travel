import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ⚡ TOAST IMPORTS
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ==================== COMPONENTS IMPORTS ====================
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { FeaturedDestinations } from "./components/FeaturedDestinations";
import { TravelPackages } from "./components/TravelPackages";
import { LuxuryServices } from "./components/LuxuryServices";
import { Testimonials } from "./components/Testimonials";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { BookingModal } from "./components/BookingModal";

// ==================== DATA IMPORT ====================
import { indiaPackages } from "./data/travelData.js";

// ==================== HOMEPAGE COMPONENT ====================
const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  // 🎯 HERO SECTION CTA TRIGGER
  const handleBookNow = () => {
    if (indiaPackages && indiaPackages.length > 0) {
      setSelected(indiaPackages[0]);
    }
    setIsOpen(true);
    toast.info("Opening custom luxury builder...", { position: "top-right", autoClose: 2000 });
  };

  // 🎯 FEATURED DESTINATIONS CARD TRIGGER
  const handleBookDestination = (item) => {
    setSelected(item);
    setIsOpen(true);
    toast.success(`Selected destination: ${item.name || item.title}`, { position: "top-right", autoClose: 2000 });
  };

  // 🎯 TRAVEL PACKAGES CARD TRIGGER
  const handleBookPackage = (pkg) => {
    setSelected(pkg);
    setIsOpen(true);
    toast.success(`Selected package: ${pkg.name}`, { position: "top-right", autoClose: 2000 });
  };

  return (
    <>
      <Header />
      <Hero onBookNow={handleBookNow} />
      <FeaturedDestinations onBookDestination={handleBookDestination} />
      <TravelPackages onBookPackage={handleBookPackage} />
      <LuxuryServices />
      <Testimonials />
      <ContactSection />
      <Footer />

      {/* ================= GLOBAL REAL-TIME BOOKING MODAL ================= */}
      <BookingModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        selectedItem={selected} 
      />

      {/* ⚡ GLOBAL TOAST CONTAINER */}
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" 
      />
    </>
  );
};

// ==================== MAIN APP EXPORT ====================
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;