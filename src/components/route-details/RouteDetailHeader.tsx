
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin } from 'lucide-react';
import { BusRoute } from '@/types/busTypes';

interface RouteDetailHeaderProps {
  route: BusRoute;
}

const RouteDetailHeader = ({ route }: RouteDetailHeaderProps) => {
  return (
    <>
      <header 
        className="sticky top-0 z-10 p-4 shadow-md"
        style={{ backgroundColor: `${route.color}` }}
      >
        <div className="flex justify-between items-center max-w-5xl mx-auto">
          <Link to="/rotas" className="focus-ring rounded-full p-2 bg-white/20 backdrop-blur-sm text-white">
            <ArrowLeft size={24} />
          </Link>
          
          <div className="text-center">
            <span className="bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-2 py-1 rounded-md">
              Linha {route.number}
            </span>
          </div>
        </div>
      </header>

      <div className="bg-white p-4" style={{ borderBottom: `4px solid ${route.color}` }}>
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold mb-1">{route.name}</h1>
          <p className="text-muted-foreground">{route.description}</p>
          
          {route.nextScheduledTime && (
            <div className="flex flex-wrap gap-4 mt-3">
              <div className="flex items-center text-sm">
                <Clock size={16} className="mr-1 text-muted-foreground" />
                <span>Próximo: <strong>{route.nextScheduledTime}</strong></span>
              </div>
              <div className="flex items-center text-sm">
                <MapPin size={16} className="mr-1 text-muted-foreground" />
                <span><strong>{route.terminal.name}</strong></span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RouteDetailHeader;
