import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { AddMoney } from "../../../components/AddMoneyCard";
import { authOptions } from "../../lib/auth";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransaction } from "../../../components/OnRampTransaction";
import { Metadata } from 'next';
import { ArrowLeftRight, Wallet, PiggyBank } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Transfer | Swiftpay',
  description: 'Transfer funds seamlessly with Swiftpay digital wallet application',
}

// Ensure this page is dynamically rendered
export const dynamic = 'force-dynamic';

async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user.id),
    },
  });
  return txns.map((t: any) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

export default async function TransferPage() {
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();
  
  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 flex items-center gap-2">
          <ArrowLeftRight className="h-6 w-6 text-accent-blue-light" />
          Money Transfers
          <span className="bg-gradient-to-r from-accent-blue to-accent-green bg-clip-text text-transparent">SwiftPay</span>
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-400">
          Add funds to your wallet and track your balance
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            <BalanceCard amount={balance.amount} locked={balance.locked} />
            <div className="bg-dark-200/30 backdrop-blur-sm rounded-xl p-6">
              <h2 className="text-lg font-semibold text-slate-100 mb-4 pb-2 border-b border-dark-300 flex items-center gap-2">
                <PiggyBank className="h-5 w-5 text-accent-green-light" />
                Wallet Tips
              </h2>
              
              <div className="space-y-4">
                <div className="bg-dark-100/50 rounded-lg p-3">
                  <p className="text-xs text-slate-300">
                    <span className="text-accent-blue-light font-medium">Quick Transfers:</span> Add money to your wallet for faster transactions across the platform.
                  </p>
                </div>
                
                <div className="bg-dark-100/50 rounded-lg p-3">
                  <p className="text-xs text-slate-300">
                    <span className="text-accent-green-light font-medium">Secure Funds:</span> Your wallet balance is protected with industry-leading security protocols.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right column */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            <AddMoney />
            
            <div className="bg-dark-200/30 backdrop-blur-sm rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-dark-300">
                <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-accent-blue-light" />
                  Recent Transactions
                </h2>
              </div>
              <div className="bg-dark-100/50 rounded-lg m-4">
                <OnRampTransaction transactions={transactions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
