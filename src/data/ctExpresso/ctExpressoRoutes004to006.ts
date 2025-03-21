
import { BusRoute } from "../../types/busTypes";
import { terminalLuziania } from "../terminals";

// CT Expresso routes: 004-006
export const ctExpressoRoutes004to006: BusRoute[] = [
  {
    id: "luziania-rodoviaria-pp-zoo-esplanada",
    number: "004",
    name: "LUZIÂNIA / RODOVIÁRIA DO PLANO PILOTO (via Zoológico - Esplanada)",
    description: "LUZIÂNIA (LUZIÂNIA SHOPPING - AV. ALFREDO NASSER) / RODOVIÁRIA DO PLANO PILOTO (BR-040 - ZOOLÓGICO - EIXO - ESPLANADA)",
    color: "#eab308", // Yellow for CT Expresso
    frequency: "Horários programados conforme tabela",
    company: "ctExpresso",
    terminal: terminalLuziania,
    stops: [
      {
        id: "stop-004-1",
        name: "Luziânia Shopping",
        address: "Luziânia Shopping, Luziânia - GO",
        coordinates: { x: "50%", y: "50%" }
      },
      {
        id: "stop-004-2",
        name: "Zoológico",
        address: "Zoológico, Brasília - DF",
        coordinates: { x: "65%", y: "35%" }
      },
      {
        id: "stop-004-3",
        name: "Esplanada",
        address: "Esplanada dos Ministérios, Brasília - DF",
        coordinates: { x: "70%", y: "28%" }
      },
      {
        id: "stop-004-4",
        name: "Rodoviária do Plano Piloto",
        address: "Rodoviária do Plano Piloto, Brasília - DF",
        coordinates: { x: "70%", y: "25%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["04:50", "05:40", "06:40"],
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
    nextScheduledTime: "04:50",
    pathCoordinates: "M 50% 50% L 65% 35% L 70% 28% L 70% 25%"
  },
  {
    id: "luziania-rodoviaria-pp-zoo",
    number: "005",
    name: "LUZIÂNIA / RODOVIÁRIA DO PLANO PILOTO (via Zoológico)",
    description: "LUZIÂNIA (LUZIÂNIA SHOPPING - AV. ALFREDO NASSER) / RODOVIÁRIA DO PLANO PILOTO (BR-040 - ZOOLÓGICO - EIXO)",
    color: "#eab308", // Yellow for CT Expresso
    frequency: "Horários programados conforme tabela",
    company: "ctExpresso",
    terminal: terminalLuziania,
    stops: [
      {
        id: "stop-005-1",
        name: "Luziânia Shopping",
        address: "Luziânia Shopping, Luziânia - GO",
        coordinates: { x: "50%", y: "50%" }
      },
      {
        id: "stop-005-2",
        name: "Zoológico",
        address: "Zoológico, Brasília - DF",
        coordinates: { x: "65%", y: "35%" }
      },
      {
        id: "stop-005-3",
        name: "Rodoviária do Plano Piloto",
        address: "Rodoviária do Plano Piloto, Brasília - DF",
        coordinates: { x: "70%", y: "25%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["04:00", "05:00", "05:20", "05:50", "06:00", "06:10", "06:20", "06:30", "06:50", "07:00", "07:20", "07:40", "08:00", "08:10", "08:20", "08:40", "08:50", "09:20", "09:30", "09:50", "10:00", "10:10", "10:30", "10:40", "11:10", "11:20", "11:50"],
        afternoon: ["12:00", "12:30", "12:40", "13:10", "13:20", "13:40", "13:50", "14:10", "14:30", "14:40", "15:00", "15:10", "15:30", "15:40", "15:50", "16:10", "16:20", "16:30", "16:40", "16:50", "17:20", "17:20", "17:50", "18:10", "18:30", "19:10", "19:50"],
        evening: ["20:10"]
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
    pathCoordinates: "M 50% 50% L 65% 35% L 70% 25%"
  },
  {
    id: "estrela-dalva-rodoviaria-pp",
    number: "006",
    name: "PARQUE ESTRELA DALVA / RODOVIÁRIA DO PLANO PILOTO",
    description: "LUZIÂNIA (PARQUE ESTRELA DALVA I - JARDIM LUZILIA - SOL NASCENTE) / RODOVIÁRIA DO PLANO PILOTO (BR-040 - ZOOLÓGICO - EIXO)",
    color: "#eab308", // Yellow for CT Expresso
    frequency: "Horários programados conforme tabela",
    company: "ctExpresso",
    terminal: terminalLuziania,
    stops: [
      {
        id: "stop-006-1",
        name: "Parque Estrela Dalva",
        address: "Parque Estrela Dalva, Luziânia - GO",
        coordinates: { x: "45%", y: "55%" }
      },
      {
        id: "stop-006-2",
        name: "Jardim Luzilia",
        address: "Jardim Luzilia, Luziânia - GO",
        coordinates: { x: "48%", y: "52%" }
      },
      {
        id: "stop-006-3",
        name: "Sol Nascente",
        address: "Sol Nascente, Luziânia - GO",
        coordinates: { x: "50%", y: "50%" }
      },
      {
        id: "stop-006-4",
        name: "Rodoviária do Plano Piloto",
        address: "Rodoviária do Plano Piloto, Brasília - DF",
        coordinates: { x: "70%", y: "25%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["04:30"],
        afternoon: [],
        evening: ["18:45"]
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
    pathCoordinates: "M 45% 55% L 48% 52% L 50% 50% L 70% 25%"
  }
];
