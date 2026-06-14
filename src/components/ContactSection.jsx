import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Globe, CheckCircle } from "lucide-react";

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // ================= SAFE CHANGE HANDLER =================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= SUBMIT =================
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill all required fields properly.");
      return;
    }

    setIsSubmitting(true);

    // Mock API delay
    setTimeout(() => {
      setShowSuccessToast(true);

      setFormData({
        name: "",
        email: "",
        phone: "",
        destination: "",
        message: "",
      });

      setIsSubmitting(false);

      // Hide success message after 4 seconds
      setTimeout(() => {
        setShowSuccessToast(false);
      }, 4000);
    }, 1200);
  };

  // ================= CONTACT INFO =================
  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      content: "+91 8602962362",
      link: "tel:+15551234567",
    },
    {
      icon: Mail,
      title: "Email Us",
      content: "luxury@luxevoyage.com",
      link: "mailto:luxury@luxevoyage.com",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "Marine Drive – Netaji Subhash Chandra Bose Road, Mumbai 400020",
      link: "#",
    },
    {
      icon: Globe,
      title: "Website",
      content: "www.luxevoyage.com",
      link: "https://www.luxevoyage.com",
    },
  ];

  return (
    <section
      id="contact"
      className="py-24 bg-gradient-to-b from-white to-amber-50/30 relative"
    >
      {/* SUCCESS TOAST NOTIFICATION */}
      {showSuccessToast && (
        <div className="fixed bottom-5 right-5 z-50 bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-3 border border-amber-500/20 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="bg-emerald-500 p-1.5 rounded-full text-white">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-sm">Message Sent Successfully! 🎉</p>
            <p className="text-xs text-gray-400">Our travel experts will contact you within 24 hours.</p>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
          
          {/* ================= LEFT ================= */}
          <div className="space-y-8">
            <div>
              <h2
                className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                Let's Plan Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">
                  Dream Journey
                </span>
              </h2>

              <p className="text-lg text-gray-600">
                Get in touch with our luxury travel experts today
              </p>
            </div>

            {/* ================= CONTACT CARDS ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;

                return (
                  <a
                    key={index}
                    href={info.link}
                    className="block group"
                  >
                    <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                          <Icon className="w-5 h-5 text-white" />
                        </div>

                        <div className="overflow-hidden">
                          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                            {info.title}
                          </p>
                          <p className="text-gray-900 font-bold text-sm truncate group-hover:text-amber-600 transition-colors">
                            {info.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Image Banner */}
            <div className="hidden lg:block relative rounded-3xl overflow-hidden shadow-xl h-64 group">
              <img
                src="https://i.pinimg.com/736x/b8/ce/c8/b8cec8da6607853df2c2c10ac0b2d183.jpg"
                alt="Luxury Travel"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-xs font-semibold tracking-widest uppercase text-amber-400 mb-1">Bespoke Concierge</p>
                <p className="text-xl font-bold tracking-wide" style={{ fontFamily: '"Playfair Display", serif' }}>Your Private Gateway to the World</p>
              </div>
            </div>
          </div>

          {/* ================= RIGHT FORM ================= */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Desired Destination</label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm"
                  placeholder="e.g., Maldives, Swiss Alps"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm resize-none"
                  placeholder="Tell us about your ideal luxury vacation plan..."
                  required
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-3.5 font-medium rounded-xl text-base transition-all duration-300 shadow-lg shadow-amber-600/10 flex items-center justify-center space-x-2 disabled:opacity-80"
              >
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                {!isSubmitting && <Send className="w-4 h-4" />}
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
};