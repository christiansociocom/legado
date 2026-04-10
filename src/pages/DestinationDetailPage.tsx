import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, DollarSign, Star, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import imgSerengeti from "@/assets/dest-serengeti.jpg";
import imgNgorongoro from "@/assets/dest-ngorongoro.jpg";
import imgKilimanjaro from "@/assets/dest-kilimanjaro.jpg";
import imgZanzibar from "@/assets/dest-zanzibar.jpg";
import imgTarangire from "@/assets/dest-tarangire.jpg";
import imgManyara from "@/assets/dest-manyara.jpg";

const localImages: Record<string, string> = {
  serengeti: imgSerengeti,
  ngorongoro: imgNgorongoro,
  kilimanjaro: imgKilimanjaro,
  zanzibar: imgZanzibar,
  tarangire: imgTarangire,
  manyara: imgManyara,
};

const fallbackDestinations: Record<string, any> = {
  "serengeti-national-park": {
    name: "Serengeti National Park", slug: "serengeti-national-park", category: "National Park",
    description: "The Serengeti is one of the most famous wildlife sanctuaries in the world. Spanning 14,750 square kilometers, it hosts the spectacular Great Migration — over 1.5 million wildebeest, 200,000 zebras, and 300,000 Thomson's gazelle make a clockwise circuit through the ecosystem each year.\n\nThe park is home to the Big Five (lion, leopard, elephant, buffalo, rhino) along with cheetahs, giraffes, hippos, and over 500 bird species. The endless plains, kopje rock formations, and acacia woodlands create iconic African landscapes.\n\nGame drives here offer unparalleled wildlife viewing, while hot air balloon safaris provide a magical aerial perspective over the migration herds at dawn.",
    highlights: ["Great Migration", "Big Five", "Hot Air Balloons", "Endless Plains", "Kopje Rock Formations"],
    best_time_to_visit: "June - October (dry season for migration viewing), January - February (calving season)",
    entry_fee: "$60 per adult per 24 hours", imageKey: "serengeti",
  },
  "ngorongoro-crater": {
    name: "Ngorongoro Crater", slug: "ngorongoro-crater", category: "Conservation Area",
    description: "The Ngorongoro Crater is the world's largest unbroken volcanic caldera, measuring 19 kilometers across and 600 meters deep. This UNESCO World Heritage Site is often called 'Africa's Garden of Eden' for its extraordinary concentration of wildlife.\n\nApproximately 25,000 large animals live within the crater, including one of Africa's densest populations of black rhino. The crater floor encompasses grasslands, swamps, forests, and Lake Magadi — a shallow alkaline lake that attracts thousands of flamingos.\n\nThe Ngorongoro Conservation Area also supports Maasai pastoralists who graze their cattle alongside wildlife, creating a unique example of human-wildlife coexistence.",
    highlights: ["UNESCO Site", "Crater Floor Safari", "Maasai Culture", "Black Rhino", "Flamingos"],
    best_time_to_visit: "Year-round (dry season June - October for best visibility)",
    entry_fee: "$70 per adult per entry", imageKey: "ngorongoro",
  },
  "mount-kilimanjaro": {
    name: "Mount Kilimanjaro", slug: "mount-kilimanjaro", category: "Mountain",
    description: "Mount Kilimanjaro, standing at 5,895 meters, is Africa's highest peak and the world's tallest free-standing mountain. This dormant stratovolcano offers one of the most accessible high-altitude trekking experiences on Earth — no technical climbing skills required.\n\nThe mountain features five distinct climate zones: cultivated farmland, rainforest, heather and moorland, alpine desert, and arctic summit. Trekkers pass through lush montane forests home to colobus monkeys and exotic birds before emerging onto otherworldly moorland landscapes.\n\nSix official routes lead to Uhuru Peak, each offering unique scenery and challenge levels. The Machame ('Whiskey') route is the most popular, while Lemosho offers the best acclimatization profile.",
    highlights: ["Summit Trek", "5 Climate Zones", "Roof of Africa", "Machame Route", "Glaciers"],
    best_time_to_visit: "January - March, June - October (dry seasons)",
    entry_fee: "$70 per adult per day", imageKey: "kilimanjaro",
  },
  "zanzibar-archipelago": {
    name: "Zanzibar Archipelago", slug: "zanzibar-archipelago", category: "Island",
    description: "The Zanzibar Archipelago, located 25-50 kilometers off Tanzania's coast, is a tropical paradise steeped in centuries of Swahili, Arab, Persian, Indian, and European cultural influences.\n\nStone Town, a UNESCO World Heritage Site, is a labyrinth of narrow alleys, ornate carved doors, bustling bazaars, and historic buildings. The spice plantations that earned Zanzibar the nickname 'Spice Islands' still produce cloves, nutmeg, cinnamon, and black pepper.\n\nBeyond culture, Zanzibar boasts some of East Africa's finest beaches — pristine white sand lapped by crystal-clear turquoise waters. The marine environment supports excellent snorkeling and diving, with coral reefs teeming with tropical fish, dolphins, and sea turtles.",
    highlights: ["Stone Town", "Spice Tours", "Diving & Snorkeling", "White Beaches", "Dolphin Watching"],
    best_time_to_visit: "June - October (dry season), December - February (hot and dry)",
    entry_fee: "Free (individual site fees apply)", imageKey: "zanzibar",
  },
  "tarangire-national-park": {
    name: "Tarangire National Park", slug: "tarangire-national-park", category: "National Park",
    description: "Tarangire National Park, covering 2,850 square kilometers, is famous for its massive elephant herds — some of the largest in Tanzania — and iconic ancient baobab trees that dot the landscape like sentinels.\n\nDuring the dry season, the Tarangire River becomes a lifeline, drawing thousands of animals from the surrounding steppe. Herds of elephants, wildebeest, zebra, buffalo, and gazelle converge on the river, creating spectacular wildlife viewing.\n\nThe park is also a birdwatcher's paradise, with over 550 species recorded — including the endemic ashy starling and yellow-collared lovebird.",
    highlights: ["Elephant Herds", "Baobab Trees", "Bird Watching", "Tarangire River", "550+ Bird Species"],
    best_time_to_visit: "June - October (dry season, best wildlife concentration)",
    entry_fee: "$45 per adult per 24 hours", imageKey: "tarangire",
  },
  "lake-manyara-national-park": {
    name: "Lake Manyara National Park", slug: "lake-manyara-national-park", category: "National Park",
    description: "Lake Manyara National Park is a compact gem along the Great Rift Valley escarpment. Despite its small size (330 sq km, two-thirds covered by the lake), it packs an incredible diversity of habitats and wildlife.\n\nThe park is renowned for its tree-climbing lions — one of only two populations in Africa known for this unusual behavior. The alkaline Lake Manyara itself attracts vast flocks of flamingos, turning the shoreline pink.\n\nA groundwater forest near the park entrance shelters troops of baboons and blue monkeys, while hippo pools, hot springs, and the dramatic Rift Valley escarpment backdrop add to the park's scenic appeal. Night game drives are available here — a rarity in Tanzanian parks.",
    highlights: ["Tree-climbing Lions", "Flamingos", "Night Safari", "Groundwater Forest", "Hot Springs"],
    best_time_to_visit: "July - October (dry season), November - December (flamingo season)",
    entry_fee: "$45 per adult per 24 hours", imageKey: "manyara",
  },
};

const DestinationDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const [destination, setDestination] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewForm, setReviewForm] = useState({ name: "", rating: 5, comment: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!slug) return;
    loadDestination();
    // eslint-disable-next-line
  }, [slug]);

  const loadDestination = async () => {
    // Try DB first
    const { data: dbDest } = await supabase.from("destinations").select("*").eq("slug", slug!).maybeSingle();
    if (dbDest) {
      setDestination(dbDest);
      const { data: revs } = await supabase.from("reviews").select("*").eq("destination_id", dbDest.id).eq("is_approved", true).order("created_at", { ascending: false });
      setReviews(revs || []);
    } else {
      // Fallback to static
      setDestination(fallbackDestinations[slug!] || null);
    }
    setLoading(false);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { toast.error("Please sign in to leave a review"); return; }
    setSubmitting(true);
    const { error } = await supabase.from("reviews").insert({
      user_id: user.id,
      destination_id: destination?.id || null,
      reviewer_name: reviewForm.name,
      rating: reviewForm.rating,
      comment: reviewForm.comment,
    });
    setSubmitting(false);
    if (error) { toast.error("Failed to submit review"); return; }
    toast.success("Review submitted! It will appear after admin approval.");
    setReviewForm({ name: "", rating: 5, comment: "" });
  };

  if (loading) return <div className="min-h-screen"><Navbar /><div className="pt-32 text-center text-muted-foreground">Loading...</div></div>;
  if (!destination) return <div className="min-h-screen"><Navbar /><div className="pt-32 text-center"><h2 className="font-display text-2xl mb-4">Destination not found</h2><Button asChild><Link to="/destinations">← Back to Destinations</Link></Button></div><Footer /></div>;

  const heroImage = destination.image_url || localImages[destination.imageKey] || imgSerengeti;
  const highlights = destination.highlights || [];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img src={heroImage} alt={destination.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay flex items-end">
          <div className="container mx-auto px-4 pb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Badge className="bg-primary text-primary-foreground mb-3">{destination.category}</Badge>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-2">{destination.name}</h1>
              <p className="text-primary-foreground/80 flex items-center gap-2"><MapPin className="w-4 h-4" /> Tanzania</p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="pt-8 pb-16">
        <div className="container mx-auto px-4">
          <Button variant="ghost" asChild className="mb-6"><Link to="/destinations"><ArrowLeft className="w-4 h-4 mr-2" /> All Destinations</Link></Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="font-display text-2xl font-bold mb-4">About this Destination</h2>
                {destination.description?.split("\n\n").map((p: string, i: number) => (
                  <p key={i} className="text-muted-foreground mb-4 leading-relaxed">{p}</p>
                ))}

                {highlights.length > 0 && (
                  <div className="mt-8">
                    <h3 className="font-display text-xl font-bold mb-4">Highlights</h3>
                    <div className="flex flex-wrap gap-2">
                      {highlights.map((h: string) => (
                        <Badge key={h} variant="secondary" className="bg-accent text-accent-foreground px-3 py-1">{h}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reviews */}
                <div className="mt-12">
                  <h3 className="font-display text-xl font-bold mb-6">Reviews</h3>
                  {reviews.length === 0 ? (
                    <p className="text-muted-foreground mb-6">No reviews yet. Be the first to share your experience!</p>
                  ) : (
                    <div className="space-y-4 mb-8">
                      {reviews.map((r) => (
                        <Card key={r.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold">{r.reviewer_name || "Traveler"}</span>
                              <div className="flex gap-0.5">{Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="w-4 h-4 text-safari-gold fill-safari-gold" />)}</div>
                            </div>
                            <p className="text-sm text-muted-foreground">{r.comment}</p>
                            <p className="text-xs text-muted-foreground mt-2">{new Date(r.created_at).toLocaleDateString()}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}

                  {/* Review Form */}
                  <Card>
                    <CardContent className="p-6">
                      <h4 className="font-display text-lg font-bold mb-4">Leave a Review</h4>
                      <form onSubmit={handleReviewSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div><Label>Your Name</Label><Input value={reviewForm.name} onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })} required /></div>
                          <div><Label>Rating</Label>
                            <div className="flex gap-1 mt-1">
                              {[1, 2, 3, 4, 5].map((r) => (
                                <button key={r} type="button" onClick={() => setReviewForm({ ...reviewForm, rating: r })}>
                                  <Star className={`w-6 h-6 ${r <= reviewForm.rating ? "text-safari-gold fill-safari-gold" : "text-muted-foreground"}`} />
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div><Label>Your Review</Label><Textarea value={reviewForm.comment} onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })} rows={3} required /></div>
                        <Button type="submit" className="bg-safari-gradient text-primary-foreground hover:opacity-90" disabled={submitting}>
                          {submitting ? "Submitting..." : "Submit Review"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {destination.best_time_to_visit && (
                <Card>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-2"><Calendar className="w-5 h-5 text-primary" /><h4 className="font-semibold">Best Time to Visit</h4></div>
                    <p className="text-sm text-muted-foreground">{destination.best_time_to_visit}</p>
                  </CardContent>
                </Card>
              )}
              {destination.entry_fee && (
                <Card>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-2"><DollarSign className="w-5 h-5 text-primary" /><h4 className="font-semibold">Entry Fee</h4></div>
                    <p className="text-sm text-muted-foreground">{destination.entry_fee}</p>
                  </CardContent>
                </Card>
              )}
              <Card className="bg-safari-gradient text-primary-foreground">
                <CardContent className="p-5 text-center">
                  <h4 className="font-display text-lg font-bold mb-2">Ready to Visit?</h4>
                  <p className="text-sm opacity-90 mb-4">Book a tour package that includes {destination.name}</p>
                  <Button asChild variant="secondary"><Link to="/packages">View Packages</Link></Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DestinationDetailPage;
