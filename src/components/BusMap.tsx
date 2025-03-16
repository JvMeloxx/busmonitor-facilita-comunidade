
import React, { useEffect, useState } from 'react';
import { MapPin, AlertTriangle } from 'lucide-react';
import { busRoutes, recentUpdates } from '../data/busData';
import { toast } from 'sonner';
import { GoogleMap, LoadScript, Polyline, Marker, InfoWindow } from '@react-google-maps/api';

interface BusMapProps {
  selectedRoute: string | null;
  setSelectedRoute: (id: string | null) => void;
}

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.75rem',
};

// Center of the map - this should be the center of your city
const center = {
  lat: -23.550520, // Default latitude - change to your city's coordinates
  lng: -46.633308, // Default longitude - change to your city's coordinates
};

const BusMap = ({ selectedRoute, setSelectedRoute }: BusMapProps) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  
  useEffect(() => {
    if (selectedRoute) {
      toast.info(`Mostrando rota ${busRoutes.find(r => r.id === selectedRoute)?.name}`);
    }
  }, [selectedRoute]);

  // Filter updates to show only selected route or all if none selected
  const filteredUpdates = selectedRoute 
    ? recentUpdates.filter(update => update.routeId === selectedRoute)
    : recentUpdates;

  // Convert SVG path to Google Maps polyline coordinates
  const getPolylineCoordinates = (svgPath: string) => {
    // This is a simplified conversion from SVG path to coordinates
    // In a real app, you would use actual GPS coordinates
    const coordinates = [];
    const commands = svgPath.match(/[MLC][^MLC]*/g) || [];
    
    // Process each command in the SVG path
    let x = 0, y = 0;
    for (const cmd of commands) {
      const type = cmd[0];
      const points = cmd.slice(1).trim().split(/\s+/).map(Number);
      
      if (type === 'M') {
        // Move to command
        x = points[0];
        y = points[1];
        coordinates.push({ lat: center.lat + (y - 300) / 10000, lng: center.lng + (x - 400) / 10000 });
      } else if (type === 'L') {
        // Line to command
        x = points[0];
        y = points[1];
        coordinates.push({ lat: center.lat + (y - 300) / 10000, lng: center.lng + (x - 400) / 10000 });
      } else if (type === 'C') {
        // Cubic bezier - we'll simplify by just using the endpoint
        x = points[4];
        y = points[5];
        coordinates.push({ lat: center.lat + (y - 300) / 10000, lng: center.lng + (x - 400) / 10000 });
      }
    }
    
    return coordinates;
  };

  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  const handleMarkerClick = (markerId: string) => {
    setActiveMarker(markerId);
  };

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-100">
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-background">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-muted-foreground">Carregando mapa...</p>
          </div>
        </div>
      )}
      
      <LoadScript googleMapsApiKey="AIzaSyAeL_NsKhDPz8upg9-U29IVe_qCmxqvCoc">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={14}
          onLoad={handleMapLoad}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            styles: [
              {
                featureType: "transit",
                elementType: "labels.icon",
                stylers: [{ visibility: "on" }],
              },
            ],
          }}
        >
          {/* Bus routes */}
          {busRoutes.map(route => {
            if (selectedRoute && route.id !== selectedRoute) return null;
            
            const coordinates = getPolylineCoordinates(route.pathCoordinates);
            
            return (
              <Polyline
                key={route.id}
                path={coordinates}
                options={{
                  strokeColor: route.color,
                  strokeOpacity: selectedRoute === route.id ? 1 : 0.6,
                  strokeWeight: 6,
                  strokeDashArray: selectedRoute === route.id ? [] : [8, 8],
                }}
                onClick={() => setSelectedRoute(route.id)}
              />
            );
          })}
          
          {/* Bus markers */}
          {filteredUpdates.map((update, index) => {
            const route = busRoutes.find(r => r.id === update.routeId);
            if (!route) return null;
            
            // Convert pixel coordinates to lat/lng
            const position = {
              lat: center.lat + (update.coordinates.y - 300) / 10000,
              lng: center.lng + (update.coordinates.x - 400) / 10000,
            };
            
            const markerId = `${update.routeId}-${index}`;
            
            return (
              <Marker
                key={markerId}
                position={position}
                onClick={() => handleMarkerClick(markerId)}
                icon={{
                  path: 'M -10,-10 L 10,-10 L 10,10 L -10,10 z',
                  fillColor: route.color,
                  fillOpacity: 1,
                  scale: 1.5,
                  strokeColor: 'white',
                  strokeWeight: 2,
                  labelOrigin: { x: 0, y: 0 },
                }}
                label={{
                  text: route.number.toString(),
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '12px',
                }}
              >
                {activeMarker === markerId && (
                  <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                    <div className="p-2">
                      <p className="font-medium">{route.name}</p>
                      <p className="text-sm">{update.time}</p>
                      {update.hasIssue && (
                        <p className="text-red-500 text-sm flex items-center mt-1">
                          <AlertTriangle size={12} className="mr-1" />
                          Problema reportado
                        </p>
                      )}
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            );
          })}
        </GoogleMap>
      </LoadScript>
      
      {/* Disclaimer message */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <div className="bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-muted-foreground shadow-sm flex items-center">
          <MapPin size={12} className="mr-1" />
          <span>As localizações são aproximadas e baseadas em contribuições</span>
        </div>
      </div>
    </div>
  );
};

export default BusMap;
