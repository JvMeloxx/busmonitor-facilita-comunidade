
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { fetchBusStopsHTTP, fetchBusStopsJS } from '../utils/placesApiUtils';
import { getFallbackBusStops } from '../utils/mockBusStops';
import { BusStop, UsePlacesAPIProps, UsePlacesAPIResult } from '../types/mapTypes';

export const usePlacesAPI = ({ map, showBusStops, center }: UsePlacesAPIProps): UsePlacesAPIResult => {
  const [busStops, setBusStops] = useState<BusStop[]>([]);
  const [isPlacesApiEnabled, setIsPlacesApiEnabled] = useState(true);
  const [lastSearchCenter, setLastSearchCenter] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Use fallback stops when API fails
  const useFallbackStops = useCallback(() => {
    const mockBusStops = getFallbackBusStops(center);
    setBusStops(mockBusStops);
    setLastSearchCenter(center);
    toast.info("Usando pontos de ônibus demonstrativos na área");
  }, [center]);
  
  // Try with JavaScript SDK method
  const tryJavaScriptSDK = useCallback(() => {
    fetchBusStopsJS(
      map,
      center,
      (newStops) => {
        setBusStops(newStops);
        setLastSearchCenter({ lat: -16.2526, lng: -47.9503 });
      },
      () => {
        setIsPlacesApiEnabled(false);
        useFallbackStops();
      }
    );
  }, [map, center, useFallbackStops]);
  
  // Fetch bus stops using HTTP endpoint
  const fetchStops = useCallback(async () => {
    // Se já buscamos neste local e temos resultados, não busque novamente
    if (lastSearchCenter && 
        Math.abs(lastSearchCenter.lat - center.lat) < 0.01 && 
        Math.abs(lastSearchCenter.lng - center.lng) < 0.01 &&
        busStops.length > 0) {
      console.log("Usando resultados em cache para esta localização");
      return;
    }
    
    setIsLoading(true);
    
    await fetchBusStopsHTTP(
      center,
      (newStops) => {
        setBusStops(newStops);
        setLastSearchCenter({ lat: -16.2526, lng: -47.9503 });
      },
      () => {
        // If HTTP request fails, try JavaScript SDK
        console.log("HTTP request failed, trying JavaScript SDK...");
        tryJavaScriptSDK();
      }
    );
    
    setIsLoading(false);
  }, [center, lastSearchCenter, busStops.length, tryJavaScriptSDK]);

  useEffect(() => {
    if (showBusStops && isPlacesApiEnabled) {
      fetchStops();
    }
  }, [showBusStops, isPlacesApiEnabled, fetchStops]);

  return { busStops, isPlacesApiEnabled, isLoading };
};

export default usePlacesAPI;
