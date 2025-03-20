
import React, { useState, useRef } from 'react';
import { Search, MapPin, X, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { busRoutes } from '../data/busData';
import BusMap from '../components/BusMap';
import AppMenu from '../components/AppMenu';
import { 
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";

const MapPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof busRoutes>([]);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [showRouteDetail, setShowRouteDetail] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    if (term.length > 2) {
      // Simple search through busRoutes
      const results = busRoutes.filter(route => 
        route.name.toLowerCase().includes(term.toLowerCase()) || 
        route.number.toString().includes(term) ||
        route.description.toLowerCase().includes(term.toLowerCase()) ||
        route.stops.some(stop => stop.name.toLowerCase().includes(term.toLowerCase()))
      );
      
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setIsSearching(false);
    setSelectedRoute(null);
  };

  const focusSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  };

  const selectRoute = (routeId: string) => {
    setSelectedRoute(routeId);
    setIsSearching(false);
    setShowRouteDetail(true);
  };

  const selectedRouteData = selectedRoute 
    ? busRoutes.find(route => route.id === selectedRoute) 
    : null;

  // Helper function to get all schedule times for display
  const getAllScheduleTimes = (route: typeof busRoutes[0]) => {
    if (!route) return [];
    
    // Combine all times from all periods and days into a single array
    const allTimes = [
      ...route.schedule.mondayToFriday.morning,
      ...route.schedule.mondayToFriday.afternoon,
      ...route.schedule.mondayToFriday.evening,
      ...route.schedule.saturdayAndHoliday.morning,
      ...route.schedule.saturdayAndHoliday.afternoon,
      ...route.schedule.saturdayAndHoliday.evening,
      ...route.schedule.sunday.morning,
      ...route.schedule.sunday.afternoon,
      ...route.schedule.sunday.evening
    ];
    
    // Remove duplicates
    return [...new Set(allTimes)].sort();
  };

  return (
    <div className="min-h-screen relative flex flex-col bg-background">
      {/* App Bar */}
      <header className="fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm shadow-sm p-4 flex items-center gap-3">
        <AppMenu />
        
        <div className="flex-1 relative">
          {isSearching ? (
            <div className="flex items-center w-full">
              <Input
                ref={searchInputRef}
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Busque por bairro, ponto ou linha..."
                className="w-full pr-10"
              />
              {searchTerm && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-0 top-0 h-full"
                  onClick={clearSearch}
                >
                  <X size={18} />
                </Button>
              )}
            </div>
          ) : (
            <Button 
              variant="outline" 
              className="w-full flex justify-start text-muted-foreground bg-background/90"
              onClick={focusSearch}
            >
              <Search size={16} className="mr-2" />
              Busque por bairro, ponto ou linha...
            </Button>
          )}
        </div>
      </header>

      {/* Main Map Area */}
      <main className="flex-1 pt-16">
        <div className="h-[calc(100vh-4rem)]">
          <BusMap selectedRoute={selectedRoute} setSelectedRoute={setSelectedRoute} />
        </div>
      </main>

      {/* Search Results Overlay */}
      {isSearching && searchResults.length > 0 && (
        <div className="fixed top-16 left-0 right-0 z-10 bg-background p-4 shadow-md max-h-[60vh] overflow-auto">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-medium text-muted-foreground">
              {searchResults.length} {searchResults.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
            </h2>
            <Button variant="ghost" size="sm" onClick={clearSearch}>
              <X size={16} className="mr-1" />
              Fechar
            </Button>
          </div>
          <div className="space-y-2">
            {searchResults.map(route => (
              <Card 
                key={route.id} 
                className="p-3 hover:bg-accent cursor-pointer"
                onClick={() => selectRoute(route.id)}
              >
                <div className="flex items-center">
                  <div 
                    className="w-8 h-8 rounded-full mr-3 flex items-center justify-center text-white font-medium"
                    style={{ backgroundColor: route.color }}
                  >
                    {route.number}
                  </div>
                  <div>
                    <div className="font-medium">{route.name}</div>
                    <div className="text-sm text-muted-foreground">{route.description}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Route Detail Drawer */}
      <Drawer open={showRouteDetail} onOpenChange={setShowRouteDetail}>
        <DrawerContent>
          <DrawerHeader>
            {selectedRouteData && (
              <>
                <div className="flex items-center">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium mr-3"
                    style={{ backgroundColor: selectedRouteData.color }}
                  >
                    {selectedRouteData.number}
                  </div>
                  <div>
                    <DrawerTitle>{selectedRouteData.name}</DrawerTitle>
                    <DrawerDescription>{selectedRouteData.description}</DrawerDescription>
                  </div>
                </div>
              </>
            )}
          </DrawerHeader>
          
          {selectedRouteData && (
            <div className="px-4 pb-4">
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Frequência</h3>
                <p className="text-sm text-muted-foreground">{selectedRouteData.frequency}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Próximos Horários</h3>
                <div className="grid grid-cols-3 gap-2">
                  {getAllScheduleTimes(selectedRouteData).slice(0, 6).map((time, idx) => (
                    <div key={idx} className="bg-accent rounded-md p-2 text-center text-sm">
                      {time}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Pontos de Parada</h3>
                <div className="space-y-2">
                  {selectedRouteData.stops.map((stop, idx) => (
                    <div key={idx} className="flex items-start">
                      <MapPin size={16} className="mr-2 mt-0.5 shrink-0 text-muted-foreground" />
                      <div>
                        <div className="font-medium text-sm">{stop.name}</div>
                        <div className="text-xs text-muted-foreground">{stop.address}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <DrawerFooter>
            <Button variant="outline" onClick={() => setShowRouteDetail(false)}>
              Voltar ao mapa
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Map Legend */}
      <div className="fixed bottom-4 right-4 z-10">
        <Button variant="outline" size="sm" className="rounded-full bg-white/80 backdrop-blur-sm shadow-md">
          <Info size={16} className="mr-1.5" />
          Legenda
        </Button>
      </div>
    </div>
  );
};

export default MapPage;
