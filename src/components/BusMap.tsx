
import React, { useEffect, useState, useMemo } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { toast } from 'sonner';
import { busRoutes, recentUpdates } from '../data/busData';
import MapLoader from './maps/MapLoader';
import RoutePolyline from './maps/RoutePolyline';
import BusUpdateMarker from './maps/BusUpdateMarker';
import BusStopMarker from './maps/BusStopMarker';
import MapControls from './maps/MapControls';
import usePlacesAPI from '../hooks/usePlacesAPI';

interface BusMapProps {
  selectedRoute: string | null;
  setSelectedRoute: (id: string | null) => void;
}

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.75rem',
};

const center = {
  lat: -16.2514467,
  lng: -47.9282398,
};

const mapStyles = [
  {
    featureType: "poi",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: "transit.station",
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: "transit.station.bus",
    stylers: [{ visibility: "on" }]
  }
];

const BusMap = ({ selectedRoute, setSelectedRoute }: BusMapProps) => {
  // Use memoized value of libraries to prevent unnecessary reloads of the LoadScript component
  const libraries = useMemo(() => ["places"], []);
  
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [showBusStops, setShowBusStops] = useState(true);
  
  // Use the custom hook for Places API
  const { busStops, isPlacesApiEnabled } = usePlacesAPI({
    map,
    showBusStops,
    center
  });
  
  useEffect(() => {
    if (selectedRoute) {
      toast.info(`Mostrando rota ${busRoutes.find(r => r.id === selectedRoute)?.name}`);
    }
  }, [selectedRoute]);

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
        googleMapsApiKey="AIzaSyAeL_NsKhDPz8upg9-U29IVe_qCmxqvCoc"
        libraries={libraries}
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={13}
          onLoad={handleMapLoad}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            styles: mapStyles,
          }}
        >
          {busRoutes.map(route => {
            if (selectedRoute && route.id !== selectedRoute) return null;
            return (
              <RoutePolyline
                key={route.id}
                route={route}
                selectedRoute={selectedRoute}
                mapCenter={center}
                onClick={setSelectedRoute}
              />
            );
          })}
          
          {filteredUpdates.map((update, index) => {
            const route = busRoutes.find(r => r.id === update.routeId);
            if (!route) return null;
            
            return (
              <BusUpdateMarker
                key={`update-${update.routeId}-${index}`}
                update={update}
                route={route}
                index={index}
                mapCenter={center}
                activeMarker={activeMarker}
                onClick={handleMarkerClick}
                onCloseClick={clearActiveMarker}
              />
            );
          })}

          {showBusStops && isPlacesApiEnabled && busStops.map(stop => (
            <BusStopMarker
              key={stop.id}
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
      />
    </div>
  );
};

export default BusMap;
