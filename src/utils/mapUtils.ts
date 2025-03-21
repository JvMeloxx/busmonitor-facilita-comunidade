
/**
 * Funções utilitárias para manipulação de coordenadas e elementos do mapa
 */

/**
 * Converte coordenadas SVG para coordenadas de latitude e longitude
 */
export const getPolylineCoordinates = (svgPath: string, mapCenter: { lat: number; lng: number }) => {
  try {
    const coordinates = [];
    const commands = svgPath.match(/[MLC][^MLC]*/g) || [];
    
    let x = 0, y = 0;
    for (const cmd of commands) {
      const type = cmd[0];
      const points = cmd.slice(1).trim().split(/\s+/).map(Number);
      
      if (type === 'M' && !isNaN(points[0]) && !isNaN(points[1])) {
        x = points[0];
        y = points[1];
        coordinates.push({ lat: mapCenter.lat + (y - 300) / 30000, lng: mapCenter.lng + (x - 400) / 30000 });
      } else if (type === 'L' && !isNaN(points[0]) && !isNaN(points[1])) {
        x = points[0];
        y = points[1];
        coordinates.push({ lat: mapCenter.lat + (y - 300) / 30000, lng: mapCenter.lng + (x - 400) / 30000 });
      } else if (type === 'C' && points.length >= 6 && !isNaN(points[4]) && !isNaN(points[5])) {
        x = points[4];
        y = points[5];
        coordinates.push({ lat: mapCenter.lat + (y - 300) / 30000, lng: mapCenter.lng + (x - 400) / 30000 });
      }
    }
    
    return coordinates.filter(coord => 
      !isNaN(coord.lat) && !isNaN(coord.lng) && 
      Math.abs(coord.lat) <= 90 && Math.abs(coord.lng) <= 180
    );
  } catch (error) {
    console.error("Error parsing SVG path:", error);
    return [];
  }
};

/**
 * Estilos predefinidos para o mapa Google
 */
export const mapStyles = [
  {
    featureType: "poi",
    stylers: [{ visibility: "simplified" }]
  },
  {
    featureType: "transit.station",
    elementType: "labels.icon",
    stylers: [{ visibility: "on" }]
  },
  {
    featureType: "transit.station.bus",
    stylers: [{ visibility: "on" }]
  }
];

/**
 * Configuração padrão do container do mapa
 */
export const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.75rem',
};

/**
 * Centro do mapa para Luziânia
 */
export const mapCenter = {
  lat: -16.2514467, 
  lng: -47.9282398, 
};
