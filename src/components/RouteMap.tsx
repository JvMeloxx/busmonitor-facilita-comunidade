
import React, { useState, useMemo } from 'react';
import { GoogleMap, LoadScript, Libraries } from '@react-google-maps/api';
import { busRoutes, recentUpdates } from '../data/busData';
import MapLoader from './maps/MapLoader';
import RoutePolyline from './maps/RoutePolyline';
import BusUpdateMarker from './maps/BusUpdateMarker';
import MapControls from './maps/MapControls';
import usePlacesAPI from '../hooks/usePlacesAPI';
import RouteStopMarker from './maps/RouteStopMarker';
import BusStopMarker from './maps/BusStopMarker';
import { mapContainerStyle, mapCenter, mapStyles, getPolylineCoordinates } from '../utils/mapUtils';
import { GOOGLE_MAPS_API_KEY } from '../utils/config';

interface RouteMapProps {
  routeId: string;
  routeColor: string;
}

const RouteMap = ({ routeId, routeColor }: RouteMapProps) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activeStopIndex, setActiveStopIndex] = useState<number | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [showBusStops, setShowBusStops] = useState(true);
  const [activePlacesStop, setActivePlacesStop] = useState<string | null>(null);
  
  // Usando o tipo correto diretamente da biblioteca
  const libraries = useMemo<Libraries>(() => ["places"], []);
  
  const route = busRoutes.find(r => r.id === routeId);
  const updates = recentUpdates.filter(update => update.routeId === routeId);
  
  if (!route) return null;

  // Use the custom hook for Places API
  const { busStops, isPlacesApiEnabled } = usePlacesAPI({
    map,
    showBusStops,
    center: mapCenter
  });

  const handleMapLoad = (mapInstance: google.maps.Map) => {
    setMapLoaded(true);
    setMap(mapInstance);
  };

  const handleStopMarkerClick = (index: number) => {
    setActiveStopIndex(index);
  };

  const handleBusStopMarkerClick = (markerId: string) => {
    setActivePlacesStop(markerId);
  };
  
  const clearActiveMarkers = () => {
    setActiveStopIndex(null);
    setActivePlacesStop(null);
  };

  const routeCoordinates = getPolylineCoordinates(route.pathCoordinates, mapCenter);
  const hasValidRoute = routeCoordinates.length > 0;

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
          {hasValidRoute && (
            <RoutePolyline
              route={{
                id: routeId,
                color: routeColor,
                pathCoordinates: route.pathCoordinates
              }}
              selectedRoute={routeId}
              mapCenter={mapCenter}
              onClick={() => {}}
            />
          )}
          
          {route.stops.map((stop, index) => (
            <RouteStopMarker
              key={`route-stop-${index}`}
              stop={stop}
              index={index}
              routeColor={routeColor}
              mapCenter={mapCenter}
              activeStopIndex={activeStopIndex}
              onMarkerClick={handleStopMarkerClick}
              onCloseClick={clearActiveMarkers}
            />
          ))}
          
          {updates.map((update, index) => (
            <BusUpdateMarker
              key={`update-${update.routeId}-${index}`}
              update={update}
              route={{
                color: routeColor,
                name: route.name,
                number: route.number
              }}
              index={index}
              mapCenter={mapCenter}
              activeMarker={activePlacesStop}
              onClick={handleBusStopMarkerClick}
              onCloseClick={clearActiveMarkers}
            />
          ))}

          {showBusStops && isPlacesApiEnabled && busStops.map(stop => (
            <BusStopMarker
              key={stop.id}
              stop={stop}
              activeMarker={activePlacesStop}
              onClick={handleBusStopMarkerClick}
              onCloseClick={clearActiveMarkers}
            />
          ))}
        </GoogleMap>
      </LoadScript>
      
      <MapControls 
        isPlacesApiEnabled={isPlacesApiEnabled}
        showBusStops={showBusStops}
        setShowBusStops={setShowBusStops}
      />
    </div>
  );
};

export default RouteMap;
