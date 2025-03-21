
import React from 'react';
import { Polyline } from '@react-google-maps/api';
import { getPolylineCoordinates } from '../../utils/mapUtils';

interface RoutePolylineProps {
  route: {
    id: string;
    color: string;
    pathCoordinates: string;
  };
  selectedRoute: string | null;
  mapCenter: { lat: number; lng: number };
  onClick: (routeId: string) => void;
}

const RoutePolyline = ({ route, selectedRoute, mapCenter, onClick }: RoutePolylineProps) => {
  const coordinates = getPolylineCoordinates(route.pathCoordinates, mapCenter);
  if (coordinates.length === 0) return null;
  
  const isDashed = selectedRoute !== route.id;
  
  if (isDashed) {
    const segments = [];
    for (let i = 0; i < coordinates.length - 1; i++) {
      if (i % 2 === 0) {
        segments.push(
          <Polyline
            key={`${route.id}-segment-${i}`}
            path={[coordinates[i], coordinates[i + 1]]}
            options={{
              strokeColor: route.color,
              strokeOpacity: 0.6,
              strokeWeight: 6
            }}
            onClick={() => onClick(route.id)}
          />
        );
      }
    }
    return <>{segments}</>;
  } else {
    return (
      <Polyline
        key={route.id}
        path={coordinates}
        options={{
          strokeColor: route.color,
          strokeOpacity: 1,
          strokeWeight: 6
        }}
        onClick={() => onClick(route.id)}
      />
    );
  }
};

export default RoutePolyline;
