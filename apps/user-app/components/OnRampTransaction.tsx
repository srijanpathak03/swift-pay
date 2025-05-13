'use client';

import { useState } from 'react';
import { Card } from '@repo/ui/card';

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
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <div className="text-center py-8 text-slate-400">No recent transactions</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="pt-2">
        <div className="max-h-64 overflow-y-auto w-full space-y-4">
          {displayedTransactions.map((t, index) => (
            <div
              key={index}
              className="flex justify-between items-center w-full border-b border-dark-200 pb-3"
            >
              <div>
                <div className="text-sm">
                  {isSentTransactions ? 'Sent INR' : 'Received INR'}
                </div>
                <div className="text-slate-400 text-xs">
                  {new Date(t.time).toLocaleDateString()}
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-sm">
                  {isSentTransactions
                    ? <span className="text-accent-blue-light">- ₹{(t.amount / 100).toFixed(2)}</span>
                    : <span className="text-accent-green-light">+ ₹{(t.amount / 100).toFixed(2)}</span>
                  }
                </div>
                <div className="text-sm">
                  {t.status === 'Completed' ? (
                    <span className="text-accent-green">Success</span>
                  ) : t.status === 'Pending' ? (
                    <span className="text-amber-400">Pending</span>
                  ) : (
                    <span className="text-red-400">Failed</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {transactions.length > 5 && (
          <button
            className="mt-6 text-accent-blue-light hover:text-accent-blue transition-colors"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : 'Show All'}
          </button>
        )}
      </div>
    </div>
  );
};
