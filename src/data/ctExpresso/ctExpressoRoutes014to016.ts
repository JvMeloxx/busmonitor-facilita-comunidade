
import { BusRoute } from "../../types/busTypes";
import { terminalLuziania } from "../terminals";

// CT Expresso routes: 014-016
export const ctExpressoRoutes014to016: BusRoute[] = [
  {
    id: "luziania-rodoviaria-gama-df290",
    number: "014",
    name: "LUZIÂNIA / RODOVIÁRIA DO GAMA (via DF-290)",
    description: "LUZIÂNIA - RODOVIÁRIA DO GAMA VIA DF-290/AV. CENTRAL",
    color: "#eab308", // Yellow for CT Expresso
    frequency: "Horários programados conforme tabela",
    company: "ctExpresso",
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
        morning: ["04:40", "05:00", "05:00", "05:20", "05:40", "06:00", "06:00", "06:10", "06:10", "06:10"],
        afternoon: ["12:00", "12:00", "12:10", "12:14", "12:15", "12:20", "12:20", "12:30"],
        evening: ["20:00", "20:00", "20:10", "20:20", "20:20", "20:30", "20:30", "20:40"]
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
    company: "ctExpresso",
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
    company: "ctExpresso",
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
  }
];
