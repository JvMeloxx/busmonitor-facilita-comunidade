
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { fetchBusStopsHTTP, fetchBusStopsJS } from '../utils/placesApiUtils';
import { getFallbackBusStops } from '../utils/mockBusStops';
import { useBusStopsState } from './useBusStopsState';
import { BusStop, UsePlacesAPIProps, UsePlacesAPIResult } from '../types/mapTypes';
import { cacheUtils } from '../utils/cacheManager';
import { useOfflineMode } from './useOfflineMode';

export const usePlacesAPI = ({ map, showBusStops, center }: UsePlacesAPIProps): UsePlacesAPIResult => {
  const { 
    busStops, 
    setBusStops, 
    isPlacesApiEnabled, 
    setIsPlacesApiEnabled,
    lastSearchCenter,
    setLastSearchCenter,
    isLoading,
    setIsLoading
  } = useBusStopsState();
  
  const { isOnline } = useOfflineMode();
  
  // Use fallback stops when API fails
  const useFallbackStops = useCallback(() => {
    const mockBusStops = getFallbackBusStops(center);
    setBusStops(mockBusStops);
    setLastSearchCenter(center);
    
    // Cache fallback stops
    const locationKey = `${center.lat.toFixed(4)}_${center.lng.toFixed(4)}`;
    cacheUtils.cacheBusStops(mockBusStops, locationKey);
    
    toast.info("Usando pontos de ônibus demonstrativos na área");
  }, [center, setBusStops, setLastSearchCenter]);
  
  // Try with JavaScript SDK method
  const tryJavaScriptSDK = useCallback(() => {
    fetchBusStopsJS(
      map,
      center,
      (newStops) => {
        setBusStops(newStops);
        setLastSearchCenter(center);
        
        // Cache successful results
        const locationKey = `${center.lat.toFixed(4)}_${center.lng.toFixed(4)}`;
        cacheUtils.cacheBusStops(newStops, locationKey);
      },
      () => {
        setIsPlacesApiEnabled(false);
        useFallbackStops();
      }
    );
  }, [map, center, setBusStops, setLastSearchCenter, setIsPlacesApiEnabled, useFallbackStops]);
  
  // Fetch bus stops using HTTP endpoint
  const fetchStops = useCallback(async () => {
    const locationKey = `${center.lat.toFixed(4)}_${center.lng.toFixed(4)}`;
    
    // If offline, try to use cached data first
    if (!isOnline) {
      const cachedStops = cacheUtils.getCachedBusStops(locationKey);
      if (cachedStops) {
        setBusStops(cachedStops);
        setLastSearchCenter(center);
        toast.info("Usando pontos de ônibus em cache (offline)");
        return;
      } else {
        // No cached data available, use fallback
        useFallbackStops();
        return;
      }
    }
    
    if (shouldUseCache(lastSearchCenter, center, busStops.length)) {
      console.log("Usando resultados em cache para esta localização");
      return;
    }
    
    setIsLoading(true);
    
    await fetchBusStopsHTTP(
      center,
      (newStops) => {
        setBusStops(newStops);
        setLastSearchCenter(center);
        
        // Cache successful results
        cacheUtils.cacheBusStops(newStops, locationKey);
      },
      () => {
        console.log("HTTP request failed, trying JavaScript SDK...");
        tryJavaScriptSDK();
      }
    );
    
    setIsLoading(false);
  }, [center, lastSearchCenter, busStops.length, setBusStops, setLastSearchCenter, setIsLoading, tryJavaScriptSDK, isOnline, useFallbackStops]);

  useEffect(() => {
    if (showBusStops && isPlacesApiEnabled) {
      fetchStops();
    }
  }, [showBusStops, isPlacesApiEnabled, fetchStops]);

  return { busStops, isPlacesApiEnabled, isLoading };
};

// Helper function to check if we should use cached results
function shouldUseCache(
  lastSearchCenter: { lat: number; lng: number } | null,
  currentCenter: { lat: number; lng: number },
  busStopsCount: number
): boolean {
  return !!(
    lastSearchCenter && 
    Math.abs(lastSearchCenter.lat - currentCenter.lat) < 0.01 && 
    Math.abs(lastSearchCenter.lng - currentCenter.lng) < 0.01 &&
    busStopsCount > 0
  );
}

export default usePlacesAPI;
