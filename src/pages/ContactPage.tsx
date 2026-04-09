import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ContactPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
  };

  return (
    <div className="min-h-screen"><Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <p className="text-primary uppercase tracking-[0.2em] text-sm font-medium mb-2">Get in Touch</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Contact Us</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">Have questions about our tours? We'd love to hear from you.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><Label>Name</Label><Input required /></div>
                      <div><Label>Email</Label><Input type="email" required /></div>
                    </div>
                    <div><Label>Subject</Label><Input required /></div>
                    <div><Label>Message</Label><Textarea rows={5} required /></div>
                    <Button type="submit" className="w-full bg-safari-gradient text-primary-foreground hover:opacity-90">Send Message</Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-6">
              {[
                { icon: MapPin, title: "Visit Us", lines: ["Arusha, Tanzania", "Near Clock Tower Roundabout"] },
                { icon: Phone, title: "Call Us", lines: ["+255 123 456 789", "+255 987 654 321"] },
                { icon: Mail, title: "Email", lines: ["info@tanzaniasafari.com", "bookings@tanzaniasafari.com"] },
                { icon: Clock, title: "Working Hours", lines: ["Mon - Fri: 8:00 AM - 6:00 PM", "Sat: 9:00 AM - 3:00 PM"] },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center shrink-0"><item.icon className="w-5 h-5 text-primary" /></div>
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    {item.lines.map((l) => <p key={l} className="text-sm text-muted-foreground">{l}</p>)}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
