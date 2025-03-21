
import React from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import { AlertTriangle } from 'lucide-react';

interface BusUpdate {
  routeId: string;
  time: string;
  status: string;
  coordinates: {
    x: string;
    y: string;
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
    const y = Number(update.coordinates.y);
    const x = Number(update.coordinates.x);
    
    if (isNaN(y) || isNaN(x)) {
      console.error(`Invalid coordinates for update:`, update.coordinates);
      return null;
    }
    
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
