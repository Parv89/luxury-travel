import React from "react";
import { Star } from "lucide-react";
import { testimonials } from "../data/travelData";

export const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="py-24 bg-gray-50"
    >
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-amber-600 font-semibold tracking-widest uppercase text-sm">Client Testimonials</span>
          <h2 className="text-5xl font-bold mt-3">Stories from Our <span className="text-amber-600">Happy Travelers</span></h2>
        </div>

        {/* 2x2 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <div 
              key={t.id} 
              className="group bg-white p-8 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 flex flex-col h-full relative"
            >
              {/* Quote Mark */}
              <div className="absolute top-4 right-6 text-amber-100 text-6xl font-serif select-none">"</div>
              
              {/* Stars */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} className="w-4 h-4 text-amber-500 fill-amber-500" />
                ))}
              </div>
              
              {/* Comment with Destination */}
              <p className="text-gray-600 italic mb-8 flex-grow leading-relaxed">
                "{t.comment} {t.package ? `of ${t.package}` : ""}"
              </p>
              
              {/* Author Info */}
              <div className="pt-6 border-t flex items-center gap-4">
                <img 
                  src={t.image} 
                  alt={t.name}
                  className="w-14 h-14 rounded-full border-2 border-amber-500 object-cover shadow-sm"
                />
                <div>
                  <h4 className="font-bold text-lg text-gray-900">{t.name}</h4>
                  <p className="text-amber-600 text-xs font-bold uppercase tracking-wider">{t.package}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};