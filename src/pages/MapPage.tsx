
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Bus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import BusMap from '../components/BusMap';
import { busRoutes } from '../data/busData';

const MapPage = () => {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [showRouteSelector, setShowRouteSelector] = useState(false);

  const toggleRouteSelector = () => {
    setShowRouteSelector(!showRouteSelector);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-10 bg-background shadow-md p-4">
        <div className="flex justify-between items-center max-w-5xl mx-auto">
          <Link to="/" className="focus-ring rounded-full p-2">
            <ArrowLeft size={24} />
          </Link>
          
          <h1 className="text-xl font-semibold">Mapa de Ônibus</h1>
          
          <Button 
            variant="outline"
            size="icon" 
            className="rounded-full"
            onClick={toggleRouteSelector}
          >
            <Filter size={20} />
          </Button>
        </div>
      </header>

      <main className="flex-1 relative">
        {showRouteSelector && (
          <div className="absolute top-0 right-0 left-0 z-10 bg-background p-4 shadow-md">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-lg font-medium mb-3">Selecione uma linha para filtrar</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {busRoutes.map(route => (
                  <Button
                    key={route.id}
                    variant={selectedRoute === route.id ? "default" : "outline"}
                    className="justify-start overflow-hidden"
                    onClick={() => {
                      setSelectedRoute(selectedRoute === route.id ? null : route.id);
                      if (selectedRoute !== route.id) {
                        setShowRouteSelector(false);
                      }
                    }}
                  >
                    <div 
                      className="w-6 h-6 rounded-full mr-2 flex items-center justify-center text-white text-xs font-medium"
                      style={{ backgroundColor: route.color }}
                    >
                      {route.number}
                    </div>
                    <span className="truncate">{route.name.split('-')[1] || route.name}</span>
                  </Button>
                ))}
                {selectedRoute && (
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => setSelectedRoute(null)}
                  >
                    Mostrar todos
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="h-[calc(100vh-64px)]">
          <BusMap selectedRoute={selectedRoute} setSelectedRoute={setSelectedRoute} />
        </div>
      </main>

      <div className="fixed bottom-5 left-0 right-0 px-4 flex justify-center">
        <Card className="p-3 shadow-lg bg-white/90 backdrop-blur-sm max-w-xs w-full">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Bus size={20} className="text-primary mr-2" />
              <span className="font-medium">{selectedRoute ? busRoutes.find(r => r.id === selectedRoute)?.name : 'Todas as linhas'}</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              asChild
              className="text-xs"
            >
              <Link to="/contribuir">
                <MapPin size={14} className="mr-1" />
                Contribuir
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MapPage;
