import React from "react";
import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";
import { authOptions } from "../../lib/auth";
import { OnRampTransaction } from "../../../components/OnRampTransaction";
import { DashboardClient } from "../../../components/DashboardClient";

import { Metadata } from "next";

// Ensure this page is dynamically rendered
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Dashboard | Swiftpay",
  description: "Dashboard for Swiftpay digital wallet application",
};

import {
  Wallet,
  TrendingUp,
  AlertCircle,
  ArrowUpRight,
  ArrowDownLeft,
  PieChart,
  HelpCircle,
} from "lucide-react";

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
    orderBy: {
      startTime: "desc",
    },
    take: 5,
  });
  return txns.map((t: any) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

export default async function DashboardPage() {
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();

  // Pass the data to the client component
  return <DashboardClient balance={balance} transactions={transactions} />;
}
