
import { BusRoute } from "../../types/busTypes";
import { terminalJardimInga } from "../terminals";

// Catedral routes - 6002 group
export const catedralRoutes6002: BusRoute[] = [
  {
    id: "6002-go-df",
    number: "6002",
    name: "JARDIM INGÁ (AV. LUCENA RORIZ) / L2 SUL E NORTE (ZOOLÓGICO - UNB - SETOR NORESTE)",
    description: "Linha que conecta o Jardim Ingá à L2 Sul e Norte via Zoológico e UNB",
    color: "#e74c3c", // Red for Catedral
    frequency: "Horários programados conforme tabela",
    company: "catedral",
    terminal: terminalJardimInga,
    stops: [
      {
        id: "stop-6002-1",
        name: "Jardim Ingá",
        address: "Av. Lucena Roriz, Jardim Ingá - GO",
        coordinates: { x: "50%", y: "50%" }
      },
      {
        id: "stop-6002-2",
        name: "Zoológico",
        address: "Zoológico, Brasília - DF",
        coordinates: { x: "65%", y: "35%" }
      },
      {
        id: "stop-6002-3",
        name: "UNB",
        address: "UNB, Brasília - DF",
        coordinates: { x: "68%", y: "30%" }
      },
      {
        id: "stop-6002-4",
        name: "L2 Sul e Norte",
        address: "L2 Sul e Norte, Brasília - DF",
        coordinates: { x: "70%", y: "28%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["05:20"],
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
    nextScheduledTime: "05:20",
    pathCoordinates: "M 50% 50% L 65% 35% L 68% 30% L 70% 28%"
  },
  {
    id: "6002-df-go",
    number: "6002",
    name: "L2 SUL E NORTE (ZOOLÓGICO - UNB - SETOR NORESTE) / JARDIM INGÁ (AV. LUCENA RORIZ)",
    description: "Linha que conecta a L2 Sul e Norte ao Jardim Ingá via UNB e Zoológico",
    color: "#e74c3c", // Red for Catedral
    frequency: "Horários programados conforme tabela",
    company: "catedral",
    terminal: terminalJardimInga,
    stops: [
      {
        id: "stop-6002-df-1",
        name: "L2 Sul e Norte",
        address: "L2 Sul e Norte, Brasília - DF",
        coordinates: { x: "70%", y: "28%" }
      },
      {
        id: "stop-6002-df-2",
        name: "UNB",
        address: "UNB, Brasília - DF",
        coordinates: { x: "68%", y: "30%" }
      },
      {
        id: "stop-6002-df-3",
        name: "Zoológico",
        address: "Zoológico, Brasília - DF",
        coordinates: { x: "65%", y: "35%" }
      },
      {
        id: "stop-6002-df-4",
        name: "Jardim Ingá",
        address: "Av. Lucena Roriz, Jardim Ingá - GO",
        coordinates: { x: "50%", y: "50%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: [],
        afternoon: ["17:40"],
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
    nextScheduledTime: "17:40",
    pathCoordinates: "M 70% 28% L 68% 30% L 65% 35% L 50% 50%"
  }
];
