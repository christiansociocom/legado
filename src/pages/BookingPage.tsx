// 4. Fix BookingPage.tsx - Remove forced login
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Users, ArrowLeft, AlertCircle } from "lucide-react";
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
  const [formError, setFormError] = useState("");

  const validateForm = () => {
    if (!form.fullName.trim()) {
      setFormError("Full name is required");
      return false;
    }
    if (!form.email.trim()) {
      setFormError("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setFormError("Please enter a valid email");
      return false;
    }
    if (!form.travelDate) {
      setFormError("Travel date is required");
      return false;
    }
    setFormError("");
    return true;
  };

  const totalPrice = pkg ? pkg.price * form.guests : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setFormError("");

    try {
      const { error } = await supabase.from("bookings").insert([
        {
          user_id: user?.id || null,
          package_id: null,
          full_name: form.fullName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          travel_date: form.travelDate,
          number_of_guests: form.guests,
          special_requests: form.specialRequests.trim(),
          total_price: totalPrice,
          status: "pending",
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        setFormError(`Booking failed: ${error.message}`);
        toast.error("Booking failed. Please try again.");
        return;
      }

      toast.success("Booking submitted! We'll confirm within 24 hours.");
      setTimeout(() => navigate("/"), 2000);
    } catch (err: any) {
      console.error("Error submitting booking:", err);
      setFormError("An unexpected error occurred. Please try again.");
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (!pkg) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 text-center px-4 pb-16">
          <h2 className="font-display text-2xl mb-4">Package not found</h2>
          <Button onClick={() => navigate("/packages")} className="bg-safari-gradient text-primary-foreground">
            View All Packages
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-2xl">Book Your Adventure</CardTitle>
                {pkg && (
                  <p className="text-muted-foreground">
                    {pkg.name} · {pkg.days} days · ${pkg.price}/person
                  </p>
                )}
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {formError && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                      <AlertCircle className="w-5 h-5" />
                      <span className="text-sm">{formError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Full Name *</Label>
                      <Input
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        required
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <Label>Email *</Label>
                      <Input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Phone</Label>
                      <Input
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <Label>Travel Date *</Label>
                      <Input
                        type="date"
                        value={form.travelDate}
                        onChange={(e) => setForm({ ...form, travelDate: e.target.value })}
                        required
                        min={new Date().toISOString().split("T")[0]}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Number of Guests</Label>
                    <Input
                      type="number"
                      min={1}
                      max={20}
                      value={form.guests}
                      onChange={(e) => setForm({ ...form, guests: parseInt(e.target.value) || 1 })}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <Label>Special Requests</Label>
                    <Textarea
                      value={form.specialRequests}
                      onChange={(e) => setForm({ ...form, specialRequests: e.target.value })}
                      placeholder="Dietary requirements, accessibility needs, etc..."
                      disabled={loading}
                    />
                  </div>

                  {pkg && (
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Package price</span>
                        <span>${pkg.price} × {form.guests}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t pt-2">
                        <span>Total</span>
                        <span className="text-primary">${totalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-safari-gradient text-primary-foreground hover:opacity-90"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="mr-2 animate-spin">⏳</span>
                        Processing...
                      </>
                    ) : (
                      "Confirm Booking"
                    )}
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
