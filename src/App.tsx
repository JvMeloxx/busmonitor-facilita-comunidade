import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { ThemeProvider } from "./context/ThemeContext";
import CompanySelectionPage from "./pages/CompanySelectionPage";
import MapPage from "./pages/MapPage";
import RoutesPage from "./pages/RoutesPage";
import ContributePage from "./pages/ContributePage";
import FavoritesPage from "./pages/FavoritesPage";
import RouteDetailPage from "./pages/RouteDetailPage";
import NotFound from "./pages/NotFound";
import SettingsPage from "./pages/SettingsPage";
import AboutPage from "./pages/AboutPage";
import AdPopup from "./components/AdPopup";
import { getRandomAd, initAdSystem } from "./utils/adManager";

const queryClient = new QueryClient();

const App = () => {
  const [showAd, setShowAd] = useState(false);
  const [currentAd, setCurrentAd] = useState(getRandomAd());

  useEffect(() => {
    // Initialize the ad system
    initAdSystem();
    
    // Sempre mostrar o anúncio ao iniciar a aplicação
    const ad = getRandomAd();
    if (ad) {
      setCurrentAd(ad);
      setShowAd(true);
    }
  }, []);

  const handleCloseAd = () => {
    setShowAd(false);
  };

  return (
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
              <Route path="/rotas/:id" element={<RouteDetailPage />} />
              <Route path="/contribuir" element={<ContributePage />} />
              <Route path="/favoritos" element={<FavoritesPage />} />
              <Route path="/configuracoes" element={<SettingsPage />} />
              <Route path="/sobre" element={<AboutPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
