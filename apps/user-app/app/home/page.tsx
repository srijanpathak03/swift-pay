import { HeroSection } from "../../components/HeroSection";
import { Metadata } from "next";

// Ensure this page is dynamically rendered
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Home | Swiftpay",
  description: "Welcome to the Swiftpay digital wallet application",
};

export default function Home() {
  return <HeroSection />;
}
