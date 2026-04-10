// 3. Create src/pages/GalleryPage.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const images = [
    { id: 1, category: "safari", title: "Lions in Serengeti", src: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=500&h=400&fit=crop" },
    { id: 2, category: "wildlife", title: "African Elephant", src: "https://plus.unsplash.com/premium_photo-1661810056990-57be781caa2d?w=500&h=400&fit=crop" },
    { id: 3, category: "destinations", title: "Ngorongoro Crater", src: "https://images.unsplash.com/photo-1741850820302-64d2d4b9370e?w=500&h=400&fit=crop" },
    { id: 4, category: "beach", title: "Zanzibar Sunset", src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=400&fit=crop" },
    { id: 5, category: "safari", title: "Giraffes", src: "https://images.unsplash.com/photo-1700221824708-012001e5ccb8?w=500&h=400&fit=crop" },
    { id: 6, category: "wildlife", title: "Leopard", src: "https://plus.unsplash.com/premium_photo-1661837277372-1cd072f18ae1?w=500&h=400&fit=crop" },
  ];

  const categories = ["all", ...Array.from(new Set(images.map((img) => img.category)))];
  const filtered = selectedCategory === "all" ? images : images.filter((img) => img.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <p className="text-primary uppercase tracking-[0.2em] text-sm font-medium mb-2">Visual Stories</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Photo Gallery</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">Explore stunning photography from our safari adventures across Tanzania.</p>

            <div className="flex justify-center gap-2 flex-wrap">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                  className={selectedCategory === cat ? "bg-safari-gradient text-primary-foreground" : ""}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </Button>
              ))}
            </div>
          </motion.div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((image, index) => (
              <motion.div
                key={image.id}
                layoutId={`img-${image.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer bg-muted"
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-white font-semibold">{image.title}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No images found in this category.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GalleryPage;
