
import { NavBar } from "@/components/NavBar";
import { EcoPassport } from "@/components/EcoPassport";
import { useAuth } from "@/contexts/AuthContext";

export function ProfilePage() {
  const { user, profile } = useAuth();
  
  return (
    <div className="min-h-screen bg-muted/20">
      <NavBar />
      
      <main className="container px-4 py-16 pt-32">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Profile</h1>
        {profile ? (
          <div>
            <p>Name: {profile.name}</p>
            <p>Email: {user?.email}</p>
            <p>Role: {profile.role}</p>
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
      </main>
    </div>
  );
}

export function EcoPassportPage() {
  return (
    <div className="min-h-screen bg-muted/20">
      <NavBar />
      
      <main className="container px-4 py-16 pt-32">
        <EcoPassport />
      </main>
    </div>
  );
}
