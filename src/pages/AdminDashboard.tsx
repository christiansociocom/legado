import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users, LogOut, AlertCircle, Loader, Trash2, ArrowLeft,
  BookOpen, Mail, Star, RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface UserRow {
  user_id: string;
  email: string;
  full_name: string | null;
  role: string;
  created_at: string;
}

interface Booking {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  travel_date: string;
  number_of_guests: number;
  status: string;
  total_price: number;
  created_at: string;
}

interface Review {
  id: string;
  reviewer_name: string | null;
  rating: number;
  comment: string | null;
  is_approved: boolean;
  created_at: string;
}

interface ContactMessage {
  id: string;
  full_name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

type Tab = "bookings" | "users" | "reviews" | "messages";

const STATUS_COLORS: Record<string, string> = {
  confirmed: "bg-green-100 text-green-800",
  pending:   "bg-yellow-100 text-yellow-800",
  cancelled: "bg-red-100 text-red-800",
  new:       "bg-blue-100 text-blue-800",
  read:      "bg-gray-100 text-gray-700",
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin, logout, loading: authLoading } = useAuth();

  const [users, setUsers]         = useState<UserRow[]>([]);
  const [bookings, setBookings]   = useState<Booking[]>([]);
  const [reviews, setReviews]     = useState<Review[]>([]);
  const [messages, setMessages]   = useState<ContactMessage[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("bookings");

  useEffect(() => {
    if (authLoading) return;
    if (!isAdmin) { navigate("/"); return; }
    fetchData();
    // eslint-disable-next-line
  }, [isAdmin, authLoading]);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const [
        { data: bookingsData,  error: bookingsErr  },
        { data: usersData,     error: usersErr     },
        { data: reviewsData,   error: reviewsErr   },
        { data: messagesData,  error: messagesErr  },
      ] = await Promise.all([
        supabase.from("bookings").select("*").order("created_at", { ascending: false }),
        supabase.rpc("get_all_users_for_admin"),
        supabase.from("reviews").select("*").order("created_at", { ascending: false }),
        supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
      ]);

      if (bookingsErr) throw bookingsErr;
      if (usersErr)    throw usersErr;
      if (reviewsErr)  throw reviewsErr;
      if (messagesErr) throw messagesErr;

      setBookings(bookingsData  || []);
      setUsers(usersData        || []);
      setReviews(reviewsData    || []);
      setMessages(messagesData  || []);
    } catch (err: any) {
      console.error("Admin fetch error:", err);
      setError(`Failed to load data: ${err.message}`);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBooking = async (id: string) => {
    if (!confirm("Delete this booking? This cannot be undone.")) return;
    const { error } = await supabase.from("bookings").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    setBookings((prev) => prev.filter((b) => b.id !== id));
    toast.success("Booking deleted");
  };

  const handleUpdateBookingStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
    if (error) { toast.error(error.message); return; }
    setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status } : b));
    toast.success("Status updated");
  };

  const handleApproveReview = async (id: string, approve: boolean) => {
    const { error } = await supabase.from("reviews").update({ is_approved: approve }).eq("id", id);
    if (error) { toast.error(error.message); return; }
    setReviews((prev) => prev.map((r) => r.id === id ? { ...r, is_approved: approve } : r));
    toast.success(approve ? "Review approved" : "Review hidden");
  };

  const handleDeleteReview = async (id: string) => {
    if (!confirm("Delete this review?")) return;
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    setReviews((prev) => prev.filter((r) => r.id !== id));
    toast.success("Review deleted");
  };

  const handleMarkMessageRead = async (id: string) => {
    const { error } = await supabase.from("contact_messages").update({ status: "read" }).eq("id", id);
    if (error) { toast.error(error.message); return; }
    setMessages((prev) => prev.map((m) => m.id === id ? { ...m, status: "read" } : m));
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    setMessages((prev) => prev.filter((m) => m.id !== id));
    toast.success("Message deleted");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 text-center px-4 pb-16">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="font-display text-2xl mb-4">Access Denied</h2>
          <p className="text-muted-foreground mb-6">You don't have permission to access this page.</p>
          <Button onClick={() => navigate("/")} className="bg-safari-gradient text-primary-foreground">Go Home</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const tabs: { key: Tab; label: string; count: number; icon: React.ReactNode }[] = [
    { key: "bookings", label: "Bookings",  count: bookings.length,  icon: <BookOpen className="w-4 h-4" /> },
    { key: "users",    label: "Users",     count: users.length,     icon: <Users className="w-4 h-4" /> },
    { key: "reviews",  label: "Reviews",   count: reviews.filter(r => !r.is_approved).length, icon: <Star className="w-4 h-4" /> },
    { key: "messages", label: "Messages",  count: messages.filter(m => m.status === "new").length, icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <div>
                  <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>
                  <p className="text-muted-foreground text-sm">Logged in as {user?.email}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}>
                  <RefreshCw className={`w-4 h-4 mr-1 ${loading ? "animate-spin" : ""}`} /> Refresh
                </Button>
                <Button variant="ghost" size="sm" onClick={async () => { await logout(); navigate("/"); }} className="text-red-600 hover:text-red-700">
                  <LogOut className="w-4 h-4 mr-2" /> Sign Out
                </Button>
              </div>
            </div>

            {/* Error banner */}
            {error && (
              <Card className="mb-6 border-red-200 bg-red-50">
                <CardContent className="p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-700 text-sm font-medium">{error}</p>
                    <button onClick={fetchData} className="text-red-600 text-xs underline mt-1">Try again</button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b flex-wrap">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${
                    activeTab === tab.key
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                  {tab.count > 0 && (
                    <span className={`text-xs rounded-full px-1.5 py-0.5 font-semibold ${
                      activeTab === tab.key ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="flex justify-center py-16">
                <Loader className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                {/* ── BOOKINGS ── */}
                {activeTab === "bookings" && (
                  <Card>
                    <CardHeader><CardTitle>Bookings ({bookings.length})</CardTitle></CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b text-left">
                              <th className="py-2 px-2">Guest</th>
                              <th className="py-2 px-2">Email</th>
                              <th className="py-2 px-2">Travel Date</th>
                              <th className="py-2 px-2">Guests</th>
                              <th className="py-2 px-2">Status</th>
                              <th className="py-2 px-2">Amount</th>
                              <th className="py-2 px-2">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {bookings.map((b) => (
                              <tr key={b.id} className="border-b hover:bg-muted/50">
                                <td className="py-3 px-2 font-medium">{b.full_name}</td>
                                <td className="py-3 px-2 text-muted-foreground">{b.email}</td>
                                <td className="py-3 px-2">{new Date(b.travel_date).toLocaleDateString()}</td>
                                <td className="py-3 px-2">{b.number_of_guests}</td>
                                <td className="py-3 px-2">
                                  <select
                                    value={b.status}
                                    onChange={(e) => handleUpdateBookingStatus(b.id, e.target.value)}
                                    className={`text-xs font-semibold px-2 py-1 rounded border-0 cursor-pointer ${STATUS_COLORS[b.status] || "bg-gray-100"}`}
                                  >
                                    <option value="pending">pending</option>
                                    <option value="confirmed">confirmed</option>
                                    <option value="cancelled">cancelled</option>
                                  </select>
                                </td>
                                <td className="py-3 px-2 font-medium">${b.total_price}</td>
                                <td className="py-3 px-2">
                                  <Button variant="ghost" size="sm" onClick={() => handleDeleteBooking(b.id)} className="text-red-600 hover:text-red-700">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {bookings.length === 0 && <p className="text-center py-8 text-muted-foreground">No bookings yet</p>}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* ── USERS ── */}
                {activeTab === "users" && (
                  <Card>
                    <CardHeader><CardTitle>Registered Users ({users.length})</CardTitle></CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b text-left">
                              <th className="py-2 px-2">Name</th>
                              <th className="py-2 px-2">Email</th>
                              <th className="py-2 px-2">Role</th>
                              <th className="py-2 px-2">Joined</th>
                            </tr>
                          </thead>
                          <tbody>
                            {users.map((u) => (
                              <tr key={u.user_id} className="border-b hover:bg-muted/50">
                                <td className="py-3 px-2 font-medium">{u.full_name || "—"}</td>
                                <td className="py-3 px-2 text-muted-foreground">{u.email}</td>
                                <td className="py-3 px-2">
                                  <span className={`text-xs font-semibold px-2 py-1 rounded ${u.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-700"}`}>
                                    {u.role}
                                  </span>
                                </td>
                                <td className="py-3 px-2 text-muted-foreground">{new Date(u.created_at).toLocaleDateString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {users.length === 0 && <p className="text-center py-8 text-muted-foreground">No users found</p>}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* ── REVIEWS ── */}
                {activeTab === "reviews" && (
                  <Card>
                    <CardHeader><CardTitle>Reviews ({reviews.length})</CardTitle></CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {reviews.map((r) => (
                          <div key={r.id} className="border rounded-lg p-4 flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-sm">{r.reviewer_name || "Anonymous"}</span>
                                <div className="flex gap-0.5">
                                  {Array.from({ length: r.rating }).map((_, i) => (
                                    <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                  ))}
                                </div>
                                <span className={`text-xs px-2 py-0.5 rounded font-semibold ${r.is_approved ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                                  {r.is_approved ? "approved" : "pending"}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2">{r.comment}</p>
                              <p className="text-xs text-muted-foreground mt-1">{new Date(r.created_at).toLocaleDateString()}</p>
                            </div>
                            <div className="flex gap-1 shrink-0">
                              <Button variant="outline" size="sm" onClick={() => handleApproveReview(r.id, !r.is_approved)}
                                className={r.is_approved ? "text-yellow-700" : "text-green-700"}>
                                {r.is_approved ? "Hide" : "Approve"}
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteReview(r.id)} className="text-red-600 hover:text-red-700">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        {reviews.length === 0 && <p className="text-center py-8 text-muted-foreground">No reviews yet</p>}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* ── MESSAGES ── */}
                {activeTab === "messages" && (
                  <Card>
                    <CardHeader><CardTitle>Contact Messages ({messages.length})</CardTitle></CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {messages.map((m) => (
                          <div key={m.id} className={`border rounded-lg p-4 ${m.status === "new" ? "border-blue-200 bg-blue-50/40" : ""}`}>
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-sm">{m.full_name}</span>
                                  <span className="text-muted-foreground text-sm">·</span>
                                  <span className="text-sm text-muted-foreground">{m.email}</span>
                                  <span className={`text-xs px-2 py-0.5 rounded font-semibold ${STATUS_COLORS[m.status] || "bg-gray-100"}`}>
                                    {m.status}
                                  </span>
                                </div>
                                <p className="text-sm font-medium mb-1">{m.subject}</p>
                                <p className="text-sm text-muted-foreground">{m.message}</p>
                                <p className="text-xs text-muted-foreground mt-1">{new Date(m.created_at).toLocaleDateString()}</p>
                              </div>
                              <div className="flex gap-1 shrink-0">
                                {m.status === "new" && (
                                  <Button variant="outline" size="sm" onClick={() => handleMarkMessageRead(m.id)}>
                                    Mark read
                                  </Button>
                                )}
                                <Button variant="ghost" size="sm" onClick={() => handleDeleteMessage(m.id)} className="text-red-600 hover:text-red-700">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                        {messages.length === 0 && <p className="text-center py-8 text-muted-foreground">No messages yet</p>}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
