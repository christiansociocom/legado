```import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Destinations", to: "/destinations" },
  { label: "Packages", to: "/packages" },
  { label: "Map", to: "/map" },
  { label: "Custom Trip", to: "/custom-package" },
  { label: "About", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-md shadow-md" : "bg-transparent"}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Legado Safaris" className="h-10 md:h-12 object-contain" />
            <span className={`font-display text-lg md:text-2xl font-bold ${scrolled ? "text-foreground" : "text-primary-foreground"}`}>
              Legado Safaris
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-primary ${scrolled ? "text-foreground" : "text-primary-foreground"}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                {isAdmin && (
                  <Button variant="outline" size="sm" onClick={() => navigate("/admin")} className={scrolled ? "" : "border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"}>
                    <Shield className="w-4 h-4 mr-1" /> Admin
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={() => navigate("/bookings")} className={scrolled ? "" : "border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"}>
                  My Bookings
                </Button>
                <Button variant="ghost" size="sm" onClick={handleLogout} className={scrolled ? "" : "text-primary-foreground hover:bg-primary-foreground/10"}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <Button size="sm" onClick={() => navigate("/auth")} className="bg-safari-gradient text-primary-foreground hover:opacity-90">
                Sign In
              </Button>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className={`md:hidden ${scrolled ? "text-foreground" : "text-primary-foreground"}`}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} onClick={() => setIsOpen(false)} className="text-foreground py-2 font-medium">
                  {link.label}
                </Link>
              ))}
              {user ? (
                <>
                  {isAdmin && (
                    <Link to="/admin" onClick={() => setIsOpen(false)} className="text-foreground py-2 font-medium flex items-center gap-2">
                      <Shield className="w-4 h-4" /> Admin Dashboard
                    </Link>
                  )}
                  <Link to="/bookings" onClick={() => setIsOpen(false)} className="text-foreground py-2 font-medium">My Bookings</Link>
                  <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-foreground py-2 font-medium text-left">Sign Out</button>
                </>
              ) : (
                <Button onClick={() => { navigate("/auth"); setIsOpen(false); }} className="bg-safari-gradient text-primary-foreground w-full">Sign In</Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
```
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const navLinks = [
    { label: t("nav.home"), to: "/" },
    { label: t("nav.destinations"), to: "/destinations" },
    { label: t("nav.packages"), to: "/packages" },
    { label: t("nav.map"), to: "/map" },
    { label: t("nav.customTrip"), to: "/custom-package" },
    { label: t("nav.about"), to: "/about" },
    { label: t("nav.blog"), to: "/blog" },
    { label: t("nav.gallery"), to: "/gallery" },
    { label: t("nav.contact"), to: "/contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-md shadow-md" : "bg-transparent"}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Legado Safaris" className="h-10 md:h-12 object-contain" />
            <span className={`font-display text-lg md:text-2xl font-bold ${scrolled ? "text-foreground" : "text-primary-foreground"}`}>
              Legado Safaris
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-primary ${scrolled ? "text-foreground" : "text-primary-foreground"}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher scrolled={scrolled} />
            {user ? (
              <>
                {isAdmin && (
                  <Button variant="outline" size="sm" onClick={() => navigate("/admin")} className={scrolled ? "" : "border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"}>
                    <Shield className="w-4 h-4 mr-1" /> {t("nav.admin")}
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={() => navigate("/bookings")} className={scrolled ? "" : "border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"}>
                  {t("nav.myBookings")}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleLogout} className={scrolled ? "" : "text-primary-foreground hover:bg-primary-foreground/10"}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <Button size="sm" onClick={() => navigate("/auth")} className="bg-safari-gradient text-primary-foreground hover:opacity-90">
                {t("nav.signIn")}
              </Button>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className={`md:hidden ${scrolled ? "text-foreground" : "text-primary-foreground"}`}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} onClick={() => setIsOpen(false)} className="text-foreground py-2 font-medium">
                  {link.label}
                </Link>
              ))}
              <div className="py-2 border-t">
                <LanguageSwitcher scrolled={true} />
              </div>
              {user ? (
                <>
                  {isAdmin && (
                    <Link to="/admin" onClick={() => setIsOpen(false)} className="text-foreground py-2 font-medium flex items-center gap-2">
                      <Shield className="w-4 h-4" /> {t("nav.admin")}
                    </Link>
                  )}
                  <Link to="/bookings" onClick={() => setIsOpen(false)} className="text-foreground py-2 font-medium">{t("nav.myBookings")}</Link>
                  <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-foreground py-2 font-medium text-left">{t("nav.signOut")}</button>
                </>
              ) : (
                <Button onClick={() => { navigate("/auth"); setIsOpen(false); }} className="bg-safari-gradient text-primary-foreground w-full">{t("nav.signIn")}</Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
