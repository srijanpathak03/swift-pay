"use client";

import { useState } from "react";
import { Card } from "@repo/ui/card";
import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";
import { PlusCircle, Building, AlertCircle } from "lucide-react";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
    logo: "/hdfc-bank-logo.png"
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
    logo: "/axis-bank-logo.png"
  },
];

const SUGGESTED_AMOUNTS = [500, 1000, 2000, 5000];

export const AddMoney = () => {
  const [amount, setAmount] = useState("");
  const [selectedBank, setSelectedBank] = useState(SUPPORTED_BANKS[0]);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleAmountChange = (value: string) => {
    setAmount(value);
    setError("");
  };

  const handleBankSelect = (bank: typeof SUPPORTED_BANKS[0]) => {
    setSelectedBank(bank);
  };

  const handleAddMoney = async () => {
    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (selectedBank?.name === "HDFC Bank") {
      window.open(`/Bank/hdfc?amount=${amount}`, "_blank");
    } else if (selectedBank?.name === "Axis Bank") {
      window.open(`/Bank/axis?amount=${amount}`, "_blank");
    }
  };

  return (
    <Card title="Add Money to Wallet">
      <div className="space-y-6">
        {/* Amount input */}
        <div>
          <label className="block mb-2 text-sm font-medium text-slate-300">
            Amount (₹)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-slate-400">₹</span>
            </div>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              className="bg-dark-200 border border-dark-300 text-slate-100 text-sm rounded-lg focus:ring-accent-blue focus:border-accent-blue block w-full py-2.5 pl-10 pr-3 placeholder-slate-500 transition-all duration-200"
            />
          </div>
          
          {/* Quick amount selection */}
          <div className="flex flex-wrap gap-2 mt-3">
            {SUGGESTED_AMOUNTS.map((suggestedAmount) => (
              <button
                key={suggestedAmount}
                type="button"
                onClick={() => setAmount(suggestedAmount.toString())}
                className={`px-3 py-1.5 text-xs rounded-md transition-all ${
                  Number(amount) === suggestedAmount
                    ? 'bg-accent-blue text-white'
                    : 'bg-dark-200 text-slate-300 hover:bg-dark-300'
                }`}
              >
                ₹{suggestedAmount}
              </button>
            ))}
          </div>
        </div>
        
        {/* Error message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 shrink-0" />
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}
        
        {/* Bank selection */}
        <div>
          <label className="block mb-2 text-sm font-medium text-slate-300">
            Select Bank
          </label>
          <div className="grid grid-cols-2 gap-3">
            {SUPPORTED_BANKS.map((bank) => (
              <div
                key={bank.name}
                onClick={() => handleBankSelect(bank)}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                  selectedBank?.name === bank.name
                    ? 'bg-accent-blue/10 border border-accent-blue/30'
                    : 'bg-dark-200 border border-dark-300 hover:bg-dark-300/50'
                }`}
              >
                <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                  <Building className="h-4 w-4 text-dark-300" />
                </div>
                <p className="text-sm font-medium text-slate-200">{bank.name}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Action button */}
        <div className="pt-4 flex justify-end">
          <div className="flex items-center gap-2">
            <Button
              onClick={handleAddMoney}
              variant="gradient"
            >
              <span className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                Add Money
              </span>
            </Button>
          </div>
        </div>
        
        {/* Info section */}
        <div className="bg-dark-200/50 rounded-lg p-3 mt-4">
          <p className="text-xs text-slate-400">
            After clicking "Add Money", you will be redirected to your bank's secure payment page to complete the transaction.
          </p>
        </div>
      </div>
    </Card>
  );
};
