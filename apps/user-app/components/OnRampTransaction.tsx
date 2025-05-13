'use client';

import { useState } from 'react';
import { Card } from '@repo/ui/card';
import { ArrowUpRight, ArrowDownLeft, Clock, AlertCircle, CheckCircle } from 'lucide-react';

export const OnRampTransaction = ({
  transactions,
  title = 'Recent Transactions',
}: {
  transactions: {
    time: string;
    amount: number;
    status: string;
    provider: string;
  }[];
  title?: string;
}) => {
  const [showAll, setShowAll] = useState(false);
  const isSentTransactions = title === 'Sent transactions';

  const displayedTransactions = showAll
    ? transactions.slice().reverse()
    : transactions.slice(-5).reverse();

  if (!transactions.length) {
    return (
      <div className="p-6">
        <h3 className="text-base font-medium text-slate-100 mb-2">{title}</h3>
        <div className="text-center py-8 text-slate-400 text-sm">
          <div className="flex flex-col items-center mb-3">
            <div className="h-10 w-10 rounded-full bg-dark-200/80 flex items-center justify-center mb-2">
              <Clock className="h-5 w-5 text-slate-400" />
            </div>
            <p>No transactions yet</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h3 className="text-base font-medium text-slate-100 mb-3">{title}</h3>
      <div className="pt-1">
        <div className="max-h-[280px] overflow-y-auto w-full space-y-4 pr-1 scrollbar-thin">
          {displayedTransactions.map((t, index) => (
            <div
              key={index}
              className="flex justify-between items-center w-full border-b border-dark-300 pb-3 hover:bg-dark-200/20 transition-colors p-2 rounded-md"
            >
              <div className="flex items-center gap-3">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                  isSentTransactions 
                    ? 'bg-accent-blue/10' 
                    : 'bg-accent-green/10'
                }`}>
                  {isSentTransactions 
                    ? <ArrowUpRight className="h-4 w-4 text-accent-blue-light" />
                    : <ArrowDownLeft className="h-4 w-4 text-accent-green-light" />
                  }
                </div>
                <div>
                  <div className="text-sm text-slate-200">
                    {isSentTransactions ? 'Sent INR' : 'Received INR'}
                  </div>
                  <div className="text-slate-400 text-xs">
                    {new Date(t.time).toLocaleDateString('en-IN', {
                      day: 'numeric', 
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-sm font-medium">
                  {isSentTransactions
                    ? <span className="text-accent-blue-light">- ₹{(t.amount / 100).toFixed(2)}</span>
                    : <span className="text-accent-green-light">+ ₹{(t.amount / 100).toFixed(2)}</span>
                  }
                </div>
                <div className="flex items-center text-xs gap-1 mt-1">
                  {t.status === 'Completed' ? (
                    <>
                      <CheckCircle className="h-3 w-3 text-accent-green-light" />
                      <span className="text-accent-green-light">Success</span>
                    </>
                  ) : t.status === 'Pending' ? (
                    <>
                      <Clock className="h-3 w-3 text-amber-400" />
                      <span className="text-amber-400">Pending</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-3 w-3 text-red-400" />
                      <span className="text-red-400">Failed</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {transactions.length > 5 && (
          <button
            className="mt-6 text-accent-blue-light hover:text-accent-blue transition-colors text-sm font-medium flex items-center gap-1"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : 'Show All'}
          </button>
        )}
      </div>
    </div>
  );
};

// Add custom scrollbar styles
import './scrollbar.css';
