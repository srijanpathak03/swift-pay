'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  CreditCard,
  PieChart,
  Shield,
  Smartphone,
  Zap,
  TrendingUp,
  DollarSign,
  BarChart2,
  Lock,
  RefreshCw,
  ChevronRight,
  Globe,
  Activity,
  Sparkles,
  CheckCircle2,
  Wallet,
  User,
  Loader2,
} from 'lucide-react';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 5,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 5,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

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
      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-accent-blue via-accent-green to-accent-blue-light"
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

// Premium gradient card
function PremiumCard({ 
  children, 
  className = "", 
  delayOrder = 0,
  onClick = () => {} 
}: { 
  children: React.ReactNode; 
  className?: string; 
  delayOrder?: number;
  onClick?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 * delayOrder, duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`premium-card ${className} cursor-pointer`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

// 3D tilt card effect
function TiltCard({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top; // y position within the element
    
    // Calculate rotation based on mouse position
    // The closer to the edge, the more rotation
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateYValue = ((x - centerX) / centerX) * 5; // Max 5 degrees
    const rotateXValue = ((y - centerY) / centerY) * -5; // Max 5 degrees
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    // Reset rotation when mouse leaves
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      className={`transform transition-transform duration-200 ${className}`}
      style={{ 
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: 'preserve-3d'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

// Icon feature card with premium styling
function FeatureItem({
  icon: Icon,
  text,
  onClick = () => {}
}: {
  icon: React.ElementType;
  text: string;
  onClick?: () => void;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="flex flex-col items-center transform transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <TiltCard className="rounded-2xl bg-dark-100/80 p-6 backdrop-blur-lg border border-dark-200 shadow-lg">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-blue/20 to-accent-green/20 blur-md"></div>
          <div className="relative flex items-center justify-center">
            <Icon className="h-10 w-10 text-accent-blue-light" />
          </div>
        </div>
      </TiltCard>
      <p className="mt-4 text-lg font-medium text-slate-100">{text}</p>
    </motion.div>
  );
}

function BenefitItem({
  icon: Icon,
  title,
  description,
  onClick = () => {}
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  onClick?: () => void;
}) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
      className="flex flex-col items-center text-center p-6 rounded-2xl bg-dark-100/80 backdrop-blur-md shadow-xl border border-dark-200 transition-all duration-200 cursor-pointer"
      onClick={onClick}
    >
      <div className="rounded-2xl bg-gradient-to-br from-accent-blue/10 to-accent-green/10 p-4 mb-6">
        <Icon className="h-8 w-8 text-accent-blue-light" />
      </div>
      <h3 className="text-xl font-semibold text-slate-100 mb-4">{title.replace(/^[^\s]+\s/, '')}</h3>
      <p className="text-slate-300">{description}</p>
    </motion.div>
  );
}

function HowItWorksStep({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center relative">
      <motion.div 
        whileHover={{ scale: 1.1 }}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-accent-blue to-accent-green text-white flex items-center justify-center text-xl font-bold mb-4 shadow-lg"
      >
        {number}
      </motion.div>
      <h3 className="text-xl font-semibold text-slate-100 mb-2">{title}</h3>
      <p className="text-slate-300">{description}</p>
      {number < 3 && (
        <motion.div 
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute hidden md:block top-8 -right-10 text-accent-blue-light"
        >
          <ChevronRight size={24} />
        </motion.div>
      )}
    </div>
  );
}

// New 3D Mobile Phone Mockup Component
function AppMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="relative w-[300px] h-[600px] mx-auto mt-10 md:mt-0"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/20 to-accent-green/20 rounded-[40px] blur-xl"></div>
      <TiltCard className="relative w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 rounded-[40px] overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-7 bg-slate-900 rounded-b-xl z-10"></div>
          
          {/* Phone Inner Content */}
          <div className="w-full h-full rounded-[36px] overflow-hidden p-2">
            <div className="w-full h-full bg-gradient-to-br from-dark-100 to-dark-200 rounded-[34px] overflow-hidden">
              <div className="w-full h-1/3 bg-gradient-to-r from-accent-blue to-accent-green p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-x-10 -translate-y-20 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full translate-x-10 translate-y-20 blur-2xl"></div>
                
                <div className="relative z-10">
                  <p className="text-white/80 text-sm">Available Balance</p>
                  <h3 className="text-white text-3xl font-bold mt-2">₹24,500.00</h3>
                  
                  <div className="mt-6 flex items-center">
                    <div className="flex-1">
                      <p className="text-white/80 text-xs">XXXX XXXX XXXX 4289</p>
                    </div>
                    <Wallet className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between mb-6">
                  <div className="w-1/3 flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-accent-blue/10 flex items-center justify-center mb-2">
                      <ArrowRight className="h-5 w-5 text-accent-blue-light" />
                    </div>
                    <p className="text-xs text-slate-300 text-center">Send</p>
                  </div>
                  <div className="w-1/3 flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-accent-green/10 flex items-center justify-center mb-2">
                      <Smartphone className="h-5 w-5 text-accent-green-light" />
                    </div>
                    <p className="text-xs text-slate-300 text-center">Mobile</p>
                  </div>
                  <div className="w-1/3 flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center mb-2">
                      <CreditCard className="h-5 w-5 text-purple-400" />
                    </div>
                    <p className="text-xs text-slate-300 text-center">Cards</p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <p className="text-sm font-medium text-slate-100 mb-4">Recent Transactions</p>
                  
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center py-3 border-b border-dark-300">
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center mr-3">
                        {i === 1 && <Globe className="h-5 w-5 text-accent-blue-light" />}
                        {i === 2 && <DollarSign className="h-5 w-5 text-accent-green-light" />}
                        {i === 3 && <Activity className="h-5 w-5 text-purple-400" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-100">
                          {i === 1 && 'Netflix Subscription'}
                          {i === 2 && 'Salary Received'}
                          {i === 3 && 'Investment Deposit'}
                        </p>
                        <p className="text-xs text-slate-400">
                          {i === 1 && 'Entertainment'}
                          {i === 2 && 'Income'}
                          {i === 3 && 'Investments'}
                        </p>
                      </div>
                      <p className={`text-sm font-medium ${i === 2 ? 'text-accent-green-light' : 'text-slate-300'}`}>
                        {i === 1 && '-₹499'}
                        {i === 2 && '+₹45,000'}
                        {i === 3 && '-₹5,000'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

// Navbar component
function Navbar({ isLoading }: { isLoading: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = () => {
    router.push('/auth/');
  };

  const handleSignUp = () => {
    router.push('/auth/');
  };

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-dark-100/90 backdrop-blur-lg shadow-lg border-b border-accent-blue/10' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <motion.div 
              className="flex-shrink-0" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-accent-blue to-accent-green flex items-center justify-center mr-2 shadow-sm">
                  <Wallet className="h-4 w-4 text-white" />
                </div>
                <span className="text-xl font-bold text-white">SwiftPay</span>
              </div>
            </motion.div>
            
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                {['Home', 'Features', 'Pricing', 'About'].map((item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="px-3 py-2 text-sm font-medium text-gray-200 hover:text-white rounded-md hover:bg-dark-200/50 transition-all duration-200"
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 * index }}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-3">
              <motion.button
                className={`px-4 py-2 text-sm font-medium text-white bg-dark-300/50 hover:bg-dark-300 rounded-lg transition-all duration-200 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                whileHover={{ scale: isLoading ? 1 : 1.05 }}
                whileTap={{ scale: isLoading ? 1 : 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.5 }}
                onClick={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </span>
                ) : (
                  "Login"
                )}
              </motion.button>
              
              <motion.button
                className={`relative px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-accent-blue to-accent-green rounded-lg transition-all duration-200 shadow-md hover:shadow-accent-blue/20 overflow-hidden group ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                whileHover={{ scale: isLoading ? 1 : 1.05 }}
                whileTap={{ scale: isLoading ? 1 : 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.6 }}
                onClick={handleSignUp}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="relative z-10 flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </span>
                ) : (
                  <span className="relative z-10">Sign Up</span>
                )}
                <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300"></div>
              </motion.button>
            </div>
          </div>
          
          <div className="md:hidden flex items-center">
            <motion.button 
              className="text-gray-300 hover:text-white rounded-md p-1 hover:bg-dark-300/40 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* YouTube-style loading progress bar at the bottom of the navbar */}
      <NavigationProgressBar isLoading={isLoading} />
    </motion.nav>
  );
}

// Demo disclaimer banner component
function DisclaimerBanner() {
  const [isVisible, setIsVisible] = useState(true);
  
  if (!isVisible) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-16 left-0 right-0 z-50 bg-dark-100/90 backdrop-blur-lg border-b border-accent-blue/20 p-2 text-center"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-2">
        <Sparkles className="h-4 w-4 text-accent-blue-light" />
        <p className="text-sm text-slate-300">
          <span className="font-medium text-accent-blue-light">Personal Project:</span> Built while learning. Fake data, real effort.
        </p>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-slate-400 hover:text-white ml-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </motion.div>
  );
}

// Enhanced interactive feature card
function InteractiveFeatureCard({
  icon: Icon,
  title,
  description,
  benefits,
  isActive,
  onClick,
  color = "blue"
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  benefits: string[];
  isActive: boolean;
  onClick: () => void;
  color?: "blue" | "green" | "purple";
}) {
  const colorClasses = {
    blue: {
      bgLight: "bg-accent-blue/10",
      textColor: "text-accent-blue-light",
      border: "border-accent-blue/20",
      shadow: "shadow-accent-blue/10",
      hoverGlow: "group-hover:shadow-accent-blue/30"
    },
    green: {
      bgLight: "bg-accent-green/10",
      textColor: "text-accent-green-light",
      border: "border-accent-green/20",
      shadow: "shadow-accent-green/10",
      hoverGlow: "group-hover:shadow-accent-green/30"
    },
    purple: {
      bgLight: "bg-purple-500/10",
      textColor: "text-purple-400",
      border: "border-purple-500/20",
      shadow: "shadow-purple-500/10",
      hoverGlow: "group-hover:shadow-purple-500/30"
    }
  };

  const classes = colorClasses[color];

  return (
    <motion.div
      whileHover={{ y: -8, scale: isActive ? 1 : 1.02 }}
      animate={isActive ? { y: 0, scale: 1 } : { scale: 1 }}
      onClick={onClick}
      className={`group relative p-6 rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden ${
        isActive ? "bg-dark-100 border border-dark-200" : "bg-dark-200/30 hover:bg-dark-200/50 border border-transparent"
      }`}
    >
      {/* Background glow */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl ${classes.bgLight}`}></div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className={`w-14 h-14 rounded-xl ${classes.bgLight} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}>
          <Icon className={`h-7 w-7 ${classes.textColor}`} />
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-slate-300 mb-4">{description}</p>
        
        {isActive && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="mt-6 pt-4 border-t border-dark-300"
          >
            <h4 className="text-sm font-semibold text-slate-200 mb-3">KEY BENEFITS</h4>
            <ul className="space-y-2">
              {benefits.map((benefit, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="flex items-start"
                >
                  <CheckCircle2 className={`h-5 w-5 ${classes.textColor} mt-0.5 mr-2 flex-shrink-0`} />
                  <span className="text-sm text-slate-300">{benefit}</span>
                </motion.li>
              ))}
            </ul>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`mt-6 px-4 py-2 rounded-lg ${classes.bgLight} ${classes.textColor} text-sm font-medium flex items-center justify-center w-full`}
            >
              Learn More
              <ChevronRight className="ml-1 h-4 w-4" />
            </motion.button>
          </motion.div>
        )}
      </div>
      
      {/* Active indicator */}
      {isActive && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-accent-blue to-accent-green"
        />
      )}
    </motion.div>
  );
}

export function HeroSection() {
  const router = useRouter();
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleNavigation = (path: string) => {
    setIsLoading(true);
    
    // Simulate loading time (in a real app, this would be an actual navigation)
    setTimeout(() => {
      router.push(path);
      // In a real scenario, you would handle loading state in a layout or context
      // For demo purposes, we'll keep the loader visible
    }, 2000);
  };
  
  const handleSignIn = () => {
    handleNavigation('/auth/login');
  };

  const handleFeatureClick = (index: number) => {
    setActiveFeature(index === activeFeature ? null : index);
  };

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast Transfers",
      description: "Send money securely in seconds, not days, to anyone anywhere.",
      benefits: [
        "Instant UPI, IMPS & NEFT transfers",
        "Zero fees on same-bank transfers",
        "Schedule recurring payments",
        "1-click bill payments"
      ],
      color: "blue" as const
    },
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description: "Enterprise-level security protecting your money and data 24/7.",
      benefits: [
        "256-bit end-to-end encryption",
        "Biometric authentication",
        "Real-time fraud monitoring",
        "Two-factor verification"
      ],
      color: "green" as const
    },
    {
      icon: BarChart2,
      title: "Smart Insights",
      description: "AI-powered financial recommendations tailored just for you.",
      benefits: [
        "Personalized spending analysis",
        "Auto-categorization of expenses",
        "Smart savings recommendations",
        "Investment opportunity alerts"
      ],
      color: "purple" as const
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080a14]">
      {/* Loading overlay */}
      <LoaderOverlay isLoading={isLoading} />
      
      {/* Navbar */}
      <Navbar isLoading={isLoading} />
      
      {/* Disclaimer Banner */}
      <DisclaimerBanner />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Darker overlay */}
        <div className="absolute inset-0 bg-[#050710]/60 z-0"></div>
        
        {/* 3D Background Elements */}
        <div className="absolute w-full h-full">
          {/* Vector Design Elements */}
          <div className="absolute top-0 right-0 w-1/2 h-1/2">
            <svg className="w-full h-full opacity-[0.03]" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
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
          </div>
          
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2">
            <svg className="w-full h-full opacity-[0.03]" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
              <rect x="100" y="100" width="600" height="600" fill="none" stroke="url(#rectGradient)" strokeWidth="0.5" rx="20" />
              <rect x="200" y="200" width="400" height="400" fill="none" stroke="url(#rectGradient)" strokeWidth="0.8" rx="15" />
              <rect x="300" y="300" width="200" height="200" fill="none" stroke="url(#rectGradient)" strokeWidth="1" rx="10" />
              <defs>
                <linearGradient id="rectGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          {/* Hexagon Pattern Top Right */}
          <div className="absolute top-0 right-0 w-1/3 h-1/3 opacity-[0.04]">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="hexagons" x="0" y="0" width="10" height="17.32" patternUnits="userSpaceOnUse">
                <polygon points="5,0 10,2.88 10,8.66 5,11.55 0,8.66 0,2.88" fill="none" stroke="#3b82f6" strokeWidth="0.1"/>
              </pattern>
              <rect x="0" y="0" width="100" height="100" fill="url(#hexagons)" />
            </svg>
          </div>

          {/* Abstract lines Bottom Left */}
          <div className="absolute bottom-0 left-0 w-1/4 h-1/4 opacity-[0.05]">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="0" y1="0" x2="100" y2="100" stroke="#10b981" strokeWidth="0.2" />
              <line x1="20" y1="0" x2="100" y2="80" stroke="#10b981" strokeWidth="0.2" />
              <line x1="40" y1="0" x2="100" y2="60" stroke="#10b981" strokeWidth="0.2" />
              <line x1="60" y1="0" x2="100" y2="40" stroke="#10b981" strokeWidth="0.2" />
              <line x1="80" y1="0" x2="100" y2="20" stroke="#10b981" strokeWidth="0.2" />
              <line x1="0" y1="20" x2="80" y2="100" stroke="#10b981" strokeWidth="0.2" />
              <line x1="0" y1="40" x2="60" y2="100" stroke="#10b981" strokeWidth="0.2" />
              <line x1="0" y1="60" x2="40" y2="100" stroke="#10b981" strokeWidth="0.2" />
              <line x1="0" y1="80" x2="20" y2="100" stroke="#10b981" strokeWidth="0.2" />
            </svg>
          </div>
          
          {/* Dynamic Light Spheres with lower opacity */}
          <motion.div animate={pulseAnimation} className="absolute top-10 right-[10%] h-64 w-64 rounded-full bg-accent-blue/[0.03] blur-3xl" />
          <motion.div animate={floatingAnimation} className="absolute bottom-10 left-[10%] h-64 w-64 rounded-full bg-accent-green/[0.03] blur-3xl" />
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1.5 }}
            className="absolute top-1/3 left-1/4 h-96 w-96 rounded-full bg-purple-500/[0.02] blur-3xl" 
          />
          
          {/* Animated Particles */}
          <div className="absolute inset-0">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: 0.1 + Math.random() * 0.1,
                }}
                animate={{
                  y: [0, Math.random() * -150],
                  opacity: [0.2, 0]
                }}
                transition={{
                  duration: 5 + Math.random() * 5,
                  repeat: Infinity,
                  delay: Math.random() * 5
                }}
              />
            ))}
          </div>
          
          {/* Enhanced Grid pattern overlay with darker color */}
          <div className="absolute inset-0 bg-grid-dark opacity-[0.07]"></div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-20 sm:pt-32 sm:pb-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="md:flex md:items-center md:justify-between"
        >
          <motion.div variants={itemVariants} className="md:w-1/2 space-y-6 md:pr-12 text-center md:text-left">
            <motion.div 
              className="inline-block mb-4"
              whileHover={{ rotate: 5 }}
            >
              <span className="bg-dark-200/80 backdrop-blur-sm text-accent-blue-light px-4 py-1 rounded-full text-sm font-semibold tracking-wider inline-flex items-center">
                <Sparkles className="h-4 w-4 mr-2" />
                Banking? Rewritten.
              </span>
            </motion.div>
            
            <h1 className="text-5xl font-extrabold tracking-tight text-slate-100 sm:text-6xl md:text-7xl premium-text">
              Say hey to
              <span className="block mt-2 accent-gradient">
                SwiftPay
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-xl text-slate-300">
              Your all-in-one digital wallet made for the next-gen hustle.
              <span className="block mt-2">
                <span className="inline-flex items-center mr-3"><span className="text-accent-green-light mr-1">Fast transfers,</span></span>
                <span className="inline-flex items-center mr-3"><span className="text-accent-blue-light mr-1">smart insights,</span></span>
                and a slick design that just gets you.
              </span>
            </p>
            
            <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <motion.button 
                whileHover={{ scale: isLoading ? 1 : 1.05 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                onClick={handleSignIn}
                className={`premium-button group relative inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-accent-blue to-accent-green px-8 py-4 text-lg font-medium text-white transition-all duration-300 shadow-lg hover:shadow-accent-blue/20 hover:shadow-xl w-full sm:w-auto ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Loading...
                  </span>
                ) : (
                  <>
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </motion.button>
              <motion.a
                whileHover={{ scale: isLoading ? 1 : 1.05 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                href="#features"
                className={`group inline-flex items-center justify-center rounded-lg bg-dark-200/80 backdrop-blur-sm border border-dark-300 px-8 py-4 text-lg font-medium text-slate-100 hover:bg-dark-300 transition-all duration-300 w-full sm:w-auto mt-4 sm:mt-0 ${isLoading ? 'pointer-events-none opacity-75' : ''}`}
                onClick={(e) => {
                  if (isLoading) {
                    e.preventDefault();
                  }
                }}
              >
                Explore Features
              </motion.a>
            </motion.div>
          </motion.div>
          
          {/* 3D Mobile Phone Mockup */}
          <div className="hidden md:block md:w-1/2">
            <AppMockup />
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          variants={containerVariants}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center"
        >
          {[
            { icon: <CheckCircle2 className="h-5 w-5 text-accent-blue-light" />, value: "500K+", label: "users already onboard" },
            { icon: <Wallet className="h-5 w-5 text-accent-green-light" />, value: "₹100M+", label: "daily in digital flows" },
            { icon: <Shield className="h-5 w-5 text-purple-400" />, value: "99.9%", label: "uptime you can trust" }
          ].map((stat, i) => (
            <TiltCard key={i} className="h-full">
              <motion.div 
                whileHover={{ y: -5 }}
                className="h-full p-8 rounded-xl frosted-card border border-accent-blue/10"
              >
                <h3 className="text-4xl font-bold accent-gradient premium-text flex items-center justify-center">
                  <span className="text-white mr-2">{stat.icon}</span> {stat.value}
                </h3>
                <p className="mt-2 text-slate-300">{stat.label}</p>
                
                <div className="mt-4 pt-4 border-t border-dark-300/50">
                  <div className="w-full bg-dark-300/50 h-1 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-accent-blue to-accent-green"
                      initial={{ width: "0%" }}
                      animate={{ width: `${75 + i * 10}%` }}
                      transition={{ delay: 0.6 + (i * 0.2), duration: 1 }}
                    />
                  </div>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </motion.div>

        <motion.div
          id="features"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-28 relative"
        >
          {/* Abstract shape decorations */}
          <div className="absolute top-10 left-10 w-32 h-32 border border-accent-blue/20 rounded-full blur-sm opacity-40"></div>
          <div className="absolute top-20 left-20 w-20 h-20 border border-accent-green/20 rounded-full blur-sm opacity-40"></div>
          <div className="absolute -bottom-10 right-10 w-40 h-40 border border-accent-blue/10 rounded-full blur-sm opacity-30"></div>
          
          <div className="relative">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="inline-block"
              >
                <span className="bg-dark-200/80 backdrop-blur-sm text-accent-blue-light px-4 py-1 rounded-full text-sm font-semibold tracking-wider inline-flex items-center">
                  <Sparkles className="h-4 w-4 mr-2" />
                  CORE FEATURES
                </span>
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-3xl font-bold text-slate-100 mt-4 line-gradient premium-text"
              >
                Experience Next-Gen Banking
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-4 max-w-2xl mx-auto text-slate-300"
              >
                Discover our powerful suite of features designed to transform your financial experience
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {features.map((feature, index) => (
                <InteractiveFeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  benefits={feature.benefits}
                  isActive={activeFeature === index}
                  onClick={() => handleFeatureClick(index)}
                  color={feature.color}
                />
              ))}
            </div>

            {/* Feature preview animated image */}
            {activeFeature !== null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="mt-12 p-8 rounded-2xl bg-dark-100/70 backdrop-blur-lg border border-dark-200"
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="md:w-1/2">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {activeFeature !== null && features[activeFeature]?.title}
                    </h3>
                    <p className="text-slate-300 mb-6">
                      {activeFeature !== null && features[activeFeature]?.description}
                    </p>
                    
                    <div className="space-y-4">
                      {activeFeature !== null && features[activeFeature]?.benefits.map((benefit, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index, duration: 0.4 }}
                          className="flex items-start"
                        >
                          <div className="mt-1 mr-4 h-5 w-5 rounded-full bg-gradient-to-r from-accent-blue to-accent-green flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="h-3 w-3 text-white" />
                          </div>
                          <p className="text-slate-300">{benefit}</p>
                        </motion.div>
                      ))}
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-8 px-6 py-3 rounded-lg bg-gradient-to-r from-accent-blue to-accent-green text-white font-medium flex items-center"
                    >
                      Explore {activeFeature !== null && features[activeFeature]?.title}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </motion.button>
                  </div>
                  
                  <motion.div 
                    className="md:w-1/2 flex justify-center"
                    animate={floatingAnimation}
                  >
                    <div className="relative w-64 h-64 md:w-80 md:h-80">
                      {activeFeature === 0 && features[0] && (
                        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-dark-100 to-dark-200 p-4 shadow-xl border border-dark-300">
                          <div className="w-full h-full rounded-xl bg-dark-100 p-6 flex flex-col">
                            <div className="flex justify-between items-center mb-6">
                              <div>
                                <p className="text-xs text-slate-400">Send Money to</p>
                                <h4 className="text-lg font-semibold text-white">Aryan Sharma</h4>
                              </div>
                              <div className="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center">
                                <User className="h-6 w-6 text-slate-400" />
                              </div>
                            </div>
                            <div className="mb-6">
                              <p className="text-xs text-slate-400">Amount</p>
                              <h3 className="text-3xl font-bold text-white">₹2,500.00</h3>
                            </div>
                            <div className="flex space-x-4 mb-4">
                              <div className="w-12 h-12 rounded-full bg-accent-blue/10 flex items-center justify-center">
                                <Smartphone className="h-6 w-6 text-accent-blue-light" />
                              </div>
                              <div className="w-12 h-12 rounded-full bg-accent-green/10 flex items-center justify-center">
                                <CreditCard className="h-6 w-6 text-accent-green-light" />
                              </div>
                              <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                                <Wallet className="h-6 w-6 text-purple-400" />
                              </div>
                            </div>
                            <div className="mt-auto">
                              <motion.button 
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-3 rounded-lg bg-gradient-to-r from-accent-blue to-accent-green text-white font-medium"
                              >
                                Send Now
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      )}
                      {activeFeature === 1 && features[1] && (
                        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-dark-100 to-dark-200 p-4 shadow-xl border border-dark-300">
                          <div className="w-full h-full rounded-xl bg-dark-100 p-6 flex flex-col">
                            <div className="flex justify-center mb-6">
                              <div className="h-20 w-20 rounded-full bg-accent-green/10 flex items-center justify-center">
                                <Shield className="h-10 w-10 text-accent-green-light" />
                              </div>
                            </div>
                            <h4 className="text-lg font-semibold text-white text-center mb-2">Security Center</h4>
                            <p className="text-xs text-slate-400 text-center mb-6">Your account is protected</p>
                            
                            <div className="space-y-4 mb-6">
                              <div className="flex justify-between items-center p-3 rounded-lg bg-dark-200/50">
                                <div className="flex items-center">
                                  <Lock className="h-5 w-5 text-accent-green-light mr-3" />
                                  <span className="text-sm text-slate-300">Two-Factor Auth</span>
                                </div>
                                <span className="text-xs bg-accent-green/20 text-accent-green-light px-2 py-1 rounded-full">Enabled</span>
                              </div>
                              <div className="flex justify-between items-center p-3 rounded-lg bg-dark-200/50">
                                <div className="flex items-center">
                                  <Smartphone className="h-5 w-5 text-accent-green-light mr-3" />
                                  <span className="text-sm text-slate-300">Biometric Auth</span>
                                </div>
                                <span className="text-xs bg-accent-green/20 text-accent-green-light px-2 py-1 rounded-full">Enabled</span>
                              </div>
                            </div>
                            
                            <div className="mt-auto">
                              <motion.button 
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-3 rounded-lg bg-dark-200 text-white font-medium flex items-center justify-center"
                              >
                                Security Settings
                                <ChevronRight className="h-4 w-4 ml-1" />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      )}
                      {activeFeature === 2 && features[2] && (
                        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-dark-100 to-dark-200 p-4 shadow-xl border border-dark-300">
                          <div className="w-full h-full rounded-xl bg-dark-100 p-6 flex flex-col">
                            <div className="flex justify-between items-center mb-6">
                              <h4 className="text-lg font-semibold text-white">Spending Insights</h4>
                              <div className="h-8 w-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                                <PieChart className="h-4 w-4 text-purple-400" />
                              </div>
                            </div>
                            
                            <div className="mb-6">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-xs text-slate-400">Monthly Overview</span>
                                <span className="text-xs text-purple-400">June 2023</span>
                              </div>
                              
                              <div className="space-y-3">
                                <div>
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs text-slate-300">Food & Dining</span>
                                    <span className="text-xs text-white">₹15,200</span>
                                  </div>
                                  <div className="w-full h-1.5 rounded-full bg-dark-300">
                                    <motion.div 
                                      initial={{ width: 0 }}
                                      animate={{ width: '45%' }}
                                      transition={{ duration: 1 }}
                                      className="h-full rounded-full bg-purple-500"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs text-slate-300">Entertainment</span>
                                    <span className="text-xs text-white">₹8,750</span>
                                  </div>
                                  <div className="w-full h-1.5 rounded-full bg-dark-300">
                                    <motion.div 
                                      initial={{ width: 0 }}
                                      animate={{ width: '25%' }}
                                      transition={{ duration: 1, delay: 0.2 }}
                                      className="h-full rounded-full bg-accent-blue"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs text-slate-300">Shopping</span>
                                    <span className="text-xs text-white">₹12,400</span>
                                  </div>
                                  <div className="w-full h-1.5 rounded-full bg-dark-300">
                                    <motion.div 
                                      initial={{ width: 0 }}
                                      animate={{ width: '35%' }}
                                      transition={{ duration: 1, delay: 0.4 }}
                                      className="h-full rounded-full bg-accent-green"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-auto">
                              <div className="p-3 rounded-lg bg-purple-500/10 mb-4">
                                <div className="flex items-center">
                                  <Sparkles className="h-5 w-5 text-purple-400 mr-3" />
                                  <div>
                                    <p className="text-xs text-purple-400 font-medium">AI Insight</p>
                                    <p className="text-sm text-slate-300">You spent 15% less on groceries compared to last month.</p>
                                  </div>
                                </div>
                              </div>
                              
                              <motion.button 
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-accent-blue text-white font-medium"
                              >
                                View Detailed Report
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-32 relative overflow-hidden"
        >
          {/* Premium background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-accent-blue/5 to-accent-green/5 rounded-full blur-3xl"></div>
            <div className="absolute top-3/4 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-2xl"></div>
            <div className="absolute top-1/3 left-3/4 w-48 h-48 border border-accent-blue/10 rounded-full opacity-50"></div>
          </div>
          
          <div className="relative z-10">
            <div className="text-center mb-16">
              <span className="bg-dark-200/80 backdrop-blur-sm text-accent-blue-light px-4 py-1 rounded-full text-sm font-semibold tracking-wider inline-flex items-center">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                WHY CHOOSE US
              </span>
              <h2 className="text-3xl font-bold text-slate-100 mt-4 line-gradient premium-text">
                Why We're Ahead of the Game
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  icon: Zap,
                  title: "Lightning Fast Transfers",
                  description: "Thanks to blockchain tech, your cash moves fast."
                },
                {
                  icon: Shield,
                  title: "Security That Doesn't Sleep",
                  description: "Encryption + biometrics + 24/7 monitoring = peace of mind."
                },
                {
                  icon: TrendingUp,
                  title: "Smart Money Moves",
                  description: "Our AI helps you spend better and save smarter."
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
                >
                  <TiltCard className="h-full">
                    <BenefitItem
                      icon={benefit.icon}
                      title={benefit.title}
                      description={benefit.description}
                      onClick={() => router.push(`#benefit-${index}`)}
                    />
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Enhanced Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-32 text-center relative overflow-hidden pb-20"
        >
          <TiltCard>
            <motion.div 
              className="p-16 rounded-2xl relative overflow-hidden"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              {/* Premium Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-dark-100/95 to-dark-200/95 backdrop-blur-xl border border-dark-300/50 rounded-2xl"></div>
              
              {/* Animated Background Elements */}
              <motion.div 
                className="absolute -top-20 -right-20 w-64 h-64 bg-accent-blue/20 rounded-full blur-3xl"
                animate={pulseAnimation}
              />
              <motion.div 
                className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent-green/20 rounded-full blur-3xl"
                animate={floatingAnimation}
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1/2 bg-gradient-to-r from-purple-500/10 to-accent-blue/10 rotate-45 blur-3xl"></div>
              
              {/* Grid Pattern Overlay */}
              <div className="absolute inset-0 bg-grid-dark opacity-10 rounded-2xl"></div>
            
              {/* Content */}
              <div className="relative z-10">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                  className="inline-block mb-8"
                >
                  <span className="bg-dark-200/80 backdrop-blur-sm text-accent-blue-light px-6 py-2 rounded-full text-sm font-semibold tracking-wider inline-flex items-center">
                    <Sparkles className="h-4 w-4 mr-2" />
                    JOIN THE MOVEMENT
                  </span>
                </motion.div>
                
                <h2 className="text-4xl font-bold text-slate-100 mb-8 premium-text">
                  Don't Sleep on the Future of Money.
                </h2>
                <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
                  Join 500K+ users riding the digital wave with SwiftPay. Faster, smarter, smoother finance — all in your pocket.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <motion.button 
                    whileHover={{ scale: isLoading ? 1 : 1.05, boxShadow: "0 20px 80px -10px rgba(59, 130, 246, 0.5)" }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    onClick={handleSignIn}
                    className={`premium-button group relative overflow-hidden rounded-xl bg-gradient-to-r from-accent-blue to-accent-green px-10 py-5 text-lg font-medium text-white hover:shadow-accent-blue/20 hover:shadow-xl transition-all duration-300 w-full sm:w-auto flex items-center justify-center ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="relative z-10 flex items-center">
                        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                        Loading...
                      </span>
                    ) : (
                      <>
                        <span className="relative z-10">Create Your SwiftPay Account</span>
                        <ArrowRight className="ml-2 h-6 w-6 transform transition-transform group-hover:translate-x-1 relative z-10" />
                      </>
                    )}
                    
                    {/* Button glow effect */}
                    <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.button>
                  
                  <motion.a
                    whileHover={{ scale: isLoading ? 1 : 1.05 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    href="#features"
                    className="group inline-flex items-center justify-center rounded-xl bg-dark-200/80 backdrop-blur-sm border border-dark-300 px-8 py-4 text-lg font-medium text-slate-100 hover:bg-dark-300 transition-all duration-300 w-full sm:w-auto"
                  >
                    Learn More
                    <ChevronRight className="ml-1 h-5 w-5 transform transition-transform group-hover:translate-x-1" />
                  </motion.a>
                </div>
                
                {/* Trust Indicators */}
                <div className="mt-16 flex flex-wrap justify-center gap-6">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6, duration: 0.5 }}
                    className="flex items-center"
                  >
                    <Shield className="h-5 w-5 text-accent-blue-light mr-2" />
                    <span className="text-sm text-slate-300">256-bit Encryption</span>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.7, duration: 0.5 }}
                    className="flex items-center"
                  >
                    <CheckCircle2 className="h-5 w-5 text-accent-green-light mr-2" />
                    <span className="text-sm text-slate-300">RBI Compliant</span>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8, duration: 0.5 }}
                    className="flex items-center"
                  >
                    <Lock className="h-5 w-5 text-purple-400 mr-2" />
                    <span className="text-sm text-slate-300">Secure Authentication</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </TiltCard>
        </motion.div>
      </div>
    </div>
  );
}
