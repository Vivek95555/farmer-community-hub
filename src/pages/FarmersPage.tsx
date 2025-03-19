
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { FarmerCard, Farmer } from "@/components/FarmerCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Search, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const FarmersPage = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [filteredFarmers, setFilteredFarmers] = useState<Farmer[]>([]);
  const [allFarmers, setAllFarmers] = useState<Farmer[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, [location]);
  
  useEffect(() => {
    const fetchFarmers = async () => {
      setIsLoading(true);
      try {
        // Fetch farmers (profiles with role = 'farmer')
        const { data: farmersData, error: farmersError } = await supabase
          .from("profiles")
          .select("*")
          .eq("role", "farmer");
          
        if (farmersError) {
          console.error("Error fetching farmers:", farmersError);
          return;
        }
        
        // Fetch products to get categories and count per farmer
        const { data: productsData, error: productsError } = await supabase
          .from("products")
          .select("*");
          
        if (productsError) {
          console.error("Error fetching products:", productsError);
          return;
        }
        
        // Process farmers data
        const farmersWithDetails = farmersData.map((farmer) => {
          // Get products for this farmer
          const farmerProducts = productsData.filter(
            (product) => product.farmer_id === farmer.id
          );
          
          // Extract unique categories
          const productCategories = Array.from(
            new Set(farmerProducts.map((product) => product.category))
          );
          
          return {
            id: farmer.id,
            name: farmer.name || "Unknown Farmer",
            location: farmer.location || "Location not specified",
            rating: 4.5, // Default rating for now
            image: farmer.image || "https://randomuser.me/api/portraits/men/32.jpg",
            bio: farmer.bio || "No bio available",
            productCategories,
            productCount: farmerProducts.length,
          };
        });
        
        // Get all unique categories across all products
        const categories = Array.from(
          new Set(productsData.map((product) => product.category))
        );
        
        setAllFarmers(farmersWithDetails);
        setFilteredFarmers(farmersWithDetails);
        setAllCategories(categories);
      } catch (error) {
        console.error("Error in farmer data processing:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFarmers();
  }, []);
  
  useEffect(() => {
    // Apply filters
    let results = allFarmers;
    
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
  }, [searchTerm, selectedCategories, minRating, allFarmers]);
  
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
        
        {isLoading ? (
          <div className="flex justify-center items-center h-60">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading farmers...</span>
          </div>
        ) : (
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
        )}
      </main>
    </div>
  );
};

export default FarmersPage;
