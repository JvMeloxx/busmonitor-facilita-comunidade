
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { ThemeProvider } from "./context/ThemeContext";
import { SupabaseProvider } from "./context/SupabaseContext";
import CompanySelectionPage from "./pages/CompanySelectionPage";
import MapPage from "./pages/MapPage";
import RoutesPage from "./pages/RoutesPage";
import NotFound from "./pages/NotFound";
import AdPopup from "./components/AdPopup";
import { getRandomAd, initAdSystem } from "./utils/adManager";

const queryClient = new QueryClient();

const App = () => {
  const [showAd, setShowAd] = useState(false);
  const [currentAd, setCurrentAd] = useState(null);

  useEffect(() => {
    // Initialize the ad system
    initAdSystem();
    
    // Get the "mamae" ad specifically to show it first
    const mamaead = getRandomAd();
    if (mamaead) {
      setCurrentAd(mamaead);
      setShowAd(true);
    }
  }, []);

  const handleCloseAd = () => {
    setShowAd(false);
  };

  return (
    <SupabaseProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AdPopup open={showAd} onClose={handleCloseAd} advertisement={currentAd} />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<CompanySelectionPage />} />
                {/* "Ver Ônibus" rota ainda está presente no código, mas redirecionada para rotas */}
                <Route path="/mapa" element={<Navigate to="/rotas" replace />} />
                <Route path="/rotas" element={<RoutesPage />} />
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
