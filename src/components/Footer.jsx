import {
  Plane,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  // ================= DATA =================
  const footerLinks = {
    destinations: [
      { name: "Maldives", href: "#destinations" },
      { name: "Dubai", href: "#destinations" },
      { name: "Bali", href: "#destinations" },
      { name: "Switzerland", href: "#destinations" },
      { name: "Paris", href: "#destinations" }
    ],
    company: [
      { name: "About Us", href: "#" },
      { name: "Our Team", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" },
      { name: "Blog", href: "#" }
    ],
    support: [
      { name: "Help Center", href: "#" },
      { name: "Contact Us", href: "#contact" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "FAQ", href: "#" },
    ],
  };

  // ================= CUSTOM INLINE SVGS FOR SOCIALS =================
  const FacebookIconCustom = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );

  const InstagramIconCustom = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );

  const TwitterIconCustom = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );

  const LinkedinIconCustom = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );

  const socialLinks = [
    { icon: FacebookIconCustom, label: "Facebook", href: "https://facebook.com" },
    { icon: InstagramIconCustom, label: "Instagram", href: "https://instagram.com" },
    { icon: TwitterIconCustom, label: "Twitter", href: "https://twitter.com" },
    { icon: LinkedinIconCustom, label: "LinkedIn", href: "https://linkedin.com" },
  ];

  // ================= LINK RENDER =================
  const renderLinks = (items) =>
    items.map((item, index) => (
      <li key={index}>
        <a
          href={item.href}
          className="text-gray-400 hover:text-amber-400 transition-colors duration-300 text-sm block py-1"
        >
          {item.name}
        </a>
      </li>
    ));

  return (
    <footer className="bg-gradient-to-b from-gray-950 to-black text-white pt-16 pb-8 border-t border-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================= TOP GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">

          {/* ================= BRAND ================= */}
          <div className="sm:col-span-2 space-y-5">
            <div className="flex items-center space-x-3 group cursor-pointer w-fit">
              <div className="relative">
                <Plane className="w-8 h-8 text-amber-500 group-hover:rotate-12 transition-transform duration-300" />
                <div className="absolute inset-0 bg-amber-400/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div>
                <h3
                  className="text-2xl font-bold tracking-wide"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  Luxe<span className="text-amber-500">Voyage</span>
                </h3>
                <p className="text-[10px] tracking-widest text-amber-400 font-bold uppercase">
                  Luxury Travel
                </p>
              </div>
            </div>

            <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
              Creating extraordinary travel experiences, custom packages, and bespoke services for discerning travelers around the globe.
            </p>

            {/* CONTACT INFORMATION */}
            <div className="space-y-2.5 text-sm text-gray-400 pt-2">
              <a href="mailto:luxury@luxevoyage.com" className="flex items-center space-x-3 hover:text-amber-400 transition-colors w-fit">
                <Mail className="w-4 h-4 text-amber-500/80" />
                <span>luxury@luxevoyage.com</span>
              </a>

              <a href="tel:+15551234567" className="flex items-center space-x-3 hover:text-amber-400 transition-colors w-fit">
                <Phone className="w-4 h-4 text-amber-500/80" />
                <span>+91 8602962362</span>
              </a>

              <div className="flex items-center space-x-3 w-fit">
                <MapPin className="w-4 h-4 text-amber-500/80" />
                <span>Marine Drive – Netaji Subhash Chandra Bose Road, Mumbai 400020</span>
              </div>
            </div>
          </div>

          {/* ================= DESTINATIONS ================= */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-amber-500">
              Destinations
            </h4>
            <ul className="space-y-1.5">
              {renderLinks(footerLinks.destinations)}
            </ul>
          </div>

          {/* ================= COMPANY ================= */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-amber-500">
              Company
            </h4>
            <ul className="space-y-1.5">
              {renderLinks(footerLinks.company)}
            </ul>
          </div>

          {/* ================= SUPPORT ================= */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-amber-500">
              Support
            </h4>
            <ul className="space-y-1.5">
              {renderLinks(footerLinks.support)}
            </ul>
          </div>

        </div>

        {/* ================= DIVIDER ================= */}
        <div className="border-t border-gray-900 mb-8" />

        {/* ================= BOTTOM ================= */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs text-center sm:text-left">
            © {currentYear} LuxeVoyage. All rights reserved. Made for your absolute luxury.
          </p>

          {/* SOCIAL LINKS */}
          <div className="flex items-center space-x-3">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;

              return (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-gray-900 hover:bg-amber-500 text-gray-400 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 border border-gray-800"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

      </div>
    </footer>
  );
};