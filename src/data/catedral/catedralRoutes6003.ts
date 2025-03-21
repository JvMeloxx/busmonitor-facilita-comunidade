
import { BusRoute } from "../../types/busTypes";
import { terminalJardimInga } from "../terminals";

// Catedral routes - 6003 group
export const catedralRoutes6003: BusRoute[] = [
  {
    id: "6003-go-df",
    number: "6003",
    name: "JARDIM INGÁ - ROD. PLANO PILOTO VIA VIA PARKSHOPPING",
    description: "Linha que conecta o Jardim Ingá à Rodoviária do Plano Piloto via Park Shopping",
    color: "#e74c3c", // Red for Catedral
    frequency: "Horários programados conforme tabela",
    company: "catedral",
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
    company: "catedral",
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
