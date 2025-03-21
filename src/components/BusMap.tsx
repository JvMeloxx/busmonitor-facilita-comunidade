
import React, { useEffect, useState, useMemo } from 'react';
import { MapPin, AlertTriangle, BusFront } from 'lucide-react';
import { busRoutes, recentUpdates } from '../data/busData';
import { toast } from 'sonner';
import { GoogleMap, LoadScript, Polyline, Marker, InfoWindow } from '@react-google-maps/api';

interface BusMapProps {
  selectedRoute: string | null;
  setSelectedRoute: (id: string | null) => void;
}

interface BusStop {
  id: string;
  name: string;
  address: string;
  position: {
    lat: number;
    lng: number;
  };
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

// Map style to remove POIs
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
  // Memoize the libraries array to prevent reloading
  const libraries = useMemo(() => ["places"], []);
  
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [busStops, setBusStops] = useState<BusStop[]>([]);
  const [showBusStops, setShowBusStops] = useState(true);
  const [isPlacesApiEnabled, setIsPlacesApiEnabled] = useState(true);
  
  useEffect(() => {
    if (selectedRoute) {
      toast.info(`Mostrando rota ${busRoutes.find(r => r.id === selectedRoute)?.name}`);
    }
  }, [selectedRoute]);

  useEffect(() => {
    if (map && showBusStops && isPlacesApiEnabled) {
      fetchBusStops();
    }
  }, [map, showBusStops]);

  const fetchBusStops = () => {
    if (!map || !window.google || !window.google.maps) {
      console.error("Google Maps API not loaded");
      return;
    }

    // Clear existing bus stops
    setBusStops([]);

    try {
      const service = new window.google.maps.places.PlacesService(map);
      
      // Define the search request
      const request = {
        location: center,
        radius: 5000, // 5km radius
        type: 'bus_station' // Looking for bus stations/stops
      };

      // Perform the search
      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
          console.log("Found bus stops:", results);
          
          const newBusStops: BusStop[] = results.map((place, index) => ({
            id: place.place_id || `stop-${index}`,
            name: place.name || 'Ponto de ônibus',
            address: place.vicinity || 'Luziânia - GO',
            position: {
              lat: place.geometry?.location?.lat() || center.lat,
              lng: place.geometry?.location?.lng() || center.lng
            }
          }));
          
          setBusStops(newBusStops);
          toast.success(`${newBusStops.length} pontos de ônibus encontrados`);
        } else {
          console.error("Error fetching bus stops:", status);
          if (status === "REQUEST_DENIED") {
            setIsPlacesApiEnabled(false);
            toast.error("API Places não está ativada para esta chave. Mostrando apenas rotas oficiais.");
          } else {
            toast.error("Erro ao buscar pontos de ônibus");
          }
        }
      });
    } catch (error) {
      console.error("Error with Places API:", error);
      setIsPlacesApiEnabled(false);
      toast.error("Erro ao carregar a API Places. Mostrando apenas rotas oficiais.");
    }
  };

  // Filter updates to show only selected route or all if none selected
  const filteredUpdates = selectedRoute 
    ? recentUpdates.filter(update => update.routeId === selectedRoute)
    : recentUpdates;

  // Convert SVG path to Google Maps polyline coordinates
  const getPolylineCoordinates = (svgPath: string) => {
    try {
      // This is a simplified conversion from SVG path to coordinates
      // In a real app, you would use actual GPS coordinates
      const coordinates = [];
      const commands = svgPath.match(/[MLC][^MLC]*/g) || [];
      
      // Process each command in the SVG path
      let x = 0, y = 0;
      for (const cmd of commands) {
        const type = cmd[0];
        const points = cmd.slice(1).trim().split(/\s+/).map(Number);
        
        if (type === 'M' && !isNaN(points[0]) && !isNaN(points[1])) {
          // Move to command
          x = points[0];
          y = points[1];
          coordinates.push({ lat: center.lat + (y - 300) / 30000, lng: center.lng + (x - 400) / 30000 });
        } else if (type === 'L' && !isNaN(points[0]) && !isNaN(points[1])) {
          // Line to command
          x = points[0];
          y = points[1];
          coordinates.push({ lat: center.lat + (y - 300) / 30000, lng: center.lng + (x - 400) / 30000 });
        } else if (type === 'C' && points.length >= 6 && !isNaN(points[4]) && !isNaN(points[5])) {
          // Cubic bezier - we'll simplify by just using the endpoint
          x = points[4];
          y = points[5];
          coordinates.push({ lat: center.lat + (y - 300) / 30000, lng: center.lng + (x - 400) / 30000 });
        }
      }
      
      // Ensure we have valid coordinates
      return coordinates.filter(coord => 
        !isNaN(coord.lat) && !isNaN(coord.lng) && 
        Math.abs(coord.lat) <= 90 && Math.abs(coord.lng) <= 180
      );
    } catch (error) {
      console.error("Error parsing SVG path:", error);
      return [];
    }
  };

  const handleMapLoad = (mapInstance: google.maps.Map) => {
    setMapLoaded(true);
    setMap(mapInstance);
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
          {/* Bus routes */}
          {busRoutes.map(route => {
            if (selectedRoute && route.id !== selectedRoute) return null;
            
            const coordinates = getPolylineCoordinates(route.pathCoordinates);
            if (coordinates.length === 0) return null;
            
            const isDashed = selectedRoute !== route.id;
            
            // For dashed lines, we need to create multiple small line segments
            if (isDashed) {
              // Create segments to simulate a dashed line
              const segments = [];
              for (let i = 0; i < coordinates.length - 1; i++) {
                if (i % 2 === 0) { // Only show every other segment to create dashed effect
                  segments.push(
                    <Polyline
                      key={`${route.id}-segment-${i}`}
                      path={[coordinates[i], coordinates[i + 1]]}
                      options={{
                        strokeColor: route.color,
                        strokeOpacity: 0.6,
                        strokeWeight: 6
                      }}
                      onClick={() => setSelectedRoute(route.id)}
                    />
                  );
                }
              }
              return segments;
            } else {
              // Solid line for selected route
              return (
                <Polyline
                  key={route.id}
                  path={coordinates}
                  options={{
                    strokeColor: route.color,
                    strokeOpacity: 1,
                    strokeWeight: 6
                  }}
                  onClick={() => setSelectedRoute(route.id)}
                />
              );
            }
          })}
          
          {/* Bus markers */}
          {filteredUpdates.map((update, index) => {
            const route = busRoutes.find(r => r.id === update.routeId);
            if (!route) return null;
            
            try {
              // Validate coordinates before creating marker
              const y = Number(update.coordinates.y);
              const x = Number(update.coordinates.x);
              
              if (isNaN(y) || isNaN(x)) {
                console.error(`Invalid coordinates for update:`, update.coordinates);
                return null;
              }
              
              // Convert pixel coordinates to lat/lng
              const position = {
                lat: center.lat + (y - 300) / 30000,
                lng: center.lng + (x - 400) / 30000,
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
            } catch (error) {
              console.error(`Error rendering bus ${index}:`, error);
              return null;
            }
          })}

          {/* Bus Stops from Google Places API */}
          {showBusStops && isPlacesApiEnabled && busStops.map(stop => (
            <Marker
              key={stop.id}
              position={stop.position}
              onClick={() => handleMarkerClick(stop.id)}
              icon={{
                path: 'M 0,0 m -2,-2 v 4 h 4 v -4 z',
                fillColor: '#4171E1',
                fillOpacity: 0.8,
                scale: 2,
                strokeColor: 'white',
                strokeWeight: 1,
              }}
            >
              {activeMarker === stop.id && (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div className="p-2">
                    <p className="font-medium">{stop.name}</p>
                    <p className="text-sm">{stop.address}</p>
                    <div className="flex items-center mt-2 text-xs text-blue-600">
                      <BusFront size={14} className="mr-1" />
                      Ponto de ônibus
                    </div>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))}
        </GoogleMap>
      </LoadScript>
      
      {/* Toggle for bus stops */}
      {isPlacesApiEnabled && (
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={() => setShowBusStops(!showBusStops)} 
            className={`px-3 py-2 rounded-md text-sm font-medium flex items-center shadow-md ${
              showBusStops 
                ? 'bg-primary text-white' 
                : 'bg-white text-gray-700'
            }`}
          >
            <BusFront size={16} className="mr-2" />
            {showBusStops ? 'Ocultar Pontos' : 'Mostrar Pontos'}
          </button>
        </div>
      )}
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-sm">
        <div className="flex items-center mb-1.5">
          <div className="w-3 h-3 rounded-full mr-2 bg-blue-500"></div>
          <span className="text-xs">Rotas de ônibus</span>
        </div>
        {isPlacesApiEnabled && (
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-600 mr-2"></div>
            <span className="text-xs">Pontos do Google</span>
          </div>
        )}
        {!isPlacesApiEnabled && (
          <div className="flex items-center text-amber-600">
            <div className="w-3 h-3 bg-amber-500 mr-2"></div>
            <span className="text-xs">API Places não ativada</span>
          </div>
        )}
      </div>
      
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
