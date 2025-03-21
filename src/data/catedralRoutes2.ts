
import { BusRoute } from "../types/busTypes";
import { terminalJardimInga } from "./terminals";

// Catedral (kandango) routes - Part 2
export const catedralRoutes2: BusRoute[] = [
  {
    id: "6002-go-df",
    number: "6002",
    name: "JARDIM INGÁ (AV. LUCENA RORIZ) / L2 SUL E NORTE (ZOOLÓGICO - UNB - SETOR NORESTE)",
    description: "Linha que conecta o Jardim Ingá à L2 Sul e Norte via Zoológico e UNB",
    color: "#e74c3c", // Red for Catedral
    frequency: "Horários programados conforme tabela",
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
  },
  {
    id: "6802-go-df",
    number: "6802",
    name: "JARDIM INGÁ (AV. LUCENA RORIZ) / RODOVIÁRIA DE TAGUATINGA NORTE (BR-040 - EPCT - PISTÃO SUL - TAGUATINGA CENTRO)",
    description: "Linha que conecta o Jardim Ingá à Rodoviária de Taguatinga Norte",
    color: "#e74c3c", // Red for Catedral
    frequency: "Horários programados conforme tabela",
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
  },
  {
    id: "6705-go-df",
    number: "6705",
    name: "JARDIM INGÁ - GAMA CENTRO, VIA SETOR SUL E LESTE",
    description: "Linha que conecta o Jardim Ingá ao Gama Centro via Setor Sul e Leste",
    color: "#e74c3c", // Red for Catedral
    frequency: "Horários programados conforme tabela",
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

// Continue adding more routes as needed
