
import React, { useState, useEffect, useRef } from 'react';
import { busRoutes } from '../data/busData';
import BusMap from '../components/BusMap';
import AppMenu from '../components/AppMenu';
import SearchBar from '@/components/search/SearchBar';
import SearchResults from '@/components/search/SearchResults';
import RouteDetailDrawer from '@/components/route-details/RouteDetailDrawer';
import MapLegend from '@/components/map/MapLegend';

const MapPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof busRoutes>([]);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [showRouteDetail, setShowRouteDetail] = useState(false);
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    if (term.length > 2) {
      // Simple search through busRoutes
      const results = busRoutes.filter(route => 
        route.name.toLowerCase().includes(term.toLowerCase()) || 
        route.number.toString().includes(term) ||
        route.description.toLowerCase().includes(term.toLowerCase()) ||
        route.stops.some(stop => stop.name.toLowerCase().includes(term.toLowerCase()))
      );
      
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setIsSearching(false);
    setSelectedRoute(null);
  };

  const focusSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      // We don't need the ref here since it's in the SearchBar component now
    }, 100);
  };

  const selectRoute = (routeId: string) => {
    setSelectedRoute(routeId);
    setIsSearching(false);
    setShowRouteDetail(true);
  };

  const selectedRouteData = selectedRoute 
    ? busRoutes.find(route => route.id === selectedRoute) 
    : null;

  return (
    <div className="min-h-screen relative flex flex-col bg-background">
      {/* App Bar */}
      <header className="fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm shadow-sm p-4 flex items-center gap-3">
        <AppMenu />
        
        <SearchBar 
          searchTerm={searchTerm}
          isSearching={isSearching}
          onSearchChange={handleSearch}
          onClearSearch={clearSearch}
          onFocusSearch={focusSearch}
        />
      </header>

      {/* Main Map Area */}
      <main className="flex-1 pt-16">
        <div className="h-[calc(100vh-4rem)]">
          <BusMap selectedRoute={selectedRoute} setSelectedRoute={setSelectedRoute} />
        </div>
      </main>

      {/* Search Results Overlay */}
      <SearchResults 
        searchResults={searchResults}
        onClearSearch={clearSearch}
        onSelectRoute={selectRoute}
        isSearching={isSearching}
      />

      {/* Route Detail Drawer */}
      <RouteDetailDrawer 
        open={showRouteDetail}
        onOpenChange={setShowRouteDetail}
        selectedRouteData={selectedRouteData}
      />

      {/* Map Legend */}
      <MapLegend />
    </div>
  );
};

export default MapPage;
