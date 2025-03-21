import { BusRoute } from "../types/busTypes";
import { terminalLuziania } from "./terminals";

// CT Expresso routes connecting Luziânia to Distrito Federal (DF)
export const ctExpressoRoutesDf: BusRoute[] = [
  {
    id: "luziania-guara",
    number: "001",
    name: "LUZIÂNIA / GUARÁ I E II",
    description: "LUZIÂNIA (LUZIÂNIA SHOPPING - AV. ALFREDO NASSER) / GUARÁ I E II (BR-040 - PARK SHOPPING)",
    color: "#eab308", // Yellow for CT Expresso
    frequency: "Horários programados conforme tabela",
    company: "ctExpresso", // CT Expresso
    terminal: terminalLuziania,
    stops: [
      {
        id: "stop-001-1",
        name: "Luziânia Shopping",
        address: "Luziânia Shopping, Luziânia - GO",
        coordinates: { x: "50%", y: "50%" }
      },
      {
        id: "stop-001-2",
        name: "Guará",
        address: "Guará, Brasília - DF",
        coordinates: { x: "60%", y: "30%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["05:30"],
        afternoon: ["17:00"],
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
    nextScheduledTime: "05:30",
    pathCoordinates: "M 50% 50% L 60% 30%"
  },
  {
    id: "luziania-lago-sul",
    number: "002",
    name: "LUZIÂNIA / LAGO SUL",
    description: "LUZIÂNIA (LUZIÂNIA SHOPPING - AV. ALFREDO NASSER) / LAGO SUL (BR-040 - AEROPORTO)",
    color: "#eab308", // Yellow for CT Expresso
    frequency: "Horários programados conforme tabela",
    company: "ctExpresso", // CT Expresso
    terminal: terminalLuziania,
    stops: [
      {
        id: "stop-002-1",
        name: "Luziânia Shopping",
        address: "Luziânia Shopping, Luziânia - GO",
        coordinates: { x: "50%", y: "50%" }
      },
      {
        id: "stop-002-2",
        name: "Lago Sul",
        address: "Lago Sul, Brasília - DF",
        coordinates: { x: "65%", y: "25%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["05:10", "05:30"],
        afternoon: ["16:30", "17:00"],
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
    nextScheduledTime: "05:10",
    pathCoordinates: "M 50% 50% L 65% 25%"
  },
  {
    id: "luziania-rodoviaria-pp-park",
    number: "003",
    name: "LUZIÂNIA / RODOVIÁRIA DO PLANO PILOTO (via Park Shopping)",
    description: "LUZIÂNIA (LUZIÂNIA SHOPPING - AV. ALFREDO NASSER) / RODOVIÁRIA DO PLANO PILOTO (BR-040 - PARK SHOPPING - EIXO SUL)",
    color: "#eab308", // Yellow for CT Expresso
    frequency: "Horários programados conforme tabela",
    company: "ctExpresso", // CT Expresso
    terminal: terminalLuziania,
    stops: [
      {
        id: "stop-003-1",
        name: "Luziânia Shopping",
        address: "Luziânia Shopping, Luziânia - GO",
        coordinates: { x: "50%", y: "50%" }
      },
      {
        id: "stop-003-2",
        name: "Park Shopping",
        address: "Park Shopping, Brasília - DF",
        coordinates: { x: "60%", y: "35%" }
      },
      {
        id: "stop-003-3",
        name: "Rodoviária do Plano Piloto",
        address: "Rodoviária do Plano Piloto, Brasília - DF",
        coordinates: { x: "70%", y: "25%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["00:10", "04:00", "04:30", "05:00", "05:14", "05:20", "05:40", "05:50", "05:58", "06:00", "06:20", "06:20", "06:35", "06:40", "06:42", "06:50", "07:00", "07:04", "07:10", "07:26", "07:30", "07:40", "07:48", "07:50", "08:10", "08:10", "08:20", "08:30", "08:32", "08:40", "08:50", "08:54", "09:16", "09:20", "09:30", "09:38", "09:50", "10:00", "10:00", "10:10", "10:22", "10:30", "10:40", "10:44", "11:06", "11:10", "11:20", "11:28", "11:50", "11:50"],
        afternoon: ["12:00", "12:12", "12:20", "12:30", "12:34", "12:40", "12:56", "13:00", "13:10", "13:18", "13:20", "13:40", "13:40", "13:50", "14:00", "14:02", "14:10", "14:20", "14:24", "14:30", "14:40", "14:46", "14:50", "15:00", "15:08", "15:10", "15:20", "15:30", "15:30", "15:40", "15:50", "15:52", "16:00", "16:10", "16:14", "16:20", "16:30", "16:36", "16:40", "16:50", "16:58", "17:00", "17:10", "17:20", "17:20", "17:30", "17:40", "17:42", "17:50", "18:00", "18:05", "18:10", "18:20", "18:26", "18:30", "18:40", "18:50", "19:10", "19:10", "19:20", "19:30", "19:35", "19:50", "19:55"],
        evening: ["20:00", "20:20", "20:30", "20:40", "21:00", "21:10", "21:20", "21:45", "21:50", "22:15", "22:30", "22:30", "23:20"]
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
    nextScheduledTime: "00:10",
    pathCoordinates: "M 50% 50% L 60% 35% L 70% 25%"
  },
  {
    id: "luziania-rodoviaria-pp-zoo-esplanada",
    number: "004",
    name: "LUZIÂNIA / RODOVIÁRIA DO PLANO PILOTO (via Zoológico - Esplanada)",
    description: "LUZIÂNIA (LUZIÂNIA SHOPPING - AV. ALFREDO NASSER) / RODOVIÁRIA DO PLANO PILOTO (BR-040 - ZOOLÓGICO - EIXO - ESPLANADA)",
    color: "#eab308", // Yellow for CT Expresso
    frequency: "Horários programados conforme tabela",
    company: "ctExpresso", // CT Expresso
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
    company: "ctExpresso", // CT Expresso
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
    company: "ctExpresso", // CT Expresso
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
