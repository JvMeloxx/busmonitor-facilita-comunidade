
import React from 'react';
import { Polyline } from '@react-google-maps/api';

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
  const getPolylineCoordinates = (svgPath: string) => {
    try {
      const coordinates = [];
      const commands = svgPath.match(/[MLC][^MLC]*/g) || [];
      
      let x = 0, y = 0;
      for (const cmd of commands) {
        const type = cmd[0];
        const points = cmd.slice(1).trim().split(/\s+/).map(Number);
        
        if (type === 'M' && !isNaN(points[0]) && !isNaN(points[1])) {
          x = points[0];
          y = points[1];
          coordinates.push({ lat: mapCenter.lat + (y - 300) / 30000, lng: mapCenter.lng + (x - 400) / 30000 });
        } else if (type === 'L' && !isNaN(points[0]) && !isNaN(points[1])) {
          x = points[0];
          y = points[1];
          coordinates.push({ lat: mapCenter.lat + (y - 300) / 30000, lng: mapCenter.lng + (x - 400) / 30000 });
        } else if (type === 'C' && points.length >= 6 && !isNaN(points[4]) && !isNaN(points[5])) {
          x = points[4];
          y = points[5];
          coordinates.push({ lat: mapCenter.lat + (y - 300) / 30000, lng: mapCenter.lng + (x - 400) / 30000 });
        }
      }
      
      return coordinates.filter(coord => 
        !isNaN(coord.lat) && !isNaN(coord.lng) && 
        Math.abs(coord.lat) <= 90 && Math.abs(coord.lng) <= 180
      );
    } catch (error) {
      console.error("Error parsing SVG path:", error);
      return [];
    }
  };
  
  const coordinates = getPolylineCoordinates(route.pathCoordinates);
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
