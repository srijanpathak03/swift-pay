import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { OnRampTransaction } from "../../../components/OnRampTransaction";
import { Metadata } from 'next'
import { ArrowUpRight, ArrowDownLeft, Wallet } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Transactions | Swiftpay',
  description: 'Track all your transactions effortlessly with Swiftpay digital wallet application',
}

async function getsentP2PTranscations() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.p2pTransfer.findMany({
    where: {
      fromUserId: Number(session?.user.id),
    },
  });

  return txns.map((t: any) => ({
    time: t.timestamp,
    amount: t.amount,
    status: "Completed",
    provider: t.provider,
  }));
}

async function getreceivedP2PTranscations() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.p2pTransfer.findMany({
    where: {
      toUserId: Number(session?.user.id),
    },
  });

  return txns.map((t: any) => ({
    time: t.timestamp,
    amount: t.amount,
    status: "Completed",
    provider: t.provider,
  }));
}

async function getOnRampTransactions(status: any) {
  const session = await getServerSession(authOptions);
  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
      status: status,
    },
  });
  return txns.map((t: any) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

export default async function TransactionsPage() {
  const [
    sentP2PTranscations,
    receivedP2PTranscations,
    onRampTransactions,
    onRampTransactionsPending,
    onRampTransactionsFailed,
  ] = await Promise.all([
    getsentP2PTranscations(),
    getreceivedP2PTranscations(),
    getOnRampTransactions("Completed"),
    getOnRampTransactions("Pending"),
    getOnRampTransactions("Failed"),
  ]);

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 flex items-center gap-2">
          Transaction History
          <span className="bg-gradient-to-r from-accent-blue to-accent-green bg-clip-text text-transparent">SwiftPay</span>
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-400">
          Track all your financial movements in one place
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-dark-200/40 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-accent-blue/10 flex items-center justify-center">
            <ArrowUpRight className="h-5 w-5 text-accent-blue-light" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Sent</p>
            <p className="text-lg font-semibold text-slate-100">₹{sentP2PTranscations.reduce((acc, t) => acc + (t.amount / 100), 0).toFixed(2)}</p>
          </div>
        </div>
        
        <div className="bg-dark-200/40 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-accent-green/10 flex items-center justify-center">
            <ArrowDownLeft className="h-5 w-5 text-accent-green-light" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Received</p>
            <p className="text-lg font-semibold text-slate-100">₹{receivedP2PTranscations.reduce((acc, t) => acc + (t.amount / 100), 0).toFixed(2)}</p>
          </div>
        </div>
        
        <div className="bg-dark-200/40 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <Wallet className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Wallet Transfers</p>
            <p className="text-lg font-semibold text-slate-100">₹{onRampTransactions.reduce((acc, t) => acc + (t.amount / 100), 0).toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="bg-dark-200/30 backdrop-blur-sm rounded-xl">
          <div className="px-6 py-4 border-b border-dark-300">
            <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
              <span className="text-accent-blue-light">P2P</span> Transactions
            </h2>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <div className="bg-dark-100/50 rounded-lg">
              <OnRampTransaction
                title={"Sent transactions"}
                transactions={sentP2PTranscations}
              />
            </div>
            <div className="bg-dark-100/50 rounded-lg">
              <OnRampTransaction
                title={"Received transactions"}
                transactions={receivedP2PTranscations}
              />
            </div>
          </div>
        </div>

        <div className="bg-dark-200/30 backdrop-blur-sm rounded-xl">
          <div className="px-6 py-4 border-b border-dark-300">
            <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
              <span className="text-accent-green-light">Wallet</span> Transactions
            </h2>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <div className="bg-dark-100/50 rounded-lg">
              <OnRampTransaction
                title={"Successful transactions"}
                transactions={onRampTransactions}
              />
            </div>
            <div className="bg-dark-100/50 rounded-lg">
              <OnRampTransaction
                title={"Processing Transactions"}
                transactions={onRampTransactionsPending}
              />
            </div>
            <div className="bg-dark-100/50 rounded-lg">
              <OnRampTransaction
                title={"Failed Transactions"}
                transactions={onRampTransactionsFailed}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
