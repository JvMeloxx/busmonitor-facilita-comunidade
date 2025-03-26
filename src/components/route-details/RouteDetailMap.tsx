
import React from 'react';
import RouteMap from '../RouteMap';

interface RouteDetailMapProps {
  routeId: string;
  routeColor: string;
}

const RouteDetailMap = ({ routeId, routeColor }: RouteDetailMapProps) => {
  return (
    <div className="h-[calc(100vh-220px)] min-h-[400px]">
      <RouteMap routeId={routeId} routeColor={routeColor} />
    </div>
  );
};

export default RouteDetailMap;
