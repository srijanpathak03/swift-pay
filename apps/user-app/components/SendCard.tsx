'use client';

import { useState, useRef, useEffect } from 'react';
import { Card } from '@repo/ui/card';
import { Textinput } from '@repo/ui/textinput';
import { p2pTransfer } from '../app/lib/actions/P2Ptransfer';
import { NumberList } from './NumberList';
import { ArrowRight, Phone, Users, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function SendCard() {
  const [number, setNumber] = useState<string>('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);
  const [loading, setLoading] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [recentTransactions, setRecentTransactions] = useState<Array<{number: string, amount: number, date: string}>>([]);

  // Simulate fetching recent transactions
  useEffect(() => {
    // In a real app, this would fetch from an API
    setRecentTransactions([
      { number: '9876543210', amount: 500, date: '2 hours ago' },
      { number: '8765432109', amount: 1200, date: 'Yesterday' },
      { number: '7654321098', amount: 750, date: '3 days ago' },
    ]);
  }, []);

  const handleNumberSelect = (selectedNumber: string) => {
    setNumber(selectedNumber);
    setDropdownVisible(false);
    inputRef.current?.blur();
  };

  const handleBlur = () => {
    setTimeout(() => setDropdownVisible(false), 200);
  };

  const handleSendMoney = async () => {
    try {
      if (!number) {
        setMessage('Please enter a valid phone number');
        setMessageType('error');
        return;
      }
      
      if (!amount || Number(amount) <= 0) {
        setMessage('Amount should be greater than 0');
        setMessageType('error');
        return;
      }
      
      await p2pTransfer(number, Number(amount) * 100);
      
      setMessage('Money sent successfully!');
      setMessageType('success');
      
      // Reset form after successful transaction
      setTimeout(() => {
        setNumber('');
        setAmount('');
      }, 2000);
      
    } catch (error) {
      setMessage('Failed to send money. Please try again.');
      setMessageType('error');
    }
  };

  return (
    <div className="h-full">
      <Card title="Send Money">
        <div className="pt-2">
          <div className="pt-2 relative">
            <label className="block mb-2 text-sm font-medium text-slate-300">
              Recipient Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Phone className="h-4 w-4 text-slate-400" />
              </div>
              <input
                ref={inputRef}
                type="text"
                placeholder="Enter mobile number"
                value={number}
                onChange={(e) => {
                  setNumber(e.target.value);
                  setDropdownVisible(true);
                }}
                onFocus={() => number && setDropdownVisible(true)}
                onBlur={handleBlur}
                className="bg-dark-200 border border-dark-300 text-slate-100 text-sm rounded-lg focus:ring-accent-blue focus:border-accent-blue block w-full py-2.5 pl-10 pr-3 placeholder-slate-500 transition-all duration-200"
              />
            </div>
            {dropdownVisible && (
              <NumberList number={number} onSelect={handleNumberSelect} />
            )}
          </div>
          
          <div className="pt-2 relative">
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
                onChange={(e) => setAmount(e.target.value)}
                className="bg-dark-200 border border-dark-300 text-slate-100 text-sm rounded-lg focus:ring-accent-blue focus:border-accent-blue block w-full py-2.5 pl-10 pr-3 placeholder-slate-500 transition-all duration-200"
              />
            </div>
          </div>
          
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mt-4 p-3 rounded-lg flex items-start gap-2 ${
                messageType === 'success' 
                  ? 'bg-accent-green/10 text-accent-green-light border border-accent-green/20' 
                  : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}
            >
              {messageType === 'success' ? (
                <CheckCircle className="h-5 w-5 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              )}
              <p className="text-sm">{message}</p>
            </motion.div>
          )}
          
          <div className="pt-6 flex justify-end">
            <button
              onClick={async () => {
                setLoading(true);
                await handleSendMoney();
                setLoading(false);
              }}
              type="button"
              disabled={loading}
              className="relative overflow-hidden text-white bg-gradient-to-r from-accent-blue to-accent-green hover:shadow-md hover:shadow-accent-blue/20 focus:outline-none focus:ring-2 focus:ring-accent-blue/50 font-medium rounded-lg text-sm px-6 py-3 transition-all duration-200 flex items-center"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Send Money
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </div>
          
          {/* Recent Recipients
          {recentTransactions.length > 0 && (
            <div className="mt-6 pt-4 border-t border-dark-300">
              <h3 className="text-sm font-medium text-slate-300 mb-3">Recent Recipients</h3>
              <div className="space-y-2">
                {recentTransactions.map((transaction, index) => (
                  <div 
                    key={index}
                    onClick={() => setNumber(transaction.number)}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-dark-200/60 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-accent-blue/10 flex items-center justify-center">
                        <Users className="h-4 w-4 text-accent-blue-light" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-300">{transaction.number}</p>
                        <p className="text-xs text-slate-400">{transaction.date}</p>
                      </div>
                    </div>
                    <p className="text-sm text-accent-blue-light">₹{transaction.amount}</p>
                  </div>
                ))}
              </div>
            </div>
          )} */}
        </div>
      </Card>
    </div>
  );
}
