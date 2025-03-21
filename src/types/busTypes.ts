
// Bus route types
export interface BusStop {
  id: string;
  name: string;
  address: string;
  coordinates: {
    x: string; // CSS positioning for mock map
    y: string; // CSS positioning for mock map
  };
}

export interface BusPeriod {
  morning: string[];
  afternoon: string[];
  evening: string[];
}

export interface BusSchedule {
  mondayToFriday: BusPeriod;
  saturdayAndHoliday: BusPeriod;
  sunday: BusPeriod;
}

export interface BusRoute {
  id: string;
  number: string;
  name: string;
  description: string;
  color: string;
  frequency: string;
  terminal: {
    name: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  stops: BusStop[];
  schedule: BusSchedule;
  nextScheduledTime?: string;
  pathCoordinates: string; // SVG path for route visualization
}

export interface BusUpdate {
  id: string;
  routeId: string;
  time: string;
  status: string;
  coordinates: {
    x: string; // CSS positioning for mock map
    y: string; // CSS positioning for mock map
  };
  hasIssue: boolean;
}
