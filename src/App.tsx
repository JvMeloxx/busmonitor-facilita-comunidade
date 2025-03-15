
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RoutesPage from "./pages/RoutesPage";
import ContributePage from "./pages/ContributePage";
import FavoritesPage from "./pages/FavoritesPage";
import MapPage from "./pages/MapPage";
import RouteDetailPage from "./pages/RouteDetailPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/rotas" element={<RoutesPage />} />
          <Route path="/rotas/:id" element={<RouteDetailPage />} />
          <Route path="/contribuir" element={<ContributePage />} />
          <Route path="/favoritos" element={<FavoritesPage />} />
          <Route path="/mapa" element={<MapPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
