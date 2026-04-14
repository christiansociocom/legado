```import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, Users, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import imgSerengeti from "@/assets/dest-serengeti.jpg";
import imgKili from "@/assets/dest-kilimanjaro.jpg";
import imgZanzibar from "@/assets/dest-zanzibar.jpg";

const packages = [
  { name: "Serengeti Migration Safari", image: imgSerengeti, days: 5, price: 2500, group: 8, rating: 4.9, slug: "serengeti-migration" },
  { name: "Kilimanjaro Summit Trek", image: imgKili, days: 7, price: 3200, group: 10, rating: 4.8, slug: "kilimanjaro-summit" },
  { name: "Zanzibar Beach & Culture", image: imgZanzibar, days: 4, price: 1800, group: 12, rating: 4.7, slug: "zanzibar-beach" },
];

const PackagesPreview = () => (
  <section className="py-20 bg-muted">
    <div className="container mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
        <p className="text-primary uppercase tracking-[0.2em] text-sm font-medium mb-2">Our Adventures</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Popular Packages</h2>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((p, i) => (
          <motion.div key={p.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
            <Card className="overflow-hidden group hover:shadow-safari transition-shadow">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" width={800} height={600} />
                <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                  ${p.price}
                </div>
              </div>
              <CardContent className="p-5">
                <h3 className="font-display text-lg font-bold mb-2">{p.name}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {p.days} days</span>
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" /> Max {p.group}</span>
                  <span className="flex items-center gap-1"><Star className="w-4 h-4 text-safari-gold fill-safari-gold" /> {p.rating}</span>
                </div>
                <Button asChild className="w-full bg-safari-gradient text-primary-foreground hover:opacity-90">
                  <Link to="/packages">View Details</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-10">
        <Button asChild variant="outline" size="lg">
          <Link to="/packages">All Packages <ArrowRight className="w-4 h-4 ml-2" /></Link>
        </Button>
      </div>
    </div>
  </section>
);

export default PackagesPreview;
```

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, Users, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

import imgSerengeti from "@/assets/dest-serengeti.jpg";
import imgKili from "@/assets/dest-kilimanjaro.jpg";
import imgZanzibar from "@/assets/dest-zanzibar.jpg";

const packages = [
  { name: "Serengeti Migration Safari", image: imgSerengeti, days: 5, price: 2500, group: 8, rating: 4.9, slug: "serengeti-migration" },
  { name: "Kilimanjaro Summit Trek", image: imgKili, days: 7, price: 3200, group: 10, rating: 4.8, slug: "kilimanjaro-summit" },
  { name: "Zanzibar Beach & Culture", image: imgZanzibar, days: 4, price: 1800, group: 12, rating: 4.7, slug: "zanzibar-beach" },
];

const PackagesPreview = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="text-primary uppercase tracking-[0.2em] text-sm font-medium mb-2">{t("pkg.adventures")}</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">{t("pkg.title")}</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((p, i) => (
            <motion.div key={p.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
              <Card className="overflow-hidden group hover:shadow-safari transition-shadow">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" width={800} height={600} />
                  <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                    ${p.price}
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-display text-lg font-bold mb-2">{p.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {p.days} {t("pkg.days")}</span>
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {t("pkg.max")} {p.group}</span>
                    <span className="flex items-center gap-1"><Star className="w-4 h-4 text-safari-gold fill-safari-gold" /> {p.rating}</span>
                  </div>
                  <Button asChild className="w-full bg-safari-gradient text-primary-foreground hover:opacity-90">
                    <Link to="/packages">{t("pkg.viewDetails")}</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button asChild variant="outline" size="lg">
            <Link to="/packages">{t("pkg.allPackages")} <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PackagesPreview;
