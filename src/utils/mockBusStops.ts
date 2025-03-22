
import { BusStop } from '../types/mapTypes';

export const getFallbackBusStops = (center: { lat: number; lng: number }): BusStop[] => {
  return [
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
};
