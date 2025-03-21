
import { BusRoute } from "../../types/busTypes";
import { terminalLuziania } from "../terminals";

// CT Expresso routes: 011-013
export const ctExpressoRoutes011to013: BusRoute[] = [
  {
    id: "luziania-jk-w3-sul-norte",
    number: "011",
    name: "LUZIÂNIA (PARQUE JK) / W3 SUL E NORTE",
    description: "LUZIÂNIA (SHOPPING LUZIÂNIA - PARQUE JK - PARQUE ALVORADA I ) / W3 SUL E NORTE (BR-040 - PARK SHOPPING - SPS)",
    color: "#eab308", // Yellow for CT Expresso
    frequency: "Horários programados conforme tabela",
    company: "ctExpresso",
    terminal: terminalLuziania,
    stops: [
      {
        id: "stop-011-1",
        name: "Luziânia Shopping",
        address: "Luziânia Shopping, Luziânia - GO",
        coordinates: { x: "50%", y: "50%" }
      },
      {
        id: "stop-011-2",
        name: "Parque JK",
        address: "Parque JK, Luziânia - GO",
        coordinates: { x: "55%", y: "45%" }
      },
      {
        id: "stop-011-3",
        name: "W3 Sul e Norte",
        address: "W3 Sul e Norte, Brasília - DF",
        coordinates: { x: "70%", y: "25%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["04:55"],
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
    nextScheduledTime: "04:55",
    pathCoordinates: "M 50% 50% L 55% 45% L 70% 25%"
  },
  {
    id: "luziania-jk-rodoviaria-pp",
    number: "012",
    name: "LUZIÂNIA (PARQUE JK) / RODOVIÁRIA DO PLANO PILOTO",
    description: "LUZIÂNIA (SHOPPING LUZIÂNIA - PARQUE JK - PARQUE ALVORADA I) / RODOVIÁRIA DO PLANO PILOTO (BR-040 - PARK SHOPPING - EIXO)",
    color: "#eab308", // Yellow for CT Expresso
    frequency: "Horários programados conforme tabela",
    company: "ctExpresso",
    terminal: terminalLuziania,
    stops: [
      {
        id: "stop-012-1",
        name: "Luziânia Shopping",
        address: "Luziânia Shopping, Luziânia - GO",
        coordinates: { x: "50%", y: "50%" }
      },
      {
        id: "stop-012-2",
        name: "Parque JK",
        address: "Parque JK, Luziânia - GO",
        coordinates: { x: "55%", y: "45%" }
      },
      {
        id: "stop-012-3",
        name: "Rodoviária do Plano Piloto",
        address: "Rodoviária do Plano Piloto, Brasília - DF",
        coordinates: { x: "70%", y: "25%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: ["04:20", "06:00"],
        afternoon: ["17:10"],
        evening: ["18:05"]
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
    pathCoordinates: "M 50% 50% L 55% 45% L 70% 25%"
  },
  {
    id: "luziania-rodoviaria-taguatinga",
    number: "013",
    name: "LUZIÂNIA / RODOVIÁRIA DE TAGUATINGA",
    description: "LUZIÂNIA - RODOVIÁRIA DE TAGUATINGA, VIA PISTÃO SUL",
    color: "#eab308", // Yellow for CT Expresso
    frequency: "Horários programados conforme tabela",
    company: "ctExpresso",
    terminal: terminalLuziania,
    stops: [
      {
        id: "stop-013-1",
        name: "Luziânia Shopping",
        address: "Luziânia Shopping, Luziânia - GO",
        coordinates: { x: "50%", y: "50%" }
      },
      {
        id: "stop-013-2",
        name: "Pistão Sul",
        address: "Pistão Sul, Taguatinga - DF",
        coordinates: { x: "60%", y: "35%" }
      },
      {
        id: "stop-013-3",
        name: "Rodoviária de Taguatinga",
        address: "Rodoviária de Taguatinga, Taguatinga - DF",
        coordinates: { x: "62%", y: "32%" }
      }
    ],
    schedule: {
      mondayToFriday: {
        morning: [],
        afternoon: ["17:10", "17:30", "17:40", "17:50"],
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
    nextScheduledTime: "17:10",
    pathCoordinates: "M 50% 50% L 60% 35% L 62% 32%"
  }
];
