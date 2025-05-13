import { Button } from "./button";
import { useRouter } from "next/navigation";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  onSignin: () => void;
  onSignout: () => void;
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
  const router = useRouter();
  
  function handleRedirect() {
    if (user) router.push("/dashboard");
    else router.push("/home");
  }

  return (
    <div className="px-4 sm:px-6 flex justify-between items-center border border-dark-300/60 py-2.5 fixed top-3 left-0 right-0 z-50 max-w-7xl mx-auto rounded-xl w-[95%] backdrop-blur-lg bg-dark-100/80 shadow-lg">
      <div className="flex items-center">
        <div 
          className="flex items-center cursor-pointer group"
          onClick={handleRedirect}
        >
          {/* SwiftPay Logo with Wallet Icon */}
          <div className="h-9 w-9 rounded-full bg-gradient-to-r from-accent-blue to-accent-green flex items-center justify-center mr-3 shadow-md group-hover:shadow-accent-blue/20 transition-all duration-300">
            {/* Wallet icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-white">
              <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
              <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
              <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
            </svg>
          </div>
          
          <div className="text-xl font-bold bg-gradient-to-r from-accent-blue to-accent-green bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
            SwiftPay
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {user && (
          <div className="hidden sm:flex items-center mr-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-accent-blue/20 to-accent-green/20 flex items-center justify-center border border-dark-300">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-slate-300">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <span className="ml-2 text-sm text-slate-300 font-medium">
              {user.name || 'User'}
            </span>
          </div>
        )}
        
        <Button 
          onClick={user ? onSignout : onSignin}
          variant="gradient"
        >
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
};
