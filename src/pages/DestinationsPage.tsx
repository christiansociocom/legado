import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import imgSerengeti from "@/assets/dest-serengeti.jpg";
import imgNgorongoro from "@/assets/dest-ngorongoro.jpg";
import imgKilimanjaro from "@/assets/dest-kilimanjaro.jpg";
import imgZanzibar from "@/assets/dest-zanzibar.jpg";
import imgTarangire from "@/assets/dest-tarangire.jpg";
import imgManyara from "@/assets/dest-manyara.jpg";

const allDestinations = [
  { name: "Serengeti National Park", slug: "serengeti-national-park", image: imgSerengeti, desc: "Witness the Great Migration — over 1.5 million wildebeest crossing endless plains. Home to the Big Five and spectacular sunsets.", category: "National Park", highlights: ["Great Migration", "Big Five", "Hot Air Balloons"] },
  { name: "Ngorongoro Crater", slug: "ngorongoro-crater", image: imgNgorongoro, desc: "The world's largest intact volcanic caldera, teeming with wildlife. A UNESCO World Heritage Site with breathtaking scenery.", category: "Conservation Area", highlights: ["UNESCO Site", "Crater Floor Safari", "Maasai Culture"] },
  { name: "Mount Kilimanjaro", slug: "mount-kilimanjaro", image: imgKilimanjaro, desc: "Africa's highest peak at 5,895m. Multiple routes through rainforest, moorland, and alpine desert to the snow-capped summit.", category: "Mountain", highlights: ["Summit Trek", "5 Climate Zones", "Roof of Africa"] },
  { name: "Zanzibar Archipelago", slug: "zanzibar-archipelago", image: imgZanzibar, desc: "Tropical paradise with crystal waters, white sand beaches, historic Stone Town, and aromatic spice plantations.", category: "Island", highlights: ["Stone Town", "Spice Tours", "Diving & Snorkeling"] },
  { name: "Tarangire National Park", slug: "tarangire-national-park", image: imgTarangire, desc: "Famous for ancient baobab trees and large elephant herds. Less crowded than Serengeti with equally stunning wildlife.", category: "National Park", highlights: ["Elephant Herds", "Baobab Trees", "Bird Watching"] },
  { name: "Lake Manyara National Park", slug: "lake-manyara-national-park", image: imgManyara, desc: "Compact park known for tree-climbing lions, flamingo-filled lakes, and lush groundwater forests.", category: "National Park", highlights: ["Tree-climbing Lions", "Flamingos", "Night Safari"] },
];

const DestinationsPage = () => (
  <div className="min-h-screen">
    <Navbar />
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <p className="text-primary uppercase tracking-[0.2em] text-sm font-medium mb-2">Discover</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Tanzania Destinations</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">From vast savannas to tropical islands, explore the best of Tanzania's natural wonders and cultural heritage.</p>
        </motion.div>

        <div className="space-y-16">
          {allDestinations.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 items-center`}
            >
              <div className="lg:w-1/2">
                <Link to={`/destinations/${d.slug}`}>
                  <div className="relative rounded-xl overflow-hidden aspect-[16/10] shadow-safari group">
                    <img src={d.image} alt={d.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" width={800} height={600} />
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                      {d.category}
                    </div>
                  </div>
                </Link>
              </div>
              <div className="lg:w-1/2">
                <div className="flex items-center gap-2 text-primary text-sm mb-2"><MapPin className="w-4 h-4" /> Tanzania</div>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">{d.name}</h2>
                <p className="text-muted-foreground mb-6">{d.desc}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {d.highlights.map((h) => (
                    <span key={h} className="bg-accent text-accent-foreground text-xs font-medium px-3 py-1 rounded-full">{h}</span>
                  ))}
                </div>
                <Button asChild className="bg-safari-gradient text-primary-foreground hover:opacity-90">
                  <Link to={`/destinations/${d.slug}`}>Explore Details →</Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default DestinationsPage;
