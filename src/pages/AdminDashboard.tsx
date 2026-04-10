// 7. Create/Update AdminDashboard.tsx - Full admin functionality
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, LogOut, AlertCircle, Loader, Trash2, Eye, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface UserData {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
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

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin, logout, loading: authLoading } = useAuth();
  const [users, setUsers] = useState<UserData[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"users" | "bookings">("bookings");

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate("/");
      return;
    }

    if (authLoading) return;

    fetchData();
  }, [isAdmin, authLoading, navigate]);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      // Fetch bookings
      const { data: bookingsData, error: bookingsError } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (bookingsError) throw bookingsError;
      setBookings(bookingsData || []);

      // Fetch users from auth
      const { data: { users: authUsers }, error: usersError } = await supabase.auth.admin.listUsers();
      
      if (usersError) throw usersError;
      setUsers(authUsers || []);
    } catch (err: any) {
      console.error("Error fetching data:", err);
      setError(`Failed to load data: ${err.message}`);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      return;
    }

    try {
      const { error } = await supabase.auth.admin.deleteUser(userId);
      if (error) throw error;
      setUsers(users.filter((u) => u.id !== userId));
      toast.success("User deleted successfully");
    } catch (err: any) {
      toast.error(`Error deleting user: ${err.message}`);
    }
  };

  const handleDeleteBooking = async (bookingId: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) {
      return;
    }

    try {
      const { error } = await supabase.from("bookings").delete().eq("id", bookingId);
      if (error) throw error;
      setBookings(bookings.filter((b) => b.id !== bookingId));
      toast.success("Booking deleted successfully");
    } catch (err: any) {
      toast.error(`Error deleting booking: ${err.message}`);
    }
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
          <Button onClick={() => navigate("/")} className="bg-safari-gradient text-primary-foreground">
            Go Home
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
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="mr-2">
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
                <div>
                  <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>
                  <p className="text-muted-foreground text-sm">Manage bookings, users, and site data</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="text-red-600 hover:text-red-700"
              >
                <LogOut className="w-4 h-4 mr-2" /> Sign Out
              </Button>
            </div>

            {error && (
              <Card className="mb-6 border-red-200 bg-red-50">
                <CardContent className="p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <p className="text-red-700 text-sm">{error}</p>
                </CardContent>
              </Card>
            )}

            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b">
              <Button
                variant={activeTab === "bookings" ? "default" : "ghost"}
                onClick={() => setActiveTab("bookings")}
                className={activeTab === "bookings" ? "bg-safari-gradient text-primary-foreground" : ""}
              >
                Bookings ({bookings.length})
              </Button>
              <Button
                variant={activeTab === "users" ? "default" : "ghost"}
                onClick={() => setActiveTab("users")}
                className={activeTab === "users" ? "bg-safari-gradient text-primary-foreground" : ""}
              >
                <Users className="w-4 h-4 mr-2" /> Users ({users.length})
              </Button>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <Loader className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : activeTab === "bookings" ? (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-2">Guest Name</th>
                          <th className="text-left py-2 px-2">Email</th>
                          <th className="text-left py-2 px-2">Travel Date</th>
                          <th className="text-left py-2 px-2">Guests</th>
                          <th className="text-left py-2 px-2">Status</th>
                          <th className="text-left py-2 px-2">Amount</th>
                          <th className="text-left py-2 px-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.map((booking) => (
                          <tr key={booking.id} className="border-b hover:bg-muted/50 transition-colors">
                            <td className="py-3 px-2 font-medium">{booking.full_name}</td>
                            <td className="py-3 px-2 text-muted-foreground">{booking.email}</td>
                            <td className="py-3 px-2">{new Date(booking.travel_date).toLocaleDateString()}</td>
                            <td className="py-3 px-2">{booking.number_of_guests}</td>
                            <td className="py-3 px-2">
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                booking.status === "confirmed" ? "bg-green-100 text-green-800" :
                                booking.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                                "bg-red-100 text-red-800"
                              }`}>
                                {booking.status}
                              </span>
                            </td>
                            <td className="py-3 px-2 font-medium">${booking.total_price}</td>
                            <td className="py-3 px-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteBooking(booking.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {bookings.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No bookings found
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Registered Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-2">Email</th>
                          <th className="text-left py-2 px-2">Joined</th>
                          <th className="text-left py-2 px-2">Last Sign In</th>
                          <th className="text-left py-2 px-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((u) => (
                          <tr key={u.id} className="border-b hover:bg-muted/50 transition-colors">
                            <td className="py-3 px-2 font-medium">{u.email}</td>
                            <td className="py-3 px-2 text-muted-foreground">
                              {new Date(u.created_at).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-2 text-muted-foreground">
                              {u.last_sign_in_at ? new Date(u.last_sign_in_at).toLocaleDateString() : "Never"}
                            </td>
                            <td className="py-3 px-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteUser(u.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {users.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No users found
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
