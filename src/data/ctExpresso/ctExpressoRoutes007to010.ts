
import { BusRoute } from "../../types/busTypes";
import { terminalLuziania } from "../terminals";

// CT Expresso routes: 007-010
export const ctExpressoRoutes007to010: BusRoute[] = [
  {
    id: "estrela-dalva-w3-norte",
    number: "007",
    name: "PARQUE ESTRELA DALVA / W3 NORTE",
    description: "LUZIÂNIA (PARQUE ESTRELA DALVA I - JARDIM LUZILIA - SOL NASCENTE) / W3 NORTE (BR-040 - PARK SHOPPING - SIG)",
    color: "#eab308", // Yellow for CT Expresso
    frequency: "Horários programados conforme tabela",
    company: "ctExpresso",
    terminal: terminalLuziania,
    stops: [
      {
        id: "stop-007-1",
        name: "Parque Estrela Dalva",
        address: "Parque Estrela Dalva, Luziânia - GO",
        coordinates: { x: "45%", y: "55%" }
      },
      {
        id: "stop-007-2",
        name: "W3 Norte",
        address: "W3 Norte, Brasília - DF",
        coordinates: { x: "70%", y: "25%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["04:30"],
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
    nextScheduledTime: "04:30",
    pathCoordinates: "M 45% 55% L 70% 25%"
  },
  {
    id: "luziania-terminal-santa-maria",
    number: "008",
    name: "LUZIÂNIA / TERMINAL SANTA MARIA",
    description: "LUZIÂNIA (SHOPPING LUZIÂNIA - AV. ALFREDO NASSER) / TERMINAL DE INTEGRAÇÃO SANTA MARIA (AVENIDA ALAGADO)",
    color: "#eab308", // Yellow for CT Expresso
    frequency: "Horários programados conforme tabela",
    company: "ctExpresso",
    terminal: terminalLuziania,
    stops: [
      {
        id: "stop-008-1",
        name: "Luziânia Shopping",
        address: "Luziânia Shopping, Luziânia - GO",
        coordinates: { x: "50%", y: "50%" }
      },
      {
        id: "stop-008-2",
        name: "Terminal Santa Maria",
        address: "Terminal Santa Maria, Santa Maria - DF",
        coordinates: { x: "65%", y: "40%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["06:30"],
        afternoon: [],
        evening: ["18:30"]
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
    nextScheduledTime: "06:30",
    pathCoordinates: "M 50% 50% L 65% 40%"
  },
  {
    id: "luziania-w3-sul-norte",
    number: "009",
    name: "LUZIÂNIA / W3 SUL E NORTE",
    description: "LUZIÂNIA (SHOPPING LUZIÂNIA - AV. ALFREDO NASSER) / W3 SUL E NORTE (BR-040 - PARK SHOPPING - SPS)",
    color: "#eab308", // Yellow for CT Expresso
    frequency: "Horários programados conforme tabela",
    company: "ctExpresso",
    terminal: terminalLuziania,
    stops: [
      {
        id: "stop-009-1",
        name: "Luziânia Shopping",
        address: "Luziânia Shopping, Luziânia - GO",
        coordinates: { x: "50%", y: "50%" }
      },
      {
        id: "stop-009-2",
        name: "W3 Sul e Norte",
        address: "W3 Sul e Norte, Brasília - DF",
        coordinates: { x: "70%", y: "25%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["04:20", "04:40", "05:00", "05:15", "05:40", "05:55", "06:00", "06:20", "06:20", "06:35", "06:45", "07:00", "07:00", "07:15", "07:40", "07:40", "08:00", "08:20", "08:20", "08:30", "09:00", "09:05", "09:20", "09:40", "09:40", "10:20", "10:20", "10:40", "11:00", "11:00", "11:40", "11:40"],
        afternoon: ["12:20", "12:20", "13:00", "13:05", "13:40", "14:20", "14:35", "15:00", "15:20", "15:40", "15:40", "16:20", "16:30", "17:00", "17:20", "17:45", "18:10", "18:20", "18:45", "19:00"],
        evening: ["20:20", "20:30", "22:10"]
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
    nextScheduledTime: "04:20",
    pathCoordinates: "M 50% 50% L 70% 25%"
  },
  {
    id: "luziania-aguas-claras",
    number: "010",
    name: "LUZIÂNIA / ÁGUAS CLARAS",
    description: "LUZIÂNIA (SHOPPING LUZIÂNIA - AV. ALFREDO NASSER) / ÁGUAS CLARAS (BR-040 - EPCT - EPNB - PISTÃO SUL)",
    color: "#eab308", // Yellow for CT Expresso
    frequency: "Horários programados conforme tabela",
    company: "ctExpresso",
    terminal: terminalLuziania,
    stops: [
      {
        id: "stop-010-1",
        name: "Luziânia Shopping",
        address: "Luziânia Shopping, Luziânia - GO",
        coordinates: { x: "50%", y: "50%" }
      },
      {
        id: "stop-010-2",
        name: "Águas Claras",
        address: "Águas Claras, Brasília - DF",
        coordinates: { x: "65%", y: "30%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["05:20"],
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
    nextScheduledTime: "05:20",
    pathCoordinates: "M 50% 50% L 65% 30%"
  }
];
