"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Ensure this page is dynamically rendered
export const dynamic = 'force-dynamic';

export default function LoginRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the main auth page
    router.push('/auth');
  }, [router]);

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center">
      <div className="text-white text-center">
        <div className="animate-pulse">Redirecting to login...</div>
      </div>
    </div>
  );
} 