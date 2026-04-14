```import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    const { error } = await supabase.from("newsletter_subscribers").insert({ email });
    setLoading(false);
    if (error) {
      if (error.code === "23505") toast.info("You're already subscribed!");
      else toast.error("Something went wrong. Try again.");
    } else {
      toast.success("Welcome! You're now subscribed.");
      setEmail("");
    }
  };

  return (
    <section className="py-20 bg-safari-gradient">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-primary-foreground mb-3">Stay Updated</h2>
          <p className="text-primary-foreground/80 mb-8">Get the latest travel tips, exclusive deals, and Tanzania adventure guides.</p>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-primary-foreground/20 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50"
              required
            />
            <Button type="submit" disabled={loading} className="bg-safari-earth text-primary-foreground hover:bg-safari-earth/90 shrink-0">
              <Send className="w-4 h-4 mr-2" /> Subscribe
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
```
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    const { error } = await supabase.from("newsletter_subscribers").insert({ email });
    setLoading(false);
    if (error) {
      if (error.code === "23505") toast.info("You're already subscribed!");
      else toast.error("Something went wrong. Try again.");
    } else {
      toast.success("Welcome! You're now subscribed.");
      setEmail("");
    }
  };

  return (
    <section className="py-20 bg-safari-gradient">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-primary-foreground mb-3">{t("news.title")}</h2>
          <p className="text-primary-foreground/80 mb-8">{t("news.subtitle")}</p>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="email"
              placeholder={t("news.placeholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-primary-foreground/20 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50"
              required
            />
            <Button type="submit" disabled={loading} className="bg-safari-earth text-primary-foreground hover:bg-safari-earth/90 shrink-0">
              <Send className="w-4 h-4 mr-2" /> {t("news.subscribe")}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
