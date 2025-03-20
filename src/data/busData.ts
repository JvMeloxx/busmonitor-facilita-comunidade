
// Bus route types and data
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

// Terminal Rodoviário de Luziânia
const terminalLuziania = {
  name: "Terminal Rodoviário de Luziânia",
  coordinates: {
    lat: -16.25884,
    lng: -47.95932
  }
};

// Sample data for bus routes
export const busRoutes: BusRoute[] = [
  {
    id: "industrial-113.2",
    number: "113.2",
    name: "INDUSTRIAL",
    description: "Linha que conecta o Terminal Rodoviário de Luziânia ao bairro Industrial",
    color: "#4361ee",
    frequency: "Horários programados conforme tabela",
    terminal: terminalLuziania,
    stops: [
      {
        id: "stop-113-2-1",
        name: "Terminal Rodoviário de Luziânia",
        address: "Terminal Rodoviário, Luziânia - GO",
        coordinates: { x: "50%", y: "50%" }
      },
      {
        id: "stop-113-2-2",
        name: "Setor Industrial",
        address: "Setor Industrial, Luziânia - GO",
        coordinates: { x: "30%", y: "35%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["05:00", "05:50", "07:05", "11:20"],
        afternoon: ["13:00", "14:00", "16:30", "17:20"],
        evening: ["18:30"]
      },
      saturdayAndHoliday: {
        morning: ["06:00", "07:00"],
        afternoon: ["12:20", "17:20"],
        evening: ["18:30"]
      },
      sunday: {
        morning: ["06:00", "07:00"],
        afternoon: ["12:20", "17:20"],
        evening: ["18:30"]
      }
    },
    nextScheduledTime: "05:00",
    pathCoordinates: "M 50% 50% L 30% 35%"
  },
  {
    id: "sao-caetano-via-setor-leste-113.3",
    number: "113.3",
    name: "SÃO CAETANO VIA SETOR LESTE",
    description: "Linha que conecta o Terminal Rodoviário de Luziânia ao bairro São Caetano via Setor Leste",
    color: "#e63946",
    frequency: "Horários programados conforme tabela",
    terminal: terminalLuziania,
    stops: [
      {
        id: "stop-113-3-1",
        name: "Terminal Rodoviário de Luziânia",
        address: "Terminal Rodoviário, Luziânia - GO",
        coordinates: { x: "50%", y: "50%" }
      },
      {
        id: "stop-113-3-2",
        name: "Setor Leste",
        address: "Setor Leste, Luziânia - GO",
        coordinates: { x: "60%", y: "45%" }
      },
      {
        id: "stop-113-3-3",
        name: "São Caetano",
        address: "São Caetano, Luziânia - GO",
        coordinates: { x: "70%", y: "35%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["07:00", "11:30"],
        afternoon: ["16:00"],
        evening: []
      },
      saturdayAndHoliday: {
        morning: [],
        afternoon: [],
        evening: []
      },
      sunday: {
        morning: [],
        afternoon: [],
        evening: []
      }
    },
    nextScheduledTime: "07:00",
    pathCoordinates: "M 50% 50% L 60% 45% L 70% 35%"
  },
  {
    id: "setor-leste-113.3",
    number: "113.3",
    name: "SETOR LESTE",
    description: "Linha que conecta o Terminal Rodoviário de Luziânia ao Setor Leste",
    color: "#43aa8b",
    frequency: "Horários programados conforme tabela",
    terminal: terminalLuziania,
    stops: [
      {
        id: "stop-113-3-sl-1",
        name: "Terminal Rodoviário de Luziânia",
        address: "Terminal Rodoviário, Luziânia - GO",
        coordinates: { x: "50%", y: "50%" }
      },
      {
        id: "stop-113-3-sl-2",
        name: "Setor Leste",
        address: "Setor Leste, Luziânia - GO",
        coordinates: { x: "60%", y: "45%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["05:50", "06:50", "07:30", "08:00", "08:30", "09:00", "10:00", "11:00"],
        afternoon: ["12:00", "12:30", "13:00", "14:00", "15:00", "16:00", "16:30", "17:00", "17:30"],
        evening: ["18:00", "18:30", "19:30"]
      },
      saturdayAndHoliday: {
        morning: ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00"],
        afternoon: ["12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
        evening: ["18:00"]
      },
      sunday: {
        morning: ["07:00", "08:00"],
        afternoon: ["14:00", "15:00"],
        evening: []
      }
    },
    nextScheduledTime: "05:50",
    pathCoordinates: "M 50% 50% L 60% 45%"
  },
  {
    id: "parque-santa-fe-114",
    number: "114",
    name: "PARQUE SANTA FÉ",
    description: "Linha que conecta o Terminal Rodoviário de Luziânia ao Parque Santa Fé",
    color: "#fb8500",
    frequency: "Horários programados conforme tabela",
    terminal: terminalLuziania,
    stops: [
      {
        id: "stop-114-1",
        name: "Terminal Rodoviário de Luziânia",
        address: "Terminal Rodoviário, Luziânia - GO",
        coordinates: { x: "50%", y: "50%" }
      },
      {
        id: "stop-114-2",
        name: "Parque Santa Fé",
        address: "Parque Santa Fé, Luziânia - GO",
        coordinates: { x: "40%", y: "40%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["06:00", "09:00"],
        afternoon: ["15:30", "17:10"],
        evening: []
      },
      saturdayAndHoliday: {
        morning: [],
        afternoon: [],
        evening: []
      },
      sunday: {
        morning: [],
        afternoon: [],
        evening: []
      }
    },
    nextScheduledTime: "06:00",
    pathCoordinates: "M 50% 50% L 40% 40%"
  },
  {
    id: "fumal-parque-santa-fe-114",
    number: "114",
    name: "FUMAL - PARQUE SANTA FÉ",
    description: "Linha que conecta o Terminal Rodoviário de Luziânia ao Fumal e Parque Santa Fé",
    color: "#f28c38",
    frequency: "Horários programados conforme tabela",
    terminal: terminalLuziania,
    stops: [
      {
        id: "stop-114-fumal-1",
        name: "Terminal Rodoviário de Luziânia",
        address: "Terminal Rodoviário, Luziânia - GO",
        coordinates: { x: "50%", y: "50%" }
      },
      {
        id: "stop-114-fumal-2",
        name: "Fumal",
        address: "Fumal, Luziânia - GO",
        coordinates: { x: "35%", y: "45%" }
      },
      {
        id: "stop-114-fumal-3",
        name: "Parque Santa Fé",
        address: "Parque Santa Fé, Luziânia - GO",
        coordinates: { x: "40%", y: "40%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["07:00"],
        afternoon: ["12:00"],
        evening: ["18:10"]
      },
      saturdayAndHoliday: {
        morning: [],
        afternoon: [],
        evening: []
      },
      sunday: {
        morning: [],
        afternoon: [],
        evening: []
      }
    },
    nextScheduledTime: "07:00",
    pathCoordinates: "M 50% 50% L 35% 45% L 40% 40%"
  },
  {
    id: "parque-alvorada-115.1",
    number: "115.1",
    name: "PARQUE ALVORADA",
    description: "Linha que conecta o Terminal Rodoviário de Luziânia ao Parque Alvorada",
    color: "#2a9d8f",
    frequency: "Horários programados conforme tabela",
    terminal: terminalLuziania,
    stops: [
      {
        id: "stop-115-1-1",
        name: "Terminal Rodoviário de Luziânia",
        address: "Terminal Rodoviário, Luziânia - GO",
        coordinates: { x: "50%", y: "50%" }
      },
      {
        id: "stop-115-1-2",
        name: "Parque Alvorada",
        address: "Parque Alvorada, Luziânia - GO",
        coordinates: { x: "55%", y: "35%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["06:00", "07:00", "08:30"],
        afternoon: ["12:00", "16:00", "17:00", "17:30"],
        evening: ["18:00"]
      },
      saturdayAndHoliday: {
        morning: [],
        afternoon: [],
        evening: []
      },
      sunday: {
        morning: [],
        afternoon: [],
        evening: []
      }
    },
    nextScheduledTime: "06:00",
    pathCoordinates: "M 50% 50% L 55% 35%"
  }
];

// Calculate next scheduled time based on current time
const updateNextScheduledTimes = () => {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes(); // Current time in minutes
  const dayOfWeek = now.getDay(); // 0 is Sunday, 1-5 is Monday-Friday, 6 is Saturday
  
  busRoutes.forEach(route => {
    let scheduleToUse;
    
    if (dayOfWeek === 0) {
      scheduleToUse = route.schedule.sunday;
    } else if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      scheduleToUse = route.schedule.mondayToFriday;
    } else {
      scheduleToUse = route.schedule.saturdayAndHoliday;
    }
    
    // Combine all times from different periods and sort them
    const allTimes = [
      ...scheduleToUse.morning,
      ...scheduleToUse.afternoon,
      ...scheduleToUse.evening
    ].map(timeStr => {
      const [hours, minutes] = timeStr.split(':').map(Number);
      return hours * 60 + minutes; // Convert to minutes for easier comparison
    }).sort((a, b) => a - b);
    
    // Find the next time that's after current time
    const nextTime = allTimes.find(time => time > currentTime);
    
    if (nextTime) {
      // Convert back to HH:MM format
      const nextHours = Math.floor(nextTime / 60);
      const nextMinutes = nextTime % 60;
      route.nextScheduledTime = `${nextHours.toString().padStart(2, '0')}:${nextMinutes.toString().padStart(2, '0')}`;
    } else if (allTimes.length > 0) {
      // If no next time today, use the first time (tomorrow)
      const tomorrowFirstTime = allTimes[0];
      const nextHours = Math.floor(tomorrowFirstTime / 60);
      const nextMinutes = tomorrowFirstTime % 60;
      route.nextScheduledTime = `${nextHours.toString().padStart(2, '0')}:${nextMinutes.toString().padStart(2, '0')} (amanhã)`;
    } else {
      route.nextScheduledTime = "Não disponível";
    }
  });
};

// Update the next scheduled times when the module is loaded
updateNextScheduledTimes();

// Sample data for recent bus updates
export const recentUpdates: BusUpdate[] = [
  {
    id: "update-1",
    routeId: "industrial-113.2",
    time: "12:45",
    status: "Em movimento normal",
    coordinates: { x: "35%", y: "35%" },
    hasIssue: false
  },
  {
    id: "update-2",
    routeId: "sao-caetano-via-setor-leste-113.3",
    time: "12:50",
    status: "Em movimento normal",
    coordinates: { x: "65%", y: "40%" },
    hasIssue: false
  },
  {
    id: "update-3",
    routeId: "setor-leste-113.3",
    time: "12:30",
    status: "Atrasado em 10 minutos",
    coordinates: { x: "55%", y: "48%" },
    hasIssue: true
  }
];
