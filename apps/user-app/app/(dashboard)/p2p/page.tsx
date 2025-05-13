import { SendCard } from "../../../components/SendCard";
import { Metadata } from 'next';
import { Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'P2P Transfer | Swiftpay',
  description: 'Fast and safe P2P transfers with Swiftpay digital wallet application',
}

export const dynamic = 'force-dynamic';

export default function P2PPage() {
  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 flex items-center gap-2">
          <Users className="h-6 w-6 text-accent-blue-light" />
          P2P Transfer
          <span className="bg-gradient-to-r from-accent-blue to-accent-green bg-clip-text text-transparent">SwiftPay</span>
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-400">
          Send money instantly to other SwiftPay users
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SendCard />
        </div>
        
        <div className="bg-dark-200/30 backdrop-blur-sm rounded-xl p-6 h-fit">
          <h2 className="text-lg font-semibold text-slate-100 mb-4 pb-2 border-b border-dark-300">How It Works</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-accent-blue/20 flex items-center justify-center text-xs font-medium text-accent-blue-light shrink-0 mt-0.5">
                1
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-200">Enter Recipient's Number</h3>
                <p className="text-xs text-slate-400 mt-1">Enter the phone number of the person you want to send money to</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-accent-blue/20 flex items-center justify-center text-xs font-medium text-accent-blue-light shrink-0 mt-0.5">
                2
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-200">Enter Amount</h3>
                <p className="text-xs text-slate-400 mt-1">Specify how much money you want to transfer</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-accent-blue/20 flex items-center justify-center text-xs font-medium text-accent-blue-light shrink-0 mt-0.5">
                3
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-200">Confirm and Send</h3>
                <p className="text-xs text-slate-400 mt-1">Click the Send button to complete your transaction</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-dark-300">
            <div className="bg-accent-blue/10 rounded-lg p-3">
              <p className="text-xs text-slate-300">
                <span className="text-accent-blue-light font-medium">Note:</span> Money will be transferred instantly and the recipient will be notified via SMS.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
