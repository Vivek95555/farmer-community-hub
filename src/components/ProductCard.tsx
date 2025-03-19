
import { useState } from "react";
import { Edit, Trash2, ShoppingCart } from "lucide-react";
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
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  farmer: {
    id: string;
    name: string;
    image: string;
  };
  isOrganic: boolean;
}

interface ProductCardProps {
  product: Product;
  isFarmerView?: boolean;
  onEdit?: (product: Product) => void;
  onDelete?: (productId: string) => void;
  className?: string;
}

export function ProductCard({
  product,
  isFarmerView = false,
  onEdit,
  onDelete,
  className,
}: ProductCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleAddToCart = () => {
    toast.success(`Added ${product.name} to cart`);
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(product);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(product.id);
    }
  };

  return (
    <Card className={cn(
      "overflow-hidden h-full transition-all duration-300 hover:shadow-elevation hover-scale",
      className
    )}>
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image || "https://images.unsplash.com/photo-1575218823251-6a63ef7c7bf6?q=80&w=1000&auto=format&fit=crop"}
          alt={product.name}
          className={cn(
            "h-full w-full object-cover transition-all duration-500",
            isImageLoaded ? "blur-0" : "blur-xs"
          )}
          onLoad={() => setIsImageLoaded(true)}
        />
        {product.isOrganic && (
          <Badge className="absolute left-2 top-2 bg-green-100 text-green-800">
            Organic
          </Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle className="line-clamp-1 text-lg">{product.name}</CardTitle>
          <p className="font-medium text-primary">${product.price.toFixed(2)}</p>
        </div>
        <CardDescription className="line-clamp-2">{product.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center space-x-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={product.farmer.image} alt={product.farmer.name} />
            <AvatarFallback className="text-xs">
              {product.farmer.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">
            {product.farmer.name}
          </span>
          <Badge variant="outline" className="ml-auto">
            {product.category}
          </Badge>
        </div>
      </CardContent>
      <CardFooter>
        {isFarmerView ? (
          <div className="flex w-full gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={handleEdit}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-destructive hover:bg-destructive/10"
              onClick={handleDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        ) : (
          <Button className="w-full" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
