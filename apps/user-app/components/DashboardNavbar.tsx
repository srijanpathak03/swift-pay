"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LogOut, 
  Bell, 
  Search, 
  User,
  Wallet,
  Menu,
  HelpCircle
} from 'lucide-react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

export function DashboardNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

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

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-dark-100/90 backdrop-blur-lg shadow-lg' 
          : 'bg-dark-100/60 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo and Brand Name */}
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-accent-blue to-accent-green flex items-center justify-center mr-2 shadow-sm">
                <Wallet className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-accent-green">SwiftPay</span>
            </Link>
          </div>

          {/* Center search bar - hidden on mobile */}
          <div className="hidden md:flex items-center justify-center flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search transactions..."
                className="w-full pl-10 pr-4 py-1.5 rounded-lg text-sm bg-dark-200/50 border border-dark-300 text-slate-100 focus:outline-none focus:ring-1 focus:ring-accent-blue focus:border-accent-blue"
              />
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1.5 rounded-full hover:bg-dark-200/70 transition-colors"
              >
                <Bell className="h-5 w-5 text-slate-300" />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-accent-blue-light flex items-center justify-center text-[10px] text-white">
                    {notifications}
                  </span>
                )}
              </motion.button>
            </div>

            {/* Help */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1.5 rounded-full hover:bg-dark-200/70 transition-colors hidden sm:flex"
            >
              <HelpCircle className="h-5 w-5 text-slate-300" />
            </motion.button>

            {/* User Profile */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-dark-200/70 transition-colors"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-accent-blue/20 to-accent-green/20 flex items-center justify-center border border-dark-300">
                  <User className="h-4 w-4 text-slate-300" />
                </div>
              </motion.button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-dark-100 border border-dark-300 overflow-hidden"
                >
                  <div className="py-1">
                    <Link 
                      href="/profile" 
                      className="block px-4 py-2 text-sm hover:bg-dark-200 transition-colors text-slate-300 flex items-center gap-2"
                    >
                      <User className="h-4 w-4" /> Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-dark-200 transition-colors flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" /> Sign out
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
} 