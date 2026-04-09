import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const statusColor: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  completed: "bg-blue-100 text-blue-800",
};

const MyBookingsPage = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    supabase.from("bookings").select("*").eq("user_id", user.id).order("created_at", { ascending: false })
      .then(({ data }) => { setBookings(data || []); setLoading(false); });
  }, [user]);

  if (!authLoading && !user) {
    return (
      <div className="min-h-screen"><Navbar />
        <div className="pt-32 text-center"><h2 className="font-display text-2xl mb-4">Sign in to view bookings</h2>
        <Button onClick={() => navigate("/auth")} className="bg-safari-gradient text-primary-foreground">Sign In</Button></div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen"><Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-3xl font-bold mb-8">My Bookings</h1>
            {loading ? <p className="text-muted-foreground">Loading...</p> : bookings.length === 0 ? (
              <div className="text-center py-12"><p className="text-muted-foreground mb-4">No bookings yet</p>
              <Button onClick={() => navigate("/packages")} className="bg-safari-gradient text-primary-foreground">Browse Packages</Button></div>
            ) : (
              <div className="space-y-4">
                {bookings.map((b) => (
                  <Card key={b.id}>
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between flex-wrap gap-2">
                        <div>
                          <h3 className="font-semibold">{b.full_name}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(b.travel_date).toLocaleDateString()}</span>
                            <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {b.number_of_guests} guest(s)</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={statusColor[b.status] || ""}>{b.status}</Badge>
                          {b.total_price && <p className="text-sm font-bold mt-1">${b.total_price}</p>}
                        </div>
                      </div>
                      {b.special_requests && <p className="text-sm text-muted-foreground mt-2 italic">"{b.special_requests}"</p>}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyBookingsPage;
