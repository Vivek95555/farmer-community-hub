
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
import { Search, Plus, CircleDollarSign, Loader2 } from "lucide-react";
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
import { useAuth } from "@/contexts/AuthContext";
import { useProductService, ProductInput } from "@/components/ProductService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const MarketplacePage = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [organicOnly, setOrganicOnly] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { profile } = useAuth();
  const productService = useProductService();
  const queryClient = useQueryClient();
  
  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    isOrganic: false,
    image: "",
  });
  
  // Query to fetch products
  const { data: products = [], isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products'],
    queryFn: productService.fetchProducts,
  });

  // Extract unique categories from actual products
  const categories = Array.from(new Set(products.map((p) => p.category)));
  
  // Mutations for create, update, and delete
  const createProductMutation = useMutation({
    mutationFn: (productData: ProductInput) => productService.createProduct(productData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success("Product added successfully");
      setIsAddProductDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast.error(`Failed to add product: ${error.message}`);
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: ({ id, product }: { id: string; product: ProductInput }) => 
      productService.updateProduct(id, product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success("Product updated successfully");
      setIsAddProductDialogOpen(false);
      setEditingProduct(null);
      resetForm();
    },
    onError: (error) => {
      toast.error(`Failed to update product: ${error.message}`);
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: (id: string) => productService.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success("Product deleted successfully");
    },
    onError: (error) => {
      toast.error(`Failed to delete product: ${error.message}`);
    },
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
    let results = products;
    
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
  }, [products, searchTerm, selectedCategories, priceRange, organicOnly]);
  
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
  
  const resetForm = () => {
    setNewProduct({
      name: "",
      description: "",
      price: "",
      category: "",
      isOrganic: false,
      image: "",
    });
  };
  
  const handleAddProduct = () => {
    // Validate form
    if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.category) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Check price is valid
    const price = parseFloat(newProduct.price);
    if (isNaN(price) || price <= 0) {
      toast.error("Please enter a valid price");
      return;
    }
    
    const productData: ProductInput = {
      name: newProduct.name,
      description: newProduct.description,
      price: price,
      category: newProduct.category,
      is_organic: newProduct.isOrganic,
      image: newProduct.image || undefined,
    };
    
    if (editingProduct) {
      updateProductMutation.mutate({ id: editingProduct.id, product: productData });
    } else {
      createProductMutation.mutate(productData);
    }
  };
  
  const handleProductEdit = (product: Product) => {
    setEditingProduct(product);
  };
  
  const handleProductDelete = (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProductMutation.mutate(productId);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Determine if the user is a farmer for showing add/edit/delete functionality
  const isFarmer = profile?.role === "farmer";

  return (
    <div className="min-h-screen bg-muted/20">
      <NavBar />
      
      <main className="container px-4 py-8 pt-32 md:px-6 md:py-12 md:pt-32">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
            <p className="mt-1 text-muted-foreground">
              {isFarmer
                ? "Manage your products and track their performance"
                : "Browse and purchase fresh products directly from farmers"}
            </p>
          </div>
          
          {isFarmer && (
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
                        {categories.length > 0 ? (
                          categories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))
                        ) : (
                          <>
                            <option value="Vegetables">Vegetables</option>
                            <option value="Fruits">Fruits</option>
                            <option value="Dairy & Eggs">Dairy & Eggs</option>
                            <option value="Meat & Poultry">Meat & Poultry</option>
                            <option value="Bakery">Bakery</option>
                            <option value="Herbs">Herbs</option>
                            <option value="Honey & Preserves">Honey & Preserves</option>
                          </>
                        )}
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
                      Enter a URL for your product image
                    </p>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => {
                    setIsAddProductDialogOpen(false);
                    setEditingProduct(null);
                    resetForm();
                  }}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleAddProduct}
                    disabled={createProductMutation.isPending || updateProductMutation.isPending}
                  >
                    {(createProductMutation.isPending || updateProductMutation.isPending) && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
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
                    {categories.length > 0 ? (
                      categories.map((category) => (
                        <Badge
                          key={category}
                          variant={selectedCategories.includes(category) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleCategory(category)}
                        >
                          {category}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No categories available</p>
                    )}
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
                {isLoadingProducts 
                  ? "Loading products..." 
                  : `Showing ${filteredProducts.length} products`}
              </p>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  Sort by: Price
                </Button>
              </div>
            </div>
            
            {isLoadingProducts ? (
              <div className="flex h-60 flex-col items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="mt-2 text-muted-foreground">Loading products...</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isFarmerView={isFarmer && product.farmer.id === profile?.id}
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
