import { Card } from "@repo/ui/card";
import { Wallet, LockKeyhole, CalendarClock } from "lucide-react";

export const BalanceCard = ({
  amount,
  locked,
}: {
  amount: number;
  locked: number;
}) => {
  return (
    <Card title="Wallet Balance">
      <div className="bg-gradient-to-r from-accent-blue/10 to-accent-green/10 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-400">Total Balance</p>
          <Wallet className="h-5 w-5 text-accent-blue-light" />
        </div>
        <p className="text-2xl font-bold text-slate-100 mt-2">
          ₹{((locked + amount) / 100).toFixed(2)}
        </p>
        <p className="text-xs text-slate-400 mt-1">
          Last updated: <span className="text-slate-300">{new Date().toLocaleDateString()}</span>
        </p>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1 py-3 border-b border-dark-300">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-accent-blue/10 flex items-center justify-center">
              <Wallet className="h-4 w-4 text-accent-blue-light" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-200">Available Balance</p>
              <p className="text-xs text-slate-400">Ready to use</p>
            </div>
          </div>
          <p className="text-sm font-medium text-accent-blue-light">₹{(amount / 100).toFixed(2)}</p>
        </div>
        
        <div className="flex items-center justify-between px-1 py-3 border-b border-dark-300">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-purple-500/10 flex items-center justify-center">
              <LockKeyhole className="h-4 w-4 text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-200">Locked Balance</p>
              <p className="text-xs text-slate-400">Processing transactions</p>
            </div>
          </div>
          <p className="text-sm font-medium text-purple-400">₹{(locked / 100).toFixed(2)}</p>
        </div>
        
        <div className="flex items-center justify-between px-1 py-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-accent-green/10 flex items-center justify-center">
              <CalendarClock className="h-4 w-4 text-accent-green-light" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-200">Total Balance</p>
              <p className="text-xs text-slate-400">Available + Locked</p>
            </div>
          </div>
          <p className="text-sm font-medium text-accent-green-light">₹{((locked + amount) / 100).toFixed(2)}</p>
        </div>
      </div>
    </Card>
  );
};
