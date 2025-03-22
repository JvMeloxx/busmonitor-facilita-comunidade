
import { BusStop } from '../types/mapTypes';
import { toast } from 'sonner';
import { GOOGLE_MAPS_API_KEY } from './config';

export const fetchBusStopsHTTP = async (
  center: { lat: number; lng: number }, 
  onSuccess: (stops: BusStop[]) => void,
  onError: () => void
): Promise<void> => {
  try {
    // Building the URL for the Places API request
    const url = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${center.lat},${center.lng}&radius=10000&type=transit_station&key=${GOOGLE_MAPS_API_KEY}`;
    
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
      
      onSuccess(newBusStops);
      toast.success(`${newBusStops.length} pontos de ônibus encontrados`);
      return;
    } else if (data.status === "ZERO_RESULTS") {
      console.log("Nenhum resultado encontrado para pontos de ônibus nesta área");
      onError();
      return;
    } else {
      console.error("Erro na resposta da API Places:", data.status);
      throw new Error(`Status da API: ${data.status}`);
    }
  } catch (error) {
    console.error("Erro ao fazer requisição HTTP à API Places:", error);
    
    // Verificar se é um erro de CORS
    if (error instanceof Error && error.message.includes('Failed to fetch')) {
      console.error("Possível erro de CORS.");
    }
    
    onError();
  }
};

export const fetchBusStopsJS = (
  map: google.maps.Map | null, 
  center: { lat: number; lng: number },
  onSuccess: (stops: BusStop[]) => void,
  onError: () => void
): void => {
  if (!map || !window.google || !window.google.maps) {
    console.error("Google Maps API não carregada completamente");
    onError();
    return;
  }

  console.log("Verificando status da API Places...");
  console.log("Google Maps disponível:", !!window.google.maps);
  console.log("Places Service disponível:", !!window.google.maps.places);

  try {
    const service = new window.google.maps.places.PlacesService(map);
    
    const request = {
      location: new google.maps.LatLng(center.lat, center.lng),
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
        
        onSuccess(newBusStops);
        toast.success(`${newBusStops.length} pontos de ônibus encontrados`);
      } else if (status === window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        console.log("Nenhum resultado encontrado para pontos de ônibus nesta área");
        onError();
      } else {
        console.error("Erro ao buscar pontos de ônibus:", status);
        if (status === "REQUEST_DENIED") {
          toast.error("API Places não está ativada para esta chave. Mostrando apenas rotas oficiais.");
        } else {
          toast.error("Erro ao buscar pontos de ônibus");
        }
        onError();
      }
    });
  } catch (error) {
    console.error("Erro com a API Places:", error);
    toast.error("Erro ao carregar a API Places. Mostrando apenas rotas oficiais.");
    onError();
  }
};
