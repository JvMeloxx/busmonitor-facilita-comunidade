
import { BusRoute } from "../../types/busTypes";
import { terminalJardimInga } from "../terminals";

// Catedral routes - 6705 group
export const catedralRoutes6705: BusRoute[] = [
  {
    id: "6705-go-df",
    number: "6705",
    name: "JARDIM INGÁ - GAMA CENTRO, VIA SETOR SUL E LESTE",
    description: "Linha que conecta o Jardim Ingá ao Gama Centro via Setor Sul e Leste",
    color: "#e74c3c", // Red for Catedral
    frequency: "Horários programados conforme tabela",
    company: "catedral",
    terminal: terminalJardimInga,
    stops: [
      {
        id: "stop-6705-1",
        name: "Jardim Ingá",
        address: "Jardim Ingá - GO",
        coordinates: { x: "50%", y: "50%" }
      },
      {
        id: "stop-6705-2",
        name: "Setor Sul",
        address: "Setor Sul, Gama - DF",
        coordinates: { x: "55%", y: "40%" }
      },
      {
        id: "stop-6705-3",
        name: "Setor Leste",
        address: "Setor Leste, Gama - DF",
        coordinates: { x: "57%", y: "38%" }
      },
      {
        id: "stop-6705-4",
        name: "Gama Centro",
        address: "Gama Centro, DF",
        coordinates: { x: "58%", y: "36%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["04:30", "05:00", "05:15", "05:30", "05:45", "06:00", "06:15", "06:30", "06:45", "07:00", "07:20", "07:40", "08:15", "08:40", "09:30", "09:50", "10:15", "10:30", "10:55", "11:10", "11:30", "11:45"],
        afternoon: ["12:15", "12:45", "13:15", "13:30", "13:45", "14:30", "14:50", "15:00", "15:20", "15:35", "15:50", "16:05", "16:20", "16:35", "16:45", "16:55", "17:05", "17:20", "17:40", "18:00", "18:20", "18:40", "19:10", "19:45"],
        evening: ["20:40"]
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
    nextScheduledTime: "04:30",
    pathCoordinates: "M 50% 50% L 55% 40% L 57% 38% L 58% 36%"
  }
];
