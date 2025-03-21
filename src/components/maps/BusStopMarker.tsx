
import React from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import { BusFront } from 'lucide-react';

interface BusStop {
  id: string;
  name: string;
  address: string;
  position: {
    lat: number;
    lng: number;
  };
}

interface BusStopMarkerProps {
  stop: BusStop;
  activeMarker: string | null;
  onClick: (markerId: string) => void;
  onCloseClick: () => void;
}

const BusStopMarker = ({ stop, activeMarker, onClick, onCloseClick }: BusStopMarkerProps) => {
  return (
    <Marker
      key={stop.id}
      position={stop.position}
      onClick={() => onClick(stop.id)}
      icon={{
        path: 'M 0,0 m -2,-2 v 4 h 4 v -4 z',
        fillColor: '#4171E1',
        fillOpacity: 0.8,
        scale: 2,
        strokeColor: 'white',
        strokeWeight: 1,
      }}
    >
      {activeMarker === stop.id && (
        <InfoWindow onCloseClick={onCloseClick}>
          <div className="p-2">
            <p className="font-medium">{stop.name}</p>
            <p className="text-sm">{stop.address}</p>
            <div className="flex items-center mt-2 text-xs text-blue-600">
              <BusFront size={14} className="mr-1" />
              Ponto de ônibus
            </div>
          </div>
        </InfoWindow>
      )}
    </Marker>
  );
};

export default BusStopMarker;
