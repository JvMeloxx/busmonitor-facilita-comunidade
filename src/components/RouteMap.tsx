
import React, { useState, useEffect, useMemo } from 'react';
import { MapPin, BusFront } from 'lucide-react';
import { busRoutes, recentUpdates } from '../data/busData';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { toast } from 'sonner';
import MapLoader from './maps/MapLoader';
import RoutePolyline from './maps/RoutePolyline';
import BusUpdateMarker from './maps/BusUpdateMarker';
import BusStopMarker from './maps/BusStopMarker';
import MapControls from './maps/MapControls';
import usePlacesAPI from '../hooks/usePlacesAPI';
import RouteStopMarker from './maps/RouteStopMarker';

interface RouteMapProps {
  routeId: string;
  routeColor: string;
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

const RouteMap = ({ routeId, routeColor }: RouteMapProps) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activeStopIndex, setActiveStopIndex] = useState<number | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [showBusStops, setShowBusStops] = useState(true);
  const [activePlacesStop, setActivePlacesStop] = useState<string | null>(null);
  
  // Use memoized value of libraries to prevent unnecessary reloads of the LoadScript component
  const libraries = useMemo(() => ["places"], []);
  
  const route = busRoutes.find(r => r.id === routeId);
  const updates = recentUpdates.filter(update => update.routeId === routeId);
  
  if (!route) return null;

  // Use the custom hook for Places API
  const { busStops, isPlacesApiEnabled } = usePlacesAPI({
    map,
    showBusStops,
    center
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

  const getPolylineCoordinates = (svgPath: string) => {
    try {
      const coordinates = [];
      const commands = svgPath.match(/[MLC][^MLC]*/g) || [];
      
      let x = 0, y = 0;
      for (const cmd of commands) {
        const type = cmd[0];
        const points = cmd.slice(1).trim().split(/\s+/).map(Number);
        
        if (type === 'M' && !isNaN(points[0]) && !isNaN(points[1])) {
          x = points[0];
          y = points[1];
          coordinates.push({ lat: center.lat + (y - 300) / 30000, lng: center.lng + (x - 400) / 30000 });
        } else if (type === 'L' && !isNaN(points[0]) && !isNaN(points[1])) {
          x = points[0];
          y = points[1];
          coordinates.push({ lat: center.lat + (y - 300) / 30000, lng: center.lng + (x - 400) / 30000 });
        } else if (type === 'C' && points.length >= 6 && !isNaN(points[4]) && !isNaN(points[5])) {
          x = points[4];
          y = points[5];
          coordinates.push({ lat: center.lat + (y - 300) / 30000, lng: center.lng + (x - 400) / 30000 });
        }
      }
      
      return coordinates.filter(coord => 
        !isNaN(coord.lat) && !isNaN(coord.lng) && 
        Math.abs(coord.lat) <= 90 && Math.abs(coord.lng) <= 180
      );
    } catch (error) {
      console.error("Error parsing SVG path:", error);
      return [];
    }
  };

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
          {(() => {
            const coordinates = getPolylineCoordinates(route.pathCoordinates);
            return coordinates.length > 0 ? (
              <RoutePolyline
                route={{
                  id: routeId,
                  color: routeColor,
                  pathCoordinates: route.pathCoordinates
                }}
                selectedRoute={routeId}
                mapCenter={center}
                onClick={() => {}}
              />
            ) : null;
          })()}
          
          {route.stops.map((stop, index) => (
            <RouteStopMarker
              key={`route-stop-${index}`}
              stop={stop}
              index={index}
              routeColor={routeColor}
              mapCenter={center}
              activeStopIndex={activeStopIndex}
              onMarkerClick={handleStopMarkerClick}
              onCloseClick={clearActiveMarkers}
            />
          ))}
          
          {updates.map((update, index) => {
            return (
              <BusUpdateMarker
                key={`update-${update.routeId}-${index}`}
                update={update}
                route={{
                  color: routeColor,
                  name: route.name,
                  number: route.number
                }}
                index={index}
                mapCenter={center}
                activeMarker={activePlacesStop}
                onClick={handleBusStopMarkerClick}
                onCloseClick={clearActiveMarkers}
              />
            );
          })}

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
