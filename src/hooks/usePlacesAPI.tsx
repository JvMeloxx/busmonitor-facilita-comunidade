
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { GOOGLE_MAPS_API_KEY } from '../utils/config';

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
  const [isLoading, setIsLoading] = useState(false);
  
  // Fetch bus stops using Google Places API HTTP endpoint
  const fetchBusStopsHTTP = useCallback(async () => {
    setIsLoading(true);
    
    // Coordenadas do centro de Luziânia
    const luzianiaCenterLat = -16.2526;
    const luzianiaCenterLng = -47.9503;
    
    try {
      // Building the URL for the Places API request
      const url = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${luzianiaCenterLat},${luzianiaCenterLng}&radius=10000&type=transit_station&key=${GOOGLE_MAPS_API_KEY}`;
      
      console.log("Realizando busca HTTP à API Places...");
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Status de resposta: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Resposta da API Places:", data);
      
      if (data.status === "OK" && data.results && data.results.length > 0) {
        const newBusStops: BusStop[] = data.results.map((place: any) => ({
          id: place.place_id || `stop-${Math.random().toString(36).substring(2, 9)}`,
          name: place.name || 'Ponto de ônibus',
          address: place.vicinity || 'Endereço não disponível',
          position: {
            lat: place.geometry?.location?.lat || center.lat,
            lng: place.geometry?.location?.lng || center.lng
          }
        }));
        
        setBusStops(newBusStops);
        setLastSearchCenter({ lat: luzianiaCenterLat, lng: luzianiaCenterLng });
        toast.success(`${newBusStops.length} pontos de ônibus encontrados`);
      } else if (data.status === "ZERO_RESULTS") {
        console.log("Nenhum resultado encontrado para pontos de ônibus nesta área");
        useFallbackStops();
      } else {
        console.error("Erro na resposta da API Places:", data.status);
        throw new Error(`Status da API: ${data.status}`);
      }
    } catch (error) {
      console.error("Erro ao fazer requisição HTTP à API Places:", error);
      
      // Verificar se é um erro de CORS
      if (error instanceof Error && error.message.includes('Failed to fetch')) {
        console.error("Possível erro de CORS. Tentando método alternativo...");
        fetchBusStopsJS();
      } else {
        setIsPlacesApiEnabled(false);
        toast.error("Erro ao buscar pontos de ônibus. Usando dados demonstrativos.");
        useFallbackStops();
      }
    } finally {
      setIsLoading(false);
    }
  }, [center]);
  
  // Original method using the JavaScript SDK
  const fetchBusStopsJS = useCallback(() => {
    if (!map || !window.google || !window.google.maps) {
      console.error("Google Maps API não carregada completamente");
      setIsPlacesApiEnabled(false);
      useFallbackStops();
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
      
      // Coordenadas do centro de Luziânia
      const luzianiaCenterLat = -16.2526;
      const luzianiaCenterLng = -47.9503;
      
      // Aumentando o raio de busca
      const request = {
        location: new google.maps.LatLng(luzianiaCenterLat, luzianiaCenterLng),
        radius: 10000, // 10km para cobrir toda a cidade
        type: 'transit_station'
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
          setLastSearchCenter({ lat: luzianiaCenterLat, lng: luzianiaCenterLng });
          toast.success(`${newBusStops.length} pontos de ônibus encontrados`);
        } else if (status === window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
          console.log("Nenhum resultado encontrado para pontos de ônibus nesta área");
          useFallbackStops();
        } else {
          console.error("Erro ao buscar pontos de ônibus:", status);
          if (status === "REQUEST_DENIED") {
            setIsPlacesApiEnabled(false);
            toast.error("API Places não está ativada para esta chave. Mostrando apenas rotas oficiais.");
          } else {
            toast.error("Erro ao buscar pontos de ônibus");
          }
          useFallbackStops();
        }
      });
    } catch (error) {
      console.error("Erro com a API Places:", error);
      setIsPlacesApiEnabled(false);
      toast.error("Erro ao carregar a API Places. Mostrando apenas rotas oficiais.");
      useFallbackStops();
    }
  }, [map, center, lastSearchCenter, busStops.length]);
  
  // Use fallback stops when API fails
  const useFallbackStops = () => {
    const mockBusStops: BusStop[] = [
      {
        id: 'mock-stop-1',
        name: 'Terminal Rodoviário',
        address: 'Centro',
        position: {
          lat: -16.2514467, 
          lng: -47.9282398
        }
      },
      {
        id: 'mock-stop-2',
        name: 'Ponto Central',
        address: 'Av. Principal',
        position: {
          lat: -16.2514467 - 0.002,
          lng: -47.9282398 + 0.004
        }
      },
      {
        id: 'mock-stop-3',
        name: 'Estação Municipal',
        address: 'R. das Flores',
        position: {
          lat: -16.2514467 + 0.003,
          lng: -47.9282398 + 0.007
        }
      },
      {
        id: 'mock-stop-4',
        name: 'Terminal Jardim Ingá',
        address: 'Jardim Ingá',
        position: {
          lat: -16.1936,
          lng: -47.9699
        }
      },
      {
        id: 'mock-stop-5',
        name: 'Ponto Setor Leste',
        address: 'Setor Leste',
        position: {
          lat: -16.2590,
          lng: -47.9190
        }
      }
    ];
    
    setBusStops(mockBusStops);
    setLastSearchCenter(center);
    toast.info("Usando pontos de ônibus demonstrativos na área");
  };

  useEffect(() => {
    if (showBusStops && isPlacesApiEnabled) {
      // Try with direct HTTP request first
      fetchBusStopsHTTP();
      
      // If that fails, the fetchBusStopsHTTP will call fetchBusStopsJS
    }
  }, [showBusStops, isPlacesApiEnabled, fetchBusStopsHTTP]);

  return { busStops, isPlacesApiEnabled, isLoading };
};

export default usePlacesAPI;
