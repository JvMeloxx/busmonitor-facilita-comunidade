
import React from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import { BusFront } from 'lucide-react';
import { busStopIcon } from '../../utils/mapUtils';

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
      icon={busStopIcon}
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
