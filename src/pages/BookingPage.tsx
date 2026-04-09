import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Users, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const packageData: Record<string, { name: string; price: number; days: number }> = {
  "1": { name: "Serengeti Migration Safari", price: 2500, days: 5 },
  "2": { name: "Kilimanjaro Summit Trek", price: 3200, days: 7 },
  "3": { name: "Zanzibar Beach & Culture", price: 1800, days: 4 },
  "4": { name: "Northern Circuit Safari", price: 3500, days: 6 },
  "5": { name: "Tarangire & Manyara Explorer", price: 1500, days: 3 },
  "6": { name: "Ultimate Tanzania Experience", price: 6500, days: 14 },
};

const BookingPage = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const pkg = packageId ? packageData[packageId] : null;

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    travelDate: "",
    guests: 1,
    specialRequests: "",
  });
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen"><Navbar />
        <div className="pt-32 text-center px-4">
          <h2 className="font-display text-2xl mb-4">Please sign in to book</h2>
          <Button onClick={() => navigate("/auth")} className="bg-safari-gradient text-primary-foreground">Sign In</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const totalPrice = pkg ? pkg.price * form.guests : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("bookings").insert({
      user_id: user.id,
      package_id: null,
      full_name: form.fullName,
      email: form.email,
      phone: form.phone,
      travel_date: form.travelDate,
      number_of_guests: form.guests,
      special_requests: form.specialRequests,
      total_price: totalPrice,
      status: "pending",
    });
    setLoading(false);
    if (error) { toast.error("Booking failed: " + error.message); return; }
    toast.success("Booking submitted! We'll confirm within 24 hours.");
    navigate("/bookings");
  };

  return (
    <div className="min-h-screen"><Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6"><ArrowLeft className="w-4 h-4 mr-2" /> Back</Button>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-2xl">Book Your Adventure</CardTitle>
                {pkg && <p className="text-muted-foreground">{pkg.name} · {pkg.days} days · ${pkg.price}/person</p>}
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Label>Full Name</Label><Input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required /></div>
                    <div><Label>Email</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Label>Phone</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
                    <div><Label>Travel Date</Label><Input type="date" value={form.travelDate} onChange={(e) => setForm({ ...form, travelDate: e.target.value })} required min={new Date().toISOString().split("T")[0]} /></div>
                  </div>
                  <div>
                    <Label>Number of Guests</Label>
                    <Input type="number" min={1} max={20} value={form.guests} onChange={(e) => setForm({ ...form, guests: parseInt(e.target.value) || 1 })} required />
                  </div>
                  <div><Label>Special Requests</Label><Textarea value={form.specialRequests} onChange={(e) => setForm({ ...form, specialRequests: e.target.value })} placeholder="Dietary requirements, accessibility needs, etc." /></div>
                  {pkg && (
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex justify-between text-sm"><span>Package price</span><span>${pkg.price} × {form.guests}</span></div>
                      <div className="flex justify-between font-bold text-lg mt-2 border-t pt-2"><span>Total</span><span className="text-primary">${totalPrice.toLocaleString()}</span></div>
                    </div>
                  )}
                  <Button type="submit" className="w-full bg-safari-gradient text-primary-foreground hover:opacity-90" disabled={loading}>
                    {loading ? "Submitting..." : "Confirm Booking"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingPage;
