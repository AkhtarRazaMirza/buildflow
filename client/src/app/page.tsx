import Navbar from "@/src/components/landing/Navbar";
import Hero from "@/src/components/landing/Hero";
import Workflow from "@/src/components/landing/Workflow";
import ProductPreview from "@/src/components/landing/ProductPreview";
import Features from "@/src/components/landing/Features";
import HowItWorks from "@/src/components/landing/HowItWorks";
import CTA from "@/src/components/landing/CTA";
import Footer from "@/src/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white scroll-smooth">
      <Navbar />
      <Hero />
      <Workflow />
      <ProductPreview />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </main>
  );
}





