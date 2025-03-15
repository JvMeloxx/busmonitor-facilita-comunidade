
import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import { busRoutes, recentUpdates } from '../data/busData';

interface RouteMapProps {
  routeId: string;
  routeColor: string;
}

const RouteMap = ({ routeId, routeColor }: RouteMapProps) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const route = busRoutes.find(r => r.id === routeId);
  const updates = recentUpdates.filter(update => update.routeId === routeId);
  
  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  if (!route) return null;

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
          
          {/* Bus route */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
            <path 
              d={route.pathCoordinates}
              stroke={routeColor}
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          
          {/* Bus stops */}
          {route.stops.map((stop, index) => (
            <div 
              key={index}
              className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2"
              style={{ top: stop.coordinates.y, left: stop.coordinates.x }}
            >
              <div className="w-8 h-8 rounded-full bg-white border-2 flex items-center justify-center shadow-medium" style={{ borderColor: routeColor }}>
                <span className="text-xs font-bold">{index + 1}</span>
              </div>
            </div>
          ))}
          
          {/* Bus markers */}
          {updates.map((update, index) => (
            <div 
              key={index}
              className="absolute bus-marker z-20 transform -translate-x-1/2 -translate-y-1/2"
              style={{ top: update.coordinates.y, left: update.coordinates.x }}
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-medium"
                style={{ backgroundColor: routeColor }}
              >
                <span>{route.number}</span>
              </div>
              <div className="mt-1 px-2 py-1 bg-white rounded-md shadow-soft text-xs font-medium whitespace-nowrap">
                {update.time}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-soft">
        <div className="flex items-center mb-1.5">
          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: routeColor }}></div>
          <span className="text-xs">Rota do ônibus</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full border mr-2" style={{ borderColor: routeColor }}></div>
          <span className="text-xs">Pontos de parada</span>
        </div>
      </div>
    </div>
  );
};

export default RouteMap;
