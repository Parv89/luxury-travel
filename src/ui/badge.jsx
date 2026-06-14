import React from "react";
export const Badge = ({ children, className = "" }) => {
  return (
    <span className={`inline-block text-xs font-semibold tracking-wider rounded-full ${className}`}>
      {children}
    </span>
  );
};