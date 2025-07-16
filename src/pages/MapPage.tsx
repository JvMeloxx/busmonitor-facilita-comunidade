
import React, { useState, useEffect, useRef } from 'react';
import { busRoutes } from '../data/busData';
import BusMap from '../components/BusMap';
import AppMenu from '../components/AppMenu';
import SearchBar from '@/components/search/SearchBar';
import SearchResults from '@/components/search/SearchResults';
import RouteDetailDrawer from '@/components/route-details/RouteDetailDrawer';
import MapLegend from '@/components/map/MapLegend';
import LocationButton from '@/components/LocationButton';
import OfflineIndicator from '@/components/OfflineIndicator';
import NearbyStops from '@/components/NearbyStops';
import { useOfflineMode } from '@/hooks/useOfflineMode';
import { cacheUtils } from '@/utils/cacheManager';
import { Button } from '@/components/ui/button';
import { MapPin, List } from 'lucide-react';

const MapPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof busRoutes>([]);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [showRouteDetail, setShowRouteDetail] = useState(false);
  const [userLocation, setUserLocation] = useState<GeolocationPosition | null>(null);
  const [showNearbyStops, setShowNearbyStops] = useState(false);
  const { isOnline, getOfflineData, saveOfflineData } = useOfflineMode();
  
  // Cache routes data for offline use
  useEffect(() => {
    if (isOnline) {
      cacheUtils.cacheRoutes(busRoutes);
    }
  }, [isOnline]);

  // Load cached data when offline
  useEffect(() => {
    if (!isOnline) {
      const cachedRoutes = cacheUtils.getCachedRoutes();
      if (cachedRoutes) {
        console.log('Using cached routes data');
      }
    }
  }, [isOnline]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    if (term.length > 2) {
      // Use cached routes if offline, otherwise use live data
      const routesToSearch = !isOnline ? (cacheUtils.getCachedRoutes() || busRoutes) : busRoutes;
      
      const results = routesToSearch.filter(route => 
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

  const handleLocationUpdate = (position: GeolocationPosition) => {
    setUserLocation(position);
    cacheUtils.cacheUserLocation(position);
  };
  return (
    <div className="min-h-screen relative flex flex-col bg-background">
      {/* Offline Indicator */}
      <OfflineIndicator showDetails />
      
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
        
        <LocationButton 
          onLocationUpdate={handleLocationUpdate}
          size="sm"
        />
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowNearbyStops(!showNearbyStops)}
          className="shrink-0"
        >
          {showNearbyStops ? <MapPin size={16} /> : <List size={16} />}
        </Button>
      </header>

      {/* Main Map Area */}
      <main className="flex-1 pt-16 flex">
        <div className={`transition-all duration-300 ${showNearbyStops ? 'w-2/3' : 'w-full'}`}>
          <div className="h-[calc(100vh-4rem)]">
            <BusMap selectedRoute={selectedRoute} setSelectedRoute={setSelectedRoute} />
          </div>
        </div>
        
        {/* Nearby Stops Panel */}
        {showNearbyStops && (
          <div className="w-1/3 h-[calc(100vh-4rem)] overflow-y-auto border-l bg-background">
            <div className="p-4">
              <NearbyStops maxStops={10} maxDistance={2000} />
            </div>
          </div>
        )}
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
