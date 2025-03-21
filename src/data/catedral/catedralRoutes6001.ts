
import { BusRoute } from "../../types/busTypes";
import { terminalJardimInga } from "../terminals";

// Catedral routes - 6001 group
export const catedralRoutes6001: BusRoute[] = [
  {
    id: "6001-go-df",
    number: "6001",
    name: "JARDIM INGÁ (AV. LUCENA RORIZ) / RODOVIÁRIA DO PLANO PILOTO (ZOOLÓGICO - EIXO SUL)",
    description: "Linha que conecta o Jardim Ingá à Rodoviária do Plano Piloto via Zoológico",
    color: "#e74c3c", // Red for Catedral
    frequency: "Horários programados conforme tabela",
    company: "catedral",
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
    company: "catedral",
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
  }
];
