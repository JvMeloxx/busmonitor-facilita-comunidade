import { BusRoute } from "../types/busTypes";
import { terminalJardimInga } from "./terminals";

// Catedral (kandango) routes 
export const catedralRoutes: BusRoute[] = [
  {
    id: "6001-go-df",
    number: "6001",
    name: "JARDIM INGÁ (AV. LUCENA RORIZ) / RODOVIÁRIA DO PLANO PILOTO (ZOOLÓGICO - EIXO SUL)",
    description: "Linha que conecta o Jardim Ingá à Rodoviária do Plano Piloto via Zoológico",
    color: "#e74c3c", // Red for Catedral
    frequency: "Horários programados conforme tabela",
    terminal: terminalJardimInga,
    stops: [
      {
        id: "stop-6001-1",
        name: "Jardim Ingá",
        address: "Av. Lucena Roriz, Jardim Ingá - GO",
        coordinates: { x: "50%", y: "50%" }
      },
      {
        id: "stop-6001-2",
        name: "Zoológico",
        address: "Zoológico, Brasília - DF",
        coordinates: { x: "65%", y: "35%" }
      },
      {
        id: "stop-6001-3",
        name: "Rodoviária do Plano Piloto",
        address: "Rodoviária do Plano Piloto, Brasília - DF",
        coordinates: { x: "70%", y: "25%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["04:40", "05:00", "06:00"],
        afternoon: ["16:30", "17:45"],
        evening: ["22:40"]
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
    nextScheduledTime: "04:40",
    pathCoordinates: "M 50% 50% L 65% 35% L 70% 25%"
  },
  {
    id: "6001-df-go",
    number: "6001",
    name: "RODOVIÁRIA DO PLANO PILOTO (ZOOLÓGICO - EIXO SUL) / JARDIM INGÁ (AV. LUCENA RORIZ)",
    description: "Linha que conecta a Rodoviária do Plano Piloto ao Jardim Ingá via Zoológico",
    color: "#e74c3c", // Red for Catedral
    frequency: "Horários programados conforme tabela",
    terminal: terminalJardimInga,
    stops: [
      {
        id: "stop-6001-df-1",
        name: "Rodoviária do Plano Piloto",
        address: "Rodoviária do Plano Piloto, Brasília - DF",
        coordinates: { x: "70%", y: "25%" }
      },
      {
        id: "stop-6001-df-2",
        name: "Zoológico",
        address: "Zoológico, Brasília - DF",
        coordinates: { x: "65%", y: "35%" }
      },
      {
        id: "stop-6001-df-3",
        name: "Jardim Ingá",
        address: "Av. Lucena Roriz, Jardim Ingá - GO",
        coordinates: { x: "50%", y: "50%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["05:35", "05:55", "06:20", "06:45", "07:30"],
        afternoon: ["18:15"],
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
    nextScheduledTime: "05:35",
    pathCoordinates: "M 70% 25% L 65% 35% L 50% 50%"
  },
  {
    id: "6001e-go-df",
    number: "6001E",
    name: "JARDIM INGÁ – RODOVIÁRIA PLANO PILOTO, VIA ZOOLÓGICO, SEMIEXPRESSO, VIA BRT",
    description: "Linha expressa que conecta o Jardim Ingá à Rodoviária do Plano Piloto via Zoológico e BRT",
    color: "#e74c3c", // Red for Catedral
    frequency: "Horários programados conforme tabela",
    terminal: terminalJardimInga,
    stops: [
      {
        id: "stop-6001e-1",
        name: "Jardim Ingá",
        address: "Av. Lucena Roriz, Jardim Ingá - GO",
        coordinates: { x: "50%", y: "50%" }
      },
      {
        id: "stop-6001e-2",
        name: "BRT",
        address: "BRT, Brasília - DF",
        coordinates: { x: "62%", y: "35%" }
      },
      {
        id: "stop-6001e-3",
        name: "Zoológico",
        address: "Zoológico, Brasília - DF",
        coordinates: { x: "65%", y: "35%" }
      },
      {
        id: "stop-6001e-4",
        name: "Rodoviária do Plano Piloto",
        address: "Rodoviária do Plano Piloto, Brasília - DF",
        coordinates: { x: "70%", y: "25%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["06:00"],
        afternoon: [],
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
    pathCoordinates: "M 50% 50% L 62% 35% L 65% 35% L 70% 25%"
  },
  {
    id: "6001e-df-go",
    number: "6001E",
    name: "RODOVIÁRIA PLANO PILOTO - JARDIM INGÁ, VIA ZOOLÓGICO, SEMIEXPRESSO, VIA BRT",
    description: "Linha expressa que conecta a Rodoviária do Plano Piloto ao Jardim Ingá via Zoológico e BRT",
    color: "#e74c3c", // Red for Catedral
    frequency: "Horários programados conforme tabela",
    terminal: terminalJardimInga,
    stops: [
      {
        id: "stop-6001e-df-1",
        name: "Rodoviária do Plano Piloto",
        address: "Rodoviária do Plano Piloto, Brasília - DF",
        coordinates: { x: "70%", y: "25%" }
      },
      {
        id: "stop-6001e-df-2",
        name: "Zoológico",
        address: "Zoológico, Brasília - DF",
        coordinates: { x: "65%", y: "35%" }
      },
      {
        id: "stop-6001e-df-3",
        name: "BRT",
        address: "BRT, Brasília - DF",
        coordinates: { x: "62%", y: "35%" }
      },
      {
        id: "stop-6001e-df-4",
        name: "Jardim Ingá",
        address: "Av. Lucena Roriz, Jardim Ingá - GO",
        coordinates: { x: "50%", y: "50%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: [],
        afternoon: ["18:15"],
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
    nextScheduledTime: "18:15",
    pathCoordinates: "M 70% 25% L 65% 35% L 62% 35% L 50% 50%"
  },
  {
    id: "6003-go-df",
    number: "6003",
    name: "JARDIM INGÁ - ROD. PLANO PILOTO VIA VIA PARKSHOPPING",
    description: "Linha que conecta o Jardim Ingá à Rodoviária do Plano Piloto via Park Shopping",
    color: "#e74c3c", // Red for Catedral
    frequency: "Horários programados conforme tabela",
    terminal: terminalJardimInga,
    stops: [
      {
        id: "stop-6003-1",
        name: "Jardim Ingá",
        address: "Jardim Ingá - GO",
        coordinates: { x: "50%", y: "50%" }
      },
      {
        id: "stop-6003-2",
        name: "Park Shopping",
        address: "Park Shopping, Brasília - DF",
        coordinates: { x: "60%", y: "35%" }
      },
      {
        id: "stop-6003-3",
        name: "Rodoviária do Plano Piloto",
        address: "Rodoviária do Plano Piloto, Brasília - DF",
        coordinates: { x: "70%", y: "25%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["04:00", "05:40", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30"],
        afternoon: ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:25", "15:40", "16:20", "17:00", "17:10", "17:20", "17:30", "17:40", "18:00", "18:15", "18:30", "18:45", "19:05", "19:40", "19:55"],
        evening: ["20:20", "20:50", "21:30"]
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
    nextScheduledTime: "04:00",
    pathCoordinates: "M 50% 50% L 60% 35% L 70% 25%"
  },
  {
    id: "6003-df-go",
    number: "6003",
    name: "ROD. PLANO PILOTO - JARDIM INGÁ VIA PARKSHOPPING",
    description: "Linha que conecta a Rodoviária do Plano Piloto ao Jardim Ingá via Park Shopping",
    color: "#e74c3c", // Red for Catedral
    frequency: "Horários programados conforme tabela",
    terminal: terminalJardimInga,
    stops: [
      {
        id: "stop-6003-df-1",
        name: "Rodoviária do Plano Piloto",
        address: "Rodoviária do Plano Piloto, Brasília - DF",
        coordinates: { x: "70%", y: "25%" }
      },
      {
        id: "stop-6003-df-2",
        name: "Park Shopping",
        address: "Park Shopping, Brasília - DF",
        coordinates: { x: "60%", y: "35%" }
      },
      {
        id: "stop-6003-df-3",
        name: "Jardim Ingá",
        address: "Jardim Ingá - GO",
        coordinates: { x: "50%", y: "50%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["08:00", "08:20", "08:40", "09:00", "09:30", "10:00", "10:20", "10:40", "11:00", "11:30"],
        afternoon: ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:15", "15:30", "16:00", "17:10", "17:20", "17:50", "18:30", "18:40", "18:50", "19:10", "19:45"],
        evening: ["20:10", "20:45", "21:10", "21:30", "22:00", "22:30", "23:00", "23:30", "00:00"]
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
    nextScheduledTime: "08:00",
    pathCoordinates: "M 70% 25% L 60% 35% L 50% 50%"
  }
];

// Create a second file to keep individual files smaller
