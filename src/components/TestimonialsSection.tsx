```import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  { name: "Sarah Johnson", country: "USA", rating: 5, comment: "An absolutely magical experience! The Serengeti sunrise and the incredible wildlife — our guide was phenomenal. This was a trip of a lifetime.", avatar: "SJ" },
  { name: "Marco Rossi", country: "Italy", rating: 5, comment: "Climbing Kilimanjaro with this team was unforgettable. Professional, supportive, and the views from the summit were breathtaking.", avatar: "MR" },
  { name: "Yuki Tanaka", country: "Japan", rating: 5, comment: "Zanzibar was paradise! The crystal clear waters, the spice tours, and the warm hospitality of the Tanzanian people made this perfect.", avatar: "YT" },
];

const TestimonialsSection = () => (
  <section className="py-20 bg-background">
    <div className="container mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
        <p className="text-primary uppercase tracking-[0.2em] text-sm font-medium mb-2">Traveler Stories</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">What Our Guests Say</h2>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
            <Card className="h-full">
              <CardContent className="p-6">
                <Quote className="w-8 h-8 text-safari-gold/40 mb-4" />
                <p className="text-foreground/80 mb-6 italic">&ldquo;{t.comment}&rdquo;</p>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-safari-gold fill-safari-gold" />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-safari-gradient flex items-center justify-center text-primary-foreground font-bold text-sm">{t.avatar}</div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.country}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
```


import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const testimonialsData = {
  en: [
    { name: "Sarah Johnson", country: "USA", rating: 5, comment: "An absolutely magical experience! The Serengeti sunrise and the incredible wildlife — our guide was phenomenal. This was a trip of a lifetime.", avatar: "SJ" },
    { name: "Marco Rossi", country: "Italy", rating: 5, comment: "Climbing Kilimanjaro with this team was unforgettable. Professional, supportive, and the views from the summit were breathtaking.", avatar: "MR" },
    { name: "Yuki Tanaka", country: "Japan", rating: 5, comment: "Zanzibar was paradise! The crystal clear waters, the spice tours, and the warm hospitality of the Tanzanian people made this perfect.", avatar: "YT" },
  ],
  es: [
    { name: "Sarah Johnson", country: "EE.UU.", rating: 5, comment: "¡Una experiencia absolutamente mágica! El amanecer en el Serengeti y la increíble fauna — nuestro guía fue fenomenal. Fue el viaje de mi vida.", avatar: "SJ" },
    { name: "Marco Rossi", country: "Italia", rating: 5, comment: "Escalar el Kilimanjaro con este equipo fue inolvidable. Profesional, comprometido, y las vistas desde la cima fueron impresionantes.", avatar: "MR" },
    { name: "Yuki Tanaka", country: "Japón", rating: 5, comment: "¡Zanzíbar fue un paraíso! Las aguas cristalinas, los tours de especias y la cálida hospitalidad de los tanzanos lo hicieron perfecto.", avatar: "YT" },
  ],
};

const TestimonialsSection = () => {
  const { t, language } = useLanguage();
  const testimonials = testimonialsData[language] || testimonialsData.en;

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="text-primary uppercase tracking-[0.2em] text-sm font-medium mb-2">{t("test.stories")}</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">{t("test.title")}</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <Quote className="w-8 h-8 text-safari-gold/40 mb-4" />
                  <p className="text-foreground/80 mb-6 italic">&ldquo;{testimonial.comment}&rdquo;</p>
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: testimonial.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-safari-gold fill-safari-gold" />
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-safari-gradient flex items-center justify-center text-primary-foreground font-bold text-sm">{testimonial.avatar}</div>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.country}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
