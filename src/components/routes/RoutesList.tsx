
import React from 'react';
import { BusRoute } from '@/types/busTypes';
import RouteCard from './RouteCard';

interface RoutesListProps {
  routes: BusRoute[];
  favorites: string[];
  toggleFavorite: (routeId: string) => void;
  companyName: string;
}

const RoutesList = ({ routes, favorites, toggleFavorite, companyName }: RoutesListProps) => {
  if (routes.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">Nenhuma linha encontrada para {companyName}. Tente outra busca ou selecione outra empresa.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {routes.map((route) => (
        <div key={route.id}>
          <RouteCard 
            route={route} 
            favorites={favorites} 
            toggleFavorite={toggleFavorite} 
          />
        </div>
      ))}
    </div>
  );
};

export default RoutesList;
