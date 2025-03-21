
import React, { useEffect, useState, useMemo } from 'react';
import { GoogleMap, LoadScript, Libraries } from '@react-google-maps/api';
import { toast } from 'sonner';
import { busRoutes, recentUpdates } from '../data/busData';
import MapLoader from './maps/MapLoader';
import RoutePolyline from './maps/RoutePolyline';
import BusUpdateMarker from './maps/BusUpdateMarker';
import BusStopMarker from './maps/BusStopMarker';
import MapControls from './maps/MapControls';
import usePlacesAPI from '../hooks/usePlacesAPI';
import { mapContainerStyle, companyMapCenters, mapStyles } from '../utils/mapUtils';
import { GOOGLE_MAPS_API_KEY } from '../utils/config';
import { useTheme } from '../context/ThemeContext';

interface BusMapProps {
  selectedRoute: string | null;
  setSelectedRoute: (id: string | null) => void;
}

const BusMap = ({ selectedRoute, setSelectedRoute }: BusMapProps) => {
  // Using the correct type directly from the library
  const libraries = useMemo<Libraries>(() => ["places"], []);
  
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [showBusStops, setShowBusStops] = useState(true);
  const [showRoutes, setShowRoutes] = useState(true); // Changed default to true to show routes by default
  
  // Get theme information
  const { company, companyColor, companyLightColor } = useTheme();
  
  // Determine the map center based on the selected company
  const mapCenter = company ? companyMapCenters[company] : companyMapCenters.default;
  
  // Use the custom hook for Places API
  const { busStops, isPlacesApiEnabled } = usePlacesAPI({
    map,
    showBusStops,
    center: mapCenter
  });
  
  useEffect(() => {
    if (selectedRoute) {
      toast.info(`Mostrando rota ${busRoutes.find(r => r.id === selectedRoute)?.name}`);
    }
  }, [selectedRoute]);

  // Update map center when company changes
  useEffect(() => {
    if (map && company) {
      const newCenter = companyMapCenters[company];
      map.panTo(newCenter);
    }
  }, [company, map]);

  const handleMapLoad = (mapInstance: google.maps.Map) => {
    setMapLoaded(true);
    setMap(mapInstance);
  };

  const handleMarkerClick = (markerId: string) => {
    setActiveMarker(markerId);
  };
  
  const clearActiveMarker = () => {
    setActiveMarker(null);
  };
  
  // Filter updates based on active route
  const filteredUpdates = recentUpdates.filter(update => 
    !selectedRoute || update.routeId === selectedRoute
  );

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-100">
      <MapLoader mapLoaded={mapLoaded} />
      
      <LoadScript 
        googleMapsApiKey={GOOGLE_MAPS_API_KEY}
        libraries={libraries}
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={mapCenter}
          zoom={13}
          onLoad={handleMapLoad}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            styles: mapStyles,
          }}
        >
          {/* Route polylines are conditionally rendered based on showRoutes state */}
          {showRoutes && busRoutes.map(route => {
            if (selectedRoute && route.id !== selectedRoute) return null;
            return (
              <RoutePolyline
                key={route.id}
                route={route}
                selectedRoute={selectedRoute}
                mapCenter={mapCenter}
                onClick={setSelectedRoute}
              />
            );
          })}
          
          {/* Ensure each update marker has a unique key */}
          {filteredUpdates.map((update, index) => {
            const route = busRoutes.find(r => r.id === update.routeId);
            if (!route) return null;
            
            return (
              <BusUpdateMarker
                key={`update-${update.routeId}-${index}-${update.timestamp}`}
                update={update}
                route={route}
                index={index}
                mapCenter={mapCenter}
                activeMarker={activeMarker}
                onClick={handleMarkerClick}
                onCloseClick={clearActiveMarker}
              />
            );
          })}

          {/* Ensure each bus stop has a unique key */}
          {showBusStops && isPlacesApiEnabled && busStops.map((stop, index) => (
            <BusStopMarker
              key={`stop-${stop.id}-${index}`}
              stop={stop}
              activeMarker={activeMarker}
              onClick={handleMarkerClick}
              onCloseClick={clearActiveMarker}
            />
          ))}
        </GoogleMap>
      </LoadScript>
      
      <MapControls 
        isPlacesApiEnabled={isPlacesApiEnabled}
        showBusStops={showBusStops}
        setShowBusStops={setShowBusStops}
        showRoutes={showRoutes}
        setShowRoutes={setShowRoutes}
      />
    </div>
  );
};

export default BusMap;
