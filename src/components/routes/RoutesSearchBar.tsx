
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface RoutesSearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const RoutesSearchBar = ({ searchTerm, setSearchTerm }: RoutesSearchBarProps) => {
  return (
    <div className="p-4 border-b">
      <div className="max-w-5xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder="Buscar por número ou nome da linha" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-6 text-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default RoutesSearchBar;
