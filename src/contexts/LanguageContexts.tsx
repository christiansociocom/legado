import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "es";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.destinations": "Destinations",
    "nav.packages": "Packages",
    "nav.map": "Map",
    "nav.customTrip": "Custom Trip",
    "nav.about": "About",
    "nav.blog": "Blog",
    "nav.gallery": "Gallery",
    "nav.contact": "Contact",
    "nav.signIn": "Sign In",
    "nav.myBookings": "My Bookings",
    "nav.admin": "Admin",
    "nav.signOut": "Sign Out",

    // Hero
    "hero.discover": "Discover the wild beauty",
    "hero.title1": "Explore the Heart of",
    "hero.title2": "Tanzania",
    "hero.subtitle": "From the endless Serengeti plains to the pristine beaches of Zanzibar, experience unforgettable safari adventures and cultural journeys.",
    "hero.explorePackages": "Explore Packages",
    "hero.customTrip": "Build Custom Trip",

    // Destinations Preview
    "dest.explore": "Explore Tanzania",
    "dest.title": "Top Destinations",
    "dest.viewAll": "View All Destinations",
    "dest.country": "Tanzania",

    // Packages Preview
    "pkg.adventures": "Our Adventures",
    "pkg.title": "Popular Packages",
    "pkg.days": "days",
    "pkg.max": "Max",
    "pkg.viewDetails": "View Details",
    "pkg.allPackages": "All Packages",

    // Testimonials
    "test.stories": "Traveler Stories",
    "test.title": "What Our Guests Say",

    // Newsletter
    "news.title": "Stay Updated",
    "news.subtitle": "Get the latest travel tips, exclusive deals, and Tanzania adventure guides.",
    "news.placeholder": "Enter your email",
    "news.subscribe": "Subscribe",

    // Footer
    "footer.desc": "Discover the breathtaking beauty of Tanzania. From the Serengeti plains to Zanzibar beaches, your adventure awaits.",
    "footer.explore": "Explore",
    "footer.destinations": "Destinations",
    "footer.packages": "Tour Packages",
    "footer.map": "Interactive Map",
    "footer.customTrip": "Custom Trip",
    "footer.company": "Company",
    "footer.about": "About Us",
    "footer.contact": "Contact",
    "footer.contactTitle": "Contact",
    "footer.rights": "All rights reserved.",

    // Destinations Page
    "destinations.discover": "Discover",
    "destinations.title": "Tanzania Destinations",
    "destinations.subtitle": "From vast savannas to tropical islands, explore the best of Tanzania's natural wonders and cultural heritage.",
    "destinations.exploreDetails": "Explore Details →",

    // Packages Page
    "packages.adventures": "Adventures",
    "packages.title": "Tour Packages",
    "packages.subtitle": "Choose from curated safari experiences or build your own custom trip.",
    "packages.all": "All",
    "packages.easy": "Easy",
    "packages.moderate": "Moderate",
    "packages.challenging": "Challenging",
    "packages.included": "Included:",
    "packages.bookNow": "Book Now",
    "packages.cantFind": "Can't find the perfect trip?",
    "packages.buildCustom": "Build a Custom Package",

    // About Page
    "about.ourStory": "Our Story",
    "about.title": "About TanzaniaSafari",
    "about.subtitle": "Crafting unforgettable African adventures since 2010",
    "about.journey": "Our Journey",
    "about.mission": "Our Mission",
    "about.missionText": "To share the magic of Tanzania's wild places with the world while empowering local communities and protecting the ecosystems that make these experiences possible — one safari at a time.",
    "about.values": "What We Stand For",
    "about.team": "Meet the Team",

    // Contact Page
    "contact.getInTouch": "Get in Touch",
    "contact.title": "Contact Us",
    "contact.subtitle": "Have questions about our tours? We'd love to hear from you.",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.subject": "Subject",
    "contact.message": "Message",
    "contact.send": "Send Message",
    "contact.sending": "Sending...",

    // Blog Page
    "blog.stories": "Stories & Insights",
    "blog.title": "Travel Blog",
    "blog.subtitle": "Discover stories, tips, and insights about safari adventures in Tanzania.",
    "blog.search": "Search posts...",
    "blog.readMore": "Read More",
    "blog.minRead": "min read",

    // Gallery Page
    "gallery.visual": "Visual Stories",
    "gallery.title": "Photo Gallery",
    "gallery.subtitle": "Explore stunning photography from our safari adventures across Tanzania.",
    "gallery.all": "All",

    // Map Page
    "map.explore": "Explore",
    "map.title": "Interactive Map",
    "map.subtitle": "Discover parks, islands, mountains, and attractions across Tanzania.",

    // Booking Page
    "booking.title": "Book Your Adventure",
    "booking.fullName": "Full Name",
    "booking.email": "Email",
    "booking.phone": "Phone",
    "booking.travelDate": "Travel Date",
    "booking.guests": "Number of Guests",
    "booking.specialRequests": "Special Requests",
    "booking.total": "Total",
    "booking.confirm": "Confirm Booking",
    "booking.processing": "Processing...",

    // Auth Page
    "auth.createAccount": "Create Account",
    "auth.welcomeBack": "Welcome Back",
    "auth.joinUs": "Join us for unforgettable adventures",
    "auth.signInManage": "Sign in to manage your bookings",
    "auth.google": "Continue with Google",
    "auth.fullName": "Full Name",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.signIn": "Sign In",
    "auth.loading": "Loading...",
    "auth.haveAccount": "Already have an account?",
    "auth.noAccount": "Don't have an account?",

    // WhatsApp
    "whatsapp.tooltip": "Chat on WhatsApp",
    "whatsapp.message": "Hello! I'm interested in booking a safari in Tanzania. Can you help me?",
  },
  es: {
    // Navbar
    "nav.home": "Inicio",
    "nav.destinations": "Destinos",
    "nav.packages": "Paquetes",
    "nav.map": "Mapa",
    "nav.customTrip": "Viaje Personalizado",
    "nav.about": "Nosotros",
    "nav.blog": "Blog",
    "nav.gallery": "Galería",
    "nav.contact": "Contacto",
    "nav.signIn": "Iniciar Sesión",
    "nav.myBookings": "Mis Reservas",
    "nav.admin": "Admin",
    "nav.signOut": "Cerrar Sesión",

    // Hero
    "hero.discover": "Descubre la belleza salvaje",
    "hero.title1": "Explora el Corazón de",
    "hero.title2": "Tanzania",
    "hero.subtitle": "Desde las interminables llanuras del Serengeti hasta las prístinas playas de Zanzíbar, vive aventuras de safari inolvidables y viajes culturales.",
    "hero.explorePackages": "Explorar Paquetes",
    "hero.customTrip": "Crear Viaje Personalizado",

    // Destinations Preview
    "dest.explore": "Explorar Tanzania",
    "dest.title": "Principales Destinos",
    "dest.viewAll": "Ver Todos los Destinos",
    "dest.country": "Tanzania",

    // Packages Preview
    "pkg.adventures": "Nuestras Aventuras",
    "pkg.title": "Paquetes Populares",
    "pkg.days": "días",
    "pkg.max": "Máx",
    "pkg.viewDetails": "Ver Detalles",
    "pkg.allPackages": "Todos los Paquetes",

    // Testimonials
    "test.stories": "Historias de Viajeros",
    "test.title": "Lo Que Dicen Nuestros Huéspedes",

    // Newsletter
    "news.title": "Mantente Informado",
    "news.subtitle": "Recibe los últimos consejos de viaje, ofertas exclusivas y guías de aventura en Tanzania.",
    "news.placeholder": "Ingresa tu correo",
    "news.subscribe": "Suscribirse",

    // Footer
    "footer.desc": "Descubre la impresionante belleza de Tanzania. Desde las llanuras del Serengeti hasta las playas de Zanzíbar, tu aventura te espera.",
    "footer.explore": "Explorar",
    "footer.destinations": "Destinos",
    "footer.packages": "Paquetes de Tours",
    "footer.map": "Mapa Interactivo",
    "footer.customTrip": "Viaje Personalizado",
    "footer.company": "Empresa",
    "footer.about": "Sobre Nosotros",
    "footer.contact": "Contacto",
    "footer.contactTitle": "Contacto",
    "footer.rights": "Todos los derechos reservados.",

    // Destinations Page
    "destinations.discover": "Descubrir",
    "destinations.title": "Destinos de Tanzania",
    "destinations.subtitle": "Desde vastas sabanas hasta islas tropicales, explora lo mejor de las maravillas naturales y el patrimonio cultural de Tanzania.",
    "destinations.exploreDetails": "Explorar Detalles →",

    // Packages Page
    "packages.adventures": "Aventuras",
    "packages.title": "Paquetes de Tours",
    "packages.subtitle": "Elige entre experiencias de safari seleccionadas o crea tu propio viaje personalizado.",
    "packages.all": "Todos",
    "packages.easy": "Fácil",
    "packages.moderate": "Moderado",
    "packages.challenging": "Desafiante",
    "packages.included": "Incluido:",
    "packages.bookNow": "Reservar Ahora",
    "packages.cantFind": "¿No encuentras el viaje perfecto?",
    "packages.buildCustom": "Crear Paquete Personalizado",

    // About Page
    "about.ourStory": "Nuestra Historia",
    "about.title": "Sobre TanzaniaSafari",
    "about.subtitle": "Creando aventuras africanas inolvidables desde 2010",
    "about.journey": "Nuestro Camino",
    "about.mission": "Nuestra Misión",
    "about.missionText": "Compartir la magia de los lugares salvajes de Tanzania con el mundo, empoderando a las comunidades locales y protegiendo los ecosistemas — un safari a la vez.",
    "about.values": "Lo Que Defendemos",
    "about.team": "Conoce al Equipo",

    // Contact Page
    "contact.getInTouch": "Ponerse en Contacto",
    "contact.title": "Contáctanos",
    "contact.subtitle": "¿Tienes preguntas sobre nuestros tours? Nos encantaría saber de ti.",
    "contact.name": "Nombre",
    "contact.email": "Correo Electrónico",
    "contact.subject": "Asunto",
    "contact.message": "Mensaje",
    "contact.send": "Enviar Mensaje",
    "contact.sending": "Enviando...",

    // Blog Page
    "blog.stories": "Historias e Ideas",
    "blog.title": "Blog de Viajes",
    "blog.subtitle": "Descubre historias, consejos e ideas sobre aventuras de safari en Tanzania.",
    "blog.search": "Buscar publicaciones...",
    "blog.readMore": "Leer Más",
    "blog.minRead": "min de lectura",

    // Gallery Page
    "gallery.visual": "Historias Visuales",
    "gallery.title": "Galería de Fotos",
    "gallery.subtitle": "Explora fotografías impresionantes de nuestras aventuras de safari en Tanzania.",
    "gallery.all": "Todos",

    // Map Page
    "map.explore": "Explorar",
    "map.title": "Mapa Interactivo",
    "map.subtitle": "Descubre parques, islas, montañas y atracciones en toda Tanzania.",

    // Booking Page
    "booking.title": "Reserva Tu Aventura",
    "booking.fullName": "Nombre Completo",
    "booking.email": "Correo Electrónico",
    "booking.phone": "Teléfono",
    "booking.travelDate": "Fecha de Viaje",
    "booking.guests": "Número de Huéspedes",
    "booking.specialRequests": "Solicitudes Especiales",
    "booking.total": "Total",
    "booking.confirm": "Confirmar Reserva",
    "booking.processing": "Procesando...",

    // Auth Page
    "auth.createAccount": "Crear Cuenta",
    "auth.welcomeBack": "Bienvenido de Nuevo",
    "auth.joinUs": "Únete para aventuras inolvidables",
    "auth.signInManage": "Inicia sesión para gestionar tus reservas",
    "auth.google": "Continuar con Google",
    "auth.fullName": "Nombre Completo",
    "auth.email": "Correo Electrónico",
    "auth.password": "Contraseña",
    "auth.signIn": "Iniciar Sesión",
    "auth.loading": "Cargando...",
    "auth.haveAccount": "¿Ya tienes una cuenta?",
    "auth.noAccount": "¿No tienes una cuenta?",

    // WhatsApp
    "whatsapp.tooltip": "Chatea en WhatsApp",
    "whatsapp.message": "¡Hola! Me interesa reservar un safari en Tanzania. ¿Pueden ayudarme?",
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem("safari-language") as Language) || "en";
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("safari-language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations["en"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
