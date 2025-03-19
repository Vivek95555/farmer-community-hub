
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { EcoPassport } from "@/components/EcoPassport";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Lock, Bell, ArrowRight, CreditCard, LogOut } from "lucide-react";
import { toast } from "sonner";

export function ProfilePage() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("general");
  
  // Mock user data
  const [user, setUser] = useState({
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "(555) 123-4567",
    role: "farmer", // or "consumer"
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  });
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  const handleSaveProfile = () => {
    toast.success("Profile updated successfully");
  };
  
  const handleChangePassword = () => {
    toast.success("Password changed successfully");
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <NavBar userRole={user.role as "farmer" | "consumer"} />
      
      <main className="container px-4 py-8 pt-32 md:px-6 md:py-12 md:pt-32">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
          <p className="mt-1 text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <Card className="h-fit shadow-subtle">
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>
                Manage your account preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs
                orientation="vertical"
                value={activeTab}
                onValueChange={setActiveTab}
                className="h-full"
              >
                <TabsList className="flex w-full flex-col items-start justify-start rounded-none border-r bg-transparent p-0">
                  <TabsTrigger
                    value="general"
                    className="flex w-full items-center justify-start rounded-none border-r-2 border-transparent px-6 py-3 data-[state=active]:border-r-primary data-[state=active]:bg-muted/50"
                  >
                    <User className="mr-2 h-4 w-4" />
                    General
                  </TabsTrigger>
                  <TabsTrigger
                    value="security"
                    className="flex w-full items-center justify-start rounded-none border-r-2 border-transparent px-6 py-3 data-[state=active]:border-r-primary data-[state=active]:bg-muted/50"
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    Security
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className="flex w-full items-center justify-start rounded-none border-r-2 border-transparent px-6 py-3 data-[state=active]:border-r-primary data-[state=active]:bg-muted/50"
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger
                    value="billing"
                    className="flex w-full items-center justify-start rounded-none border-r-2 border-transparent px-6 py-3 data-[state=active]:border-r-primary data-[state=active]:bg-muted/50"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Billing
                  </TabsTrigger>
                  <Separator className="my-2" />
                  <div className="px-6 py-3">
                    <Button
                      variant="ghost"
                      className="flex w-full items-center justify-start p-0 text-destructive hover:bg-transparent hover:text-destructive"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Button>
                  </div>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>
          
          <div>
            <Tabs value={activeTab} className="h-full space-y-6">
              <TabsContent value="general" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>General Information</CardTitle>
                    <CardDescription>
                      Update your personal information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            placeholder="John Doe"
                            value={user.name}
                            onChange={(e) =>
                              setUser({ ...user, name: e.target.value })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={user.email}
                            onChange={(e) =>
                              setUser({ ...user, email: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            placeholder="(555) 123-4567"
                            value={user.phone}
                            onChange={(e) =>
                              setUser({ ...user, phone: e.target.value })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role">Role</Label>
                          <Input
                            id="role"
                            value={user.role === "farmer" ? "Farmer" : "Consumer"}
                            disabled
                          />
                        </div>
                      </div>
                      <Button onClick={handleSaveProfile}>Save Changes</Button>
                    </form>
                  </CardContent>
                </Card>
                
                {user.role === "farmer" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>ecoPassport</CardTitle>
                      <CardDescription>
                        View and manage your ecoPassport
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-muted-foreground">
                        Your ecoPassport showcases your farming practices and products to consumers.
                        Keep it updated to build trust and transparency.
                      </p>
                      <Button asChild>
                        <a href="/ecopassport">
                          View ecoPassport
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>
                      Update your password to keep your account secure
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                      <Button onClick={handleChangePassword}>Update Password</Button>
                    </form>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                    <CardDescription>
                      Add an extra layer of security to your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 flex items-center">
                      <div className="mr-4 h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="text-base font-medium">
                          Two-factor authentication is currently disabled
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Enable two-factor authentication for enhanced security
                        </p>
                      </div>
                    </div>
                    <Button variant="outline">Enable 2FA</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Control how and when you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="flex items-center justify-between rounded-md border p-4">
                        <div>
                          <h4 className="font-medium">Email Notifications</h4>
                          <p className="text-sm text-muted-foreground">
                            Receive updates via email
                          </p>
                        </div>
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input type="checkbox" className="peer sr-only" checked />
                          <div className="peer h-6 w-11 rounded-full bg-muted after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-focus:outline-none"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between rounded-md border p-4">
                        <div>
                          <h4 className="font-medium">Order Updates</h4>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications about your orders
                          </p>
                        </div>
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input type="checkbox" className="peer sr-only" checked />
                          <div className="peer h-6 w-11 rounded-full bg-muted after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-focus:outline-none"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between rounded-md border p-4">
                        <div>
                          <h4 className="font-medium">Marketing Emails</h4>
                          <p className="text-sm text-muted-foreground">
                            Receive promotional offers and updates
                          </p>
                        </div>
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input type="checkbox" className="peer sr-only" />
                          <div className="peer h-6 w-11 rounded-full bg-muted after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-focus:outline-none"></div>
                        </label>
                      </div>
                      
                      <Button>Save Preferences</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="billing" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Billing Information</CardTitle>
                    <CardDescription>
                      Manage your payment methods and billing details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border p-4">
                      <h4 className="font-medium">Current Plan</h4>
                      <div className="mt-2 flex justify-between">
                        <div>
                          <p className="text-sm font-medium">Free Plan</p>
                          <p className="text-sm text-muted-foreground">
                            Basic features for farmers and consumers
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Upgrade
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="mb-4 font-medium">Payment Methods</h4>
                      <div className="rounded-md border p-4">
                        <p className="text-sm text-muted-foreground">
                          No payment methods added yet.
                        </p>
                        <Button variant="outline" className="mt-4" size="sm">
                          Add Payment Method
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}

export function EcoPassportPage() {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-muted/20">
      <NavBar userRole="farmer" />
      
      <main className="container px-4 py-8 pt-32 md:px-6 md:py-12 md:pt-32">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">ecoPassport</h1>
          <p className="mt-1 text-muted-foreground">
            Showcase your sustainable farming practices and products
          </p>
        </div>
        
        <EcoPassport />
      </main>
    </div>
  );
}
