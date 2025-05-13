"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  variant?: "default" | "outline" | "gradient";
}

export const Button = ({ onClick, children, variant = "default" }: ButtonProps) => {
  const baseClasses = "font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 transition-all duration-200 focus:outline-none";
  
  const variantClasses = {
    default: "text-white bg-accent-blue hover:bg-accent-blue-dark focus:ring-2 focus:ring-accent-blue/50",
    outline: "text-accent-blue-light bg-transparent border border-accent-blue hover:bg-accent-blue/10 focus:ring-2 focus:ring-accent-blue/50",
    gradient: "text-white bg-gradient-to-r from-accent-blue to-accent-green hover:opacity-90 focus:ring-2 focus:ring-accent-blue/50",
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
};
