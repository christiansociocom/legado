import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mountain, Calendar, Users, DollarSign, Tent, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const destinations = [
  "Serengeti National Park", "Ngorongoro Crater", "Mount Kilimanjaro",
  "Zanzibar", "Tarangire National Park", "Lake Manyara",
  "Ruaha National Park", "Selous Game Reserve",
];

const activities = [
  "Game Drives", "Walking Safari", "Hot Air Balloon", "Hiking/Trekking",
  "Snorkeling", "Diving", "Cultural Visit", "Bird Watching",
  "Photography Safari", "Night Safari", "Fishing", "Spice Tour",
];

const CustomPackagePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "",
    selectedDestinations: [] as string[],
    travelDate: "", durationDays: 5, guests: 2,
    budgetRange: "", accommodationType: "",
    selectedActivities: [] as string[],
    specialRequests: "",
  });

  const toggleItem = (arr: string[], item: string) =>
    arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { toast.error("Please sign in first"); navigate("/auth"); return; }
    setLoading(true);
    const { error } = await supabase.from("custom_package_requests").insert({
      user_id: user.id,
      full_name: form.fullName,
      email: form.email,
      phone: form.phone,
      travel_date: form.travelDate || null,
      duration_days: form.durationDays,
      number_of_guests: form.guests,
      budget_range: form.budgetRange,
      accommodation_type: form.accommodationType,
      activities: form.selectedActivities,
      special_requests: form.specialRequests,
      status: "pending",
    });
    setLoading(false);
    if (error) { toast.error("Failed: " + error.message); return; }
    toast.success("Custom trip request submitted! We'll get back to you within 24 hours.");
    navigate("/");
  };

  return (
    <div className="min-h-screen"><Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-center mb-8">
              <Mountain className="w-12 h-12 text-primary mx-auto mb-4" />
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Build Your Dream Trip</h1>
              <p className="text-muted-foreground">Tell us your preferences and we'll craft a custom Tanzania adventure just for you.</p>
            </div>
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Label>Full Name</Label><Input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required /></div>
                    <div><Label>Email</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></div>
                    <div><Label>Phone</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
                    <div><Label>Preferred Travel Date</Label><Input type="date" value={form.travelDate} onChange={(e) => setForm({ ...form, travelDate: e.target.value })} min={new Date().toISOString().split("T")[0]} /></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div><Label>Duration (days)</Label><Input type="number" min={1} max={30} value={form.durationDays} onChange={(e) => setForm({ ...form, durationDays: parseInt(e.target.value) || 1 })} /></div>
                    <div><Label>Number of Guests</Label><Input type="number" min={1} max={30} value={form.guests} onChange={(e) => setForm({ ...form, guests: parseInt(e.target.value) || 1 })} /></div>
                    <div><Label>Budget Range (per person)</Label>
                      <Select value={form.budgetRange} onValueChange={(v) => setForm({ ...form, budgetRange: v })}>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="budget">$500 - $1,500</SelectItem>
                          <SelectItem value="mid-range">$1,500 - $3,000</SelectItem>
                          <SelectItem value="luxury">$3,000 - $6,000</SelectItem>
                          <SelectItem value="ultra-luxury">$6,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div><Label>Accommodation Preference</Label>
                    <Select value={form.accommodationType} onValueChange={(v) => setForm({ ...form, accommodationType: v })}>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="camping">Camping / Tented Camps</SelectItem>
                        <SelectItem value="lodge">Safari Lodges</SelectItem>
                        <SelectItem value="luxury-lodge">Luxury Lodges</SelectItem>
                        <SelectItem value="mixed">Mix of Everything</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="mb-3 block">Destinations (select all that interest you)</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {destinations.map((d) => (
                        <label key={d} className="flex items-center gap-2 text-sm cursor-pointer">
                          <Checkbox checked={form.selectedDestinations.includes(d)} onCheckedChange={() => setForm({ ...form, selectedDestinations: toggleItem(form.selectedDestinations, d) })} />
                          {d}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="mb-3 block">Activities</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {activities.map((a) => (
                        <label key={a} className="flex items-center gap-2 text-sm cursor-pointer">
                          <Checkbox checked={form.selectedActivities.includes(a)} onCheckedChange={() => setForm({ ...form, selectedActivities: toggleItem(form.selectedActivities, a) })} />
                          {a}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div><Label>Special Requests</Label><Textarea value={form.specialRequests} onChange={(e) => setForm({ ...form, specialRequests: e.target.value })} placeholder="Dietary needs, accessibility, special occasions..." /></div>

                  <Button type="submit" className="w-full bg-safari-gradient text-primary-foreground hover:opacity-90 text-lg py-6" disabled={loading}>
                    {loading ? "Submitting..." : "Submit Custom Trip Request"}
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

export default CustomPackagePage;
