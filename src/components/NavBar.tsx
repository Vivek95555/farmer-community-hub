
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Users, 
  ShoppingCart, 
  Leaf, 
  MessagesSquare, 
  User, 
  LogOut, 
  Menu, 
  X 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface NavItemProps {
  path: string;
  label: string;
  icon: React.ElementType;
  currentPath: string;
  onClick?: () => void;
}

const NavItem = ({ path, label, icon: Icon, currentPath, onClick }: NavItemProps) => {
  const isActive = currentPath === path;
  
  return (
    <Link 
      to={path} 
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors",
        isActive 
          ? "bg-primary text-primary-foreground" 
          : "text-foreground/70 hover:bg-secondary hover:text-foreground"
      )}
      onClick={onClick}
    >
      <Icon size={20} className={cn(isActive ? "text-primary-foreground" : "text-muted-foreground")} />
      <span>{label}</span>
    </Link>
  );
};

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut, isLoading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const navItems = [
    { path: "/dashboard", label: "Home", icon: Home },
    { path: "/farmers", label: "Farmers", icon: Users },
    { path: "/marketplace", label: "Marketplace", icon: ShoppingCart },
    { path: "/sustainability", label: "Sustainability", icon: Leaf },
    { path: "/community", label: "Community", icon: MessagesSquare },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-6",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b py-3" : "py-5"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-agritrust-400 to-agritrust-600 flex items-center justify-center">
            <Leaf className="h-5 w-5 text-white" />
          </div>
          <span className="font-semibold text-xl">AgriTrust</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavItem
              key={item.path}
              path={item.path}
              label={item.label}
              icon={item.icon}
              currentPath={location.pathname}
            />
          ))}
        </nav>
        
        <div className="flex items-center gap-2">
          {user && profile ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border-2 border-primary/10">
                    <AvatarImage src={profile.image || ""} alt={profile.name} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {profile.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{profile.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    <p className="text-xs leading-none text-primary mt-1 capitalize">{profile.role}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                    <User size={16} />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                {profile.role === "farmer" && (
                  <DropdownMenuItem asChild>
                    <Link to="/ecopassport" className="flex items-center gap-2 cursor-pointer">
                      <Leaf size={16} />
                      <span>ecoPassport</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-destructive focus:text-destructive cursor-pointer">
                  <LogOut size={16} />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : !isLoading && (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm" className="hidden sm:flex">
                <Link to="/signin">Sign In</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
          
          {/* Mobile Menu Trigger */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu size={24} />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] pt-12">
              <nav className="flex flex-col gap-2 mt-8">
                {navItems.map((item) => (
                  <NavItem
                    key={item.path}
                    path={item.path}
                    label={item.label}
                    icon={item.icon}
                    currentPath={location.pathname}
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                ))}
                {!user && (
                  <>
                    <div className="h-px bg-border my-4" />
                    <NavItem
                      path="/signin"
                      label="Sign In"
                      icon={() => <User size={20} />}
                      currentPath={location.pathname}
                      onClick={() => setIsMobileMenuOpen(false)}
                    />
                    <Button asChild className="w-full mt-2">
                      <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
                    </Button>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
