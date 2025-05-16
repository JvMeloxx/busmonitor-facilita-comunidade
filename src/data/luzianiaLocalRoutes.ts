import { BusRoute } from "../types/busTypes";
import { terminalLuziania } from "./terminals";

// Local Luziânia routes
export const luzianiaLocalRoutes: BusRoute[] = [
  {
    id: "industrial-113.2",
    number: "113.2",
    name: "INDUSTRIAL",
    description: "Linha que conecta o Terminal Rodoviário de Luziânia ao bairro Industrial",
    color: "#4361ee",
    frequency: "Horários programados conforme tabela",
    company: "tarifeZero", // Tarifa Zero
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
    company: "tarifeZero", // Tarifa Zero
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
    company: "tarifeZero", // Tarifa Zero
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
    company: "tarifeZero", // Tarifa Zero
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
    company: "tarifeZero", // Tarifa Zero
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
    company: "tarifeZero", // Tarifa Zero
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
  // NOVAS LINHAS

  // 1. JARDIM SP- POSTO C. - JADRIM B. linha 116.1
  {
    id: "jardim-sp-posto-c-jardim-b-116.1",
    number: "116.1",
    name: "JARDIM SP- POSTO C. - JARDIM B.",
    description: "Linha ligando Jardim São Paulo ao Jardim Bandeirantes (Posto C.), via Terminal Rodoviário de Luziânia.",
    color: "#38bdf8",
    frequency: "Horários programados conforme tabela",
    company: "tarifeZero",
    terminal: terminalLuziania,
    stops: [
      {
        id: "116-1-1",
        name: "Jardim São Paulo",
        address: "Jardim São Paulo, Luziânia - GO",
        coordinates: { x: "20%", y: "45%" }
      },
      {
        id: "116-1-2",
        name: "Posto C.",
        address: "Posto C., Luziânia - GO",
        coordinates: { x: "25%", y: "48%" }
      },
      {
        id: "116-1-3",
        name: "Jardim Bandeirantes",
        address: "Jardim Bandeirantes, Luziânia - GO",
        coordinates: { x: "30%", y: "50%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["06:30"],
        afternoon: ["12:00", "14:30"],
        evening: ["17:30"]
      },
      saturdayAndHoliday: {
        morning: ["06:30"],
        afternoon: ["14:30"],
        evening: []
      },
      sunday: {
        morning: [],
        afternoon: [],
        evening: []
      }
    },
    nextScheduledTime: "06:30",
    pathCoordinates: "M 20% 45% L 25% 48% L 30% 50%"
  },

  // 2. JARDIM SÃO PAULO-BANDEIRANTES linha 116.1
  {
    id: "jardim-sao-paulo-bandeirantes-116.1",
    number: "116.1",
    name: "JARDIM SÃO PAULO-BANDEIRANTES",
    description: "Linha Jardim São Paulo para Bandeirantes, via Terminal Rodoviário de Luziânia.",
    color: "#38bdf8",
    frequency: "Horários programados conforme tabela",
    company: "tarifeZero",
    terminal: terminalLuziania,
    stops: [
      {
        id: "116-1-4",
        name: "Jardim São Paulo",
        address: "Jardim São Paulo, Luziânia - GO",
        coordinates: { x: "20%", y: "45%" }
      },
      {
        id: "116-1-5",
        name: "Bandeirantes",
        address: "Bandeirantes, Luziânia - GO",
        coordinates: { x: "32%", y: "52%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["05:00", "06:20", "08:00", "11:00"],
        afternoon: ["16:00"],
        evening: ["19:30"]
      },
      saturdayAndHoliday: {
        morning: ["05:30"],
        afternoon: ["12:00"],
        evening: ["17:30"]
      },
      sunday: {
        morning: ["06:30"],
        afternoon: ["12:00", "14:30"],
        evening: ["17:30"]
      }
    },
    nextScheduledTime: "05:00",
    pathCoordinates: "M 20% 45% L 32% 52%"
  },

  // 3. JARDIM INGÁ X LUZIÂNIA-VIA PARQUE 10 - linha 310
  {
    id: "jardim-inga-luziania-via-parque10-310",
    number: "310",
    name: "JARDIM INGÁ X LUZIÂNIA (Parque 10)",
    description: "Ligação Jardim Ingá a Luziânia via Parque 10.",
    color: "#0ea5e9",
    frequency: "Horário fixo",
    company: "tarifeZero",
    terminal: terminalLuziania,
    stops: [
      {
        id: "310p10-1",
        name: "Jardim Ingá",
        address: "Jardim Ingá, Luziânia - GO",
        coordinates: { x: "10%", y: "60%" }
      },
      {
        id: "310p10-2",
        name: "Parque 10",
        address: "Parque 10, Luziânia - GO",
        coordinates: { x: "18%", y: "62%" }
      },
      {
        id: "310p10-3",
        name: "Terminal Rodoviário de Luziânia",
        address: "Terminal Rodoviário, Luziânia - GO",
        coordinates: { x: "50%", y: "50%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["05:50"],
        afternoon: [],
        evening: []
      },
      saturdayAndHoliday: { morning: [], afternoon: [], evening: [] },
      sunday: { morning: [], afternoon: [], evening: [] }
    },
    nextScheduledTime: "05:50",
    pathCoordinates: "M 10% 60% L 18% 62% L 50% 50%"
  },

  // 4. JARDIM INGÁ X LUZIÂNIA-Via Hospital - linha 310
  {
    id: "jardim-inga-luziania-hospital-310",
    number: "310",
    name: "JARDIM INGÁ X LUZIÂNIA (Via Hospital)",
    description: "Jardim Ingá para Luziânia via Hospital.",
    color: "#0ea5e9",
    frequency: "Horários especiais",
    company: "tarifeZero",
    terminal: terminalLuziania,
    stops: [
      { id: "310h-1", name: "Jardim Ingá", address: "Jardim Ingá, Luziânia - GO", coordinates: { x: "12%", y: "63%" }},
      { id: "310h-2", name: "Hospital", address: "Hospital, Luziânia - GO", coordinates: { x: "46%", y: "46%" }},
      { id: "310h-3", name: "Terminal Rodoviário de Luziânia", address: "Terminal Rodoviário, Luziânia - GO", coordinates: { x: "50%", y: "50%" }},
    ],
    schedule: {
      mondayToFriday: {
        morning: ["06:20"], // Luziânia x Ingá
        afternoon: [],
        evening: ["19:20"] // Ingá x Luziânia
      },
      saturdayAndHoliday: { morning: [], afternoon: [], evening: [] },
      sunday: { morning: [], afternoon: [], evening: [] }
    },
    nextScheduledTime: "06:20",
    pathCoordinates: "M 12% 63% L 46% 46% L 50% 50%"
  },

  // 5a. JARDIM ingá x Luziânia linha 310 - Jardim Ingá para Luziânia
  {
    id: "jardim-inga-para-luziania-310",
    number: "310",
    name: "JARDIM INGÁ → LUZIÂNIA",
    description: "Sentido Jardim Ingá para Luziânia.",
    color: "#0ea5e9",
    frequency: "Horários programados conforme tabela",
    company: "tarifeZero",
    terminal: terminalLuziania,
    stops: [
      { id: "310jil-1", name: "Jardim Ingá", address: "Jardim Ingá, Luziânia - GO", coordinates: { x: "12%", y: "63%" }},
      { id: "310jil-2", name: "Terminal Rodoviário de Luziânia", address: "Terminal Rodoviário, Luziânia - GO", coordinates: { x: "50%", y: "50%" }}
    ],
    schedule: {
      mondayToFriday: {
        morning: ["04:50", "05:20", "06:20", "06:40", "06:55", "07:10", "08:15", "09:15", "09:50", "10:30"],
        afternoon: ["12:10", "12:50", "13:30", "14:10", "14:40", "15:10", "15:40", "16:10", "17:10"],
        evening: ["17:50"]
      },
      saturdayAndHoliday: {
        morning: ["05:00", "06:00", "06:30", "07:00", "08:30", "09:30", "10:30"],
        afternoon: ["12:00", "13:00", "15:00"],
        evening: []
      },
      sunday: {
        morning: ["06:00", "07:00", "09:30"],
        afternoon: ["13:00", "14:00"],
        evening: []
      }
    },
    nextScheduledTime: "04:50",
    pathCoordinates: "M 12% 63% L 50% 50%"
  },

  // 5b. JARDIM ingá x Luziânia linha 310 - Luziânia para Jardim Ingá
  {
    id: "luziania-para-jardim-inga-310",
    number: "310",
    name: "LUZIÂNIA → JARDIM INGÁ",
    description: "Sentido Luziânia para Jardim Ingá.",
    color: "#0ea5e9",
    frequency: "Horários programados conforme tabela",
    company: "tarifeZero",
    terminal: terminalLuziania,
    stops: [
      { id: "310lji-1", name: "Terminal Rodoviário de Luziânia", address: "Terminal Rodoviário, Luziânia - GO", coordinates: { x: "50%", y: "50%" }},
      { id: "310lji-2", name: "Jardim Ingá", address: "Jardim Ingá, Luziânia - GO", coordinates: { x: "12%", y: "63%" }}
    ],
    schedule: {
      mondayToFriday: {
        morning: ["07:15", "07:50", "08:15", "08:30", "09:00", "09:30", "10:15", "11:00"],
        afternoon: ["12:00", "13:30", "14:00", "14:30", "15:10", "15:40", "16:20", "16:40", "17:10"],
        evening: ["18:00", "18:30", "19:00", "19:15", "19:40", "20:00", "20:20", "20:40", "21:00"]
      },
      saturdayAndHoliday: {
        morning: ["07:10", "08:10", "09:30", "10:30"],
        afternoon: ["12:00", "13:00", "14:00", "16:00"],
        evening: ["18:00", "18:30", "19:00", "19:30"]
      },
      sunday: {
        morning: ["08:10", "09:00", "10:40"],
        afternoon: ["15:00", "16:00"],
        evening: ["18:30", "19:30"]
      }
    },
    nextScheduledTime: "07:15",
    pathCoordinates: "M 50% 50% L 12% 63%"
  },

  // 6a. CLUBE MILITAR-parque 08 e 10-ipê linha 332 (Clube Militar para Ipê)
  {
    id: "clube-militar-para-ipe-332",
    number: "332",
    name: "CLUBE MILITAR → IPÊ (08/10)",
    description: "Sentido Clube Militar para Ipê (passando pelo Parque 8 e 10).",
    color: "#a3e635",
    frequency: "Horários programados conforme tabela",
    company: "tarifeZero",
    terminal: terminalLuziania,
    stops: [
      { id: "332cm-1", name: "Clube Militar", address: "Clube Militar, Luziânia - GO", coordinates: { x: "34%", y: "60%" }},
      { id: "332ipe-2", name: "Ipê", address: "Ipê, Luziânia - GO", coordinates: { x: "45%", y: "62%" }}
    ],
    schedule: {
      mondayToFriday: {
        morning: ["05:30", "06:10", "06:30", "07:00", "07:20", "07:40", "08:20", "08:50", "09:10", "09:50", "10:10", "11:00", "11:20", "11:40"],
        afternoon: ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "14:50", "15:30", "16:00", "16:30", "16:50", "17:10", "17:30"],
        evening: ["18:10", "18:30", "19:10"]
      },
      saturdayAndHoliday: {
        morning: ["05:30", "06:30", "07:00", "07:40", "08:50", "09:10", "09:50", "11:00", "11:20"],
        afternoon: ["12:00", "13:00", "13:20", "13:40", "14:00", "15:00", "16:00", "17:00"],
        evening: ["18:20", "19:00"]
      },
      sunday: {
        morning: ["06:30", "07:00", "08:30", "09:30", "10:30", "11:30"],
        afternoon: ["12:30", "13:30", "14:30", "16:30"],
        evening: ["18:30"]
      }
    },
    nextScheduledTime: "05:30",
    pathCoordinates: "M 34% 60% L 45% 62%"
  },

  // 6b. CLUBE MILITAR-parque 08 e 10-ipê linha 332 (Ipê para Clube Militar)
  {
    id: "ipe-para-clube-militar-332",
    number: "332",
    name: "IPÊ → CLUBE MILITAR (08/10)",
    description: "Sentido Ipê para Clube Militar.",
    color: "#a3e635",
    frequency: "Horários programados conforme tabela",
    company: "tarifeZero",
    terminal: terminalLuziania,
    stops: [
      { id: "332ipe-1", name: "Ipê", address: "Ipê, Luziânia - GO", coordinates: { x: "45%", y: "62%" }},
      { id: "332cm-2", name: "Clube Militar", address: "Clube Militar, Luziânia - GO", coordinates: { x: "34%", y: "60%" }}
    ],
    schedule: {
      mondayToFriday: {
        morning: ["06:30", "07:10", "07:40", "08:00", "08:40", "09:00", "09:30", "09:50", "10:10", "10:50", "11:10", "11:30"],
        afternoon: ["12:00", "12:20", "12:40", "13:00", "14:00", "14:30", "15:00", "15:30", "15:50", "16:30", "17:00", "17:30", "17:50"],
        evening: ["18:10", "18:30", "19:10", "19:30", "20:10"]
      },
      saturdayAndHoliday: {
        morning: ["06:30", "07:40", "08:00", "08:40", "09:50", "10:10", "10:50"],
        afternoon: ["12:00", "12:20", "13:00", "14:00", "14:20", "14:40", "15:00", "16:00", "17:00"],
        evening: ["18:00", "19:40", "20:00"]
      },
      sunday: {
        morning: ["07:30", "08:30", "09:30", "10:30", "11:30"],
        afternoon: ["12:30", "13:30", "14:30", "15:30", "17:30"],
        evening: ["19:30"]
      }
    },
    nextScheduledTime: "06:30",
    pathCoordinates: "M 45% 62% L 34% 60%"
  },

  // 7a. GARAGEM - P.10 - ADMINISTRAÇÃO linha 334 (Garagem para Administração)
  {
    id: "garagem-para-administracao-334",
    number: "334",
    name: "GARAGEM → ADMINISTRAÇÃO (P.10)",
    description: "Garagem para Administração passando pelo Parque 10.",
    color: "#7c3aed",
    frequency: "Horários programados conforme tabela",
    company: "tarifeZero",
    terminal: terminalLuziania,
    stops: [
      { id: "334g-1", name: "Garagem", address: "Garagem, Luziânia - GO", coordinates: { x: "22%", y: "54%" }},
      { id: "334adm-2", name: "Administração", address: "Administração, Luziânia - GO", coordinates: { x: "35%", y: "50%" }}
    ],
    schedule: {
      mondayToFriday: {
        morning: ["06:30", "07:36", "08:30", "09:30", "10:30", "11:30"],
        afternoon: ["12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"],
        evening: ["18:00", "18:30", "18:50"]
      },
      saturdayAndHoliday: {
        morning: ["07:00", "08:00", "09:00", "10:00", "11:00"],
        afternoon: ["12:00", "12:15", "13:00", "14:00", "15:00", "16:00", "17:00"],
        evening: ["18:00", "18:50"]
      },
      sunday: {
        morning: ["06:30", "07:30", "08:30", "09:30", "10:30", "11:30"],
        afternoon: ["12:30", "13:00", "14:00", "15:00", "16:00", "17:00"],
        evening: ["18:00"]
      }
    },
    nextScheduledTime: "06:30",
    pathCoordinates: "M 22% 54% L 35% 50%"
  },

  // 7b. GARAGEM - P.10 - ADMINISTRAÇÃO linha 334 (Administração para Garagem)
  {
    id: "administracao-para-garagem-334",
    number: "334",
    name: "ADMINISTRAÇÃO → GARAGEM (P.10)",
    description: "Administração para Garagem passando pelo Parque 10.",
    color: "#7c3aed",
    frequency: "Horários programados conforme tabela",
    company: "tarifeZero",
    terminal: terminalLuziania,
    stops: [
      { id: "334adm-1", name: "Administração", address: "Administração, Luziânia - GO", coordinates: { x: "35%", y: "50%" }},
      { id: "334g-2", name: "Garagem", address: "Garagem, Luziânia - GO", coordinates: { x: "22%", y: "54%" }}
    ],
    schedule: {
      mondayToFriday: {
        morning: ["07:00", "08:00", "09:00", "10:00", "11:00"],
        afternoon: ["12:00", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"],
        evening: ["18:00", "18:30", "19:00", "19:20"]
      },
      saturdayAndHoliday: {
        morning: ["07:30", "08:30", "09:30", "10:30", "11:30"],
        afternoon: ["12:30", "12:45", "13:30", "14:30", "15:30", "16:30", "17:30"],
        evening: ["18:30", "19:20"]
      },
      sunday: {
        morning: ["07:00", "08:00", "09:00", "10:00", "11:00"],
        afternoon: ["12:00", "12:45", "13:00", "13:30", "13:45", "14:30", "15:30", "16:30", "17:30"],
        evening: ["18:30"]
      }
    },
    nextScheduledTime: "07:00",
    pathCoordinates: "M 35% 50% L 22% 54%"
  },

  // 8. P. BELO HORIZONTE - MINGONE 1 e 2 - MARÍLIA CRUZEIRO - PRO LOTE linha 335
  {
    id: "prolote-335",
    number: "335",
    name: "P. BELO HORIZONTE - MINGONE 1 e 2 - MARÍLIA CRUZEIRO - PRO LOTE",
    description: "Linha entre bairros Belo Horizonte, Mingone 1 e 2, Marília Cruzeiro e Pro Lote.",
    color: "#16a34a",
    frequency: "Horários programados conforme tabela",
    company: "tarifeZero",
    terminal: terminalLuziania,
    stops: [
      { id: "335-1", name: "Belo Horizonte", address: "Belo Horizonte, Luziânia - GO", coordinates: { x: "12%", y: "20%" }},
      { id: "335-2", name: "Mingone 1", address: "Mingone 1, Luziânia - GO", coordinates: { x: "15%", y: "18%" }},
      { id: "335-3", name: "Mingone 2", address: "Mingone 2, Luziânia - GO", coordinates: { x: "17%", y: "21%" }},
      { id: "335-4", name: "Marília Cruzeiro", address: "Marília Cruzeiro, Luziânia - GO", coordinates: { x: "19%", y: "24%" }},
      { id: "335-5", name: "Pro Lote", address: "Pro Lote, Luziânia - GO", coordinates: { x: "22%", y: "25%" }}
    ],
    schedule: {
      mondayToFriday: {
        morning: ["06:00", "11:40"],
        afternoon: ["17:40"],
        evening: []
      },
      saturdayAndHoliday: { morning: [], afternoon: [], evening: [] },
      sunday: { morning: [], afternoon: [], evening: [] }
    },
    nextScheduledTime: "06:00",
    pathCoordinates: "M 12% 20% L 15% 18% L 17% 21% L 19% 24% L 22% 25%"
  },

  // 9. CHÁCARAS AMERICANOS linha 130
  {
    id: "chacaras-americanos-130",
    number: "130",
    name: "CHÁCARAS AMERICANOS",
    description: "Linha entre Chácaras Americanos e Terminal Rodoviário de Luziânia.",
    color: "#fde047",
    frequency: "Horários programados conforme tabela",
    company: "tarifeZero",
    terminal: terminalLuziania,
    stops: [
      { id: "130-1", name: "Chácaras Americanos", address: "Chácaras Americanos, Luziânia - GO", coordinates: { x: "17%", y: "33%" }},
      { id: "130-2", name: "Terminal Rodoviário de Luziânia", address: "Terminal Rodoviário, Luziânia - GO", coordinates: { x: "50%", y: "50%" }}
    ],
    schedule: {
      mondayToFriday: {
        morning: ["07:30"],
        afternoon: ["16:00"],
        evening: []
      },
      saturdayAndHoliday: {
        morning: ["07:30"],
        afternoon: ["16:00"],
        evening: []
      },
      sunday: { morning: [], afternoon: [], evening: [] }
    },
    nextScheduledTime: "07:30",
    pathCoordinates: "M 17% 33% L 50% 50%"
  },

  // 10. ZONA RURAL (placeholders)
  {
    id: "zona-rural-maniratuba",
    number: "ZR-1",
    name: "Luziânia - Maniratuba",
    description: "Rota rural Luziânia para Maniratuba. (Horários a definir)",
    color: "#666699",
    frequency: "Aguardando horários",
    company: "tarifeZero",
    terminal: terminalLuziania,
    stops: [
      { id: "zr-1-1", name: "Luziânia", address: "Luziânia - GO", coordinates: { x: "50%", y: "50%" }},
      { id: "zr-1-2", name: "Maniratuba", address: "Maniratuba - GO", coordinates: { x: "70%", y: "70%" }}
    ],
    schedule: {
      mondayToFriday: { morning: [], afternoon: [], evening: [] },
      saturdayAndHoliday: { morning: [], afternoon: [], evening: [] },
      sunday: { morning: [], afternoon: [], evening: [] }
    },
    nextScheduledTime: "Não disponível",
    pathCoordinates: "M 50% 50% L 70% 70%"
  },
  {
    id: "zona-rural-mato-grande",
    number: "ZR-2",
    name: "Luziânia - Mato Grande",
    description: "Rota rural Luziânia para Mato Grande. (Horários a definir)",
    color: "#666699",
    frequency: "Aguardando horários",
    company: "tarifeZero",
    terminal: terminalLuziania,
    stops: [
      { id: "zr-2-1", name: "Luziânia", address: "Luziânia - GO", coordinates: { x: "50%", y: "50%" }},
      { id: "zr-2-2", name: "Mato Grande", address: "Mato Grande - GO", coordinates: { x: "80%", y: "65%" }}
    ],
    schedule: {
      mondayToFriday: { morning: [], afternoon: [], evening: [] },
      saturdayAndHoliday: { morning: [], afternoon: [], evening: [] },
      sunday: { morning: [], afternoon: [], evening: [] }
    },
    nextScheduledTime: "Não disponível",
    pathCoordinates: "M 50% 50% L 80% 65%"
  },
  {
    id: "zona-rural-laje-santana",
    number: "ZR-3",
    name: "Luziânia - Laje Santana",
    description: "Rota rural Luziânia para Laje Santana. (Horários a definir)",
    color: "#666699",
    frequency: "Aguardando horários",
    company: "tarifeZero",
    terminal: terminalLuziania,
    stops: [
      { id: "zr-3-1", name: "Luziânia", address: "Luziânia - GO", coordinates: { x: "50%", y: "50%" }},
      { id: "zr-3-2", name: "Laje Santana", address: "Laje Santana - GO", coordinates: { x: "68%", y: "80%" }}
    ],
    schedule: {
      mondayToFriday: { morning: [], afternoon: [], evening: [] },
      saturdayAndHoliday: { morning: [], afternoon: [], evening: [] },
      sunday: { morning: [], afternoon: [], evening: [] }
    },
    nextScheduledTime: "Não disponível",
    pathCoordinates: "M 50% 50% L 68% 80%"
  },
  {
    id: "zona-rural-cedro-cruzeiro-samambaia",
    number: "ZR-4",
    name: "Luziânia - CEDRO / CRUZEIRO / SAMAMBAIA",
    description: "Rota rural (CEDRO/CRUZEIRO/SAMAMBAIA). (Horários a definir)",
    color: "#666699",
    frequency: "Aguardando horários",
    company: "tarifeZero",
    terminal: terminalLuziania,
    stops: [
      { id: "zr-4-1", name: "Luziânia", address: "Luziânia - GO", coordinates: { x: "50%", y: "50%" }},
      { id: "zr-4-2", name: "CEDRO / CRUZEIRO / SAMAMBAIA", address: "Zona Rural - CEDRO / CRUZEIRO / SAMAMBAIA, Luziânia", coordinates: { x: "85%", y: "30%" }}
    ],
    schedule: {
      mondayToFriday: { morning: [], afternoon: [], evening: [] },
      saturdayAndHoliday: { morning: [], afternoon: [], evening: [] },
      sunday: { morning: [], afternoon: [], evening: [] }
    },
    nextScheduledTime: "Não disponível",
    pathCoordinates: "M 50% 50% L 85% 30%"
  }
];
