import { useLanguage, Language } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Globe } from "lucide-react";

const languages: { code: Language; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

interface LanguageSwitcherProps {
  scrolled?: boolean;
}

const LanguageSwitcher = ({ scrolled = false }: LanguageSwitcherProps) => {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  const current = languages.find((l) => l.code === language)!;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 text-sm font-medium px-2 py-1 rounded-md transition-colors ${
          scrolled
            ? "text-foreground hover:bg-muted"
            : "text-primary-foreground hover:bg-primary-foreground/10"
        }`}
        aria-label="Switch language"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{current.flag} {current.label}</span>
        <span className="sm:hidden">{current.flag}</span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-1 z-50 bg-background border border-border rounded-lg shadow-lg overflow-hidden min-w-[140px]"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors text-left ${
                    language === lang.code ? "bg-accent text-accent-foreground font-medium" : "text-foreground"
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                  {language === lang.code && (
                    <span className="ml-auto text-primary text-xs">✓</span>
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
