
import React from 'react';
import { BusRoute } from '@/types/busTypes';
import { Card } from '@/components/ui/card';

interface RouteDetailInfoProps {
  route: BusRoute;
}

const RouteDetailInfo = ({ route }: RouteDetailInfoProps) => {
  return (
    <div>
      <Card className="p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Sobre esta linha</h2>
        <p className="text-muted-foreground">
          Esta é a linha {route.number} - {route.name} que opera a partir do {route.terminal.name}.
        </p>
      </Card>
      
      <h2 className="text-lg font-semibold mb-3">Pontos de parada</h2>
      
      <div className="space-y-1">
        {route.stops.map((stop, index) => (
          <div 
            key={index}
            className="flex items-start p-3 rounded-lg"
            style={{ backgroundColor: index % 2 === 0 ? '#f9fafb' : 'white' }}
          >
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium mr-3 shrink-0"
              style={{ backgroundColor: route.color }}
            >
              {index + 1}
            </div>
            <div>
              <h3 className="font-medium">{stop.name}</h3>
              <p className="text-sm text-muted-foreground">{stop.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouteDetailInfo;
