
import { BusRoute } from "../../types/busTypes";
import { terminalJardimInga } from "../terminals";

// Catedral routes - 6001E (express) group
export const catedralRoutes6001E: BusRoute[] = [
  {
    id: "6001e-go-df",
    number: "6001E",
    name: "JARDIM INGÁ – RODOVIÁRIA PLANO PILOTO, VIA ZOOLÓGICO, SEMIEXPRESSO, VIA BRT",
    description: "Linha expressa que conecta o Jardim Ingá à Rodoviária do Plano Piloto via Zoológico e BRT",
    color: "#e74c3c", // Red for Catedral
    frequency: "Horários programados conforme tabela",
    company: "catedral",
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
    company: "catedral",
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
  }
];
