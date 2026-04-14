import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRef, useState } from "react";

// Free-to-use Pexels video of African wildlife/savanna
const HERO_VIDEO_URL = "https://www.pexels.com/download/video/3571264/?fps=24.0&h=1080&w=1920";
// Fallback CDN hosted mp4 - African safari / wildlife video
const HERO_VIDEO_FALLBACK = "https://download.samplelib.com/mp4/sample-5s.mp4";

// Using a reliable CDN-hosted Pexels safari video
const VIDEO_SRC = "https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1dd7eb50a&profile_id=164&oauth2_token_id=57447761";

const HeroSection = () => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      {!videoError ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setVideoError(true)}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        >
          {/* Multiple sources for best compatibility */}
          <source
            src="https://www.pexels.com/video/3571264/download/?fps=24.0&h=720&w=1280"
            type="video/mp4"
          />
          <source
            src={VIDEO_SRC}
            type="video/mp4"
          />
          {/* Fallback poster image if video can't load */}
        </video>
      ) : (
        // Fallback: beautiful gradient when video fails
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #2d5016 0%, #5c3d11 30%, #8b4513 60%, #2d5016 100%)",
            zIndex: 0,
          }}
        />
      )}

      {/* Overlay for readability */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.6) 100%)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-safari-gold font-body text-sm md:text-base uppercase tracking-[0.3em] mb-4 drop-shadow-md"
        >
          {t("hero.discover")}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight drop-shadow-lg"
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
        >
          {t("hero.title1")}{" "}
          <span className="text-gradient-safari">{t("hero.title2")}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-primary-foreground/90 text-base md:text-lg mb-8 max-w-2xl mx-auto font-body drop-shadow"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}
        >
          {t("hero.subtitle")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button asChild size="lg" className="bg-safari-gradient text-primary-foreground hover:opacity-90 text-base px-8 shadow-lg">
            <Link to="/packages">{t("hero.explorePackages")}</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-primary-foreground/60 text-primary-foreground hover:bg-primary-foreground/15 text-base px-8 backdrop-blur-sm shadow-lg">
            <Link to="/custom-package">{t("hero.customTrip")}</Link>
          </Button>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground/70 z-10"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
