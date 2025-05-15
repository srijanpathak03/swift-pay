"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ArrowRight, Smartphone, Lock, Info, ArrowLeft, Loader2, ChevronLeft, Wallet } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";

// Ensure this page is dynamically rendered
export const dynamic = 'force-dynamic';

// Progress bar component for navigation transitions
function NavigationProgressBar({ isLoading }: { isLoading: boolean }) {
  const controls = useAnimation();
  
  useEffect(() => {
    if (isLoading) {
      controls.start({
        width: ["0%", "30%", "70%", "100%"],
        transition: { 
          times: [0, 0.3, 0.8, 1],
          duration: 2, 
          ease: "easeInOut" 
        }
      });
    } else {
      controls.start({ width: "0%" });
    }
  }, [isLoading, controls]);

  if (!isLoading) return null;
  
  return (
    <motion.div 
      className="fixed top-0 left-0 h-1 bg-gradient-to-r from-accent-blue via-accent-green to-accent-blue-light z-50"
      animate={controls}
      initial={{ width: "0%" }}
    />
  );
}

// Premium loader overlay
function LoaderOverlay({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-dark-100/90 backdrop-blur-md z-50 flex items-center justify-center"
    >
      <motion.div
        className="relative flex flex-col items-center"
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative h-24 w-24">
          {/* Glowing background circles */}
          <motion.div 
            className="absolute inset-0 rounded-full bg-accent-blue/20 blur-xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Linear gradient border */}
          <div className="absolute inset-0 rounded-full overflow-hidden p-1">
            <motion.div 
              className="w-full h-full rounded-full border-4 border-transparent bg-clip-border"
              style={{
                backgroundImage: "linear-gradient(to right, #3b82f6, #10b981, #3b82f6)",
                backgroundSize: "200% 200%",
              }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          
          {/* Spinner */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="h-12 w-12 text-white" />
          </motion.div>
        </div>
        
        <motion.p 
          className="mt-8 text-slate-100 font-medium text-lg"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Loading SwiftPay
        </motion.p>
        
        <div className="mt-4 text-center max-w-xs">
          <p className="text-slate-300 text-sm">
            Your premium digital banking experience is just moments away
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function LoginSignup() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Clear previous error
    const onlyNumber = phoneNumber.replace(/\D/g, "");
    
    // Simulate loading for demo purposes
    setTimeout(async () => {
      try {
        const res = await signIn("credentials", {
          phone: onlyNumber,
          password: password,
          redirect: false,
        });
        
        if (res?.status === 201) {
          toast.success(
            "Welcome to SwiftPay! Your account has been created successfully.",
          );
          router.push("/dashboard");
        } else if (res?.status === 200) {
          toast.success("You've successfully logged in to your SwiftPay account.");
          router.push("/dashboard");
        } else {
          setError("Invalid phone number or password. Please try again.");
          setIsLoading(false);
        }
      } catch (error) {
        setError("An error occurred. Please try again later.");
        setIsLoading(false);
      }
    }, 2000);
  };

  // Updated floating elements for a more interesting background
  const floatingBlobs = [
    { initialX: "15%", initialY: "20%", size: "12rem", delay: 0, color: "bg-accent-blue/5" },
    { initialX: "80%", initialY: "60%", size: "18rem", delay: 1, color: "bg-accent-green/5" },
    { initialX: "25%", initialY: "75%", size: "22rem", delay: 2, color: "bg-purple-500/5" }
  ];

  // Animated particles for the background - fixed to use consistent value types
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.5 + 0.1
  }));

  return (
    <div className="min-h-screen bg-dark-100 flex flex-col relative overflow-hidden">
      {/* Navigation Progress Bar */}
      <NavigationProgressBar isLoading={isLoading} />
      
      {/* Loading Overlay */}
      <LoaderOverlay isLoading={isLoading} />
      
      {/* Back Button */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="fixed top-4 left-4 z-10"
      >
        <Link href="/">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-200/80 backdrop-blur-sm border border-dark-300 text-slate-100 hover:bg-dark-300 transition-all duration-200 text-sm"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back To Home</span>
          </motion.button>
        </Link>
      </motion.div>
      
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-radial from-dark-100 to-[#050810] opacity-90"></div>
        
        {/* Grid overlay with better opacity */}
        <div className="absolute inset-0 opacity-[0.05] bg-grid-dark"></div>
        
        {/* Vector elements */}
        <svg className="absolute top-0 right-0 w-full h-full opacity-[0.04]" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
          <circle cx="400" cy="400" r="200" fill="none" stroke="url(#circleGradient)" strokeWidth="1" />
          <circle cx="400" cy="400" r="300" fill="none" stroke="url(#circleGradient)" strokeWidth="0.5" />
          <circle cx="400" cy="400" r="400" fill="none" stroke="url(#circleGradient)" strokeWidth="0.2" />
          <defs>
            <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Animated floating blobs */}
        {floatingBlobs.map((blob, index) => (
          <motion.div
            key={index}
            className={`absolute rounded-full blur-3xl ${blob.color}`}
            style={{
              width: blob.size,
              height: blob.size,
              left: blob.initialX,
              top: blob.initialY,
            }}
            animate={{
              x: [0, 30, 0, -30, 0],
              y: [0, -30, 0, 30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              delay: blob.delay,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Animated particles - fixed animation values to use consistent types */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute bg-white rounded-full opacity-50"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
            }}
            animate={{
              y: [`${particle.y}%`, `-100%`],
              opacity: [particle.opacity, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "linear",
            }}
          />
        ))}
        
        {/* Hexagonal pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="hexagons" x="0" y="0" width="50" height="86.6" patternUnits="userSpaceOnUse">
              <polygon points="25,0 50,14.4 50,43.3 25,57.7 0,43.3 0,14.4" fill="none" stroke="url(#hexGradient)" strokeWidth="0.5" />
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#hexagons)" />
            <defs>
              <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        {/* Abstract lines with improved styling */}
        <svg className="absolute bottom-0 left-0 w-1/3 h-1/3 opacity-[0.05]" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="0" y1="0" x2="100" y2="100" stroke="url(#lineGradient)" strokeWidth="0.3" />
          <line x1="20" y1="0" x2="100" y2="80" stroke="url(#lineGradient)" strokeWidth="0.3" />
          <line x1="40" y1="0" x2="100" y2="60" stroke="url(#lineGradient)" strokeWidth="0.3" />
          <line x1="60" y1="0" x2="100" y2="40" stroke="url(#lineGradient)" strokeWidth="0.3" />
          <line x1="80" y1="0" x2="100" y2="20" stroke="url(#lineGradient)" strokeWidth="0.3" />
          <line x1="0" y1="20" x2="80" y2="100" stroke="url(#lineGradient)" strokeWidth="0.3" />
          <line x1="0" y1="40" x2="60" y2="100" stroke="url(#lineGradient)" strokeWidth="0.3" />
          <line x1="0" y1="60" x2="40" y2="100" stroke="url(#lineGradient)" strokeWidth="0.3" />
          <line x1="0" y1="80" x2="20" y2="100" stroke="url(#lineGradient)" strokeWidth="0.3" />
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Smaller, more compact Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-dark-200/70 backdrop-blur-md rounded-xl shadow-2xl p-6 max-w-sm w-full border border-dark-300"
        >
          <div className="text-center mb-6">
            <div className="flex justify-center mb-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-accent-blue to-accent-green flex items-center justify-center shadow-lg">
                <Wallet className="h-5 w-5 text-white" />
              </div>
            </div>
            <motion.h1 
              className="text-2xl font-bold text-slate-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-accent-green">SwiftPay</span>
            </motion.h1>
            <motion.p 
              className="text-slate-300 mt-1 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Login or create your account
            </motion.p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div 
              className="space-y-1.5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <label htmlFor="phoneNumber" className="text-slate-300 text-xs font-medium">
                Phone Number
              </label>
              <div className="relative">
                <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="pl-9 w-full h-10 rounded-lg bg-dark-300/70 border border-dark-300 text-slate-100 focus:ring-accent-blue focus:border-accent-blue transition-colors duration-200 text-sm"
                  required
                  disabled={isLoading}
                />
              </div>
            </motion.div>
            
            <motion.div 
              className="space-y-1.5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <label htmlFor="password" className="text-slate-300 text-xs font-medium">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 w-full h-10 rounded-lg bg-dark-300/70 border border-dark-300 text-slate-100 focus:ring-accent-blue focus:border-accent-blue transition-colors duration-200 text-sm"
                  required
                  disabled={isLoading}
                />
              </div>
            </motion.div>
            
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-2 rounded-lg bg-red-500/10 border border-red-500/20"
              >
                <p className="text-red-400 text-xs flex items-center">
                  <Info className="w-3 h-3 mr-1.5 flex-shrink-0" />
                  {error}
                </p>
              </motion.div>
            )}
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex items-center space-x-2 text-xs text-slate-400 p-2 rounded-lg bg-dark-300/50"
            >
              <Info className="w-3 h-3 flex-shrink-0" />
              <p>Demo: Phone: 123456, Password: 123456</p>
            </motion.div>
            
            <motion.button
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              type="submit"
              className={`w-full bg-gradient-to-r from-accent-blue to-accent-green text-white rounded-lg h-10 flex items-center justify-center font-medium transition-all duration-300 text-sm ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-accent-blue/20'}`}
              disabled={isLoading}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </span>
              ) : (
                <div className="flex items-center">
                  Continue
                  <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </div>
              )}
            </motion.button>
            
            <motion.p 
              className="mt-3 text-xs text-center text-slate-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              By continuing, you agree to SwiftPay's Terms of Service and Privacy
              Policy.
            </motion.p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
