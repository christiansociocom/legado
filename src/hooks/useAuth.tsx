import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  loading: true,
  logout: async () => {},
});

const checkAdminRole = async (userId: string): Promise<boolean> => {
  try {
    const { data } = await supabase.rpc("has_role", {
      _user_id: userId,
      _role: "admin",
    });
    return !!data;
  } catch (e) {
    console.warn("Error checking admin role:", e);
    return false;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session synchronously — no async work inside the lock
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      setLoading(false);

      // Check admin role outside the lock (deferred)
      if (currentUser) {
        checkAdminRole(currentUser.id).then(setIsAdmin);
      }
    });

    // Listen for auth state changes — keep callback synchronous to avoid lock timeout
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      const currentUser = session?.user ?? null;

      // Update user state synchronously — no async work here
      setUser(currentUser);
      setLoading(false);

      if (event === "SIGNED_OUT") {
        // Clear admin immediately on sign out
        setIsAdmin(false);
        return;
      }

      if (currentUser) {
        // Defer the RPC call outside the auth lock using setTimeout
        setTimeout(() => {
          checkAdminRole(currentUser.id).then(setIsAdmin);
        }, 0);
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    // Optimistically clear state before the network call
    setUser(null);
    setIsAdmin(false);

    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error logging out:", error);
      // State is already cleared above — nothing more to do
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
