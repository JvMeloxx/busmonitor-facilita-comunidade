
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface BusStop {
  id: string;
  name: string;
  address: string;
  position: {
    lat: number;
    lng: number;
  };
}

interface UsePlacesAPIProps {
  map: google.maps.Map | null;
  showBusStops: boolean;
  center: { lat: number; lng: number };
}

export const usePlacesAPI = ({ map, showBusStops, center }: UsePlacesAPIProps) => {
  const [busStops, setBusStops] = useState<BusStop[]>([]);
  const [isPlacesApiEnabled, setIsPlacesApiEnabled] = useState(true);
  
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

    setBusStops([]);

    try {
      const service = new window.google.maps.places.PlacesService(map);
      
      const request = {
        location: center,
        radius: 5000,
        type: 'bus_station'
      };

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

  return { busStops, isPlacesApiEnabled };
};

export default usePlacesAPI;
