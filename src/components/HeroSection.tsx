import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroImg from "@/assets/hero-serengeti.jpg";

const HeroSection = () => (
  <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
    <img src={heroImg} alt="Serengeti at golden hour" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
    <div className="absolute inset-0 bg-hero-overlay" />
    <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-safari-gold font-body text-sm md:text-base uppercase tracking-[0.3em] mb-4"
      >
        Discover the wild beauty
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight"
      >
        Explore the Heart of{" "}
        <span className="text-gradient-safari">Tanzania</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-primary-foreground/80 text-base md:text-lg mb-8 max-w-2xl mx-auto font-body"
      >
        From the endless Serengeti plains to the pristine beaches of Zanzibar, experience unforgettable safari adventures and cultural journeys.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Button asChild size="lg" className="bg-safari-gradient text-primary-foreground hover:opacity-90 text-base px-8">
          <Link to="/packages">Explore Packages</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8">
          <Link to="/custom-package">Build Custom Trip</Link>
        </Button>
      </motion.div>
    </div>
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground/60"
    >
      <ChevronDown size={32} />
    </motion.div>
  </section>
);

export default HeroSection;
