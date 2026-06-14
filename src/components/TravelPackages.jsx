import React, { useState } from "react";
import { Calendar, CheckCircle, Star, X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";

// ================= MOCK DATA FALLBACK =================
import { indiaPackages as importedPackages } from "../data/travelData";

const fallbackPackages = [
  {
    id: 1,
    name: "Royal Rajasthan Heritage",
    description: "Experience the grand royalty of India with private palace tours, desert glamping, and vintage car rides.",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80",
    rating: "4.9",
    duration: "7 Days / 6 Nights",
    price: 2450,
    locations: ["Jaipur", "Udaipur", "Jodhpur"],
    inclusions: ["5-Star Palace Stays", "Private Chauffeur", "Heritage Monument Access"]
  },
  {
    id: 2,
    name: "Kerala Houseboat & Backwaters",
    description: "Unwind in luxury overwater houseboats, private ayurvedic luxury resorts, and premium tea estate villas.",
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=600&q=80",
    rating: "4.8",
    duration: "6 Days / 5 Nights",
    price: 1980,
    locations: ["Alleppey", "Munnar", "Cochin"],
    inclusions: ["Ultra Luxury Houseboat", "Ayurvedic Spa Sessions", "Private Tea Plantation Tour"]
  }
];

const indiaPackages = importedPackages || fallbackPackages;

export const TravelPackages = ({ onBookPackage }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section
      id="packages"
      className="py-24 bg-gradient-to-b from-amber-50/20 to-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block mb-3 bg-amber-100 text-amber-800 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full border border-amber-200/50 shadow-sm">
            Exclusive Tour Packages
          </span>

          <h2
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Experience Incredible{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">
              India
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto">
            Immerse yourself in royalty, historic culture, and pristine natural beauty with our bespoke domestic luxury tours.
          </p>
        </div>

        {/* ================= GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {indiaPackages && indiaPackages.map((pkg, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={pkg.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="h-full"
              >
                {/* Responsive Card Container */}
                <div
                  className={`h-full flex flex-col sm:flex-row rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-md transition-all duration-500 ${
                    isHovered ? "shadow-2xl -translate-y-2 border-amber-300" : ""
                  }`}
                >
                  {/* Image Section */}
                 <div className="relative w-full sm:w-2/5 h-[500px] overflow-hidden flex-shrink-0">

 <Swiper
  modules={[Autoplay]}
  autoplay={{
    delay: 2500,
    disableOnInteraction: false,
  }}
  loop={true}
  className="w-full h-[400px]"
>
    {(pkg.images || [pkg.image]).map((img, idx) => (
      <SwiperSlide key={idx}>
  <img
    src={img}
    alt={pkg.name}
     className="w-full h-[400px] object-cover cursor-pointer"
   onClick={() => setSelectedImage(img)}
  />
</SwiperSlide>
    ))}
  </Swiper>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    {/* Floating Rating */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center space-x-1 shadow-md">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span className="text-xs font-bold text-gray-900">{pkg.rating}</span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 bg-white">
                    <div>
                      {/* Locations Badges */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {pkg.locations && pkg.locations.map((loc, i) => (
                          <span key={i} className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200/30 px-2 py-0.5 rounded-md">
                            {loc}
                          </span>
                        ))}
                      </div>

                      <h3
                        className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors"
                        style={{ fontFamily: '"Playfair Display", serif' }}
                      >
                        {pkg.name}
                      </h3>

                      <p className="text-gray-600 text-xs sm:text-sm mb-4 leading-relaxed">{pkg.description}</p>

                      {/* Inclusions / Features */}
                      <div className="space-y-2 mb-6">
                        {pkg.inclusions && pkg.inclusions.map((inc, i) => (
                          <div key={i} className="flex items-center text-xs sm:text-sm text-gray-700">
                            <CheckCircle className="w-4 h-4 text-amber-500 mr-2 flex-shrink-0" />
                            <span>{inc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer Meta & Action Trigger */}
                    <div className="border-t border-gray-100 pt-4 mt-auto">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-gray-500 text-xs font-medium">
                          <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                          <span>{pkg.duration}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] uppercase tracking-wide text-gray-400">Price per person</p>
                          <p className="text-xl font-bold text-amber-600">${pkg.price ? pkg.price.toLocaleString() : "N/A"}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => onBookPackage && onBookPackage(pkg)}
                        className="w-full bg-gray-950 hover:bg-amber-600 text-white rounded-xl transition-all duration-300 py-3 text-sm font-bold shadow-sm"
                      >
                        Book Package
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
      {selectedImage && (
  <div
    className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
    onClick={() => setSelectedImage(null)}
  >
    <img
      src={selectedImage}
      alt="Preview"
      className="max-w-[95%] max-h-[95%] rounded-xl"
    />
  </div>
)}
    </section>
    

  );
};