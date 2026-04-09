import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import imgSerengeti from "@/assets/dest-serengeti.jpg";
import imgNgorongoro from "@/assets/dest-ngorongoro.jpg";
import imgKilimanjaro from "@/assets/dest-kilimanjaro.jpg";
import imgZanzibar from "@/assets/dest-zanzibar.jpg";
import imgTarangire from "@/assets/dest-tarangire.jpg";
import imgManyara from "@/assets/dest-manyara.jpg";

const destinations = [
  { name: "Serengeti National Park", image: imgSerengeti, desc: "Witness the Great Migration across endless plains", slug: "serengeti" },
  { name: "Ngorongoro Crater", image: imgNgorongoro, desc: "The world's largest intact volcanic caldera", slug: "ngorongoro" },
  { name: "Mount Kilimanjaro", image: imgKilimanjaro, desc: "Africa's highest peak and a climber's dream", slug: "kilimanjaro" },
  { name: "Zanzibar", image: imgZanzibar, desc: "Tropical paradise with turquoise waters", slug: "zanzibar" },
  { name: "Tarangire National Park", image: imgTarangire, desc: "Ancient baobabs and elephant herds", slug: "tarangire" },
  { name: "Lake Manyara", image: imgManyara, desc: "Flamingos, tree-climbing lions and lush forests", slug: "manyara" },
];

const DestinationsPreview = () => (
  <section className="py-20 bg-background">
    <div className="container mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
        <p className="text-primary uppercase tracking-[0.2em] text-sm font-medium mb-2">Explore Tanzania</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Top Destinations</h2>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((d, i) => (
          <motion.div
            key={d.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link to={`/destinations`} className="group block relative rounded-xl overflow-hidden aspect-[4/3] shadow-safari">
              <img src={d.image} alt={d.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" width={800} height={600} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-1 text-safari-gold text-xs mb-1">
                  <MapPin className="w-3 h-3" /> Tanzania
                </div>
                <h3 className="font-display text-xl font-bold text-primary-foreground mb-1">{d.name}</h3>
                <p className="text-primary-foreground/70 text-sm">{d.desc}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-10">
        <Button asChild variant="outline" size="lg">
          <Link to="/destinations">View All Destinations <ArrowRight className="w-4 h-4 ml-2" /></Link>
        </Button>
      </div>
    </div>
  </section>
);

export default DestinationsPreview;
