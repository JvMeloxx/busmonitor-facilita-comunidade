
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
  }
];
