
import { useState } from "react";
import { Edit2, MapPin, Star, Plus, Save, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { QRCodeGenerator } from "@/components/QRCodeGenerator";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface FarmerProduct {
  id: string;
  name: string;
  category: string;
}

interface FarmerDetails {
  id: string;
  name: string;
  location: string;
  rating: number;
  bio: string;
  profileImage: string;
  products: FarmerProduct[];
}

// Demo data - this would come from Supabase in a real implementation
const demoFarmer: FarmerDetails = {
  id: "f1",
  name: "Jane Smith",
  location: "Napa Valley, CA",
  rating: 4.8,
  bio: "Third-generation farmer specializing in organic vegetables and sustainable farming practices. Our farm has been certified organic for over 15 years.",
  profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
  products: [
    { id: "p1", name: "Organic Tomatoes", category: "Vegetables" },
    { id: "p2", name: "Heirloom Carrots", category: "Vegetables" },
    { id: "p3", name: "Grass-fed Beef", category: "Meat" },
  ],
};

export function EcoPassport() {
  const [farmer, setFarmer] = useState<FarmerDetails>(demoFarmer);
  const [isEditing, setIsEditing] = useState(false);
  const [editedFarmer, setEditedFarmer] = useState<FarmerDetails>(demoFarmer);
  const [newProduct, setNewProduct] = useState({ name: "", category: "" });
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setFarmer(editedFarmer);
      toast.success("Profile updated successfully");
    } else {
      // Start editing
      setEditedFarmer(farmer);
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedFarmer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category) {
      toast.error("Please fill in all product fields");
      return;
    }

    const updatedProducts = [
      ...editedFarmer.products,
      { id: `p${Date.now()}`, ...newProduct },
    ];

    setEditedFarmer((prev) => ({
      ...prev,
      products: updatedProducts,
    }));

    setNewProduct({ name: "", category: "" });
    setIsAddingProduct(false);
    toast.success("Product added successfully");
  };

  const handleRemoveProduct = (productId: string) => {
    const updatedProducts = editedFarmer.products.filter(
      (product) => product.id !== productId
    );
    setEditedFarmer((prev) => ({
      ...prev,
      products: updatedProducts,
    }));
  };

  // Generate QR code data - this would be a URL to the farmer's public profile in a real app
  const qrCodeData = `https://agritrust.example/farmers/${farmer.id}`;

  return (
    <div className="container max-w-4xl px-4 py-8 md:px-6">
      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <Card className="overflow-hidden">
          <CardHeader className="relative border-b bg-muted/20 p-0">
            <div className="absolute right-4 top-4 z-10">
              <Button
                variant={isEditing ? "default" : "secondary"}
                size="sm"
                onClick={handleEditToggle}
              >
                {isEditing ? (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </>
                ) : (
                  <>
                    <Edit2 className="mr-2 h-4 w-4" />
                    Edit
                  </>
                )}
              </Button>
            </div>
            <div className="h-32 w-full bg-gradient-to-r from-agritrust-100 to-agritrust-200"></div>
            <div className="flex flex-col items-center pb-6 pt-4 text-center sm:flex-row sm:text-left">
              <div className="relative -mt-12 ml-6 h-24 w-24 flex-shrink-0">
                <Avatar className="h-24 w-24 border-4 border-background">
                  <AvatarImage src={isEditing ? editedFarmer.profileImage : farmer.profileImage} />
                  <AvatarFallback className="text-2xl">
                    {(isEditing ? editedFarmer.name : farmer.name)
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <div className="absolute bottom-0 right-0 rounded-full border border-border bg-background p-1">
                    <Edit2 className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="mt-4 px-6 sm:mt-0">
                <h2 className="text-2xl font-bold">
                  {isEditing ? (
                    <Input
                      name="name"
                      value={editedFarmer.name}
                      onChange={handleInputChange}
                      className="max-w-xs font-bold text-xl"
                    />
                  ) : (
                    farmer.name
                  )}
                </h2>
                <div className="mt-1 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground sm:justify-start">
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4 text-agritrust-500" />
                    {isEditing ? (
                      <Input
                        name="location"
                        value={editedFarmer.location}
                        onChange={handleInputChange}
                        className="max-w-[200px] h-8 text-sm"
                      />
                    ) : (
                      farmer.location
                    )}
                  </div>
                  <div className="flex items-center">
                    <Star className="mr-1 h-4 w-4 text-amber-500" />
                    {isEditing ? (
                      <Input
                        name="rating"
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={editedFarmer.rating}
                        onChange={handleInputChange}
                        className="w-16 h-8 text-sm"
                      />
                    ) : (
                      <span>{farmer.rating} / 5</span>
                    )}
                  </div>
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    Verified Farmer
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div>
              <h3 className="mb-2 text-lg font-medium">About</h3>
              {isEditing ? (
                <Textarea
                  name="bio"
                  value={editedFarmer.bio}
                  onChange={handleInputChange}
                  className="min-h-[100px]"
                />
              ) : (
                <p className="text-muted-foreground">{farmer.bio}</p>
              )}
            </div>
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-lg font-medium">Products</h3>
                {isEditing && !isAddingProduct && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsAddingProduct(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Product
                  </Button>
                )}
              </div>
              {isEditing && isAddingProduct && (
                <div className="mb-4 rounded border p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium">New Product</h4>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => setIsAddingProduct(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="product-name">Product Name</Label>
                      <Input
                        id="product-name"
                        value={newProduct.name}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, name: e.target.value })
                        }
                        placeholder="e.g. Organic Apples"
                      />
                    </div>
                    <div>
                      <Label htmlFor="product-category">Category</Label>
                      <Input
                        id="product-category"
                        value={newProduct.category}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, category: e.target.value })
                        }
                        placeholder="e.g. Fruits"
                      />
                    </div>
                    <Button
                      onClick={handleAddProduct}
                      className="w-full"
                    >
                      Add Product
                    </Button>
                  </div>
                </div>
              )}
              <div className="grid gap-2 sm:grid-cols-2">
                {(isEditing ? editedFarmer.products : farmer.products).map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div>
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                    </div>
                    {isEditing && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => handleRemoveProduct(product.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted/20 px-6 py-4">
            <p className="text-sm text-muted-foreground">
              This ecoPassport is verified and backed by AgriTrust. Last updated: {new Date().toLocaleDateString()}
            </p>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ecoPassport QR Code</CardTitle>
              <CardDescription>
                Share your passport with customers for easy verification
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <QRCodeGenerator value={qrCodeData} />
            </CardContent>
          </Card>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">
                Preview Public View
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Farmer ecoPassport</DialogTitle>
                <DialogDescription>
                  This is what customers will see when they scan your QR code
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-20 w-20 mb-2">
                    <AvatarImage src={farmer.profileImage} />
                    <AvatarFallback className="text-xl">
                      {farmer.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold">{farmer.name}</h3>
                  <div className="mt-1 flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-4 w-4 text-agritrust-500" />
                    {farmer.location}
                  </div>
                  <div className="mt-1 flex items-center text-sm">
                    <Star className="mr-1 h-4 w-4 text-amber-500" />
                    <span>{farmer.rating} / 5</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">About the Farmer</h4>
                  <p className="text-sm text-muted-foreground">{farmer.bio}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-1">Products</h4>
                  <div className="flex flex-wrap gap-2">
                    {farmer.products.map((product) => (
                      <Badge key={product.id} variant="outline" className="bg-secondary">
                        {product.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" className="w-full">Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
