import {
  Plane,
  Ship,
  Hotel,
  User,
  Star,
  UtensilsCrossed,
} from "lucide-react";

// ================= MOCK DATA FALLBACK =================
// Agar aapki data file load na ho ya path change ho, toh website crash nahi hogi.
import { luxuryServices as importedServices } from "../data/travelData";

const fallbackServices = [
  { id: 1, icon: "plane", title: "Private Jet Charter", description: "Travel on your own schedule with worldwide access to premium private aircraft." },
  { id: 2, icon: "hotel", title: "Exclusive Resorts", description: "Handpicked 5-star villas, overwater bungalows, and private islands with top privacy." },
  { id: 3, icon: "user", title: "Butler Service", description: "24/7 dedicated professional staff attending to your every preference and request." },
  { id: 4, icon: "utensils", title: "Fine Dining", description: "Bespoke culinary experiences curated by Michelin-starred chefs worldwide." },
  { id: 5, icon: "ship", title: "Luxury Cruise", description: "Sail the high seas in ultra-luxury yachts configured with ultimate comfort." },
  { id: 6, icon: "star", title: "VIP Access", description: "Skip lines and get exclusive access to sold-out events, tours, and hidden lounges." }
];

const luxuryServices = importedServices || fallbackServices;

// ================= ICON MAP =================
const iconMap = {
  plane: Plane,
  ship: Ship,
  hotel: Hotel,
  user: User,
  star: Star,
  utensils: UtensilsCrossed,
};

export const LuxuryServices = () => {
  return (
    <section
      id="services"
      className="py-0 bg-gradient-to-b from-white to-amber-50/30 relative overflow-hidden"
    >
      {/* ================= BACKGROUND GLOWS ================= */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ================= HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block mb-3 bg-amber-100 text-amber-800 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full border border-amber-200/50 shadow-sm">
            Premium Services
          </span>

          <h2
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Luxury Services{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">
              Tailored for You
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto">
            Experience unparalleled comfort, absolute privacy, and elite personalization with our signature travel privileges.
          </p>
        </div>

        {/* ================= GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {luxuryServices.map((service) => {
            const Icon = iconMap[service.icon];

            return (
              <div
                key={service.id}
                className="group relative bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 transform hover:-translate-y-2 overflow-hidden flex flex-col justify-between"
              >
                {/* Hover ambient color overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-transparent to-amber-600/0 group-hover:from-amber-500/5 group-hover:to-amber-600/5 transition-all duration-500 pointer-events-none" />

                <div>
                  {/* ================= ICON CONTAINER ================= */}
                  <div className="relative mb-6 w-fit">
                    <div className="absolute inset-0 bg-amber-400/30 blur-xl rounded-full scale-0 group-hover:scale-125 transition-transform duration-500" />
                    
                    <div className="relative w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center group-hover:rotate-6 group-hover:scale-105 transition-all duration-500 shadow-lg shadow-amber-600/10 text-white">
                      {Icon ? <Icon className="w-6 h-6" /> : <Star className="w-6 h-6" />}
                    </div>
                  </div>

                  {/* ================= TEXT CONTENT ================= */}
                  <h3
                    className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors duration-300"
                    style={{ fontFamily: '"Playfair Display", serif' }}
                  >
                    {service.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Interactive bottom line animation */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-amber-400 to-amber-600 group-hover:w-full transition-all duration-500" />
              </div>
            );
          })}
        </div>

        {/* ================= FOOTER CONCIERGE CTA ================= */}
        <div className="text-center mt-16">
          <p className="text-gray-500 text-sm mb-2">
            Need a custom privilege or hyper-exclusive itinerary?
          </p>

          <a
            href="#contact"
            className="inline-flex items-center text-amber-600 font-bold hover:text-amber-700 transition-colors duration-200 group text-sm border-b-2 border-amber-500/20 hover:border-amber-600 pb-0.5"
          >
            Contact Our Concierge Team 
            <span className="transform group-hover:translate-x-1 transition-transform duration-200 ml-1">→</span>
          </a>
        </div>

      </div>
    </section>
  );
};