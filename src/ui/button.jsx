import React from "react";

export const Button = ({ children, onClick, className = "", variant = "default", type = "button" }) => {
  // Variant ke hisab se classes decide hongi
  const baseStyles = "cursor-pointer font-semibold transition-all duration-300 inline-flex items-center justify-center";
  
  const variants = {
    default: "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg",
    outline: "border-2 border-white/30 text-white hover:bg-white/10 hover:border-amber-400 backdrop-blur-sm"
  };

  const currentVariant = variants[variant] || variants.default;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${currentVariant} ${className}`}
    >
      {children}
    </button>
  );
};