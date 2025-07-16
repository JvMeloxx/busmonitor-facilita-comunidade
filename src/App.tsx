
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { SupabaseProvider } from "./context/SupabaseContext";
import { useOfflineMode } from "./hooks/useOfflineMode";
import { cacheManager } from "./utils/cacheManager";
import CompanySelectionPage from "./pages/CompanySelectionPage";
import MapPage from "./pages/MapPage";
import RoutesPage from "./pages/RoutesPage";
import RouteDetailPage from "./pages/RouteDetailPage";
import NotFound from "./pages/NotFound";
import AdvertisementDashboard from "./pages/AdvertisementDashboard";

const queryClient = new QueryClient();

// Initialize cache cleanup on app start
const initializeApp = () => {
  // Clear expired cache entries on startup
  cacheManager.clearExpired();
  
  // Log cache stats for debugging
  const stats = cacheManager.getStats();
  console.log('Cache stats on startup:', stats);
};
const App = () => {
  // Initialize app
  React.useEffect(() => {
    initializeApp();
  }, []);

  return (
    <SupabaseProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<CompanySelectionPage />} />
                <Route path="/mapa" element={<Navigate to="/rotas" replace />} />
                <Route path="/rotas" element={<RoutesPage />} />
                <Route path="/rotas/:id" element={<RouteDetailPage />} />
                <Route path="/anuncios" element={<AdvertisementDashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </SupabaseProvider>
  );
};

export default App;
