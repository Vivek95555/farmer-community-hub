
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { Trophy, Leaf, Award, BadgeCheck } from "lucide-react";
import { QRCodeGenerator } from "./QRCodeGenerator";

export function EcoPassport() {
  const { profile } = useAuth();
  const userRole = profile?.role || "consumer";

  return (
    <div className="bg-card text-card-foreground shadow-md rounded-lg overflow-hidden max-w-3xl mx-auto">
      <div className="bg-gradient-to-r from-green-600 to-green-400 p-6 text-white">
        <h2 className="text-2xl font-bold">Eco Passport</h2>
        <p className="opacity-90">Your sustainable agriculture credentials</p>
      </div>

      <div className="p-6 grid gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">{profile?.name || "User"}</h3>
            <p className="text-sm text-muted-foreground capitalize">{userRole}</p>
          </div>
          <div className="w-24 h-24">
            <QRCodeGenerator value={`https://agritrust.com/verify/${profile?.id || "user"}`} />
          </div>
        </div>

        <div className="grid gap-4">
          <h4 className="font-medium">Sustainability Achievements</h4>
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <span>3x Award Winner</span>
          </div>
          <div className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-green-500" />
            <span>100% Organic Practices</span>
          </div>
        </div>

        <div className="grid gap-4">
          <h4 className="font-medium">Certifications</h4>
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-blue-500" />
            <span>Certified Sustainable</span>
          </div>
          <div className="flex items-center gap-2">
            <BadgeCheck className="h-5 w-5 text-green-500" />
            <span>Eco-Friendly Approved</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t">
          <h4 className="font-medium mb-2">Carbon Footprint</h4>
          <p className="text-sm text-muted-foreground">
            Our farm has a low carbon footprint due to sustainable practices.
          </p>
          <p className="text-sm text-muted-foreground">
            We actively work to reduce emissions and promote carbon sequestration.
          </p>
        </div>
      </div>
    </div>
  );
}
