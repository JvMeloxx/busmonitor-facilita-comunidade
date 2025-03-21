
import React, { useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  searchTerm: string;
  isSearching: boolean;
  onSearchChange: (term: string) => void;
  onClearSearch: () => void;
  onFocusSearch: () => void;
}

const SearchBar = ({
  searchTerm,
  isSearching,
  onSearchChange,
  onClearSearch,
  onFocusSearch
}: SearchBarProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex-1 relative">
      {isSearching ? (
        <div className="flex items-center w-full">
          <Input
            ref={searchInputRef}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Busque por bairro, ponto ou linha..."
            className="w-full pr-10"
          />
          {searchTerm && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-0 top-0 h-full"
              onClick={onClearSearch}
            >
              <X size={18} />
            </Button>
          )}
        </div>
      ) : (
        <Button 
          variant="outline" 
          className="w-full flex justify-start text-muted-foreground bg-background/90"
          onClick={onFocusSearch}
        >
          <Search size={16} className="mr-2" />
          Busque por bairro, ponto ou linha...
        </Button>
      )}
    </div>
  );
};

export default SearchBar;
