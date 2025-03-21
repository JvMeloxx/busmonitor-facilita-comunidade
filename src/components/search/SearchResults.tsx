
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BusRoute } from '@/types/busTypes';

interface SearchResultsProps {
  searchResults: BusRoute[];
  onClearSearch: () => void;
  onSelectRoute: (routeId: string) => void;
  isSearching: boolean;
}

const SearchResults = ({
  searchResults,
  onClearSearch,
  onSelectRoute,
  isSearching
}: SearchResultsProps) => {
  if (!isSearching || searchResults.length === 0) return null;

  return (
    <div className="fixed top-16 left-0 right-0 z-10 bg-background p-4 shadow-md max-h-[60vh] overflow-auto">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-medium text-muted-foreground">
          {searchResults.length} {searchResults.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
        </h2>
        <Button variant="ghost" size="sm" onClick={onClearSearch}>
          <X size={16} className="mr-1" />
          Fechar
        </Button>
      </div>
      <div className="space-y-2">
        {searchResults.map(route => (
          <Card 
            key={route.id} 
            className="p-3 hover:bg-accent cursor-pointer"
            onClick={() => onSelectRoute(route.id)}
          >
            <div className="flex items-center">
              <div 
                className="w-8 h-8 rounded-full mr-3 flex items-center justify-center text-white font-medium"
                style={{ backgroundColor: route.color }}
              >
                {route.number}
              </div>
              <div>
                <div className="font-medium">{route.name}</div>
                <div className="text-sm text-muted-foreground">{route.description}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
