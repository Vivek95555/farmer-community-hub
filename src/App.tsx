
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { SignInPage, SignUpPage, ForgotPasswordPage } from "./pages/AuthPages";
import DashboardPage from "./pages/DashboardPage";
import FarmersPage from "./pages/FarmersPage";
import MarketplacePage from "./pages/MarketplacePage";
import { SustainabilityPage, CommunityPage } from "./pages/StaticPages";
import { ProfilePage, EcoPassportPage } from "./pages/ProfilePages";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/farmers" element={<FarmersPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/sustainability" element={<SustainabilityPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/ecopassport" element={<EcoPassportPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
