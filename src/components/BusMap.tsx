
import React, { useEffect, useRef, useState } from 'react';
import { MapPin, AlertTriangle } from 'lucide-react';
import { busRoutes, recentUpdates } from '../data/busData';
import { toast } from 'sonner';

interface BusMapProps {
  selectedRoute: string | null;
  setSelectedRoute: (id: string | null) => void;
}

const BusMap = ({ selectedRoute, setSelectedRoute }: BusMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  useEffect(() => {
    // In a real app, this would be an actual map implementation like Mapbox
    // For demo purposes, we'll use a static image

    const loadMap = () => {
      // Simulate map loading
      setTimeout(() => {
        setMapLoaded(true);
        
        if (selectedRoute) {
          toast.info(`Mostrando rota ${busRoutes.find(r => r.id === selectedRoute)?.name}`);
        }
      }, 1000);
    };
    
    loadMap();
  }, [selectedRoute]);

  // Filter updates to show only selected route or all if none selected
  const filteredUpdates = selectedRoute 
    ? recentUpdates.filter(update => update.routeId === selectedRoute)
    : recentUpdates;

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-100">
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-background">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-muted-foreground">Carregando mapa...</p>
          </div>
        </div>
      )}
      
      {/* This would be replaced with an actual map in a real app */}
      <div className="w-full h-full bg-[#f2f6fa] relative">
        {/* Simplified city map representation */}
        <div className="absolute inset-0 p-6">
          {/* Central area */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-24 bg-gray-200 rounded-lg border-2 border-gray-300 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">Centro</span>
          </div>
          
          {/* Main roads */}
          <div className="absolute top-1/2 left-0 right-0 h-3 bg-gray-300"></div>
          <div className="absolute bottom-0 top-0 left-1/2 w-3 bg-gray-300 transform -translate-x-1/2"></div>
          
          {/* Neighborhoods */}
          <div className="absolute top-[20%] left-[20%] w-24 h-20 bg-gray-200 rounded-lg border border-gray-300 flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600">Jardim Ingá</span>
          </div>
          <div className="absolute top-[20%] right-[20%] w-24 h-20 bg-gray-200 rounded-lg border border-gray-300 flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600">Setor Leste</span>
          </div>
          <div className="absolute bottom-[20%] left-[20%] w-24 h-20 bg-gray-200 rounded-lg border border-gray-300 flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600">Parque Sol</span>
          </div>
          <div className="absolute bottom-[20%] right-[20%] w-24 h-20 bg-gray-200 rounded-lg border border-gray-300 flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600">Santa Luzia</span>
          </div>
          
          {/* Bus routes */}
          {busRoutes.map(route => {
            if (selectedRoute && route.id !== selectedRoute) return null;
            
            return (
              <React.Fragment key={route.id}>
                <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                  <path 
                    d={route.pathCoordinates}
                    stroke={route.color}
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    strokeDasharray={selectedRoute === route.id ? "none" : "8 8"}
                    className={selectedRoute === route.id ? "" : "opacity-40"}
                  />
                </svg>
              </React.Fragment>
            );
          })}
          
          {/* Bus markers */}
          {filteredUpdates.map((update, index) => {
            const route = busRoutes.find(r => r.id === update.routeId);
            if (!route) return null;
            
            return (
              <div 
                key={index}
                className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2"
                style={{ top: update.coordinates.y, left: update.coordinates.x }}
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md relative"
                  style={{ backgroundColor: route.color }}
                >
                  <span>{route.number}</span>
                  {update.hasIssue && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                      <AlertTriangle size={10} />
                    </div>
                  )}
                </div>
                <div className="mt-1 px-2 py-1 bg-white rounded-md shadow-sm text-xs font-medium whitespace-nowrap">
                  {update.time}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Disclaimer message */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <div className="bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-muted-foreground shadow-sm flex items-center">
          <MapPin size={12} className="mr-1" />
          <span>As localizações são aproximadas e baseadas em contribuições</span>
        </div>
      </div>
    </div>
  );
};

export default BusMap;
