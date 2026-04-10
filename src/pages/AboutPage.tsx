import { motion } from "framer-motion";
import { Heart, Shield, Globe, Users, Award, TreePine } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import imgSerengeti from "@/assets/dest-serengeti.jpg";

const team = [
  { name: "Daniel Kazana", role: "Founder & Lead Guide", bio: "Born in Arusha, Daniel has led safaris for over 15 years across Tanzania's most iconic landscapes." },
  { name: "Amina Mwangi", role: "Operations Manager", bio: "Amina ensures every trip runs seamlessly, from airport pickup to your last sunset game drive." },
  { name: "Joseph Makundi", role: "Senior Safari Guide", bio: "With a wildlife biology degree and deep Maasai heritage, Joseph brings unmatched expertise to every safari." },
  { name: "Grace Lema", role: "Customer Experience", bio: "Grace works closely with travelers to design bespoke itineraries that exceed every expectation." },
];

const values = [
  { icon: Heart, title: "Passion for Wildlife", desc: "Every safari we lead is driven by a deep love for Tanzania's incredible biodiversity." },
  { icon: Shield, title: "Safety First", desc: "Licensed guides, well-maintained vehicles, and strict safety protocols on every adventure." },
  { icon: Globe, title: "Sustainable Tourism", desc: "We partner with local communities and conservation programs to protect Tanzania's natural heritage." },
  { icon: TreePine, title: "Eco-Friendly", desc: "Carbon-offset trips, minimal waste policies, and eco-certified lodge partnerships." },
  { icon: Award, title: "Award-Winning Service", desc: "Recognized by TripAdvisor, SafariBookings, and Tanzania Tourism Board for excellence." },
  { icon: Users, title: "Community Impact", desc: "10% of profits support local schools, healthcare, and wildlife conservation projects." },
];

const AboutPage = () => (
  <div className="min-h-screen">
    <Navbar />

    {/* Hero */}
    <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
      <img src={imgSerengeti} alt="Tanzania Serengeti landscape" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-hero-overlay flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center text-primary-foreground px-4">
          <p className="uppercase tracking-[0.2em] text-sm font-medium mb-2 opacity-80">Our Story</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">About TanzaniaSafari</h1>
          <p className="max-w-2xl mx-auto opacity-90">Crafting unforgettable African adventures since 2010</p>
        </motion.div>
      </div>
    </div>

    <div className="pt-16 pb-16">
      <div className="container mx-auto px-4">

        {/* Company Story */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="font-display text-3xl font-bold mb-6">Our Journey</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            TanzaniaSafari was founded in 2010 in Arusha, the gateway to Tanzania's legendary northern safari circuit. What started as a small family operation with a single Land Cruiser has grown into one of Tanzania's most trusted safari companies.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Over the past decade, we've guided thousands of travelers from over 60 countries through the Serengeti's Great Migration, up the slopes of Mount Kilimanjaro, and across the turquoise waters of Zanzibar. Our commitment to authentic, sustainable tourism has earned us recognition from the Tanzania Tourism Board and repeat visitors who return year after year.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Today, we offer a full range of safari experiences — from budget camping safaris to luxury lodge stays — all led by experienced, certified Tanzanian guides who share a genuine passion for their homeland's extraordinary wildlife and cultures.
          </p>
        </motion.section>

        {/* Mission */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-accent rounded-2xl p-8 md:p-12 text-center mb-20">
          <h2 className="font-display text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-accent-foreground max-w-2xl mx-auto leading-relaxed">
            To share the magic of Tanzania's wild places with the world while empowering local communities and protecting the ecosystems that make these experiences possible — one safari at a time.
          </p>
        </motion.section>

        {/* Values */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
          <h2 className="font-display text-3xl font-bold text-center mb-10">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <Card key={v.title} className="hover:shadow-safari transition-shadow">
                <CardContent className="p-6 text-center">
                  <v.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="font-display text-lg font-bold mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Team */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-3xl font-bold text-center mb-10">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m) => (
              <Card key={m.name} className="hover:shadow-safari transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-safari-gradient mx-auto mb-4 flex items-center justify-center text-primary-foreground text-2xl font-bold font-display">
                    {m.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <h3 className="font-display text-lg font-bold">{m.name}</h3>
                  <p className="text-primary text-sm font-medium mb-2">{m.role}</p>
                  <p className="text-sm text-muted-foreground">{m.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

      </div>
    </div>
    <Footer />
  </div>
);

export default AboutPage;
