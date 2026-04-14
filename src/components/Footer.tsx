```import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-safari-earth text-primary-foreground">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-display text-xl font-bold mb-4">🌍 TanzaniaSafari</h3>
          <p className="text-primary-foreground/70 text-sm">Discover the breathtaking beauty of Tanzania. From the Serengeti plains to Zanzibar beaches, your adventure awaits.</p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Explore</h4>
          <div className="flex flex-col gap-2 text-sm text-primary-foreground/70">
            <Link to="/destinations" className="hover:text-primary-foreground transition-colors">Destinations</Link>
            <Link to="/packages" className="hover:text-primary-foreground transition-colors">Tour Packages</Link>
            <Link to="/map" className="hover:text-primary-foreground transition-colors">Interactive Map</Link>
            <Link to="/custom-package" className="hover:text-primary-foreground transition-colors">Custom Trip</Link>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Company</h4>
          <div className="flex flex-col gap-2 text-sm text-primary-foreground/70">
            <Link to="/about" className="hover:text-primary-foreground transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-primary-foreground transition-colors">Contact</Link>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Contact</h4>
          <div className="flex flex-col gap-3 text-sm text-primary-foreground/70">
            <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> info@tanzaniasafari.com</div>
            <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> +255 123 456 789</div>
            <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Arusha, Tanzania</div>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/50">
        © {new Date().getFullYear()} TanzaniaSafari. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
```

import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-safari-earth text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display text-xl font-bold mb-4">🌍 TanzaniaSafari</h3>
            <p className="text-primary-foreground/70 text-sm">{t("footer.desc")}</p>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4">{t("footer.explore")}</h4>
            <div className="flex flex-col gap-2 text-sm text-primary-foreground/70">
              <Link to="/destinations" className="hover:text-primary-foreground transition-colors">{t("footer.destinations")}</Link>
              <Link to="/packages" className="hover:text-primary-foreground transition-colors">{t("footer.packages")}</Link>
              <Link to="/map" className="hover:text-primary-foreground transition-colors">{t("footer.map")}</Link>
              <Link to="/custom-package" className="hover:text-primary-foreground transition-colors">{t("footer.customTrip")}</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4">{t("footer.company")}</h4>
            <div className="flex flex-col gap-2 text-sm text-primary-foreground/70">
              <Link to="/about" className="hover:text-primary-foreground transition-colors">{t("footer.about")}</Link>
              <Link to="/contact" className="hover:text-primary-foreground transition-colors">{t("footer.contact")}</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4">{t("footer.contactTitle")}</h4>
            <div className="flex flex-col gap-3 text-sm text-primary-foreground/70">
              <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> info@tanzaniasafari.com</div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> +255 123 456 789</div>
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Arusha, Tanzania</div>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/50">
          © {new Date().getFullYear()} TanzaniaSafari. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
