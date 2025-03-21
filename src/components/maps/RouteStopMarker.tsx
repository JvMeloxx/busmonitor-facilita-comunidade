
import React from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';

interface RouteStop {
  name: string;
  address: string;
  coordinates: {
    x: string | number;
    y: string | number;
  };
}

interface RouteStopMarkerProps {
  stop: RouteStop;
  index: number;
  routeColor: string;
  mapCenter: { lat: number; lng: number };
  activeStopIndex: number | null;
  onMarkerClick: (index: number) => void;
  onCloseClick: () => void;
}

const RouteStopMarker = ({ 
  stop, 
  index, 
  routeColor, 
  mapCenter, 
  activeStopIndex, 
  onMarkerClick, 
  onCloseClick 
}: RouteStopMarkerProps) => {
  try {
    const y = Number(stop.coordinates.y);
    const x = Number(stop.coordinates.x);
    
    if (isNaN(y) || isNaN(x)) {
      console.error(`Invalid coordinates for stop ${stop.name}:`, stop.coordinates);
      return null;
    }
    
    const position = {
      lat: mapCenter.lat + (y - 300) / 30000,
      lng: mapCenter.lng + (x - 400) / 30000,
    };
    
    return (
      <Marker
        key={`stop-${index}`}
        position={position}
        onClick={() => onMarkerClick(index)}
        icon={{
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: '#ffffff',
          fillOpacity: 1,
          scale: 8,
          strokeColor: routeColor,
          strokeWeight: 2,
        }}
        label={{
          text: (index + 1).toString(),
          color: '#000000',
          fontSize: '10px',
        }}
      >
        {activeStopIndex === index && (
          <InfoWindow onCloseClick={onCloseClick}>
            <div className="p-2">
              <p className="font-medium">{stop.name}</p>
              <p className="text-sm">{stop.address}</p>
            </div>
          </InfoWindow>
        )}
      </Marker>
    );
  } catch (error) {
    console.error(`Error rendering stop ${index}:`, error);
    return null;
  }
};

export default RouteStopMarker;
