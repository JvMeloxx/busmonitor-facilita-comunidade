import React, { useEffect, useState } from 'react';
import { MapPin, Navigation, Clock, Bus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGeolocation } from '@/hooks/useGeolocation';
import { cacheUtils } from '@/utils/cacheManager';
import { busRoutes } from '@/data/busData';
import { cn } from '@/lib/utils';

interface NearbyStop {
  id: string;
  name: string;
  address: string;
  distance: number; // in meters
  routes: Array<{
    id: string;
    number: string;
    name: string;
    color: string;
    nextTime?: string;
  }>;
}

interface NearbyStopsProps {
  className?: string;
  maxStops?: number;
  maxDistance?: number; // in meters
}

const NearbyStops = ({ 
  className, 
  maxStops = 5, 
  maxDistance = 1000 
}: NearbyStopsProps) => {
  const [nearbyStops, setNearbyStops] = useState<NearbyStop[]>([]);
  const [loading, setLoading] = useState(false);
  const { position, requestLocation } = useGeolocation();

  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = (
    lat1: number, 
    lon1: number, 
    lat2: number, 
    lon2: number
  ): number => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  };

  // Convert coordinates from percentage to lat/lng (mock conversion)
  const convertCoordinates = (x: string, y: string, baseCenter: { lat: number; lng: number }) => {
    const xPercent = parseFloat(x.replace('%', '')) / 100;
    const yPercent = parseFloat(y.replace('%', '')) / 100;
    
    // Simple conversion - in a real app, you'd have actual coordinates
    const lat = baseCenter.lat + (yPercent - 0.5) * 0.1;
    const lng = baseCenter.lng + (xPercent - 0.5) * 0.1;
    
    return { lat, lng };
  };

  // Find nearby stops based on user location
  const findNearbyStops = (userPosition: GeolocationPosition) => {
    setLoading(true);
    
    try {
      const userLat = userPosition.coords.latitude;
      const userLng = userPosition.coords.longitude;
      const baseCenter = { lat: -16.2514467, lng: -47.9282398 }; // Luziânia center
      
      const stopsWithDistance: NearbyStop[] = [];
      
      // Process all routes and their stops
      busRoutes.forEach(route => {
        route.stops.forEach(stop => {
          const stopCoords = convertCoordinates(stop.coordinates.x, stop.coordinates.y, baseCenter);
          const distance = calculateDistance(userLat, userLng, stopCoords.lat, stopCoords.lng);
          
          if (distance <= maxDistance) {
            // Check if stop already exists
            let existingStop = stopsWithDistance.find(s => s.id === stop.id);
            
            if (!existingStop) {
              existingStop = {
                id: stop.id,
                name: stop.name,
                address: stop.address,
                distance,
                routes: []
              };
              stopsWithDistance.push(existingStop);
            }
            
            // Add route to stop
            existingStop.routes.push({
              id: route.id,
              number: route.number,
              name: route.name,
              color: route.color,
              nextTime: route.nextScheduledTime
            });
          }
        });
      });
      
      // Sort by distance and limit results
      const sortedStops = stopsWithDistance
        .sort((a, b) => a.distance - b.distance)
        .slice(0, maxStops);
      
      setNearbyStops(sortedStops);
      
      // Cache the results
      cacheUtils.saveOfflineData('nearby_stops', sortedStops, 5 * 60 * 1000); // 5 minutes TTL
      
    } catch (error) {
      console.error('Error finding nearby stops:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load cached data on mount
  useEffect(() => {
    const cachedStops = cacheUtils.getOfflineData('nearby_stops');
    if (cachedStops) {
      setNearbyStops(cachedStops);
    }
  }, []);

  // Update nearby stops when position changes
  useEffect(() => {
    if (position) {
      findNearbyStops(position);
    }
  }, [position, maxStops, maxDistance]);

  const formatDistance = (distance: number): string => {
    if (distance < 1000) {
      return `${Math.round(distance)}m`;
    }
    return `${(distance / 1000).toFixed(1)}km`;
  };

  const handleGetLocation = () => {
    requestLocation();
  };

  if (!position) {
    return (
      <Card className={cn("p-6 text-center", className)}>
        <MapPin size={48} className="mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold mb-2">Pontos próximos</h3>
        <p className="text-muted-foreground mb-4">
          Permita o acesso à localização para ver os pontos de ônibus mais próximos
        </p>
        <Button onClick={handleGetLocation}>
          <Navigation size={16} className="mr-2" />
          Obter localização
        </Button>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className={cn("p-6", className)}>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="space-y-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  if (nearbyStops.length === 0) {
    return (
      <Card className={cn("p-6 text-center", className)}>
        <Bus size={48} className="mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold mb-2">Nenhum ponto próximo</h3>
        <p className="text-muted-foreground">
          Não encontramos pontos de ônibus em um raio de {maxDistance}m
        </p>
      </Card>
    );
  }

  return (
    <Card className={cn("p-4", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Pontos próximos</h3>
        <Badge variant="secondary">
          {nearbyStops.length} encontrado{nearbyStops.length !== 1 ? 's' : ''}
        </Badge>
      </div>
      
      <div className="space-y-3">
        {nearbyStops.map(stop => (
          <div key={stop.id} className="border rounded-lg p-3 hover:bg-accent/50 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-medium">{stop.name}</h4>
                <p className="text-sm text-muted-foreground">{stop.address}</p>
              </div>
              <Badge variant="outline" className="text-xs">
                <MapPin size={10} className="mr-1" />
                {formatDistance(stop.distance)}
              </Badge>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {stop.routes.map(route => (
                <Badge
                  key={route.id}
                  variant="secondary"
                  className="text-xs"
                  style={{ 
                    backgroundColor: `${route.color}20`,
                    borderColor: route.color,
                    color: route.color
                  }}
                >
                  {route.number}
                  {route.nextTime && (
                    <span className="ml-1 opacity-75">
                      <Clock size={8} className="inline mr-1" />
                      {route.nextTime}
                    </span>
                  )}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default NearbyStops;