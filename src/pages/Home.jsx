import React, { useState } from "react";

// Saare Sections / Components ko import kar rahe hain
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { TravelPackages } from "../components/TravelPackages";
import { LuxuryServices } from "../components/LuxuryServices";
import { Testimonials } from "../components/Testimonials";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { BookingModal } from "../components/BookingModal";

// Sahi file path se data import kar rahe hain
import { indiaPackages } from "../data/travelData";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  // ================= HANDLE PACKAGE SPECIFIC BOOKING =================
  const handleBookPackage = (pkg) => {
  console.log("BOOK CLICKED", pkg);
  setSelected(pkg);
  setIsOpen(true);
};
  // ================= HANDLE HERO CTA BOOKING (DEFAULT) =================
  const handleHeroBookTrigger = () => {
    // Agar koi package selected nahi hai, toh automatic pehle package ko select kar lega
    if (indiaPackages && indiaPackages.length > 0) {
      setSelected(indiaPackages[0]);
    }
    setIsOpen(true);
  };

  return (
    <div className="bg-white min-h-screen antialiased selection:bg-amber-500 selection:text-white">
      
      {/* 1. GLOBAL NAVIGATION HEADER */}
      <Header />

      {/* 2. HERO BANNER WITH SCROLL & CTAprivileges */}
      <Hero onBookNow={handleHeroBookTrigger} />

      {/* 3. EXCLUSIVE DOMESTIC TRAVEL PACKAGES */}
      <TravelPackages onBookPackage={handleBookPackage} />

      {/* 4. PREMIUM CONCIERGE PRIVILEGES SERVICES */}
      <LuxuryServices />

      {/* 5. TRAVELERS EXPERIENCE & REVIEWS */}
      <Testimonials />

      {/* 6. BESPOKE CUSTOM ENQUIRY FORM */}
      <ContactSection />

      {/* 7. BRAND FOOTER WITH SOCIAL LINKS */}
      <Footer />

      {/* ================= GLOBAL MULTI-STEP BOOKING MODAL ================= */}
      <BookingModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        selectedItem={selected} 
      />

    </div>
  );
};

export default Home;