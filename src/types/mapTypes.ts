
export interface BusStop {
  id: string;
  name: string;
  address: string;
  position: {
    lat: number;
    lng: number;
  };
}

export interface UsePlacesAPIProps {
  map: google.maps.Map | null;
  showBusStops: boolean;
  center: { lat: number; lng: number };
}

export interface UsePlacesAPIResult {
  busStops: BusStop[];
  isPlacesApiEnabled: boolean;
  isLoading: boolean;
}
