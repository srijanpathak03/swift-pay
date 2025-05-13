"use client";

import React from "react";
import { motion } from "framer-motion";
import { OnRampTransaction } from "./OnRampTransaction";
import {
  Wallet,
  TrendingUp,
  AlertCircle,
  ArrowUpRight,
  ArrowDownLeft,
  PieChart,
  HelpCircle,
} from "lucide-react";

interface BalanceProps {
  amount: number;
  locked: number;
}

interface TransactionProps {
  time: string;
  amount: number;
  status: string;
  provider: string;
}

interface DashboardClientProps {
  balance: BalanceProps;
  transactions: TransactionProps[];
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function DashboardClient({ balance, transactions }: DashboardClientProps) {
  return (
    <div className="min-h-screen pt-10">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            <span className="accent-gradient">SwiftPay</span> Dashboard
          </h1>
          <p className="mt-2 text-lg sm:text-xl text-slate-300">
            Manage your finances with ease
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-dark-100 rounded-lg overflow-hidden mb-8 card-shadow">
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Wallet className="mr-2 h-6 w-6 text-accent-blue-light" />
              Your Balance
            </h2>
            <div className="flex items-baseline">
              <span className="text-4xl font-bold text-accent-blue-light">
                ₹{(balance.amount / 100).toFixed(2)}
              </span>
              <span className="ml-2 text-sm text-slate-400">Available</span>
            </div>
            {balance.locked > 0 && (
              <div className="mt-2 text-sm text-slate-400 flex items-center">
                <AlertCircle className="mr-1 h-4 w-4 text-amber-400" />₹
                {(balance.locked / 100).toFixed(2)} Locked
              </div>
            )}
          </div>
          <div className="bg-dark-200 px-6 py-4">
            <div className="text-sm font-medium text-accent-blue-light flex items-center">
              <TrendingUp className="mr-2 h-4 w-4" />
              Quick Tip: Regular transactions help build your financial profile.
            </div>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants} 
          className="bg-dark-100 rounded-lg overflow-hidden mb-8 card-shadow"
        >
          <OnRampTransaction transactions={transactions} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <motion.div variants={itemVariants} className="bg-dark-100 rounded-lg overflow-hidden card-shadow">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <ArrowUpRight className="mr-2 h-5 w-5 text-accent-green-light" />
                Quick Send
              </h3>
              <p className="text-slate-300 mb-4">
                Transfer money to your contacts instantly.
              </p>
              <div className="pt-1">
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href="/p2p"
                  className="bg-accent-green text-white px-4 py-3 rounded-lg hover:bg-accent-green-dark transition-colors inline-block"
                >
                  Send Money
                </motion.a>
              </div>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-dark-100 rounded-lg overflow-hidden card-shadow">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <ArrowDownLeft className="mr-2 h-5 w-5 text-accent-blue-light" />
                Add Funds
              </h3>
              <p className="text-slate-300 mb-4">
                Top up your SwiftPay wallet easily.
              </p>
              <div className="pt-1">
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href="/transfer"
                  className="bg-accent-blue text-white px-4 py-3 rounded-lg hover:bg-accent-blue-dark transition-colors inline-block"
                >
                  Add Money
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="bg-dark-100 rounded-lg overflow-hidden mb-8 card-shadow">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <PieChart className="mr-2 h-5 w-5 text-accent-blue-light" />
              Spending Insights
            </h3>
            <p className="text-slate-300 mb-4">
              Track your spending patterns and manage your budget more
              effectively.
            </p>
            <a
              href="/transactions"
              className="text-accent-blue-light font-medium hover:text-accent-blue transition-colors"
            >
              View Detailed Analytics →
            </a>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-dark-200 rounded-lg p-6 card-shadow">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <HelpCircle className="mr-2 h-5 w-5 text-accent-blue-light" />
            Need Help?
          </h3>
          <p className="text-slate-300 mb-4">
            Our support team is always ready to assist you with any questions or
            issues.
          </p>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="/contact"
            className="bg-gradient-to-r from-accent-blue to-accent-green text-white px-4 py-3 rounded-lg inline-block"
          >
            Contact Support
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
} 