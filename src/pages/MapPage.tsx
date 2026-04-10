import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const attractions = [
  { name: "Serengeti National Park", lat: -2.333, lng: 34.833, type: "National Park", desc: "Home to the Great Migration" },
  { name: "Ngorongoro Crater", lat: -3.177, lng: 35.588, type: "Conservation Area", desc: "World's largest intact caldera" },
  { name: "Mount Kilimanjaro", lat: -3.076, lng: 37.353, type: "Mountain", desc: "Africa's highest peak (5,895m)" },
  { name: "Zanzibar", lat: -6.165, lng: 39.199, type: "Island", desc: "Tropical paradise & historic Stone Town" },
  { name: "Tarangire National Park", lat: -3.999, lng: 36.012, type: "National Park", desc: "Elephants & ancient baobabs" },
  { name: "Lake Manyara National Park", lat: -3.533, lng: 35.817, type: "National Park", desc: "Tree-climbing lions & flamingos" },
  { name: "Ruaha National Park", lat: -7.767, lng: 34.917, type: "National Park", desc: "Tanzania's largest national park" },
  { name: "Selous Game Reserve", lat: -9.0, lng: 37.4, type: "Game Reserve", desc: "UNESCO World Heritage Site" },
  { name: "Mikumi National Park", lat: -7.4, lng: 37.2, type: "National Park", desc: "Easy access from Dar es Salaam" },
  { name: "Arusha National Park", lat: -3.383, lng: 36.883, type: "National Park", desc: "Gateway to northern circuit" },
  { name: "Lake Victoria", lat: -1.5, lng: 33.0, type: "Natural Wonder", desc: "Africa's largest lake" },
  { name: "Mahale Mountains", lat: -6.1, lng: 29.917, type: "National Park", desc: "Chimpanzee trekking paradise" },
  { name: "Gombe Stream", lat: -4.667, lng: 29.633, type: "National Park", desc: "Jane Goodall's chimp research site" },
  { name: "Pemba Island", lat: -5.2, lng: 39.8, type: "Island", desc: "Pristine diving & snorkeling" },
  { name: "Mafia Island", lat: -7.85, lng: 39.75, type: "Island", desc: "Marine park & whale sharks" },
];

const MapPage = () => {
  const [selectedType, setSelectedType] = useState("all");
  const [isMapReady, setIsMapReady] = useState(false);
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);

  const types = ["all", ...Array.from(new Set(attractions.map((a) => a.type)))];
  const filtered = selectedType === "all" ? attractions : attractions.filter((a) => a.type === selectedType);

  // Initialize Leaflet Icon
  useEffect(() => {
    if (!L.Icon.Default.prototype._getIconUrl) {
      L.Icon.Default.mergeOptions({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
    }
  }, []);

  // Initialize map once
  useEffect(() => {
    if (isMapReady || !mapContainerRef.current) return;

    try {
      const map = L.map(mapContainerRef.current, {
        attributionControl: true,
        zoomControl: true,
      }).setView([-6.0, 35.0], 6);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      mapRef.current = map;
      setIsMapReady(true);
    } catch (error) {
      console.error("Error initializing map:", error);
    }
  }, [isMapReady]);

  // Update markers
  useEffect(() => {
    if (!isMapReady || !mapRef.current) return;

    try {
      // Remove old markers
      markersRef.current.forEach((marker) => {
        if (marker && typeof marker.remove === "function") {
          marker.remove();
        }
      });
      markersRef.current = [];

      // Add new markers
      filtered.forEach((attraction) => {
        try {
          const marker = L.marker([attraction.lat, attraction.lng])
            .addTo(mapRef.current!)
            .bindPopup(
              `<div style="width: 200px;"><strong>${attraction.name}</strong><br/><em>${attraction.type}</em><br/>${attraction.desc}</div>`
            );
          markersRef.current.push(marker);
        } catch (e) {
          console.warn("Error adding marker:", e);
        }
      });
    } catch (error) {
      console.error("Error updating markers:", error);
    }
  }, [filtered, isMapReady]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (mapRef.current) {
        try {
          markersRef.current.forEach((m) => {
            if (m && typeof m.remove === "function") {
              m.remove();
            }
          });
          mapRef.current.remove();
          mapRef.current = null;
        } catch (e) {
          console.warn("Error cleaning up map:", e);
        }
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <p className="text-primary uppercase tracking-[0.2em] text-sm font-medium mb-2">Explore</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Interactive Map</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">Discover parks, islands, mountains, and attractions across Tanzania.</p>
            <div className="flex justify-center gap-2 flex-wrap">
              {types.map((t) => (
                <Button
                  key={t}
                  variant={selectedType === t ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(t)}
                  className={selectedType === t ? "bg-safari-gradient text-primary-foreground" : ""}
                >
                  {t === "all" ? "All" : t}
                </Button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl overflow-hidden shadow-safari border"
          >
            <div ref={mapContainerRef} style={{ height: "70vh", width: "100%" }} />
          </motion.div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((a) => (
              <div key={a.name} className="flex items-center gap-3 p-3 rounded-lg bg-card border hover:shadow-sm transition-shadow">
                <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                <div>
                  <p className="font-semibold text-sm">{a.name}</p>
                  <p className="text-xs text-muted-foreground">{a.type} · {a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MapPage;
