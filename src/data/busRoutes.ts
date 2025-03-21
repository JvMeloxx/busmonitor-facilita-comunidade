
import { BusRoute } from "../types/busTypes";
import { terminalLuziania } from "./terminals";

// Sample data for bus routes
export const busRoutes: BusRoute[] = [
  {
    id: "industrial-113.2",
    number: "113.2",
    name: "INDUSTRIAL",
    description: "Linha que conecta o Terminal Rodoviário de Luziânia ao bairro Industrial",
    color: "#4361ee",
    frequency: "Horários programados conforme tabela",
    terminal: terminalLuziania,
    stops: [
      {
        id: "stop-113-2-1",
        name: "Terminal Rodoviário de Luziânia",
        address: "Terminal Rodoviário, Luziânia - GO",
        coordinates: { x: "50%", y: "50%" }
      },
      {
        id: "stop-113-2-2",
        name: "Setor Industrial",
        address: "Setor Industrial, Luziânia - GO",
        coordinates: { x: "30%", y: "35%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["05:00", "05:50", "07:05", "11:20"],
        afternoon: ["13:00", "14:00", "16:30", "17:20"],
        evening: ["18:30"]
      },
      saturdayAndHoliday: {
        morning: ["06:00", "07:00"],
        afternoon: ["12:20", "17:20"],
        evening: ["18:30"]
      },
      sunday: {
        morning: ["06:00", "07:00"],
        afternoon: ["12:20", "17:20"],
        evening: ["18:30"]
      }
    },
    nextScheduledTime: "05:00",
    pathCoordinates: "M 50% 50% L 30% 35%"
  },
  {
    id: "sao-caetano-via-setor-leste-113.3",
    number: "113.3",
    name: "SÃO CAETANO VIA SETOR LESTE",
    description: "Linha que conecta o Terminal Rodoviário de Luziânia ao bairro São Caetano via Setor Leste",
    color: "#e63946",
    frequency: "Horários programados conforme tabela",
    terminal: terminalLuziania,
    stops: [
      {
        id: "stop-113-3-1",
        name: "Terminal Rodoviário de Luziânia",
        address: "Terminal Rodoviário, Luziânia - GO",
        coordinates: { x: "50%", y: "50%" }
      },
      {
        id: "stop-113-3-2",
        name: "Setor Leste",
        address: "Setor Leste, Luziânia - GO",
        coordinates: { x: "60%", y: "45%" }
      },
      {
        id: "stop-113-3-3",
        name: "São Caetano",
        address: "São Caetano, Luziânia - GO",
        coordinates: { x: "70%", y: "35%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["07:00", "11:30"],
        afternoon: ["16:00"],
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
    nextScheduledTime: "07:00",
    pathCoordinates: "M 50% 50% L 60% 45% L 70% 35%"
  },
  {
    id: "setor-leste-113.3",
    number: "113.3",
    name: "SETOR LESTE",
    description: "Linha que conecta o Terminal Rodoviário de Luziânia ao Setor Leste",
    color: "#43aa8b",
    frequency: "Horários programados conforme tabela",
    terminal: terminalLuziania,
    stops: [
      {
        id: "stop-113-3-sl-1",
        name: "Terminal Rodoviário de Luziânia",
        address: "Terminal Rodoviário, Luziânia - GO",
        coordinates: { x: "50%", y: "50%" }
      },
      {
        id: "stop-113-3-sl-2",
        name: "Setor Leste",
        address: "Setor Leste, Luziânia - GO",
        coordinates: { x: "60%", y: "45%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["05:50", "06:50", "07:30", "08:00", "08:30", "09:00", "10:00", "11:00"],
        afternoon: ["12:00", "12:30", "13:00", "14:00", "15:00", "16:00", "16:30", "17:00", "17:30"],
        evening: ["18:00", "18:30", "19:30"]
      },
      saturdayAndHoliday: {
        morning: ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00"],
        afternoon: ["12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
        evening: ["18:00"]
      },
      sunday: {
        morning: ["07:00", "08:00"],
        afternoon: ["14:00", "15:00"],
        evening: []
      }
    },
    nextScheduledTime: "05:50",
    pathCoordinates: "M 50% 50% L 60% 45%"
  },
  {
    id: "parque-santa-fe-114",
    number: "114",
    name: "PARQUE SANTA FÉ",
    description: "Linha que conecta o Terminal Rodoviário de Luziânia ao Parque Santa Fé",
    color: "#fb8500",
    frequency: "Horários programados conforme tabela",
    terminal: terminalLuziania,
    stops: [
      {
        id: "stop-114-1",
        name: "Terminal Rodoviário de Luziânia",
        address: "Terminal Rodoviário, Luziânia - GO",
        coordinates: { x: "50%", y: "50%" }
      },
      {
        id: "stop-114-2",
        name: "Parque Santa Fé",
        address: "Parque Santa Fé, Luziânia - GO",
        coordinates: { x: "40%", y: "40%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["06:00", "09:00"],
        afternoon: ["15:30", "17:10"],
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
    pathCoordinates: "M 50% 50% L 40% 40%"
  },
  {
    id: "fumal-parque-santa-fe-114",
    number: "114",
    name: "FUMAL - PARQUE SANTA FÉ",
    description: "Linha que conecta o Terminal Rodoviário de Luziânia ao Fumal e Parque Santa Fé",
    color: "#f28c38",
    frequency: "Horários programados conforme tabela",
    terminal: terminalLuziania,
    stops: [
      {
        id: "stop-114-fumal-1",
        name: "Terminal Rodoviário de Luziânia",
        address: "Terminal Rodoviário, Luziânia - GO",
        coordinates: { x: "50%", y: "50%" }
      },
      {
        id: "stop-114-fumal-2",
        name: "Fumal",
        address: "Fumal, Luziânia - GO",
        coordinates: { x: "35%", y: "45%" }
      },
      {
        id: "stop-114-fumal-3",
        name: "Parque Santa Fé",
        address: "Parque Santa Fé, Luziânia - GO",
        coordinates: { x: "40%", y: "40%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["07:00"],
        afternoon: ["12:00"],
        evening: ["18:10"]
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
    nextScheduledTime: "07:00",
    pathCoordinates: "M 50% 50% L 35% 45% L 40% 40%"
  },
  {
    id: "parque-alvorada-115.1",
    number: "115.1",
    name: "PARQUE ALVORADA",
    description: "Linha que conecta o Terminal Rodoviário de Luziânia ao Parque Alvorada",
    color: "#2a9d8f",
    frequency: "Horários programados conforme tabela",
    terminal: terminalLuziania,
    stops: [
      {
        id: "stop-115-1-1",
        name: "Terminal Rodoviário de Luziânia",
        address: "Terminal Rodoviário, Luziânia - GO",
        coordinates: { x: "50%", y: "50%" }
      },
      {
        id: "stop-115-1-2",
        name: "Parque Alvorada",
        address: "Parque Alvorada, Luziânia - GO",
        coordinates: { x: "55%", y: "35%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["06:00", "07:00", "08:30"],
        afternoon: ["12:00", "16:00", "17:00", "17:30"],
        evening: ["18:00"]
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
    pathCoordinates: "M 50% 50% L 55% 35%"
  },

  // CT Expresso bus routes - New routes
  {
    id: "luziania-guara",
    number: "001",
    name: "LUZIÂNIA / GUARÁ I E II",
    description: "LUZIÂNIA (LUZIÂNIA SHOPPING - AV. ALFREDO NASSER) / GUARÁ I E II (BR-040 - PARK SHOPPING)",
    color: "#eab308", // Yellow for CT Expresso
    frequency: "Horários programados conforme tabela",
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
  },
  // Add remaining CT Expresso routes
  // Continue with more routes...
];

