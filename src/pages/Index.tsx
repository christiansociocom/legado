import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DestinationsPreview from "@/components/DestinationsPreview";
import PackagesPreview from "@/components/PackagesPreview";
import TestimonialsSection from "@/components/TestimonialsSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <DestinationsPreview />
    <PackagesPreview />
    <TestimonialsSection />
    <NewsletterSection />
    <Footer />
  </div>
);

export default Index;
