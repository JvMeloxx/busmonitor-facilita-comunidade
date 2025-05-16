
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, ChevronRight } from 'lucide-react';
import { BusRoute } from '@/types/busTypes';
import { Card } from '@/components/ui/card';

interface RouteCardProps {
  route: BusRoute;
}

const RouteCard = ({ route }: RouteCardProps) => {
  return (
    <Link to={`/rotas/${route.id}`}>
      <Card className="p-4 border-l-4 bg-white hover:shadow-md transition-shadow" style={{ borderLeftColor: route.color }}>
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-white text-sm font-medium px-2 py-1 rounded-md`} style={{ backgroundColor: route.color }}>
                {route.number}
              </span>
              <h3 className="font-semibold text-lg">{route.name}</h3>
            </div>
            <p className="text-muted-foreground">{route.description}</p>
            
            <div className="flex flex-wrap gap-4 mt-3">
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock size={16} className="mr-1" />
                <span>Próximo: {route.nextScheduledTime || 'Não disponível'}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin size={16} className="mr-1" />
                <span>{route.terminal.name}</span>
              </div>
            </div>
          </div>
          
          <div className="flex">
            <ChevronRight size={20} className="text-muted-foreground ml-1 mt-1" />
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default RouteCard;
