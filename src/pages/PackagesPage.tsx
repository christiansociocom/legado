import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Users, Star, Mountain, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import imgSerengeti from "@/assets/dest-serengeti.jpg";
import imgKili from "@/assets/dest-kilimanjaro.jpg";
import imgZanzibar from "@/assets/dest-zanzibar.jpg";
import imgNgorongoro from "@/assets/dest-ngorongoro.jpg";
import imgTarangire from "@/assets/dest-tarangire.jpg";
import imgManyara from "@/assets/dest-manyara.jpg";

const packages = [
  { id: "1", name: "Serengeti Migration Safari", image: imgSerengeti, days: 5, price: 2500, group: 8, rating: 4.9, difficulty: "Easy", desc: "Witness the Great Migration across the Serengeti. Game drives, luxury camping, and unforgettable wildlife encounters.", included: ["Airport transfers", "All meals", "Game drives", "Camping accommodation", "Park fees", "Professional guide"] },
  { id: "2", name: "Kilimanjaro Summit Trek", image: imgKili, days: 7, price: 3200, group: 10, rating: 4.8, difficulty: "Challenging", desc: "Conquer Africa's highest peak via the Machame route. Trek through 5 climate zones to the summit.", included: ["Mountain guides & porters", "All meals on mountain", "Camping gear", "Park fees", "Airport transfers", "Certificate"] },
  { id: "3", name: "Zanzibar Beach & Culture", image: imgZanzibar, days: 4, price: 1800, group: 12, rating: 4.7, difficulty: "Easy", desc: "Relax on pristine beaches, explore Stone Town, and discover spice plantations in this tropical paradise.", included: ["Hotel accommodation", "Breakfast daily", "Stone Town tour", "Spice tour", "Snorkeling trip", "Airport transfers"] },
  { id: "4", name: "Northern Circuit Safari", image: imgNgorongoro, days: 6, price: 3500, group: 6, rating: 4.9, difficulty: "Moderate", desc: "Complete northern circuit covering Tarangire, Ngorongoro Crater, and Serengeti in one epic adventure.", included: ["All meals", "Lodge accommodation", "Game drives", "Park fees", "Professional guide", "Crater tour"] },
  { id: "5", name: "Tarangire & Manyara Explorer", image: imgTarangire, days: 3, price: 1500, group: 8, rating: 4.6, difficulty: "Easy", desc: "Short safari exploring Tarangire's elephants and baobabs, and Lake Manyara's tree-climbing lions.", included: ["All meals", "Lodge accommodation", "Game drives", "Park fees", "Professional guide"] },
  { id: "6", name: "Ultimate Tanzania Experience", image: imgManyara, days: 14, price: 6500, group: 6, rating: 5.0, difficulty: "Moderate", desc: "The complete Tanzania adventure: Serengeti, Ngorongoro, Kilimanjaro trek, and Zanzibar beach.", included: ["All accommodation", "All meals", "All activities", "Internal flights", "Park fees", "Professional guides"] },
];

const PackagesPage = () => {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? packages : packages.filter((p) => p.difficulty.toLowerCase() === filter);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <p className="text-primary uppercase tracking-[0.2em] text-sm font-medium mb-2">Adventures</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Tour Packages</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">Choose from curated safari experiences or build your own custom trip.</p>
            <div className="flex justify-center gap-2 flex-wrap">
              {["all", "easy", "moderate", "challenging"].map((f) => (
                <Button key={f} variant={filter === f ? "default" : "outline"} size="sm" onClick={() => setFilter(f)} className={filter === f ? "bg-safari-gradient text-primary-foreground" : ""}>
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </Button>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="overflow-hidden h-full flex flex-col group hover:shadow-safari transition-all">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" width={800} height={600} />
                    <div className="absolute top-3 left-3"><Badge className="bg-safari-earth text-primary-foreground">{p.difficulty}</Badge></div>
                    <div className="absolute top-3 right-3 bg-primary text-primary-foreground font-bold px-3 py-1 rounded-full text-sm">${p.price}</div>
                  </div>
                  <CardContent className="p-5 flex-1 flex flex-col">
                    <h3 className="font-display text-lg font-bold mb-2">{p.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-1">{p.desc}</p>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {p.days} days</span>
                      <span className="flex items-center gap-1"><Users className="w-4 h-4" /> Max {p.group}</span>
                      <span className="flex items-center gap-1"><Star className="w-4 h-4 text-safari-gold fill-safari-gold" /> {p.rating}</span>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs font-semibold mb-2 text-foreground">Included:</p>
                      <div className="grid grid-cols-2 gap-1">
                        {p.included.slice(0, 4).map((item) => (
                          <span key={item} className="text-xs text-muted-foreground flex items-center gap-1"><Check className="w-3 h-3 text-safari-green" />{item}</span>
                        ))}
                      </div>
                    </div>
                    <Button asChild className="w-full bg-safari-gradient text-primary-foreground hover:opacity-90">
                      <Link to={`/booking/${p.id}`}>Book Now</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Can't find the perfect trip?</p>
            <Button asChild size="lg" variant="outline">
              <Link to="/custom-package"><Mountain className="w-4 h-4 mr-2" /> Build a Custom Package</Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PackagesPage;
