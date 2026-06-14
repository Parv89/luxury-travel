import React, { useState, useEffect } from "react";
import { Menu, X, Plane } from "lucide-react";

// NAV ITEMS (clean + reusable)
const NAV_ITEMS = [
  "home",
  "destinations",
  "packages",
  "services",
  "testimonials",
  "contact",
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (element) {
      // Offset calculation for fixed header
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }

    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-lg shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
         {/* ================= LOGO ================= */}
<div onClick={() => scrollToSection("home")} className="flex items-center cursor-pointer group">
  <div className="relative">
    <Plane
      className={`w-8 h-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 ${
        isScrolled ? "text-amber-600" : "text-white drop-shadow-lg"
      }`}
    />
    <div className="absolute inset-0 bg-amber-400 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
  </div>

  {/* Logo aur Text ke beech sirf halka sa gap rakha hai */}
  <div className="flex flex-col ml-1"> 
    <h1
      className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${
        isScrolled ? "text-gray-900" : "text-white drop-shadow-lg"
      }`}
      style={{ fontFamily: '"Playfair Display", serif', lineHeight: '1' }}
    >
      Luxe<span className="text-amber-600">Voyage</span>
    </h1>

    <p
      className={`text-xs font-bold tracking-widest transition-colors duration-300 -mt-0.5 ${
        isScrolled ? "text-amber-600" : "text-amber-200"
      }`}
    >
      LUXURY TRAVEL
    </p>
  </div>
</div>

          {/* ================= DESKTOP NAV ================= */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => scrollToSection(item)}
                className={`text-xs font-bold tracking-wider uppercase transition-all duration-300 relative group py-2 ${
                  isScrolled
                    ? "text-gray-700 hover:text-amber-600"
                    : "text-white hover:text-amber-200 drop-shadow-sm"
                }`}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* ================= CTA BUTTON ================= */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection("contact")}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-600/20"
            >
              Book Now
            </button>
          </div>

          {/* ================= MOBILE MENU BUTTON ================= */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className={`md:hidden p-2 rounded-lg transition-colors duration-300 focus:outline-none ${
              isScrolled ? "text-gray-900" : "text-white"
            }`}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-4 right-4 bg-white/98 backdrop-blur-xl rounded-2xl shadow-2xl mt-2 p-4 border border-gray-100 animate-in fade-in slide-in-from-top-5 duration-300">
            <nav className="flex flex-col space-y-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => scrollToSection(item)}
                  className="text-left text-gray-800 hover:text-amber-600 font-bold uppercase text-xs py-3 px-2 rounded-xl hover:bg-amber-50/50 transition-all duration-200"
                >
                  {item}
                </button>
              ))}

              <button
                onClick={() => scrollToSection("contact")}
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-white w-full py-3 rounded-xl font-medium text-sm mt-2 shadow-lg shadow-amber-600/10 text-center"
              >
                Book Now
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};