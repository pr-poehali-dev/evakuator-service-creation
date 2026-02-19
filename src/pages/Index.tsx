import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import OrderSection from "@/components/OrderSection";
import TrackingSection from "@/components/TrackingSection";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <OrderSection />
      <TrackingSection />
      <ServicesSection />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Index;
