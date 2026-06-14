import React, { useState } from "react";
import { Clock, Star } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { destinations } from "../data/travelData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";

export const FeaturedDestinations = ({ onBookDestination }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
  <section
    id="destinations"
    className="py-5 bg-gradient-to-b from-white to-amber-50/30"
  >
    <div className="container mx-auto px-4">
        
        {/* Header - Fixed & Restored */}
        <div className="text-center mb-16">
          <span className="text-amber-600 font-semibold tracking-wider uppercase text-sm">
            Exotic Destinations
          </span>
          <h2 className="text-5xl font-bold mt-2 mb-4">
            Discover Your Next{" "}
            <span className="text-amber-600">Paradise</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Handpicked luxury destinations from around the world,
            curated exclusively for you.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <Card
              key={destination.id}
              className="flex flex-col h-full group overflow-hidden border-0 shadow-lg bg-white transition-all duration-500 ease-out hover:-translate-y-4 hover:rotate-1 hover:shadow-2xl cursor-pointer"
            >
              {/* Image Section */}
              <div className="relative h-72 w-full overflow-hidden">
                <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-md">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="text-gray-900">{destination.rating}</span>
                </div>

                <Swiper
                  modules={[Autoplay]}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: true, // Cursor le jaane par slide ruk jayega
                  }}
                  speed={800}
                  loop={true}
                  className="w-full h-full"
                >
                  {destination.images.map((img, idx) => (
                    <SwiperSlide key={idx} className="w-full h-full overflow-hidden">
                      <img
                        src={img}
  alt={destination.name}
  onError={() => console.log("Failed Image:", img)}
  className="w-full h-full object-cover cursor-pointer transition-transform duration-700 group-hover:scale-110"
  onClick={() => setSelectedImage(img)}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Content */}
              <div className="p-6 bg-white flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-2">
                  {destination.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2 flex-grow">
                  {destination.description}
                </p>
                
                <div className="flex justify-between items-center mb-4 text-sm font-semibold text-gray-700">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-amber-600" />
                    {destination.duration}
                  </span>
                  <span className="text-amber-600 text-lg font-bold">
                    {destination.price}
                  </span>
                </div>

                <Button
                  onClick={() => onBookDestination?.(destination)}
                  className="w-full bg-black hover:bg-[#D4AF37] text-white py-3 rounded-full transition-all duration-300"
                >
                  Book Package
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Zoomed"
            className="max-w-full max-h-[90vh] rounded-xl"
          />
        </div>
      )}
    </section>
  );
};