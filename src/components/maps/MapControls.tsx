
import React from 'react';
import { BusFront, MapPin, Route } from 'lucide-react';

interface MapControlsProps {
  isPlacesApiEnabled: boolean;
  showBusStops: boolean;
  setShowBusStops: (show: boolean) => void;
  showRoutes?: boolean;
  setShowRoutes?: (show: boolean) => void;
}

export const MapControls = ({ 
  isPlacesApiEnabled, 
  showBusStops, 
  setShowBusStops,
  showRoutes = true,
  setShowRoutes = () => {}
}: MapControlsProps) => {
  return (
    <>
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button 
          onClick={() => setShowBusStops(!showBusStops)} 
          className={`px-3 py-2 rounded-md text-sm font-medium flex items-center shadow-md ${
            showBusStops 
              ? 'bg-primary text-white' 
              : 'bg-white text-gray-700'
          }`}
        >
          <BusFront size={16} className="mr-2" />
          {showBusStops ? 'Ocultar Pontos' : 'Mostrar Pontos'}
        </button>
        
        <button 
          onClick={() => setShowRoutes(!showRoutes)} 
          className={`px-3 py-2 rounded-md text-sm font-medium flex items-center shadow-md ${
            showRoutes 
              ? 'bg-primary text-white' 
              : 'bg-white text-gray-700'
          }`}
        >
          <Route size={16} className="mr-2" />
          {showRoutes ? 'Ocultar Rotas' : 'Mostrar Rotas'}
        </button>
      </div>
      
      <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-sm">
        <div className="flex items-center mb-1.5">
          <div className="w-3 h-3 rounded-full mr-2 bg-blue-500"></div>
          <span className="text-xs">Rotas de ônibus</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-600 mr-2"></div>
          <span className="text-xs">Pontos de ônibus</span>
        </div>
        {!isPlacesApiEnabled && (
          <div className="flex items-center text-amber-600">
            <div className="w-3 h-3 bg-amber-500 mr-2"></div>
            <span className="text-xs">Usando pontos demonstrativos</span>
          </div>
        )}
      </div>
      
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <div className="bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-muted-foreground shadow-sm flex items-center">
          <MapPin size={12} className="mr-1" />
          <span>As localizações são aproximadas e baseadas em contribuições</span>
        </div>
      </div>
    </>
  );
};

export default MapControls;
