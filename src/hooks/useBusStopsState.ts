
import { useState } from 'react';
import { BusStop } from '../types/mapTypes';

export function useBusStopsState() {
  const [busStops, setBusStops] = useState<BusStop[]>([]);
  const [isPlacesApiEnabled, setIsPlacesApiEnabled] = useState(true);
  const [lastSearchCenter, setLastSearchCenter] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return {
    busStops,
    setBusStops,
    isPlacesApiEnabled,
    setIsPlacesApiEnabled,
    lastSearchCenter,
    setLastSearchCenter,
    isLoading,
    setIsLoading
  };
}
