
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { ProductCard, Product } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Plus, CircleDollarSign } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { toast } from "sonner";

// Mock data
const mockProducts: Product[] = [
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
  {
    id: "p4",
    name: "Grass-Fed Ground Beef",
    description: "Lean ground beef from grass-fed cattle, no hormones or antibiotics.",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?q=80&w=1000&auto=format&fit=crop",
    category: "Meat & Poultry",
    farmer: {
      id: "f4",
      name: "Highland Cattle Ranch",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    isOrganic: true,
  },
  {
    id: "p5",
    name: "Fresh Strawberries",
    description: "Sweet, juicy strawberries picked at peak ripeness.",
    price: 6.49,
    image: "https://images.unsplash.com/photo-1518635017498-87f514b751ba?q=80&w=1000&auto=format&fit=crop",
    category: "Fruits",
    farmer: {
      id: "f1",
      name: "Green Valley Farm",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    isOrganic: true,
  },
  {
    id: "p6",
    name: "Artisan Sourdough Bread",
    description: "Handcrafted sourdough bread made with organic flour and traditional fermentation.",
    price: 7.99,
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc7c?q=80&w=1000&auto=format&fit=crop",
    category: "Bakery",
    farmer: {
      id: "f5",
      name: "Hearth & Grain",
      image: "https://randomuser.me/api/portraits/women/28.jpg",
    },
    isOrganic: false,
  },
  {
    id: "p7",
    name: "Fresh Basil",
    description: "Aromatic fresh basil, perfect for Italian dishes and homemade pesto.",
    price: 3.49,
    image: "https://images.unsplash.com/photo-1527792492728-08d07d021a9b?q=80&w=1000&auto=format&fit=crop",
    category: "Herbs",
    farmer: {
      id: "f6",
      name: "Lavender Hills",
      image: "https://randomuser.me/api/portraits/women/33.jpg",
    },
    isOrganic: true,
  },
  {
    id: "p8",
    name: "Goat Cheese",
    description: "Creamy goat cheese made from the milk of free-range goats.",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1559561853-08451507cbe7?q=80&w=1000&auto=format&fit=crop",
    category: "Dairy & Eggs",
    farmer: {
      id: "f4",
      name: "Blue Creek Dairy",
      image: "https://randomuser.me/api/portraits/women/22.jpg",
    },
    isOrganic: false,
  },
];

// Extract unique categories
const categories = Array.from(new Set(mockProducts.map((p) => p.category)));

interface MarketplacePageProps {
  userRole?: "farmer" | "consumer" | null;
}

const MarketplacePage = ({ userRole = "farmer" }: MarketplacePageProps) => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [organicOnly, setOrganicOnly] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    isOrganic: false,
    image: "",
  });
  
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, [location]);
  
  useEffect(() => {
    // Fill edit form when editing a product
    if (editingProduct) {
      setNewProduct({
        name: editingProduct.name,
        description: editingProduct.description,
        price: editingProduct.price.toString(),
        category: editingProduct.category,
        isOrganic: editingProduct.isOrganic,
        image: editingProduct.image,
      });
      setIsAddProductDialogOpen(true);
    }
  }, [editingProduct]);
  
  useEffect(() => {
    // Apply filters
    let results = mockProducts;
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term)
      );
    }
    
    // Filter by selected categories
    if (selectedCategories.length > 0) {
      results = results.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }
    
    // Filter by price range
    results = results.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Filter by organic only
    if (organicOnly) {
      results = results.filter((product) => product.isOrganic);
    }
    
    setFilteredProducts(results);
  }, [searchTerm, selectedCategories, priceRange, organicOnly]);
  
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
    setPriceRange([0, 50]);
    setOrganicOnly(false);
  };
  
  const handleAddProduct = () => {
    // Validate form
    if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.category) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Create new product or update existing
    const price = parseFloat(newProduct.price);
    if (isNaN(price) || price <= 0) {
      toast.error("Please enter a valid price");
      return;
    }
    
    if (editingProduct) {
      // Handle product update (in a real app, this would update the database)
      toast.success(`Product "${newProduct.name}" updated successfully`);
    } else {
      // Handle product creation (in a real app, this would create in the database)
      toast.success(`Product "${newProduct.name}" added successfully`);
    }
    
    // Close dialog and reset form
    setIsAddProductDialogOpen(false);
    setEditingProduct(null);
    setNewProduct({
      name: "",
      description: "",
      price: "",
      category: "",
      isOrganic: false,
      image: "",
    });
  };
  
  const handleProductEdit = (product: Product) => {
    setEditingProduct(product);
  };
  
  const handleProductDelete = (productId: string) => {
    // In a real app, this would delete from the database
    toast.success("Product deleted successfully");
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <NavBar userRole={userRole} />
      
      <main className="container px-4 py-8 pt-32 md:px-6 md:py-12 md:pt-32">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
            <p className="mt-1 text-muted-foreground">
              {userRole === "farmer"
                ? "Manage your products and track their performance"
                : "Browse and purchase fresh products directly from farmers"}
            </p>
          </div>
          
          {userRole === "farmer" && (
            <Dialog open={isAddProductDialogOpen} onOpenChange={setIsAddProductDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Product
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>
                    {editingProduct ? "Edit Product" : "Add New Product"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingProduct
                      ? "Update your product details below"
                      : "Fill in the details for your new product"}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div>
                    <Label htmlFor="name">Product Name*</Label>
                    <Input
                      id="name"
                      name="name"
                      value={newProduct.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Organic Tomatoes"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description*</Label>
                    <Input
                      id="description"
                      name="description"
                      value={newProduct.description}
                      onChange={handleInputChange}
                      placeholder="Brief description of your product"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Price ($)*</Label>
                      <div className="relative">
                        <CircleDollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          step="0.01"
                          min="0"
                          className="pl-8"
                          value={newProduct.price}
                          onChange={handleInputChange}
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="category">Category*</Label>
                      <select
                        id="category"
                        name="category"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={newProduct.category}
                        onChange={(e) =>
                          setNewProduct((prev) => ({
                            ...prev,
                            category: e.target.value,
                          }))
                        }
                      >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isOrganic"
                      checked={newProduct.isOrganic}
                      onCheckedChange={(checked) =>
                        setNewProduct((prev) => ({
                          ...prev,
                          isOrganic: checked === true,
                        }))
                      }
                    />
                    <label
                      htmlFor="isOrganic"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      This product is certified organic
                    </label>
                  </div>
                  
                  <div>
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      name="image"
                      value={newProduct.image}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      Enter a URL or upload an image (upload feature coming soon)
                    </p>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => {
                    setIsAddProductDialogOpen(false);
                    setEditingProduct(null);
                  }}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddProduct}>
                    {editingProduct ? "Update Product" : "Add Product"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
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
                    placeholder="Search products..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label className="mb-2 block">Categories</Label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
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
                    <Label>Price Range</Label>
                    <span className="text-sm text-muted-foreground">
                      ${priceRange[0]} - ${priceRange[1]}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[0, 50]}
                    max={50}
                    step={1}
                    value={priceRange}
                    onValueChange={(value) => setPriceRange([value[0], value[1]])}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="organic-only"
                    checked={organicOnly}
                    onCheckedChange={(checked) => setOrganicOnly(checked === true)}
                  />
                  <label
                    htmlFor="organic-only"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Organic Products Only
                  </label>
                </div>
                
                <Button variant="outline" className="w-full" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>
          
          {/* Products grid */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-muted-foreground">
                Showing {filteredProducts.length} products
              </p>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  Sort by: Price
                </Button>
              </div>
            </div>
            
            {filteredProducts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isFarmerView={userRole === "farmer"}
                    onEdit={handleProductEdit}
                    onDelete={handleProductDelete}
                  />
                ))}
              </div>
            ) : (
              <div className="flex h-60 flex-col items-center justify-center rounded-lg border bg-card p-8 text-center">
                <h3 className="text-lg font-medium">No products found</h3>
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

export default MarketplacePage;
