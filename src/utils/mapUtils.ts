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

export const mapStyles = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: "poi.business",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: "poi.park",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: "poi.attraction",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: "poi.government",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: "poi.place_of_worship",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: "poi.school",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: "poi.sports_complex",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: "transit.station",
    elementType: "labels.icon",
    stylers: [{ visibility: "simplified" }]
  },
  {
    featureType: "transit.station.bus",
    stylers: [{ visibility: "on" }]
  }
];

export const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.75rem',
};

export const busStopIcon = {
  path: 'M -2,-2 v 4 h 4 v -4 z',
  fillColor: '#4171E1',
  fillOpacity: 0.8,
  scale: 2.5,
  strokeColor: 'white',
  strokeWeight: 1.5,
};

export const companyMapCenters = {
  tarifeZero: {
    lat: -16.2514467, 
    lng: -47.9282398
  },
  ctExpresso: {
    lat: -16.2514467, 
    lng: -47.9282398
  },
  catedral: {
    lat: -16.14962, 
    lng: -47.9550187
  },
  default: {
    lat: -16.2514467, 
    lng: -47.9282398
  }
};

export const mapCenter = companyMapCenters.default;
