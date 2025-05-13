"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { ArrowRight, Smartphone, Lock, Info } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// Ensure this page is dynamically rendered
export const dynamic = 'force-dynamic';

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
    const res = await signIn("credentials", {
      phone: onlyNumber,
      password: password,
      redirect: false,
    });
    setIsLoading(false);

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
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-dark-100 rounded-lg shadow-xl p-8 max-w-md w-full card-shadow"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-100">
            Welcome to <span className="accent-gradient font-bold">SwiftPay</span>
          </h1>
          <p className="text-slate-300 mt-2">Login or create your account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="phoneNumber" className="text-slate-300">
              Phone Number
            </label>
            <div className="relative">
              <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                id="phoneNumber"
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="pl-10 w-full h-10 rounded-md bg-dark-200 border border-dark-300 text-slate-100 focus:ring-accent-blue focus:border-accent-blue"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-slate-300">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full h-10 rounded-md bg-dark-200 border border-dark-300 text-slate-100 focus:ring-accent-blue focus:border-accent-blue"
                required
              />
            </div>
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <div className="flex items-center space-x-2 text-sm text-slate-400">
            <Info className="w-4 h-4" />
            <p>Demo : Phone: 123456, Password: 123456</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-accent-blue to-accent-green text-white flex rounded-md h-10 items-center justify-center text-sm"
            disabled={isLoading}
          >
            {isLoading ? (
              "Processing..."
            ) : (
              <div className="flex items-center">
                Continue
                <ArrowRight className="ml-2 h-4 w-5" />
              </div>
            )}
          </motion.button>
        </form>
        <p className="mt-4 text-sm text-center text-slate-400">
          By continuing, you agree to SwiftPay's Terms of Service and Privacy
          Policy.
        </p>
      </motion.div>
    </div>
  );
}
