
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import MapPage from "./pages/MapPage";
import RoutesPage from "./pages/RoutesPage";
import ContributePage from "./pages/ContributePage";
import FavoritesPage from "./pages/FavoritesPage";
import RouteDetailPage from "./pages/RouteDetailPage";
import NotFound from "./pages/NotFound";
import SettingsPage from "./pages/SettingsPage";
import AboutPage from "./pages/AboutPage";
import AdPopup from "./components/AdPopup";
import { getRandomAd, initAdSystem, shouldShowAds } from "./utils/adManager";

const queryClient = new QueryClient();

const App = () => {
  const [showAd, setShowAd] = useState(false);
  const [currentAd, setCurrentAd] = useState(getRandomAd());

  useEffect(() => {
    // Initialize the ad system
    initAdSystem();
    
    // Check if we should show ads
    if (!shouldShowAds()) {
      return;
    }
    
    // Store current timestamp in localStorage when app is opened
    const lastOpenTimestamp = localStorage.getItem('lastOpenTimestamp');
    const currentTime = new Date().getTime();
    
    // Set the current time as the last open timestamp
    localStorage.setItem('lastOpenTimestamp', currentTime.toString());
    
    // If there's a previous timestamp and it's been more than 10 minutes (600000ms)
    // this helps to not show the ad if the user just refreshes the page
    if (lastOpenTimestamp) {
      const timeDifference = currentTime - parseInt(lastOpenTimestamp);
      if (timeDifference < 600000) {
        setShowAd(false);
        return;
      }
    }
    
    // Get a random ad and show it
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
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AdPopup open={showAd} onClose={handleCloseAd} advertisement={currentAd} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MapPage />} />
            <Route path="/map" element={<Navigate to="/" replace />} />
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
  );
};

export default App;
