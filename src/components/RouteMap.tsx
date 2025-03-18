
import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { busRoutes, recentUpdates } from '../data/busData';
import { GoogleMap, LoadScript, Polyline, Marker, InfoWindow } from '@react-google-maps/api';

interface RouteMapProps {
  routeId: string;
  routeColor: string;
}

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.75rem',
};

// Center of the map - Luziânia, Goiás, Brazil
const center = {
  lat: -16.2514467, 
  lng: -47.9282398, 
};

const RouteMap = ({ routeId, routeColor }: RouteMapProps) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activeStopIndex, setActiveStopIndex] = useState<number | null>(null);
  
  const route = busRoutes.find(r => r.id === routeId);
  const updates = recentUpdates.filter(update => update.routeId === routeId);
  
  if (!route) return null;

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
        coordinates.push({ lat: center.lat + (y - 300) / 30000, lng: center.lng + (x - 400) / 30000 });
      } else if (type === 'L') {
        // Line to command
        x = points[0];
        y = points[1];
        coordinates.push({ lat: center.lat + (y - 300) / 30000, lng: center.lng + (x - 400) / 30000 });
      } else if (type === 'C') {
        // Cubic bezier - we'll simplify by just using the endpoint
        x = points[4];
        y = points[5];
        coordinates.push({ lat: center.lat + (y - 300) / 30000, lng: center.lng + (x - 400) / 30000 });
      }
    }
    
    return coordinates;
  };

  const handleMapLoad = () => {
    setMapLoaded(true);
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
          zoom={13}
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
          {/* Bus route */}
          <Polyline
            path={getPolylineCoordinates(route.pathCoordinates)}
            options={{
              strokeColor: routeColor,
              strokeOpacity: 1,
              strokeWeight: 6,
            }}
          />
          
          {/* Bus stops */}
          {route.stops.map((stop, index) => {
            // Convert pixel coordinates to lat/lng
            const position = {
              lat: center.lat + (Number(stop.coordinates.y) - 300) / 30000, // Fixed: explicit number conversion
              lng: center.lng + (Number(stop.coordinates.x) - 400) / 30000, // Fixed: explicit number conversion
            };
            
            return (
              <Marker
                key={`stop-${index}`}
                position={position}
                onClick={() => setActiveStopIndex(index)}
                icon={{
                  path: google.maps.SymbolPath.CIRCLE,
                  fillColor: '#ffffff',
                  fillOpacity: 1,
                  scale: 8,
                  strokeColor: routeColor,
                  strokeWeight: 2,
                }}
                label={{
                  text: (index + 1).toString(),
                  color: '#000000',
                  fontSize: '10px',
                }}
              >
                {activeStopIndex === index && (
                  <InfoWindow onCloseClick={() => setActiveStopIndex(null)}>
                    <div className="p-2">
                      <p className="font-medium">{stop.name}</p>
                      <p className="text-sm">{stop.address}</p>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            );
          })}
          
          {/* Bus markers */}
          {updates.map((update, index) => {
            // Convert pixel coordinates to lat/lng
            const position = {
              lat: center.lat + (Number(update.coordinates.y) - 300) / 30000, // Fixed: explicit number conversion
              lng: center.lng + (Number(update.coordinates.x) - 400) / 30000, // Fixed: explicit number conversion
            };
            
            return (
              <Marker
                key={`bus-${index}`}
                position={position}
                icon={{
                  path: 'M -10,-10 L 10,-10 L 10,10 L -10,10 z',
                  fillColor: routeColor,
                  fillOpacity: 1,
                  scale: 1.5,
                  strokeColor: 'white',
                  strokeWeight: 2,
                }}
                label={{
                  text: route.number.toString(),
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '12px',
                }}
              />
            );
          })}
        </GoogleMap>
      </LoadScript>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-sm">
        <div className="flex items-center mb-1.5">
          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: routeColor }}></div>
          <span className="text-xs">Rota do ônibus</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full border mr-2" style={{ borderColor: routeColor }}></div>
          <span className="text-xs">Pontos de parada</span>
        </div>
      </div>
    </div>
  );
};

export default RouteMap;
