
import React from 'react';

interface MapLoaderProps {
  mapLoaded: boolean;
}

const MapLoader = ({ mapLoaded }: MapLoaderProps) => {
  if (mapLoaded) return null;
  
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-muted-foreground">Carregando mapa...</p>
      </div>
    </div>
  );
};

export default MapLoader;
