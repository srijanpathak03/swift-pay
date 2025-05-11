import { HeroSection } from "../../components/HeroSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Swiftpay",
  description: "Welcome to the Swiftpay digital wallet application",
};

export default function Home() {

  return <HeroSection />;
}
