import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Package, MapPin, Calendar, Star, Mail, BarChart3, Settings, Check, X, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";

const AdminDashboard = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<any[]>([]);
  const [customRequests, setCustomRequests] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [contactMessages, setContactMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user || !isAdmin) { navigate("/"); return; }
    loadData();
  }, [user, isAdmin, authLoading]);

  const loadData = async () => {
    const [b, c, s, r, cm] = await Promise.all([
      supabase.from("bookings").select("*").order("created_at", { ascending: false }),
      supabase.from("custom_package_requests").select("*").order("created_at", { ascending: false }),
      supabase.from("newsletter_subscribers").select("*").order("created_at", { ascending: false }),
      supabase.from("reviews").select("*").order("created_at", { ascending: false }),
      supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
    ]);
    setBookings(b.data || []);
    setCustomRequests(c.data || []);
    setSubscribers(s.data || []);
    setReviews(r.data || []);
    setContactMessages(cm.data || []);
    setLoading(false);
  };

  const updateBookingStatus = async (id: string, status: string) => {
    await supabase.from("bookings").update({ status }).eq("id", id);
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  const updateCustomStatus = async (id: string, status: string) => {
    await supabase.from("custom_package_requests").update({ status }).eq("id", id);
    setCustomRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const approveReview = async (id: string, approved: boolean) => {
    await supabase.from("reviews").update({ is_approved: approved }).eq("id", id);
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, is_approved: approved } : r)));
  };

  if (authLoading || loading) return <div className="min-h-screen"><Navbar /><div className="pt-32 text-center text-muted-foreground">Loading...</div></div>;

  const stats = [
    { label: "Total Bookings", value: bookings.length, icon: Calendar, color: "text-safari-amber" },
    { label: "Custom Requests", value: customRequests.length, icon: Package, color: "text-safari-green" },
    { label: "Subscribers", value: subscribers.length, icon: Mail, color: "text-safari-sky" },
    { label: "Reviews", value: reviews.length, icon: Star, color: "text-safari-gold" },
  ];

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = { pending: "bg-yellow-100 text-yellow-800", confirmed: "bg-green-100 text-green-800", cancelled: "bg-red-100 text-red-800", completed: "bg-blue-100 text-blue-800", responded: "bg-purple-100 text-purple-800" };
    return <Badge className={colors[status] || ""}>{status}</Badge>;
  };

  return (
    <div className="min-h-screen bg-muted"><Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-3xl font-bold mb-8">Admin Dashboard</h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {stats.map((s) => (
                <Card key={s.label}>
                  <CardContent className="p-4 flex items-center gap-3">
                    <s.icon className={`w-8 h-8 ${s.color}`} />
                    <div><p className="text-2xl font-bold">{s.value}</p><p className="text-xs text-muted-foreground">{s.label}</p></div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Tabs defaultValue="bookings">
              <TabsList className="mb-6">
                <TabsTrigger value="bookings">Bookings</TabsTrigger>
                <TabsTrigger value="custom">Custom Requests</TabsTrigger>
                <TabsTrigger value="contacts">Messages</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
              </TabsList>

              <TabsContent value="bookings">
                <div className="space-y-3">
                  {bookings.map((b) => (
                    <Card key={b.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between flex-wrap gap-2">
                          <div>
                            <p className="font-semibold">{b.full_name}</p>
                            <p className="text-sm text-muted-foreground">{b.email} · {new Date(b.travel_date).toLocaleDateString()} · {b.number_of_guests} guests</p>
                            {b.special_requests && <p className="text-xs text-muted-foreground italic mt-1">"{b.special_requests}"</p>}
                          </div>
                          <div className="flex items-center gap-2">
                            {b.total_price && <span className="font-bold">${b.total_price}</span>}
                            {statusBadge(b.status)}
                            {b.status === "pending" && (
                              <>
                                <Button size="sm" variant="outline" onClick={() => updateBookingStatus(b.id, "confirmed")} className="text-green-600"><Check className="w-4 h-4" /></Button>
                                <Button size="sm" variant="outline" onClick={() => updateBookingStatus(b.id, "cancelled")} className="text-red-600"><X className="w-4 h-4" /></Button>
                              </>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {bookings.length === 0 && <p className="text-muted-foreground text-center py-8">No bookings yet</p>}
                </div>
              </TabsContent>

              <TabsContent value="custom">
                <div className="space-y-3">
                  {customRequests.map((r) => (
                    <Card key={r.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between flex-wrap gap-2">
                          <div>
                            <p className="font-semibold">{r.full_name}</p>
                            <p className="text-sm text-muted-foreground">{r.email} · {r.duration_days} days · {r.number_of_guests} guests · {r.budget_range}</p>
                            <p className="text-xs text-muted-foreground mt-1">Activities: {r.activities?.join(", ") || "None specified"}</p>
                            {r.special_requests && <p className="text-xs italic mt-1">"{r.special_requests}"</p>}
                          </div>
                          <div className="flex items-center gap-2">
                            {statusBadge(r.status)}
                            {r.status === "pending" && (
                              <Button size="sm" variant="outline" onClick={() => updateCustomStatus(r.id, "responded")}>Mark Responded</Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {customRequests.length === 0 && <p className="text-muted-foreground text-center py-8">No custom requests yet</p>}
                </div>
              </TabsContent>


              <TabsContent value="contacts">
                <div className="space-y-3">
                  {contactMessages.map((m) => (
                    <Card key={m.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between flex-wrap gap-2">
                          <div>
                            <p className="font-semibold">{m.full_name}</p>
                            <p className="text-sm text-muted-foreground">{m.email} · {m.subject}</p>
                            <p className="text-sm mt-1">{m.message}</p>
                          </div>
                          <span className="text-xs text-muted-foreground">{new Date(m.created_at).toLocaleDateString()}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {contactMessages.length === 0 && <p className="text-muted-foreground text-center py-8">No messages yet</p>}
                </div>
              </TabsContent>

              <TabsContent value="reviews">
                <div className="space-y-3">
                  {reviews.map((r) => (
                    <Card key={r.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between flex-wrap gap-2">
                          <div>
                            <p className="font-semibold">{r.reviewer_name || "Anonymous"}</p>
                            <div className="flex gap-1 my-1">{Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="w-4 h-4 text-safari-gold fill-safari-gold" />)}</div>
                            <p className="text-sm text-muted-foreground">{r.comment}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={r.is_approved ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                              {r.is_approved ? "Approved" : "Pending"}
                            </Badge>
                            <Button size="sm" variant="outline" onClick={() => approveReview(r.id, !r.is_approved)}>
                              {r.is_approved ? "Unapprove" : "Approve"}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {reviews.length === 0 && <p className="text-muted-foreground text-center py-8">No reviews yet</p>}
                </div>
              </TabsContent>

              <TabsContent value="subscribers">
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      {subscribers.map((s) => (
                        <div key={s.id} className="flex items-center justify-between py-2 border-b last:border-0">
                          <span className="text-sm">{s.email}</span>
                          <span className="text-xs text-muted-foreground">{new Date(s.created_at).toLocaleDateString()}</span>
                        </div>
                      ))}
                      {subscribers.length === 0 && <p className="text-muted-foreground text-center py-4">No subscribers yet</p>}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
