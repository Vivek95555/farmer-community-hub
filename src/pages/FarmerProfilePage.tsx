
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { ProductCard, Product } from "@/components/ProductCard";
import { Farmer } from "@/components/FarmerCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, ChevronLeft, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const FarmerProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [farmer, setFarmer] = useState<Farmer | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFarmerAndProducts = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        // Fetch farmer profile
        const { data: farmerData, error: farmerError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", id)
          .single();
          
        if (farmerError) {
          console.error("Error fetching farmer:", farmerError);
          return;
        }

        // Fetch farmer's products
        const { data: productsData, error: productsError } = await supabase
          .from("products")
          .select("*")
          .eq("farmer_id", id);
          
        if (productsError) {
          console.error("Error fetching products:", productsError);
          return;
        }
        
        // Process products data
        const formattedProducts = productsData.map((product) => ({
          id: product.id,
          name: product.name,
          description: product.description || "",
          price: Number(product.price),
          image: product.image || "",
          category: product.category,
          isOrganic: product.is_organic || false,
          farmer: {
            id: farmerData.id,
            name: farmerData.name,
            image: farmerData.image || "",
          },
        }));
        
        // Create farmer object
        const farmerObj: Farmer = {
          id: farmerData.id,
          name: farmerData.name,
          location: farmerData.location || "Location not specified",
          rating: 4.5, // Default rating for now
          image: farmerData.image || "https://randomuser.me/api/portraits/men/32.jpg",
          bio: farmerData.bio || "No bio available",
          productCategories: Array.from(
            new Set(formattedProducts.map((product) => product.category))
          ),
          productCount: formattedProducts.length,
        };
        
        setFarmer(farmerObj);
        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error in farmer profile data processing:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFarmerAndProducts();
  }, [id]);

  return (
    <div className="min-h-screen bg-muted/20">
      <NavBar />
      
      <main className="container px-4 py-8 pt-32 md:px-6 md:py-12 md:pt-32">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/farmers")}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Farmers
        </Button>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-60">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading farmer profile...</span>
          </div>
        ) : farmer ? (
          <>
            <div className="mb-12 grid gap-8 md:grid-cols-[300px_1fr]">
              <div>
                <Avatar className="h-48 w-48 rounded-lg border-4 border-primary/10">
                  <AvatarImage src={farmer.image} alt={farmer.name} />
                  <AvatarFallback className="text-4xl">{farmer.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{farmer.name}</h1>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-muted-foreground">
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4 text-agritrust-500" />
                    {farmer.location}
                  </div>
                  <div className="flex items-center">
                    <Star className="mr-1 h-4 w-4 text-amber-500" />
                    <span>{farmer.rating} / 5</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h2 className="text-xl font-medium">About</h2>
                  <p className="mt-2 text-muted-foreground">{farmer.bio}</p>
                </div>
                
                <div className="mt-6">
                  <h2 className="text-xl font-medium">Product Categories</h2>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {farmer.productCategories.map((category) => (
                      <Badge key={category}>{category}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-8">
              <h2 className="mb-6 text-2xl font-medium">Products ({products.length})</h2>
              
              {products.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border bg-card p-8 text-center">
                  <h3 className="text-lg font-medium">No products available</h3>
                  <p className="mt-2 text-muted-foreground">
                    This farmer hasn't added any products yet.
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="rounded-lg border bg-card p-8 text-center">
            <h3 className="text-lg font-medium">Farmer not found</h3>
            <p className="mt-2 text-muted-foreground">
              The requested farmer profile could not be found.
            </p>
            <Button className="mt-4" onClick={() => navigate("/farmers")}>
              Return to Farmers Directory
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default FarmerProfilePage;
