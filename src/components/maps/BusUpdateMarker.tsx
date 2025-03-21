
import React from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import { AlertTriangle } from 'lucide-react';

interface BusUpdate {
  routeId: string;
  time: string;
  status: string;
  coordinates: {
    x: string | number;
    y: string | number;
  };
  hasIssue: boolean;
}

interface BusUpdateMarkerProps {
  update: BusUpdate;
  route: {
    color: string;
    name: string;
    number: string;
  };
  index: number;
  mapCenter: { lat: number; lng: number };
  activeMarker: string | null;
  onClick: (markerId: string) => void;
  onCloseClick: () => void;
}

const BusUpdateMarker = ({
  update,
  route,
  index,
  mapCenter,
  activeMarker,
  onClick,
  onCloseClick
}: BusUpdateMarkerProps) => {
  try {
    // Converter as coordenadas para números
    const xValue = typeof update.coordinates.x === 'string' ? 
      parseFloat(update.coordinates.x.replace('%', '')) : update.coordinates.x;
    const yValue = typeof update.coordinates.y === 'string' ? 
      parseFloat(update.coordinates.y.replace('%', '')) : update.coordinates.y;
    
    if (isNaN(xValue) || isNaN(yValue)) {
      console.error(`Invalid coordinates for update:`, update.coordinates);
      return null;
    }
    
    // Normalizar valores percentuais para um range de 0-800 (para x) e 0-600 (para y)
    const x = typeof update.coordinates.x === 'string' && update.coordinates.x.includes('%') ? 
      (xValue / 100) * 800 : xValue;
    const y = typeof update.coordinates.y === 'string' && update.coordinates.y.includes('%') ? 
      (yValue / 100) * 600 : yValue;
    
    const position = {
      lat: mapCenter.lat + (y - 300) / 30000,
      lng: mapCenter.lng + (x - 400) / 30000,
    };
    
    const markerId = `${update.routeId}-${index}`;
    
    return (
      <Marker
        key={markerId}
        position={position}
        onClick={() => onClick(markerId)}
        icon={{
          path: 'M -10,-10 L 10,-10 L 10,10 L -10,10 z',
          fillColor: route.color,
          fillOpacity: 1,
          scale: 1.5,
          strokeColor: 'white',
          strokeWeight: 2,
        }}
        label={{
          text: route.number.toString(),
          color: 'white',
          fontWeight: 'bold',
          fontSize: '12px',
        }}
      >
        {activeMarker === markerId && (
          <InfoWindow onCloseClick={onCloseClick}>
            <div className="p-2">
              <p className="font-medium">{route.name}</p>
              <p className="text-sm">{update.time}</p>
              {update.hasIssue && (
                <p className="text-red-500 text-sm flex items-center mt-1">
                  <AlertTriangle size={12} className="mr-1" />
                  Problema reportado
                </p>
              )}
            </div>
          </InfoWindow>
        )}
      </Marker>
    );
  } catch (error) {
    console.error(`Error rendering bus ${index}:`, error);
    return null;
  }
};

export default BusUpdateMarker;
