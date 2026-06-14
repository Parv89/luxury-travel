import React, { useState, useEffect } from "react";
import { ChevronRight, Sparkles } from "lucide-react";

const STATS = [
  { label: "Destinations", value: "150+" },
  { label: "Happy Clients", value: "10K+" },
  { label: "Luxury Partners", value: "500+" },
];

export const Hero = ({ onBookNow }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (!element) return;
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gray-950 pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://www.timeoutdubai.com/cloud/timeoutdubai/2023/05/25/Dubais-best-beaches.jpg"
          alt="Luxury Travel Background"
          className="w-full h-full object-cover opacity-35"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12 lg:py-20">
          
          {/* LEFT CONTENT */}
          <div className={`space-y-6 sm:space-y-8 transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"}`}>
            
            {/* Badge Section */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-amber-500/30 w-fit relative overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{ backgroundImage: "url('https://media.istockphoto.com/id/154918211/photo/city-of-dubai-burj-khalifa.jpg?s=612x612&w=0&k=20&c=IQ1upJGlnISqrBcBpmDS8HTCw-u6j08GkrFwV2QEMQk=')" }}
              />
              <div className="relative z-10 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-amber-300 text-xs sm:text-sm font-bold tracking-widest uppercase">
                  Luxury Travel Redefined
                </span>
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight text-white" style={{ fontFamily: '"Playfair Display", serif' }}>
              Embark on<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-500 to-amber-600">
                Extraordinary
              </span><br />
              Journeys
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl">
              Experience the world's most exclusive destinations with bespoke itineraries crafted for discerning travelers who look for perfection.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button onClick={onBookNow} className="group bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-4 rounded-xl text-base font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-amber-500/20 flex items-center justify-center space-x-2">
                <span>Start Your Journey</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button onClick={() => scrollToSection("destinations")} className="border border-white/20 text-white hover:bg-white/10 hover:border-amber-500 backdrop-blur-sm px-8 py-4 rounded-xl text-base font-bold transition-all duration-300 flex items-center justify-center">
                Explore Destinations
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-800/60 max-w-lg">
              {STATS.map((stat, index) => (
                <div key={index} className="text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-amber-400" style={{ fontFamily: '"Playfair Display", serif' }}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-400 mt-1 font-medium tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE SECTION - FULL BOX HOVER EFFECT */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
            <div className="relative group max-w-2xl mx-auto lg:mr-0 cursor-pointer">
              {/* Glow effect that intensifies on group hover */}
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/10 to-amber-600/10 rounded-3xl blur-2xl group-hover:blur-3xl group-hover:opacity-100 transition-all duration-500" />
              
              <div className="relative p-1 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-800 to-transparent transition-all duration-500 group-hover:-translate-y-2 group-hover:border-amber-500/50">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-900">
                  <img 
                    src="https://media.istockphoto.com/id/154918211/photo/city-of-dubai-burj-khalifa.jpg?s=612x612&w=0&k=20&c=IQ1upJGlnISqrBcBpmDS8HTCw-u6j08GkrFwV2QEMQk=" 
                    alt="Luxury Resort" 
                    className="w-full h-[320px] sm:h-[450px] lg:h-[550px] object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-gray-950/90 backdrop-blur-md p-4 rounded-xl border border-gray-800 shadow-2xl group-hover:border-amber-500/30 transition-colors duration-500">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-0.5">Featured Experience</p>
                        <p className="text-base sm:text-lg font-bold text-white tracking-wide">burj khalifa</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Starting from</p>
                        <p className="text-xl sm:text-2xl font-bold text-amber-400">$3,500</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};