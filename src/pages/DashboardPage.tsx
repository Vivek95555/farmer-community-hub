
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ProductCard, Product } from "@/components/ProductCard";
import { FarmerCard, Farmer } from "@/components/FarmerCard";
import { 
  Calendar, 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  BarChart3,
  ChevronRight 
} from "lucide-react";

// Mock data for the dashboard
const mockFeaturedProducts: Product[] = [
  {
    id: "p1",
    name: "Organic Heirloom Tomatoes",
    description: "Freshly harvested heirloom tomatoes grown using organic practices.",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=1000&auto=format&fit=crop",
    category: "Vegetables",
    farmer: {
      id: "f1",
      name: "Green Valley Farm",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    isOrganic: true,
  },
  {
    id: "p2",
    name: "Free-Range Eggs",
    description: "Eggs from free-range chickens raised on natural feed without antibiotics.",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1498654077810-12c21d4d6dc3?q=80&w=1000&auto=format&fit=crop",
    category: "Dairy & Eggs",
    farmer: {
      id: "f2",
      name: "Sunny Meadow Farm",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    isOrganic: true,
  },
  {
    id: "p3",
    name: "Raw Wildflower Honey",
    description: "Unprocessed honey collected from wildflower fields, rich in natural enzymes.",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?q=80&w=1000&auto=format&fit=crop",
    category: "Honey & Preserves",
    farmer: {
      id: "f3",
      name: "Beecroft Apiaries",
      image: "https://randomuser.me/api/portraits/men/67.jpg",
    },
    isOrganic: true,
  },
];

const mockFeaturedFarmers: Farmer[] = [
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
];

interface DashboardPageProps {
  userRole?: "farmer" | "consumer" | null;
}

const DashboardPage = ({ userRole = "farmer" }: DashboardPageProps) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("overview");
  
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-muted/20">
      <NavBar userRole={userRole} />
      
      <main className="container px-4 py-8 pt-32 md:px-6 md:py-12 md:pt-32">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {userRole === "farmer" ? "Farmer Dashboard" : "Welcome Back"}
            </h1>
            <p className="mt-1 text-muted-foreground">
              {userRole === "farmer" 
                ? "Manage your farm, products, and view customer insights" 
                : "Discover fresh products and connect with local farmers"}
            </p>
          </div>
          {userRole === "farmer" && (
            <Button asChild>
              <Link to="/ecopassport">
                View ecoPassport
              </Link>
            </Button>
          )}
        </div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-8">
            {/* Stats Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="hover-scale">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {userRole === "farmer" ? "Products Listed" : "Products Purchased"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">
                      {userRole === "farmer" ? "12" : "24"}
                    </div>
                    <div className="rounded-full bg-primary/10 p-2 text-primary">
                      <ShoppingCart className="h-4 w-4" />
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    <span className="text-green-500">+4%</span> from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover-scale">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {userRole === "farmer" ? "Total Sales" : "Total Spent"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">
                      ${userRole === "farmer" ? "1,234" : "542"}
                    </div>
                    <div className="rounded-full bg-primary/10 p-2 text-primary">
                      <BarChart3 className="h-4 w-4" />
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    <span className="text-green-500">+12%</span> from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover-scale">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {userRole === "farmer" ? "Profile Views" : "Farmers Followed"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">
                      {userRole === "farmer" ? "452" : "8"}
                    </div>
                    <div className="rounded-full bg-primary/10 p-2 text-primary">
                      <Users className="h-4 w-4" />
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    <span className="text-green-500">+18%</span> from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover-scale">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">3</div>
                    <div className="rounded-full bg-primary/10 p-2 text-primary">
                      <Calendar className="h-4 w-4" />
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Next: Farmers Market (May 15)
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Featured Products Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Featured Products</CardTitle>
                  <CardDescription>
                    {userRole === "farmer" 
                      ? "Your top-performing products" 
                      : "Discover high-quality products from local farmers"}
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/marketplace" className="flex items-center">
                    View All
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {mockFeaturedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isFarmerView={userRole === "farmer"}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Featured Farmers Section (for consumers only) */}
            {userRole === "consumer" && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Featured Farmers</CardTitle>
                    <CardDescription>
                      Farmers you might be interested in
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/farmers" className="flex items-center">
                      View All
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {mockFeaturedFarmers.map((farmer) => (
                      <FarmerCard key={farmer.id} farmer={farmer} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Recent Activity Section (for farmers only) */}
            {userRole === "farmer" && (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest updates and interactions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 rounded-lg border p-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <ShoppingCart className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">New Order</p>
                        <p className="text-sm text-muted-foreground">
                          John D. purchased 3x Organic Heirloom Tomatoes
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Today, 10:24 AM
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 rounded-lg border p-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Rating Increase</p>
                        <p className="text-sm text-muted-foreground">
                          Your farm rating increased to 4.8/5
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Yesterday, 3:45 PM
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 rounded-lg border p-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">New Follower</p>
                        <p className="text-sm text-muted-foreground">
                          Sarah M. started following your farm
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Yesterday, 1:12 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="products" className="space-y-8">
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold">
                {userRole === "farmer" ? "Your Products" : "Browse Products"}
              </h2>
              {userRole === "farmer" && (
                <Button>Add New Product</Button>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-secondary cursor-pointer">All</Badge>
              <Badge variant="outline" className="cursor-pointer">Vegetables</Badge>
              <Badge variant="outline" className="cursor-pointer">Fruits</Badge>
              <Badge variant="outline" className="cursor-pointer">Dairy & Eggs</Badge>
              <Badge variant="outline" className="cursor-pointer">Meat & Poultry</Badge>
              <Badge variant="outline" className="cursor-pointer">Honey & Preserves</Badge>
            </div>
            
            {/* Products grid would go here with filter functionality */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array(8)
                .fill(0)
                .map((_, i) => (
                  <ProductCard
                    key={`product-${i}`}
                    product={{
                      ...mockFeaturedProducts[i % 3],
                      id: `extended-${i}`,
                    }}
                    isFarmerView={userRole === "farmer"}
                  />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="insights" className="space-y-8">
            <h2 className="text-2xl font-bold">Analytics & Insights</h2>
            <p className="text-muted-foreground">
              {userRole === "farmer"
                ? "Track your farm's performance and customer engagement."
                : "View your shopping history and favorite products."}
            </p>
            
            {/* Placeholder for charts and analytics */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {userRole === "farmer" ? "Sales Performance" : "Purchase History"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Chart visualization will be displayed here
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>
                    {userRole === "farmer" ? "Customer Demographics" : "Spending Categories"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Chart visualization will be displayed here
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default DashboardPage;
