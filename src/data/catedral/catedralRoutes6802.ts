
import { BusRoute } from "../../types/busTypes";
import { terminalJardimInga } from "../terminals";

// Catedral routes - 6802 group
export const catedralRoutes6802: BusRoute[] = [
  {
    id: "6802-go-df",
    number: "6802",
    name: "JARDIM INGÁ (AV. LUCENA RORIZ) / RODOVIÁRIA DE TAGUATINGA NORTE (BR-040 - EPCT - PISTÃO SUL - TAGUATINGA CENTRO)",
    description: "Linha que conecta o Jardim Ingá à Rodoviária de Taguatinga Norte",
    color: "#e74c3c", // Red for Catedral
    frequency: "Horários programados conforme tabela",
    company: "catedral",
    terminal: terminalJardimInga,
    stops: [
      {
        id: "stop-6802-1",
        name: "Jardim Ingá",
        address: "Av. Lucena Roriz, Jardim Ingá - GO",
        coordinates: { x: "50%", y: "50%" }
      },
      {
        id: "stop-6802-2",
        name: "BR-040",
        address: "BR-040, DF",
        coordinates: { x: "55%", y: "45%" }
      },
      {
        id: "stop-6802-3",
        name: "EPCT",
        address: "EPCT, DF",
        coordinates: { x: "57%", y: "40%" }
      },
      {
        id: "stop-6802-4",
        name: "Pistão Sul",
        address: "Pistão Sul, Taguatinga - DF",
        coordinates: { x: "60%", y: "35%" }
      },
      {
        id: "stop-6802-5",
        name: "Taguatinga Centro",
        address: "Taguatinga Centro, DF",
        coordinates: { x: "58%", y: "30%" }
      },
      {
        id: "stop-6802-6",
        name: "Rodoviária de Taguatinga Norte",
        address: "Rodoviária de Taguatinga Norte, DF",
        coordinates: { x: "57%", y: "28%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["04:50", "06:20", "07:20"],
        afternoon: ["15:10", "16:10", "16:40"],
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
    nextScheduledTime: "04:50",
    pathCoordinates: "M 50% 50% L 55% 45% L 57% 40% L 60% 35% L 58% 30% L 57% 28%"
  },
  {
    id: "6802-df-go",
    number: "6802",
    name: "RODOVIÁRIA DE TAGUATINGA NORTE (BR-040 - EPCT - PISTÃO SUL - TAGUATINGA CENTRO) / JARDIM INGÁ (AV. LUCENA RORIZ)",
    description: "Linha que conecta a Rodoviária de Taguatinga Norte ao Jardim Ingá",
    color: "#e74c3c", // Red for Catedral
    frequency: "Horários programados conforme tabela",
    company: "catedral",
    terminal: terminalJardimInga,
    stops: [
      {
        id: "stop-6802-df-1",
        name: "Rodoviária de Taguatinga Norte",
        address: "Rodoviária de Taguatinga Norte, DF",
        coordinates: { x: "57%", y: "28%" }
      },
      {
        id: "stop-6802-df-2",
        name: "Taguatinga Centro",
        address: "Taguatinga Centro, DF",
        coordinates: { x: "58%", y: "30%" }
      },
      {
        id: "stop-6802-df-3",
        name: "Pistão Sul",
        address: "Pistão Sul, Taguatinga - DF",
        coordinates: { x: "60%", y: "35%" }
      },
      {
        id: "stop-6802-df-4",
        name: "EPCT",
        address: "EPCT, DF",
        coordinates: { x: "57%", y: "40%" }
      },
      {
        id: "stop-6802-df-5",
        name: "BR-040",
        address: "BR-040, DF",
        coordinates: { x: "55%", y: "45%" }
      },
      {
        id: "stop-6802-df-6",
        name: "Jardim Ingá",
        address: "Av. Lucena Roriz, Jardim Ingá - GO",
        coordinates: { x: "50%", y: "50%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["06:00", "07:00", "07:30", "08:00", "09:20", "11:45"],
        afternoon: ["14:30", "15:20", "16:15", "17:00", "17:45", "18:20", "18:40", "19:20"],
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
    pathCoordinates: "M 57% 28% L 58% 30% L 60% 35% L 57% 40% L 55% 45% L 50% 50%"
  }
];
