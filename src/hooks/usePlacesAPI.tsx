
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
      console.error("Google Maps API não carregada completamente");
      setIsPlacesApiEnabled(false);
      return;
    }

    console.log("Verificando status da API Places...");
    console.log("Google Maps disponível:", !!window.google.maps);
    console.log("Places Service disponível:", !!window.google.maps.places);

    try {
      const service = new window.google.maps.places.PlacesService(map);
      
      const request = {
        location: center,
        radius: 5000,
        type: 'bus_station'
      };

      console.log("Realizando busca de pontos de ônibus...");

      service.nearbySearch(request, (results, status) => {
        console.log("Status da busca:", status);
        console.log("Resultados encontrados:", results);

        if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
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
          console.error("Erro ao buscar pontos de ônibus:", status);
          if (status === "REQUEST_DENIED") {
            setIsPlacesApiEnabled(false);
            toast.error("API Places não está ativada para esta chave. Mostrando apenas rotas oficiais.");
          } else {
            toast.error("Erro ao buscar pontos de ônibus");
          }
        }
      });
    } catch (error) {
      console.error("Erro com a API Places:", error);
      setIsPlacesApiEnabled(false);
      toast.error("Erro ao carregar a API Places. Mostrando apenas rotas oficiais.");
    }
  };

  return { busStops, isPlacesApiEnabled };
};

export default usePlacesAPI;
