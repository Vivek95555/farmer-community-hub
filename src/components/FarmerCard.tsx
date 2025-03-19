
import { Star, MapPin } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Link } from "react-router-dom";

export interface Farmer {
  id: string;
  name: string;
  location: string;
  rating: number;
  image: string;
  bio: string;
  productCategories: string[];
  productCount: number;
}

interface FarmerCardProps {
  farmer: Farmer;
  className?: string;
}

export function FarmerCard({ farmer, className }: FarmerCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-elevation hover-scale",
      className
    )}>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary/10">
            <AvatarImage 
              src={farmer.image}
              alt={farmer.name} 
              className={cn(
                "transition-all duration-300",
                isImageLoaded ? "blur-0" : "blur-xs"
              )}
              onLoad={() => setIsImageLoaded(true)}
            />
            <AvatarFallback className="text-xl">{farmer.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <CardTitle className="text-xl">{farmer.name}</CardTitle>
            <div className="mt-1 flex flex-wrap justify-center sm:justify-start items-center gap-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <MapPin className="mr-1 h-4 w-4 text-agritrust-500" />
                {farmer.location}
              </div>
              <div className="flex items-center">
                <Star className="mr-1 h-4 w-4 text-amber-500" />
                <span>{farmer.rating} / 5</span>
              </div>
            </div>
            <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{farmer.bio}</p>
          </div>
        </div>
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Products</h4>
          <div className="flex flex-wrap gap-1">
            {farmer.productCategories.map((category) => (
              <Badge key={category} variant="outline" className="bg-secondary">
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <CardFooter className="border-t bg-muted/20 px-6 py-3">
        <div className="flex w-full items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {farmer.productCount} products
          </span>
          <Button asChild size="sm">
            <Link to={`/farmers/${farmer.id}`}>
              View Profile
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
