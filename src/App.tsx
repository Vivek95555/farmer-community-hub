
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { SignInPage, SignUpPage, ForgotPasswordPage } from "./pages/AuthPages";
import DashboardPage from "./pages/DashboardPage";
import FarmersPage from "./pages/FarmersPage";
import FarmerProfilePage from "./pages/FarmerProfilePage";
import MarketplacePage from "./pages/MarketplacePage";
import { SustainabilityPage, CommunityPage } from "./pages/StaticPages";
import { ProfilePage, EcoPassportPage } from "./pages/ProfilePages";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/farmers" element={<FarmersPage />} />
            <Route path="/farmers/:id" element={<FarmerProfilePage />} />
            <Route path="/marketplace" element={<ProtectedRoute><MarketplacePage /></ProtectedRoute>} />
            <Route path="/sustainability" element={<ProtectedRoute><SustainabilityPage /></ProtectedRoute>} />
            <Route path="/community" element={<ProtectedRoute><CommunityPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/ecopassport" element={<ProtectedRoute><EcoPassportPage /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
