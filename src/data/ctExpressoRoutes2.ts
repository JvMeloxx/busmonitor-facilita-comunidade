
import { BusRoute } from "../types/busTypes";
import { terminalLuziania } from "./terminals";

// Additional CT Expresso routes (continued)
export const ctExpressoRoutes2: BusRoute[] = [
  {
    id: "luziania-rodoviaria-gama-df290",
    number: "014",
    name: "LUZIÂNIA / RODOVIÁRIA DO GAMA (via DF-290)",
    description: "LUZIÂNIA - RODOVIÁRIA DO GAMA VIA DF-290/AV. CENTRAL",
    color: "#eab308", // Yellow for CT Expresso
    frequency: "Horários programados conforme tabela",
    terminal: terminalLuziania,
    stops: [
      {
        id: "stop-014-1",
        name: "Luziânia Shopping",
        address: "Luziânia Shopping, Luziânia - GO",
        coordinates: { x: "50%", y: "50%" }
      },
      {
        id: "stop-014-2",
        name: "DF-290",
        address: "DF-290, DF",
        coordinates: { x: "58%", y: "45%" }
      },
      {
        id: "stop-014-3",
        name: "Rodoviária do Gama",
        address: "Rodoviária do Gama, Gama - DF",
        coordinates: { x: "62%", y: "40%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["04:40", "05:00", "05:00", "05:20", "05:40", "06:00", "06:00", "06:10", "06:10", "06:10", "06:20", "06:20", "06:30", "06:38", "06:40", "06:50", "06:50", "07:00", "07:00", "07:06", "07:10", "07:15", "07:20", "07:20", "07:30", "07:34", "07:40", "07:40", "07:40", "07:48", "07:50", "08:00", "08:02", "08:05", "08:10", "08:16", "08:20", "08:20", "08:30", "08:30", "08:40", "08:44", "08:50", "08:55", "08:58", "09:00", "09:00", "09:10", "09:12", "09:20", "09:20", "09:26", "09:30", "09:40", "09:40", "09:40", "09:45", "09:50", "09:54", "10:00", "10:08", "10:10", "10:10", "10:20", "10:20", "10:22", "10:30", "10:35", "10:36", "10:40", "10:50", "10:50", "11:00", "11:00", "11:00", "11:04", "11:10", "11:18", "11:20", "11:25", "11:30", "11:32", "11:40", "11:40", "11:46", "11:50", "11:50"],
        afternoon: ["12:00", "12:00", "12:10", "12:14", "12:15", "12:20", "12:20", "12:30", "12:38", "12:40", "12:40", "12:42", "12:50", "12:56", "13:00", "13:00", "13:05", "13:10", "13:10", "13:20", "13:24", "13:30", "13:30", "13:38", "13:40", "13:40", "13:50", "13:52", "13:55", "14:00", "14:06", "14:10", "14:20", "14:20", "14:20", "14:20", "14:30", "14:34", "14:40", "14:45", "14:48", "14:50", "15:00", "15:00", "15:02", "15:10", "15:10", "15:16", "15:20", "15:30", "15:30", "15:35", "15:40", "15:40", "15:44", "15:50", "15:58", "16:00", "16:00", "16:10", "16:12", "16:20", "16:20", "16:25", "16:26", "16:30", "16:40", "16:40", "16:50", "16:54", "17:00", "17:08", "17:15", "17:20", "17:22", "17:36", "17:40", "17:40", "17:50", "18:00", "18:04", "18:05", "18:10", "18:18", "18:20", "18:20", "18:30", "18:30", "18:32", "18:40", "18:40", "18:46", "18:50", "18:55", "19:00", "19:00", "19:00", "19:10", "19:20", "19:30", "19:30", "19:40", "19:40", "19:45", "19:50"],
        evening: ["20:00", "20:00", "20:10", "20:20", "20:20", "20:30", "20:30", "20:40", "20:50", "21:00", "21:00", "21:10", "21:30", "21:40", "22:10", "22:20"]
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
    nextScheduledTime: "04:40",
    pathCoordinates: "M 50% 50% L 58% 45% L 62% 40%"
  },
  {
    id: "luziania-rodoviaria-gama-pq-alvorada",
    number: "015",
    name: "LUZIÂNIA / RODOVIÁRIA DO GAMA (via Parque Alvorada)",
    description: "LUZIÂNIA – ROD. GAMA VIA PQ. ALVORADA / DF-290",
    color: "#eab308", // Yellow for CT Expresso
    frequency: "Horários programados conforme tabela",
    terminal: terminalLuziania,
    stops: [
      {
        id: "stop-015-1",
        name: "Luziânia Shopping",
        address: "Luziânia Shopping, Luziânia - GO",
        coordinates: { x: "50%", y: "50%" }
      },
      {
        id: "stop-015-2",
        name: "Parque Alvorada",
        address: "Parque Alvorada, Luziânia - GO",
        coordinates: { x: "55%", y: "45%" }
      },
      {
        id: "stop-015-3",
        name: "DF-290",
        address: "DF-290, DF",
        coordinates: { x: "58%", y: "45%" }
      },
      {
        id: "stop-015-4",
        name: "Rodoviária do Gama",
        address: "Rodoviária do Gama, Gama - DF",
        coordinates: { x: "62%", y: "40%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: [],
        afternoon: ["16:50", "17:00", "17:10", "17:30", "17:40", "17:50"],
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
    nextScheduledTime: "16:50",
    pathCoordinates: "M 50% 50% L 55% 45% L 58% 45% L 62% 40%"
  },
  {
    id: "luziania-gama-pq-alvorada",
    number: "016",
    name: "LUZIÂNIA / GAMA (via Parque Alvorada)",
    description: "LUZIÂNIA/GAMA, VIA PARQUE ALVORADA",
    color: "#eab308", // Yellow for CT Expresso
    frequency: "Horários programados conforme tabela",
    terminal: terminalLuziania,
    stops: [
      {
        id: "stop-016-1",
        name: "Luziânia Shopping",
        address: "Luziânia Shopping, Luziânia - GO",
        coordinates: { x: "50%", y: "50%" }
      },
      {
        id: "stop-016-2",
        name: "Parque Alvorada",
        address: "Parque Alvorada, Luziânia - GO",
        coordinates: { x: "55%", y: "45%" }
      },
      {
        id: "stop-016-3",
        name: "Gama",
        address: "Gama, DF",
        coordinates: { x: "62%", y: "40%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["05:20", "06:55"],
        afternoon: ["16:30", "18:00"],
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
    pathCoordinates: "M 50% 50% L 55% 45% L 62% 40%"
  },
  {
    id: "luziania-w3-norte-setor-grafico",
    number: "017",
    name: "LUZIÂNIA / W3 NORTE SETOR GRÁFICO",
    description: "LUZIÂNIA/W3 NORTE SETOR GRÁFICO",
    color: "#eab308", // Yellow for CT Expresso
    frequency: "Horários programados conforme tabela",
    terminal: terminalLuziania,
    stops: [
      {
        id: "stop-017-1",
        name: "Luziânia Shopping",
        address: "Luziânia Shopping, Luziânia - GO",
        coordinates: { x: "50%", y: "50%" }
      },
      {
        id: "stop-017-2",
        name: "W3 Norte",
        address: "W3 Norte, Brasília - DF",
        coordinates: { x: "70%", y: "25%" }
      },
      {
        id: "stop-017-3",
        name: "Setor Gráfico",
        address: "Setor Gráfico, Brasília - DF",
        coordinates: { x: "72%", y: "23%" }
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
    pathCoordinates: "M 50% 50% L 70% 25% L 72% 23%"
  },
  {
    id: "estrela-dalva-2-w3-norte",
    number: "018",
    name: "PARQUE ESTRELA DALVA 2, 4, 8 E 5 / W3 NORTE",
    description: "PARQUE ESTRELA DALVA 2, 4, 8 E 5 (AV. ALFREDO NASSER) / W3 NORTE (BR-040 - PARK SHOPPING - SPS - EIXO)",
    color: "#eab308", // Yellow for CT Expresso
    frequency: "Horários programados conforme tabela",
    terminal: terminalLuziania,
    stops: [
      {
        id: "stop-018-1",
        name: "Parque Estrela Dalva 2, 4, 8 e 5",
        address: "Parque Estrela Dalva, Luziânia - GO",
        coordinates: { x: "45%", y: "55%" }
      },
      {
        id: "stop-018-2",
        name: "W3 Norte",
        address: "W3 Norte, Brasília - DF",
        coordinates: { x: "70%", y: "25%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["05:25"],
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
    nextScheduledTime: "05:25",
    pathCoordinates: "M 45% 55% L 70% 25%"
  },
  {
    id: "estrela-dalva-2-rodoviaria-pp",
    number: "019",
    name: "PARQUE ESTRELA DALVA 2, 4, 8 E 5 / RODOVIÁRIA DO PLANO PILOTO",
    description: "PARQUE ESTRELA DALVA II - IV - VIII - V (AV. ALFREDO NASSER) / RODOVIÁRIA DO PLANO PILOTO (BR-040 - PARK SHOPPING - SPS - ZOOLÓGICO - EIXO)",
    color: "#eab308", // Yellow for CT Expresso
    frequency: "Horários programados conforme tabela",
    terminal: terminalLuziania,
    stops: [
      {
        id: "stop-019-1",
        name: "Parque Estrela Dalva 2, 4, 8 e 5",
        address: "Parque Estrela Dalva, Luziânia - GO",
        coordinates: { x: "45%", y: "55%" }
      },
      {
        id: "stop-019-2",
        name: "Rodoviária do Plano Piloto",
        address: "Rodoviária do Plano Piloto, Brasília - DF",
        coordinates: { x: "70%", y: "25%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["04:55"],
        afternoon: ["16:45", "17:25"],
        evening: ["19:30"]
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
    nextScheduledTime: "04:55",
    pathCoordinates: "M 45% 55% L 70% 25%"
  }
];

