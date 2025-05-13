"use client";

import { useState, useEffect } from "react";
import { SidebarItem } from "../../components/SiderBarItem";
import { MobileNav } from "../../components/MobileNav";
import { AppbarClient } from "../../AppbarClient";
import { 
  Home, 
  ArrowLeftRight, 
  Clock, 
  TrendingUp, 
  CreditCard, 
  Users, 
  Settings,
  HelpCircle 
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const pathname = usePathname();
  
  // Check if user is authenticated on client-side
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/auth/session');
        const session = await response.json();
        
        if (!session || !session.user) {
          window.location.href = '/home';
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Failed to check session:', error);
        window.location.href = '/auth';
      }
    };
    
    checkSession();
  }, []);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-blue"></div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col bg-dark min-h-screen">
      {/* Use the existing AppbarClient for navigation */}
      <div className="mb-16">
        <AppbarClient />
      </div>
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <MobileNav>
          <div className="w-60 border-r border-dark-300/50 min-h-screen flex-shrink-0 pt-6 pb-8 backdrop-blur-sm hidden md:block">
            <div className="flex flex-col gap-2 px-3">
              <div className="px-4 py-2 mb-2">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Main</p>
              </div>
              
              <SidebarItem 
                href="/dashboard" 
                title="Dashboard" 
                icon={<Home size={18} />} 
                isActive={pathname === '/dashboard'}
              />
              <SidebarItem 
                href="/transfer" 
                title="Transfer Money" 
                icon={<ArrowLeftRight size={18} />} 
                isActive={pathname === '/transfer'}
              />
              <SidebarItem 
                href="/transactions" 
                title="Transactions" 
                icon={<Clock size={18} />} 
                isActive={pathname === '/transactions'}
              />
              <SidebarItem 
                href="/p2p" 
                title="P2P Payments" 
                icon={<Users size={18} />} 
                isActive={pathname === '/p2p'}
              />
              
              <div className="px-4 py-2 mt-4 mb-2">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Finance</p>
              </div>
              
              <SidebarItem 
                href="/analytics" 
                title="Analytics" 
                icon={<TrendingUp size={18} />} 
                isActive={pathname === '/analytics'}
                comingSoon
              />
              <SidebarItem 
                href="/cards" 
                title="Cards" 
                icon={<CreditCard size={18} />} 
                isActive={pathname === '/cards'}
                comingSoon
              />
              
              <div className="mt-auto px-4 py-2 mt-4 mb-2">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Other</p>
              </div>
              
              <SidebarItem 
                href="/settings" 
                title="Settings" 
                icon={<Settings size={18} />} 
                isActive={pathname === '/settings'}
                comingSoon
              />
              <SidebarItem 
                href="/help" 
                title="Help Center" 
                icon={<HelpCircle size={18} />} 
                isActive={pathname === '/help'}
                comingSoon
              />
            </div>
          </div>
        </MobileNav>
        
        {/* Main Content */}
        <div className="flex-1 p-6">{children}</div>
      </div>
    </div>
  );
}
