
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { FarmerCard, Farmer } from "@/components/FarmerCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

// Mock data
const mockFarmers: Farmer[] = [
  {
    id: "f1",
    name: "Green Valley Farm",
    location: "Sonoma, CA",
    rating: 4.8,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Family-owned farm specializing in organic vegetables and fruits, practicing sustainable agriculture for over 25 years.",
    productCategories: ["Vegetables", "Fruits", "Herbs"],
    productCount: 12,
  },
  {
    id: "f2",
    name: "Sunny Meadow Farm",
    location: "Napa Valley, CA",
    rating: 4.9,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Free-range poultry farm focusing on humane animal treatment and sustainable practices.",
    productCategories: ["Eggs", "Poultry", "Dairy"],
    productCount: 8,
  },
  {
    id: "f3",
    name: "Beecroft Apiaries",
    location: "Sacramento, CA",
    rating: 4.7,
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    bio: "Specializing in raw honey and bee products, our apiaries are located in pristine wildflower meadows.",
    productCategories: ["Honey", "Beeswax Products"],
    productCount: 5,
  },
  {
    id: "f4",
    name: "Blue Creek Dairy",
    location: "Petaluma, CA",
    rating: 4.6,
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    bio: "Small dairy farm producing artisanal cheeses and yogurt from grass-fed cows.",
    productCategories: ["Cheese", "Yogurt", "Milk"],
    productCount: 7,
  },
  {
    id: "f5",
    name: "Redwood Orchard",
    location: "Santa Rosa, CA",
    rating: 4.5,
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    bio: "Heritage apple orchard growing over 20 varieties of apples and producing small-batch cider.",
    productCategories: ["Fruits", "Cider", "Preserves"],
    productCount: 9,
  },
  {
    id: "f6",
    name: "Lavender Hills",
    location: "Healdsburg, CA",
    rating: 4.9,
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    bio: "Organic lavender farm producing essential oils, sachets, and culinary lavender products.",
    productCategories: ["Herbs", "Essential Oils", "Soaps"],
    productCount: 15,
  },
];

// All product categories from the mock data
const allCategories = Array.from(
  new Set(mockFarmers.flatMap((farmer) => farmer.productCategories))
);

const FarmersPage = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [filteredFarmers, setFilteredFarmers] = useState<Farmer[]>(mockFarmers);
  
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, [location]);
  
  useEffect(() => {
    // Apply filters
    let results = mockFarmers;
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        (farmer) =>
          farmer.name.toLowerCase().includes(term) ||
          farmer.location.toLowerCase().includes(term) ||
          farmer.bio.toLowerCase().includes(term)
      );
    }
    
    // Filter by selected categories
    if (selectedCategories.length > 0) {
      results = results.filter((farmer) =>
        farmer.productCategories.some((category) =>
          selectedCategories.includes(category)
        )
      );
    }
    
    // Filter by minimum rating
    if (minRating > 0) {
      results = results.filter((farmer) => farmer.rating >= minRating);
    }
    
    setFilteredFarmers(results);
  }, [searchTerm, selectedCategories, minRating]);
  
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };
  
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setMinRating(0);
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <NavBar />
      
      <main className="container px-4 py-8 pt-32 md:px-6 md:py-12 md:pt-32">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Farmers Directory</h1>
          <p className="mt-1 text-muted-foreground">
            Discover and connect with verified farmers in your region
          </p>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
          {/* Filters sidebar */}
          <div className="space-y-6">
            <div className="rounded-lg border bg-card p-4 shadow-subtle">
              <h2 className="mb-4 font-medium">Search & Filters</h2>
              
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search farmers..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label className="mb-2 block">Product Categories</Label>
                  <div className="flex flex-wrap gap-2">
                    {allCategories.map((category) => (
                      <Badge
                        key={category}
                        variant={selectedCategories.includes(category) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleCategory(category)}
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <Label>Minimum Rating</Label>
                    <span className="text-sm text-muted-foreground">
                      {minRating.toFixed(1)}+
                    </span>
                  </div>
                  <Slider
                    defaultValue={[0]}
                    max={5}
                    step={0.1}
                    value={[minRating]}
                    onValueChange={(value) => setMinRating(value[0])}
                  />
                </div>
                
                <Button variant="outline" className="w-full" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>
          
          {/* Farmers grid */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-muted-foreground">
                Showing {filteredFarmers.length} farmers
              </p>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  Sort by: Rating
                </Button>
              </div>
            </div>
            
            {filteredFarmers.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {filteredFarmers.map((farmer) => (
                  <FarmerCard key={farmer.id} farmer={farmer} />
                ))}
              </div>
            ) : (
              <div className="flex h-60 flex-col items-center justify-center rounded-lg border bg-card p-8 text-center">
                <h3 className="text-lg font-medium">No farmers found</h3>
                <p className="mt-2 text-muted-foreground">
                  Try adjusting your filters or search term
                </p>
                <Button variant="outline" className="mt-4" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default FarmersPage;
