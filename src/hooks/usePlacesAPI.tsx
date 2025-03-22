
import { useState, useEffect, useCallback } from 'react';
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
  const [lastSearchCenter, setLastSearchCenter] = useState<{ lat: number; lng: number } | null>(null);
  
  // Usando uma função memoizada para evitar refetches desnecessários
  const fetchBusStops = useCallback(() => {
    if (!map || !window.google || !window.google.maps) {
      console.error("Google Maps API não carregada completamente");
      setIsPlacesApiEnabled(false);
      return;
    }

    console.log("Verificando status da API Places...");
    console.log("Google Maps disponível:", !!window.google.maps);
    console.log("Places Service disponível:", !!window.google.maps.places);

    // Se já buscamos neste local e temos resultados, não busque novamente
    if (lastSearchCenter && 
        Math.abs(lastSearchCenter.lat - center.lat) < 0.01 && 
        Math.abs(lastSearchCenter.lng - center.lng) < 0.01 &&
        busStops.length > 0) {
      console.log("Usando resultados em cache para esta localização");
      return;
    }

    try {
      const service = new window.google.maps.places.PlacesService(map);
      
      // Aumentando o raio de busca
      const request = {
        location: center,
        radius: 10000, // Aumentando o raio para 10km
        type: 'transit_station' // Um único tipo, não um array
      };

      console.log("Realizando busca de pontos de ônibus...");

      service.nearbySearch(request, (results, status) => {
        console.log("Status da busca:", status);
        console.log("Resultados encontrados:", results);

        if (status === window.google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
          const newBusStops: BusStop[] = results.map((place, index) => ({
            id: place.place_id || `stop-${index}`,
            name: place.name || 'Ponto de ônibus',
            address: place.vicinity || 'Endereço não disponível',
            position: {
              lat: place.geometry?.location?.lat() || center.lat,
              lng: place.geometry?.location?.lng() || center.lng
            }
          }));
          
          setBusStops(newBusStops);
          setLastSearchCenter(center);
          toast.success(`${newBusStops.length} pontos de ônibus encontrados`);
        } else if (status === window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
          console.log("Nenhum resultado encontrado para pontos de ônibus nesta área");
          
          // Adicionando alguns pontos fictícios perto do centro para demonstração
          const mockBusStops: BusStop[] = [
            {
              id: 'mock-stop-1',
              name: 'Terminal Rodoviário',
              address: 'Centro',
              position: {
                lat: center.lat + 0.005,
                lng: center.lng - 0.003
              }
            },
            {
              id: 'mock-stop-2',
              name: 'Ponto Central',
              address: 'Av. Principal',
              position: {
                lat: center.lat - 0.002,
                lng: center.lng + 0.004
              }
            },
            {
              id: 'mock-stop-3',
              name: 'Estação Municipal',
              address: 'R. das Flores',
              position: {
                lat: center.lat + 0.003,
                lng: center.lng + 0.007
              }
            }
          ];
          
          setBusStops(mockBusStops);
          setLastSearchCenter(center);
          toast.info("Usando pontos de ônibus demonstrativos na área");
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
  }, [map, center, lastSearchCenter, busStops.length]);

  useEffect(() => {
    if (map && showBusStops && isPlacesApiEnabled) {
      fetchBusStops();
    }
  }, [map, showBusStops, isPlacesApiEnabled, fetchBusStops]);

  return { busStops, isPlacesApiEnabled };
};

export default usePlacesAPI;
