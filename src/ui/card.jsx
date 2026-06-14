import React from "react";
export const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-white rounded-2xl transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
};