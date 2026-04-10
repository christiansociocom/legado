// 2. Create src/pages/BlogPage.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BlogPage = () => {
  const [posts] = useState([
    {
      id: 1,
      title: "The Great Migration: Nature's Greatest Spectacle",
      excerpt: "Witness millions of wildebeest and zebras in their annual journey across the Serengeti.",
      date: "2026-04-01",
      author: "Sarah Johnson",
      readTime: 5,
      category: "Wildlife",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=500&h=300&fit=crop",
    },
    {
      id: 2,
      title: "Climbing Kilimanjaro: A Journey to the Roof of Africa",
      excerpt: "A complete guide to conquering Africa's tallest peak with tips and preparation advice.",
      date: "2026-03-28",
      author: "Michael Chen",
      readTime: 8,
      category: "Adventure",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
    },
    {
      id: 3,
      title: "Discovering Zanzibar's Hidden Beaches",
      excerpt: "Explore pristine white-sand beaches and turquoise waters off the coast of Tanzania.",
      date: "2026-03-24",
      author: "Emma Wilson",
      readTime: 6,
      category: "Beaches",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=300&fit=crop",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <p className="text-primary uppercase tracking-[0.2em] text-sm font-medium mb-2">Stories & Insights</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Travel Blog</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">Discover stories, tips, and insights about safari adventures in Tanzania.</p>

            <div className="max-w-md mx-auto">
              <Input
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-background"
              />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-safari transition-shadow h-full flex flex-col">
                  <div className="h-48 overflow-hidden bg-muted">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-primary bg-accent px-2 py-1 rounded">{post.category}</span>
                      <span className="text-xs text-muted-foreground">{post.readTime} min read</span>
                    </div>
                    <h3 className="font-display text-lg font-bold mb-2 text-foreground line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 mt-auto">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </div>

                    <Button className="w-full gap-2 bg-safari-gradient text-primary-foreground hover:opacity-90">
                      Read More <ArrowRight className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No posts found matching your search.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;
